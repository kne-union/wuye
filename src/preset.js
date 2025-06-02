import React from 'react';
import { preset as fetchPreset } from '@kne/react-fetch';
import { Spin, Empty, message } from 'antd';
import createAjax from '@kne/axios-fetch';
import { preset as remoteLoaderPreset, loadModule } from '@kne/remote-loader';
import { getApis } from '@components/Apis';
import { getToken } from '@kne/token-storage';

window.PUBLIC_URL = window.runtimePublicUrl || process.env.PUBLIC_URL;

const baseApiUrl = window.runtimeApiUrl || '';

export const globalInit = async () => {
  const ajax = createAjax({
    baseUrl: baseApiUrl,
    getDefaultHeaders: () => {
      return {
        'X-User-Token': getToken('X-User-Token'),
        'X-User-Code': getToken('X-User-Code')
      };
    },
    errorHandler: error => message.error(error),
    registerInterceptors: interceptors => {
      interceptors.response.use(response => {
        if (response.status === 401 || response.data.code === 401) {
          const searchParams = new URLSearchParams(window.location.search);
          const referer = encodeURIComponent(window.location.pathname + window.location.search);
          searchParams.append('referer', referer);
          window.location.href = '/account/login?' + searchParams.toString();
          response.showError = false;
        }
        return response;
      });
    }
  });
  fetchPreset({
    ajax,
    loading: (
      <Spin
        delay={500}
        style={{
          position: 'absolute',
          left: '50%',
          padding: '10px',
          transform: 'translateX(-50%)'
        }}
      />
    ),
    error: null,
    empty: <Empty />,
    transformResponse: response => {
      const { data } = response;
      response.data = {
        code: data.code === 0 ? 200 : data.code,
        msg: data.msg,
        results: data.data
      };
      return response;
    }
  });
  const registry = {
    url: 'https://uc.fatalent.cn',
    tpl: '{{url}}/packages/@kne-components/{{remote}}/{{version}}/build'
  };

  const componentsCoreRemote = {
    ...registry,
    //url: 'http://localhost:3001',
    //tpl: '{{url}}',
    remote: 'components-core',
    defaultVersion: '0.3.21'
  };
  remoteLoaderPreset({
    remotes: {
      default: componentsCoreRemote,
      'components-core': componentsCoreRemote,
      'components-iconfont': {
        ...registry,
        remote: 'components-iconfont',
        defaultVersion: '0.2.1'
      },
      'components-file-manager': {
        ...registry,
        remote: 'components-file-manager',
        defaultVersion: '0.1.1'
      },
      'components-signature': {
        ...registry,
        //url: 'http://localhost:3012',
        //tpl: '{{url}}',
        remote: 'components-signature',
        defaultVersion: '0.1.0'
      },
      'components-admin': {
        ...registry,
        //url: 'http://localhost:3016',
        //tpl: '{{url}}',
        remote: 'components-admin',
        defaultVersion: '1.0.2'
      },
      wuye:
        process.env.NODE_ENV === 'development'
          ? {
              remote: 'wuye',
              url: '/',
              tpl: '{{url}}'
            }
          : {
              ...registry,
              remote: 'wuye',
              defaultVersion: process.env.DEFAULT_VERSION
            }
    }
  });

  const getAccountApis = await loadModule('components-admin:Apis@getApis').then(({ default: defaultModule }) => defaultModule);
  const getFileManagerApis = await loadModule('components-file-manager:Apis@getApis').then(({ default: defaultModule }) => defaultModule);
  const getSignatureApis = await loadModule('components-signature:Apis@getApis').then(({ default: defaultModule }) => defaultModule);

  return {
    ajax,
    apis: Object.assign(
      {},
      getAccountApis(),
      {
        fileManager: getFileManagerApis(),
        signature: getSignatureApis({ prefix: '/api/v1/signature' }),
        file: {
          contentWindowUrl: 'https://uc.fatalent.cn/components/@kne/iframe-resizer/0.1.3/dist/contentWindow.js',
          pdfjsUrl: 'https://cdn.leapin-ai.com/components/pdfjs-dist/4.4.168',
          getUrl: {
            url: `/api/v1/static/file-url/{id}`,
            paramsType: 'urlParams',
            ignoreSuccessState: true
          },
          upload: ({ file }) => {
            return ajax.postForm({
              url: `/api/v1/static/upload`,
              data: { file }
            });
          }
        }
      },
      getApis()
    )
  };
};
