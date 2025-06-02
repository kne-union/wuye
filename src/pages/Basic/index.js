import { createWithRemoteLoader } from '@kne/remote-loader';
import Menu from '@components/Menu';

const Home = createWithRemoteLoader({
  modules: ['Layout@Page']
})(({ remoteModules }) => {
  const [Page] = remoteModules;
  return <Page menu={<Menu />}>我是首页</Page>;
});

export default Home;
