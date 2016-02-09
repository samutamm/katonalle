var webpack = require('webpack');

function getEntrySources(sources) {
    /*if (process.env.NODE_ENV !== 'production') {
        sources.unshift('webpack/hot/only-dev-server');
        sources.unshift('webpack-dev-server/client?http://localhost:8080');
    }*/
    return sources;
}

module.exports = function() {
  return ({
    entry: getEntrySources([
      './public/app/index.jsx'
    ]),
    module: {
      loaders: [{
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'react-hot!babel'
      }]
    },
    resolve: {
      extensions: ['', '.js', '.jsx']
    },
    output: {
      path: __dirname + '/public/dist',
      publicPath: '/',
      filename: 'bundle.js'
    },
    devServer: {
      contentBase: './public/',
      hot: true
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  });
}();
