import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

function configureStore(initialState) {
  let enhancer = null;
  if (process.env.NODE_ENV === 'production') {
    enhancer = compose(
      applyMiddleware(thunk, createLogger())
      );
  } else {
    // const devTools = require('remote-redux-devtools');
    // enhancer = compose(
    //   applyMiddleware(thunk, createLogger()),
    //   window.devToolsExtension ? window.devToolsExtension() : devTools({
    //     realtime: true,
    //     port: 3001
    //   })
    // )
    enhancer = compose(
      applyMiddleware(thunk, createLogger()),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    );
  }

  return createStore(rootReducer, initialState, enhancer);
}

export default configureStore;
