const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const dependencies = require('./package.json').dependencies;

module.exports = env => {
  const isProd = () => env.prod;
  const isDev = () => !env.prod;
  const addIf = (cond, item) => cond ? item : undefined;
  const ifProd = item => addIf(isProd(), item);
  const ifDev = item => addIf(isDev(), item);
  const removeEmpty = array => array.filter(i => !!i);
  const getDependencies = () => Object.keys(dependencies).filter(d => {
    // Ignore sass-only dependencies and react-bootstrap
    // (for smaller overall builds as app only imports some of react-bootstrap)
    return ['bootstrap-sass', 'font-awesome', 'material-colors', 'react-bootstrap'].indexOf(d) === -1
  });

  return {
    devtool: isProd() ? 'source-map' : 'cheap-module-eval-source-map',
    entry: {
      app: './src/index',
      vendor: [].concat(removeEmpty([
        'babel-polyfill',
        'whatwg-fetch',
        ifDev('react-hot-loader/patch'),
        ifDev('webpack-hot-middleware/client?reload=true'),
      ]), getDependencies()),
    },
    output: {
      filename: '[name]-[chunkhash].js',
      path: path.resolve(__dirname, 'dist'),
      // publicPath: './'
    },
    plugins: removeEmpty([
      new webpack.optimize.OccurrenceOrderPlugin(),
      new HtmlWebpackPlugin({
        template: './src/index.html',
      }),
      new ExtractTextPlugin({ filename: 'styles-[chunkhash].css', disable: isDev() }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: isProd() ? '[name]-[chunkhash].js' : '[name].js',
      }),
      ifDev(new webpack.HotModuleReplacementPlugin()),
      ifProd(new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"',
        },
      })),
      ifProd(new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
        quiet: true,
      })),
      ifProd(new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        sourceMap: true,
      })),
    ]),
    resolve: {
      modules: [
        path.resolve('./src'),
        'node_modules',
      ],
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          include: path.resolve(__dirname, 'src'),
          loaders: ['babel'],
        },
        {
          test: /\.css$/,
          include: /node_modules/,
          loader: ExtractTextPlugin.extract({ fallbackLoader: 'style', loader: [
            'css?modules&importLoaders=1&localIdentName=[path][name]__[local]___[hash:base64:5]',
            'postcss',
          ] }),
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          loader: ExtractTextPlugin.extract({ fallbackLoader: 'style', loader: [
            'css',
            'postcss',
          ] }),
        },
        {
          test: /\.scss$/,
          include: path.resolve(__dirname, 'src', 'styles'),
          loader: ExtractTextPlugin.extract({ fallbackLoader: 'style', loader: [
            'css',
            'postcss',
            'resolve-url',
            'sass?sourceMap',
          ] }),
        },
        {
          test: /\.scss$/,
          exclude: path.resolve(__dirname, 'src', 'styles'),
          loader: ExtractTextPlugin.extract({ fallbackLoader: 'style', loader: [
            'css?modules&importLoaders=1&localIdentName=[path][name]__[local]___[hash:base64:5]',
            'postcss',
            'resolve-url',
            'sass?sourceMap',
          ] }),
        },
        { test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url?limit=10000' },
        { test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/, loader: 'file' },
      ],
    },
    postcss: [
      autoprefixer({ browsers: ['ie >= 9', 'last 2 versions'] }),
    ],
  }
}
