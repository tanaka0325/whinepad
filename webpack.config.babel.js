import path from 'path'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

module.exports = [
  {
    name: 'js',
    entry: path.join(__dirname, 'src', 'index.js'),
    output: {
      path: path.join(__dirname, 'build'),
      filename: 'bundle.js',
    },
    target: 'web',
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
  },
  {
    name: 'html',
    entry: path.join(__dirname, 'src', 'index.html'),
    output: {
      path: path.join(__dirname, 'build'),
      filename: 'index.html',
    },
    module: {
      loaders: [
        {
          test: /\.html$/,
          use: ExtractTextPlugin.extract('raw-loader')
        },
      ],
    },
    plugins: [
      new ExtractTextPlugin('index.html'),
    ],
  },
]
