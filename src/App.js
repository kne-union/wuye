import RemoteLoader, { createWithRemoteLoader } from '@kne/remote-loader';
import { Routes, Route, Navigate } from 'react-router-dom';
import pages from './pages';
import './index.scss';

const { Account, Admin, InitAdmin, Basic, Finance, MyWork, Setting, Error, NotFound } = pages;

const App = createWithRemoteLoader({
  modules: ['components-core:Global', 'components-admin:Authenticate@BeforeLoginLayout', 'components-admin:Authenticate@AfterUserLoginLayout', 'components-admin:Authenticate@AfterAdminUserLoginLayout']
})(({ remoteModules, globalPreset }) => {
  const [Global, BeforeLoginLayout, AfterUserLoginLayout, AfterAdminUserLoginLayout] = remoteModules;
  const baseUrl = '/';
  return (
    <Global preset={globalPreset} themeToken={globalPreset.themeToken}>
      <Routes>
        <Route
          element={
            <AfterUserLoginLayout
              baseUrl={baseUrl}
              navigation={{
                showIndex: false,
                list: [
                  {
                    key: 'basic',
                    title: '物业服务',
                    path: '/basic'
                  },
                  {
                    key: 'oa',
                    title: '我的工作',
                    path: '/oa'
                  },
                  {
                    key: 'finance',
                    title: '财务管理',
                    path: '/finance'
                  },
                  {
                    key: 'setting',
                    title: '设置',
                    path: '/setting'
                  }
                ]
              }}
            />
          }
        >
          <Route index element={<Navigate to="/basic" />} />
          <Route path="basic/*" element={<Basic />} />
          <Route path="oa/*" element={<MyWork />} />
          <Route path="finance/*" element={<Finance />} />
          <Route path="setting/*" element={<Setting />} />
        </Route>
        <Route path="admin/initAdmin" element={<AfterUserLoginLayout />}>
          <Route index element={<InitAdmin baseUrl={`${baseUrl}/admin`} />} />
        </Route>
        <Route
          path="admin"
          element={
            <AfterAdminUserLoginLayout
              navigation={{
                base: `${baseUrl}/admin`,
                list: [
                  {
                    key: 'user',
                    title: '用户管理',
                    path: '/admin/user'
                  },
                  {
                    key: 'file',
                    title: '文件管理',
                    path: '/admin/file'
                  },
                  {
                    key: 'signature',
                    title: '密钥管理',
                    path: '/admin/signature'
                  }
                ]
              }}
            />
          }
        >
          <Route index element={<Navigate to={`${baseUrl}/admin/user`} replace />} />
          <Route path="file" element={<RemoteLoader module="components-file-manager:FileListPage" />} />
          <Route path="signature" element={<RemoteLoader module="components-signature:Signature" />} />
          <Route path="*" element={<Admin baseUrl={`${baseUrl}/admin`} />} />
        </Route>
        <Route element={<BeforeLoginLayout />}>
          <Route path="error" element={<Error />} />
          <Route path="404" element={<NotFound />} />
          <Route path="account/*" element={<Account baseUrl={baseUrl + '/account'} />} />
        </Route>
      </Routes>
    </Global>
  );
});

export default App;
