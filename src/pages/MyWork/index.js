import { createWithRemoteLoader } from '@kne/remote-loader';
import { MyWork as Menu } from '@components/Menu';

const MyWork = createWithRemoteLoader({
  modules: ['Layout@Page']
})(({ remoteModules }) => {
  const [Page] = remoteModules;
  return <Page menu={<Menu />}>协同办公</Page>;
});

export default MyWork;
