import { configureStore, Store } from '@reduxjs/toolkit';

import rootReducer from './features';

function configureAppStore(preloadedState = {}): Store {
  const enhancers = [];
  const isDev = process.env.NODE_ENV !== 'production';

  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
    enhancers,
    devTools: isDev,
  });

  if (isDev && module.hot) {
    module.hot.accept('./features', () => store.replaceReducer(rootReducer));
  }

  return store;
}

export type RootState = ReturnType<typeof rootReducer>;
export default configureAppStore;
