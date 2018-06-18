var webpack = require("webpack"),
    fs = require('fs'),
    pkg = JSON.parse(fs.readFileSync('./package.json')),
    license;

license = fs.readFileSync('./LICENSE')
  .toString()
  .split(/\s+---\s+/, 1)[0];

module.exports = {
  mode: 'development',
  context: __dirname,
  entry: {
    basic: "./src/bundle",
    full: "./src/bundle-full"
  },
  output: {
    path: __dirname + "/dist",
    filename: "jquery.echoforms-[name].min.js"
  },
  module: {
    rules: [
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.less$/, loader: "style-loader!css-loader!less-loader" },
      { test: /\.coffee$/, loader: "coffee-loader" },
      { test: /\.(gif|png)$/, loader: "url-loader?limit=100000" },
    ]
  },
  devtool: '#sourcemap',
  externals: {
    "jquery": "jQuery",
    "window": "window"
  },
  resolve: {
    extensions: ['.js', '.json', '.coffee']
  },
  plugins: [
    // https://github.com/webpack/webpack/issues/6556
    new webpack.LoaderOptionsPlugin({ options: {} }),
    new webpack.BannerPlugin(license),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      "root.jQuery": "jquery"
    })
  ],
  performance: {
    hints: false
  }
};
