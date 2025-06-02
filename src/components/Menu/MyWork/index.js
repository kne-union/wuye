import { createWithRemoteLoader } from '@kne/remote-loader';

const MyWork = createWithRemoteLoader({
  modules: ['components-core:Menu']
})(({ remoteModules }) => {
  const [Menu] = remoteModules;
  return (
    <Menu
      items={[
        {
          path: '/oa',
          label: '工作台'
        },
        {
          path: '/oa/order',
          label: '我的工单'
        },
        {
          path: '/oa/fee',
          label: '物业收费'
        },
        {
          path: '/basic/hr',
          label: '员工管理'
        }
      ]}
    />
  );
});

export default MyWork;
