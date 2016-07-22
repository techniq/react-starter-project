import React from 'react';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import {
  Router,
  Route,
  IndexRoute,
  applyRouterMiddleware,
  browserHistory,
  hashHistory
} from 'react-router';
import useScroll from 'react-router-scroll';

import Layout from './Layout';
import Index from './Index';

const App = ({ store }) => (
  <AppContainer>
    <Provider store={store}>
      <Router history={browserHistory} render={applyRouterMiddleware(useScroll())}>
        <Route component={Layout}>
          <Route path="/" component={Index} />
        </Route>
      </Router>
    </Provider>
  </AppContainer>
)

export default App
