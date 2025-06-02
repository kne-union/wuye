import { createWithRemoteLoader } from '@kne/remote-loader';
import { Setting as Menu } from '@components/Menu';

const Setting = createWithRemoteLoader({
  modules: ['Layout@Page']
})(({ remoteModules }) => {
  const [Page] = remoteModules;
  return <Page menu={<Menu />}>系统设置</Page>;
});

export default Setting;
