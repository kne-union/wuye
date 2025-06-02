import { createWithRemoteLoader } from '@kne/remote-loader';

const Setting = createWithRemoteLoader({
  modules: ['components-core:Menu', 'components-core:Icon']
})(({ remoteModules }) => {
  const [Menu, Icon] = remoteModules;
  return (
    <Menu
      items={[
        {
          icon: <Icon type="struct" fontClassName="iconfont-wuye" />,
          path: '/setting',
          label: '组织'
        },
        {
          icon: <Icon type="promise" fontClassName="iconfont-wuye" />,
          path: '/setting/permission',
          label: '权限'
        },
        {
          icon: <Icon type="community" fontClassName="iconfont-wuye" />,
          path: '/setting/community',
          label: '小区管理'
        }
      ]}
    />
  );
});

export default Setting;
