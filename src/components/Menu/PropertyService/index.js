import { createWithRemoteLoader } from '@kne/remote-loader';

const PropertyService = createWithRemoteLoader({
  modules: ['components-core:Menu', 'components-core:Icon']
})(({ remoteModules }) => {
  const [Menu, Icon] = remoteModules;
  return (
    <Menu
      items={[
        {
          icon: <Icon type="dashboard" fontClassName="iconfont-wuye" />,
          path: '/basic',
          label: '服务统计'
        },
        {
          icon: <Icon type="notication" fontClassName="iconfont-wuye" />,
          path: '/basic/notice',
          label: '通知'
        },
        {
          icon: <Icon type="my-mission" fontClassName="iconfont-wuye" />,
          path: '/basic/order',
          label: '工单'
        },
        {
          icon: <Icon type="vistor" fontClassName="iconfont-wuye" />,
          path: '/basic/visitor',
          label: '访客'
        },
        {
          icon: <Icon type="park" fontClassName="iconfont-wuye" />,
          path: '/basic/car',
          label: '车辆'
        },
        {
          icon: <Icon type="community" fontClassName="iconfont-wuye" />,
          path: '/basic/building',
          label: '房产'
        },
        {
          icon: <Icon type="ower" fontClassName="iconfont-wuye" />,
          path: '/basic/owner',
          label: '业主'
        }
      ]}
    />
  );
});

export default PropertyService;
