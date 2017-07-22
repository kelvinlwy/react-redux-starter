let path = require('path');
let webpack = require('webpack');
let WebpackDevServer = require('webpack-dev-server');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin')
let env = process.env.NODE_ENV || 'development';
let plugins = [];
let outputPath = path.join(__dirname, 'dist');

// from localhost to 0.0.0.0 to allow access from same WiFi network
let host = "0.0.0.0";
let port = "9000";

if (env === 'production') {

  plugins.push(
    // Always expose NODE_ENV to webpack, you can now use `process.env.NODE_ENV`
    // inside your code for any environment checks
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        ASSET_PATH: '/assets'
      }
    }),
    // UglifyJS will automatically drop any unreachable code.
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      beautify: false,
      comments: false,
      compress: {
        warnings: false,
        drop_console: true,
        screw_ie8: true
      },
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      output: {
        comments: false,
        screw_ie8: true
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }));
} else {
  plugins.push(new webpack.HotModuleReplacementPlugin());
}

plugins.push(
  new ExtractTextPlugin({
    filename: (getPath) => {
      return getPath('css/style.css');
    },
    allChunks: true
  }),
  new CleanWebpackPlugin(['dist/css', 'dist/hot', 'dist/js'], {
    root: __dirname,
    verbose: true,
    dry: false
  })
);

let config = {
  devtool: 'source-map',
  devServer: {
    contentBase: './dist'
  },
  entry: {
    app: env === 'production' ?
      [
        'babel-polyfill',
        path.join(__dirname, 'src/index.jsx'),
      ] :
      [
        `webpack-dev-server/client?http://localhost:${port}`,
        // bundle the client for webpack-dev-server
        // and connect to the provided endpoint
        'webpack/hot/only-dev-server',
        // bundle the client for hot reloading
        // only- means to only hot reload for successful updates
        'babel-polyfill',
        'react-hot-loader/patch',
        path.join(__dirname, 'src/index.jsx'),
      ]
  },
  output: {
    path: outputPath,
    publicPath: '/',
    filename: 'js/[name].js',
    hotUpdateChunkFilename: 'hot/hot-update.js',
    hotUpdateMainFilename: 'hot/hot-update.json'
  },
  plugins: plugins,
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ]
      },
      { // regular css files
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      { // sass / scss loader for webpack
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          //resolve-url-loader may be chained before sass-loader if necessary
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/i,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /.json$/,
        use: [
          'json-loader'
        ]
      },
      {
        test: /(\.jsx|\.js)$/,
        enforce: 'pre',
        exclude: /node_modules/,
        use: [
          {
            loader: 'eslint-loader',
            options: {
              failOnWarning: false,
              failOnError: true
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg|woff|woff2|eot|ttf)$/i,
        use: [
          'url-loader'
        ]
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.json']
  },
};

if (env === 'development') {
  let compiler = webpack(config);

  new WebpackDevServer(compiler, {
    contentBase: outputPath,
    hot: true,
    // enable HMR on the server
    quiet: true,
    lazy: false,
    historyApiFallback: {
      index: '/'
    },
    stats: {
      colors: true
    }
  }).listen(port, host, function (err) {
    if (err) {
      console.log(err);
    }
  });
}

module.exports = config;
