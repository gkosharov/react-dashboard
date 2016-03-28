var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var path = require('path');
var webPackServerPort = 3000;

var publicPath = path.resolve(__dirname);

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  stats: {
    colors: true
  }
}).listen(webPackServerPort, 'localhost', function (err) {
  if (err) {
    console.log(err);
  }
  
  console.log('Listening at localhost:3000');
});

