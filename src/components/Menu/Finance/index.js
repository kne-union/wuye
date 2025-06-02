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
          path: '/finance',
          label: '指标动态'
        },
        {
          icon: <Icon type="finance" fontClassName="iconfont-wuye" />,
          path: '/finance/fee',
          label: '物业收费'
        },
        {
          icon: <Icon type="payment" fontClassName="iconfont-wuye" />,
          path: '/finance/invoice',
          label: '发票记录'
        },
        {
          icon: <Icon type="screen" fontClassName="iconfont-wuye" />,
          path: '/finance/summary',
          label: '报表汇总'
        }
      ]}
    />
  );
});

export default MyWork;
