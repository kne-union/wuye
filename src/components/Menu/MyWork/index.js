import { createWithRemoteLoader } from '@kne/remote-loader';

const MyWork = createWithRemoteLoader({
  modules: ['components-core:Menu', 'components-core:Icon']
})(({ remoteModules }) => {
  const [Menu, Icon] = remoteModules;
  return (
    <Menu
      items={[
        {
          icon: <Icon type="dashboard" fontClassName="iconfont-wuye" />,
          path: '/oa',
          label: '工作台'
        },
        {
          icon: <Icon type="meeting-create" fontClassName="iconfont-wuye" />,
          path: '/oa/order',
          label: '我的工单'
        },
        {
          icon: <Icon type="finance" fontClassName="iconfont-wuye" />,
          path: '/oa/fee',
          label: '物业收费'
        },
        {
          icon: <Icon type="hr" fontClassName="iconfont-wuye" />,
          path: '/oa/hr',
          label: '员工管理'
        }
      ]}
    />
  );
});

export default MyWork;
