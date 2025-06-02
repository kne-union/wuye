import Fetch from '@kne/react-fetch';
import { getPublicPath, createWithRemoteLoader } from '@kne/remote-loader';

const FontLoader = createWithRemoteLoader({
  modules: ['components-core:Icon@FontLoader']
})(({ remoteModules, children }) => {
  const [FontLoader] = remoteModules;
  return (
    <Fetch
      url={getPublicPath('wuye') + '/icon-build/manifest.json'}
      cache="wuye-font-manifest"
      ignoreSuccessState
      render={({ data }) => {
        const path = getPublicPath('wuye') + '/icon-build/' + data['wuye'];
        return (
          <>
            <FontLoader path={path + '/iconfont.css'} />
            {typeof children === 'function' ? children({ path }) : children}
          </>
        );
      }}
    />
  );
});

export default FontLoader;
