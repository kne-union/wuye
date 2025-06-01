const fastify = require('fastify')();
const path = require('path');
const TLSSigAPIv2 = require('tls-sig-api-v2');

jest.mock('tls-sig-api-v2', () => ({
  Api: jest.fn().mockImplementation(() => ({
    genUserSig: jest.fn().mockReturnValue('mockUserSig123')
  }))
}));

describe('TRTC服务测试', () => {
  let fastifyInstance;

  beforeAll(async () => {
    fastifyInstance = fastify;
    // 配置基础设置
    fastifyInstance.decorate('config', {
      APP_ID: 'testAppId',
      SECRET_KEY: 'testSecretKey'
    });

    // 模拟数据库模型
    const mockModels = {
      conference: {
        create: jest.fn().mockResolvedValue({ id: 'conf123', toJSON: jest.fn().mockReturnValue({ id: 'conf123' }) }),
        findByPk: jest.fn().mockResolvedValue({
          id: 'conf123',
          toJSON: jest.fn().mockReturnValue({ id: 'conf123' }),
          save: jest.fn().mockResolvedValue({ id: 'conf123' })
        })
      },
      member: {
        create: jest.fn().mockResolvedValue({ id: 'member123' }),
        bulkCreate: jest.fn().mockResolvedValue([]),
        findPyPk: jest.fn().mockResolvedValue({
          id: 'member123',
          save: jest.fn().mockResolvedValue({ id: 'member123' })
        }),
        findAll: jest.fn().mockResolvedValue([])
      }
    };

    // 注册命名空间插件
    await fastifyInstance.register(require('@kne/fastify-namespace'), {
      name: 'trtc',
      modules: [
        ['models', mockModels],
        ['services', path.resolve(__dirname, '../libs/services')]
      ]
    });
    await fastifyInstance.register(require('@kne/fastify-namespace'), {
      name: 'shorten',
      modules: [
        [
          'services',
          {
            encode: jest.fn().mockReturnValue('mockShorten123'),
            decode: jest.fn().mockReturnValue({ id: 'user1', conferenceId: 'conf123', isMaster: true })
          }
        ]
      ]
    });
    await fastifyInstance.ready();
  });

  afterAll(async () => {
    await fastifyInstance.close();
    jest.restoreAllMocks();
  });

  describe('getUserSig()', () => {
    test('应返回正确的APP ID', async () => {
      const result = fastifyInstance.trtc.services.getUserSig('user1');
      expect(result.appId).toBe('testAppId');
    });

    test('应返回正确的用户ID', async () => {
      const result = fastifyInstance.trtc.services.getUserSig('user1');
      expect(result.userId).toBe('user1');
    });

    test('应返回有效的用户签名', async () => {
      const result = fastifyInstance.trtc.services.getUserSig('user1');
      expect(typeof result.userSig).toBe('string');
      expect(result.userSig.length).toBeGreaterThan(0);
    });
  });

  describe('createConference()', () => {
    const validParams = {
      name: 'Test Meeting',
      startTime: new Date(),
      duration: 60,
      isInvitationAllowed: true,
      members: [{ userId: 'user1', isMaster: true }]
    };

    test('应成功创建会议', async () => {
      const conference = await fastifyInstance.trtc.services.createConference(validParams);
      expect(conference.id).toBeDefined();
      expect(fastifyInstance.trtc.models.conference.create).toHaveBeenCalled();
    });

    test('缺少主持人时应抛出错误', async () => {
      await expect(
        fastifyInstance.trtc.services.createConference({
          ...validParams,
          members: [{ userId: 'user1', isMaster: false }]
        })
      ).rejects.toThrow('At least one master is needed');
    });

    test('成员超过限制时应抛出错误', async () => {
      const members = Array(11)
        .fill()
        .map((_, i) => ({
          userId: `user${i}`,
          isMaster: i === 0
        }));

      await expect(
        fastifyInstance.trtc.services.createConference({
          ...validParams,
          maxCount: 10,
          members
        })
      ).rejects.toThrow('Members exceed the limit');
    });
  });
  describe('joinConference()', () => {
    test('应成功加入会议', async () => {
      const result = await fastifyInstance.trtc.services.joinConference('conf123', 'user1');
      expect(result.conferenceId).toBe('conf123');
      expect(result.userId).toBe('user1');
    });

    /*test('会议不存在时应抛出错误', async () => {
      await expect(fastifyInstance.trtc.services.joinConference('invalid_conf', 'user1')).rejects.toThrow('Conference not found');
    });*/
  });

  describe('getConference()', () => {
    test('应返回正确的会议信息', async () => {
      const info = await fastifyInstance.trtc.services.getConference({ shorten: 'mockShorten123' });
      expect(info.id).toBe('conf123');
    });

    /*test('会议不存在时应抛出错误', async () => {
      await expect(fastifyInstance.trtc.services.getConference('invalid_conf')).rejects.toThrow('Conference not found');
    });*/
  });

  describe('removeMember()', () => {
    test('应成功移除会议成员', async () => {
      await expect(fastifyInstance.trtc.services.removeMember('conf123', 'user1')).resolves.not.toThrow();
    });

    /*test('移除不存在的成员时应抛出错误', async () => {
      await expect(fastifyInstance.trtc.services.removeMember('conf123', 'invalid_user')).rejects.toThrow('Member not found');
    });*/
  });

  describe('endConference()', () => {
    test('主持人应能成功结束会议', async () => {
      await expect(fastifyInstance.trtc.services.endConference('conf123', 'master_user')).resolves.not.toThrow();
    });

    /*test('非主持人结束会议时应抛出错误', async () => {
      await expect(fastifyInstance.trtc.services.endConference('conf123', 'normal_user')).rejects.toThrow('Permission denied');
    });*/
  });
});
