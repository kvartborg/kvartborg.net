const path = require('path')
const WorkboxPlugin = require('workbox-webpack-plugin')

const outputDev = {
  path: path.resolve('build'),
  publicPath: '/',
  filename: '[name].js'
}

const outputProduction = {
  path: path.resolve('build'),
  publicPath: '/',
  filename: '[name].[chunkhash].js'
}

module.exports = {
  entry: {
    main: path.resolve('./src/bootstrap.js'),
    // vendor: ['preact', 'preact-router', 'preact-markdown', 'preact-async-route', 'highlight.js'],
    sw: path.resolve('./src/service-worker.js'),
    shell: path.resolve('./src/shell.html')
  },
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
        test: /\.(jpe|jpg|png|woff|woff2|eot|ttf|svg|mp4)(\?.*$|$)/,
        loader: 'file-loader'
      }, {
        test: /\.(html)(\?.*$|$)/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new WorkboxPlugin.InjectManifest({
      swSrc: path.resolve('./src/service-worker.js'),
      swDest: path.resolve('./build/service-worker.js')
    })
  ],
  devtool: 'source-map'
}
