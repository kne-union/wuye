import { createWithRemoteLoader } from '@kne/remote-loader';
import { Finance as Menu } from '@components/Menu';

const Finance = createWithRemoteLoader({
  modules: ['Layout@Page']
})(({ remoteModules }) => {
  const [Page] = remoteModules;
  return <Page menu={<Menu />}>财务管理</Page>;
});

export default Finance;
