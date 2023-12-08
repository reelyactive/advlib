const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: "./src/index.js",
  resolve: {
    fallback: { buffer: require.resolve('buffer/') }
  },
  plugins: [
    new webpack.ProvidePlugin({ Buffer: ['buffer', 'Buffer'] })
  ],
  output: {
    filename: "advlib.min.js",
    library: "advlib",
    path: path.resolve(__dirname, 'js')
  }
}