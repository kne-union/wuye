import RemoteLoader, { createWithRemoteLoader } from '@kne/remote-loader';
import { Routes, Route, Navigate } from 'react-router-dom';
import pages from './pages';
import './index.scss';

const { Account, Admin, InitAdmin, Home, Error, NotFound } = pages;

const App = createWithRemoteLoader({
  modules: ['components-core:Global', 'components-admin:Authenticate@BeforeLoginLayout', 'components-admin:Authenticate@AfterUserLogin', 'components-admin:Authenticate@AfterAdminUserLoginLayout']
})(({ remoteModules, globalPreset }) => {
  const [Global, BeforeLoginLayout, AfterUserLogin, AfterAdminUserLoginLayout] = remoteModules;
  const baseUrl = '';
  return (
    <Global preset={globalPreset} themeToken={globalPreset.themeToken}>
      <Routes>
        <Route element={<AfterUserLogin baseUrl={baseUrl} />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="admin/initAdmin" element={<AfterUserLogin />}>
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
