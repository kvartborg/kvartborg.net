const path = require('path')

const outputDev = {
  path: path.resolve('static/build'),
  publicPath: '/build/',
  filename: '[name].js'
}

const outputProduction = {
  path: path.resolve('static/build'),
  publicPath: '/build/',
  filename: '[name].[chunkhash].js'
}

module.exports = {
  entry: path.resolve('./src/bootstrap.js'),
  output: process.argv.includes('-p') ? outputProduction : outputDev,
  target: 'web',
  mode: 'development',
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.css'],
    alias: {
      components: path.resolve(__dirname, './src/components'),
      views: path.resolve(__dirname, './src/views')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      }, {
        test: /\.(jpe|jpg|woff|woff2|eot|ttf|svg)(\?.*$|$)/,
        loader: 'file-loader'
      }
    ]
  },
  devtool: 'source-map'
}
