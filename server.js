const path = require('path');
const webpack = require('webpack');
const express = require('express');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config')(process.env);

const app = express();
const compiler = webpack(config);

app.use(devMiddleware(compiler, {
  // publicPath: '/' + config.output.publicPath,
  historyApiFallback: true,
  stats: { colors: true },
}));

app.use(hotMiddleware(compiler));

app.use('*', (req, res, next) => {
  const filename = path.join(compiler.outputPath, 'index.html');
  compiler.outputFileSystem.readFile(filename, (err, result) => {
    if (err) {
      return next(err);
    }
    res.set('content-type', 'text/html');
    res.send(result);
    res.end();
  });
});

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  }

  console.log('Listening at http://localhost:3000/');
});

// Setup redux debugging
// const remotedev = require('remotedev-server');
// remotedev({ hostname: 'localhost', port: 3001 });
