# React Starter Project (WIP)
An opinionated but fairly minimal project to get started with React, Redux, and Webpack 2.

# Getting started
```
git clone https://github.com/techniq/react-starter-project.git
cd react-starter-project
npm install
npm start
open http://localhost:3000
```

# Features
- ES2015+ via babel 6, including object spread
- React with `react-router`
- Redux with `react-redux`, `redux-thunk`, `redux-logger`, `redux-devtools` (including `remotedev-server`)
- Development server with hot reloading using `express`, `webpack-dev-middleware`, `webpack-hot-middleware`, and `react-hot-loader`)
- Webpack 2 with tree shaking
  - Minified production builds (`npm run build:prod`)
    - `NODE_ENV == 'production'`
    - UglifyJs
    - Vendor bundle splitting
    - Selective imports
  - Inject index.html with cache breaking assets (js, css)
  - Import from project root (ex. `import { Foo } from 'components/Foo'`)
- Styles
  - [CSS Modules](https://github.com/css-modules/css-modules) including SASS support
  - [Bootstrap](http://getbootstrap.com/) and [Font-Awesome](http://fontawesome.io/) (via `.scss`) and thus can be configured
    - Bootstrap colors overridden using [`material-colors`](https://github.com/shuhei/material-colors)
    - [`react-bootstrap`](https://github.com/react-bootstrap/react-bootstrap)
  - `postcss` with `autoprefixer`
- Polyfills for [`window.fetch`](https://github.com/github/fetch) and [`babel-polyfill`](https://babeljs.io/docs/usage/polyfill/) for ES2015 environment (`Promise`, `Object.assign`, `Array.from`, `Array.includes`, etc)
- Linting using eslint with airbnb's javascript rules (`npm run lint`)
- Performance
  - `react-addons-perf` and `what-did-you-update`

# Profiling
```js
ReactPerf.start()
// interact with app...
RectPerf.stop()
ReactPerf.printWasted()
ReactPerf.getWasted().reduce((result, item) => result += item.inclusiveRenderDuration, 0)
```

# TODO
- [ ] Setup testing (`npm test`) using `ava`, `enzyme`, `jest`, etc
- [ ] Document how to change various things (`_variables.scss` for colors, `eslint` rules, etc)
- [ ] Document how to remove unwanted features (redux, sass, etc)
- [ ] Document how Webpack configuration is setup (explain use for each plugin, loader, etc)
- [ ] `Immutable.js` / `seemless-immutable`