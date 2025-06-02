import { createWithRemoteLoader } from '@kne/remote-loader';

const PropertyService = createWithRemoteLoader({
  modules: ['components-core:Menu']
})(({ remoteModules }) => {
  const [Menu] = remoteModules;
  return (
    <Menu
      items={[
        {
          path: '/basic',
          label: '服务统计'
        },
        {
          path: '/basic/notice',
          label: '通知'
        },
        {
          path: '/basic/order',
          label: '工单'
        },
        {
          path: '/basic/visitor',
          label: '访客'
        },
        {
          path: '/basic/car',
          label: '车辆'
        },
        {
          path: '/basic/building',
          label: '房产'
        },
        {
          path: '/basic/owner',
          label: '业主'
        }
      ]}
    />
  );
});

export default PropertyService;
