import React from 'react';
import { render } from 'react-dom';

if (process.env.NODE_ENV !== 'production') {
  System.import('react-addons-perf').then(Perf => {
    window.ReactPerf = Perf;
  })

  // System.import('why-did-you-update').then(({whyDidYouUpdate}) => {
  //   whyDidYouUpdate(React, { include: /^SomeComponent/ })
  // });
}

import './styles/main.scss';

import configureStore from './configureStore';
export const store = configureStore();

import App from './containers/App';
const rootEl = document.getElementById('root');
render(<App store={store} />, rootEl);

if (module.hot) {
  module.hot.accept('./containers/App', () => {
    render(<App store={store} />, rootEl);
  });
}