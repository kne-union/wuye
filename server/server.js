const fastify = require('fastify')({
  logger: true,
  querystringParser: str => require('qs').parse(str)
});

const fastifyEnv = require('@fastify/env');
const packageJson = require('./package.json');
const path = require('node:path');

const version = `v${packageJson.version.split('.')[0]}`;
const apiPrefix = `/api/${version}`;

const createServer = () => {
  fastify.register(fastifyEnv, {
    dotenv: true,
    schema: {
      type: 'object',
      properties: {
        DB_DIALECT: { type: 'string', default: 'sqlite' },
        DB_HOST: { type: 'string', default: 'data.db' },
        DB_USERNAME: { type: 'string' },
        DB_PASSWORD: { type: 'string' },
        DB_DATABASE: { type: 'string' },
        ENV: { type: 'string', default: 'local' },
        PORT: { type: 'number', default: 8040 },

        IS_TEST: { type: 'boolean', default: true }
      }
    }
  });

  fastify.register(
    require('fastify-plugin')(async fastify => {
      fastify.register(require('@kne/fastify-sequelize'), {
        db: {
          dialect: fastify.config.DB_DIALECT,
          host: fastify.config.DB_HOST,
          database: fastify.config.DB_DATABASE,
          username: fastify.config.DB_USERNAME,
          password: fastify.config.DB_PASSWORD
        },
        modelsGlobOptions: {
          syncOptions: {}
        }
      });
    })
  );

  fastify.register(require('@kne/fastify-file-manager'), {
    prefix: `${apiPrefix}/static`,
    root: path.resolve('./static'),
    createAuthenticate: name => {
      if (name === 'file:mange') {
        return [
          async request => {
            await fastify.account.authenticate.user(request);
            await fastify.account.authenticate.admin(request);
          }
        ];
      }
      return [];
    }
  });

  fastify.register(
    require('fastify-plugin')(async fastify => {
      fastify.register(require('@kne/fastify-account'), {
        prefix: apiPrefix,
        isTest: fastify.config.IS_TEST
      });

      fastify.register(require('@kne/fastify-signature'), {
        prefix: `${apiPrefix}/signature`
      });
    })
  );

  fastify.register(
    require('fastify-plugin')(async fastify => {
      await fastify.sequelize.sync();
    })
  );

  fastify.register(
    require('fastify-plugin')(async fastify => {
      fastify.register(require('@fastify/static'), {
        root: path.join(__dirname, './build'), // 静态文件目录
        prefix: '/',
        decorateReply: false
      });
      fastify.setNotFoundHandler((req, reply) => {
        reply.sendFile('index.html', { root: path.join(__dirname, './build') });
      });
    })
  );

  fastify.register(require('@kne/fastify-response-data-format'));
};

module.exports = {
  fastify,
  createServer,
  start: () => {
    createServer();
    return fastify.then(() => {
      fastify.listen({ port: fastify.config.PORT, host: '0.0.0.0' }, (err, address) => {
        if (err) throw err;
        console.log(`Server is now listening on ${address}`);
      });
    });
  }
};
