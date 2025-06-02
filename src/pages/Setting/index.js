import { createWithRemoteLoader } from '@kne/remote-loader';
import { Setting as Menu } from '@components/Menu';
import { Routes, Route } from 'react-router-dom';
import Community from '@components/Community';

const Setting = createWithRemoteLoader({
  modules: ['Layout@Page']
})(({ remoteModules }) => {
  const [Page] = remoteModules;
  const menu = <Menu />;
  return (
    <Routes>
      <Route index element={<Page menu={menu}>组织</Page>}></Route>
      <Route path="permission" element={<Page menu={menu}>权限</Page>} />
      <Route path="community" element={<Community menu={menu} />} />
    </Routes>
  );
});

export default Setting;
