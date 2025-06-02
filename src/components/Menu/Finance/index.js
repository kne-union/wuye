import { createWithRemoteLoader } from '@kne/remote-loader';

const MyWork = createWithRemoteLoader({
  modules: ['components-core:Menu']
})(({ remoteModules }) => {
  const [Menu] = remoteModules;
  return (
    <Menu
      items={[
        {
          path: '/finance',
          label: '指标动态'
        },
        {
          path: '/finance/fee',
          label: '物业收费'
        },
        {
          path: '/finance/invoice',
          label: '发票记录'
        },
        {
          path: '/finance/summary',
          label: '报表汇总'
        }
      ]}
    />
  );
});

export default MyWork;
