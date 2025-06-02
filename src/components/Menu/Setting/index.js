import { createWithRemoteLoader } from '@kne/remote-loader';

const Setting = createWithRemoteLoader({
  modules: ['components-core:Menu']
})(({ remoteModules }) => {
  const [Menu] = remoteModules;
  return (
    <Menu
      items={[
        {
          path: '/setting',
          label: '组织'
        },
        {
          path: '/setting/permission',
          label: '权限'
        },
        {
          path: '/setting/community',
          label: '小区管理'
        }
      ]}
    />
  );
});

export default Setting;
