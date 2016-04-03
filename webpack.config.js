var webpack = require('webpack')

module.exports = {
  entry: {
    'main': __dirname + '/src/index.js',
  },
  output: {
    path: __dirname + '/build/',
    filename: '[name].js',
    // filename: 'main.js',
  },
  plugins: [
    new webpack.ProvidePlugin({
      // fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch',
      // riot: 'riot',
      // control: 'riotcontrol',
      $: 'npm-zepto',
      // Utils: __dirname + '/src/utils',
    }),
    // new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
    new webpack.optimize.UglifyJsPlugin({ 
      minimize: true, 
      mangle: true,
      output: { 
        comments: false, 
        ascii_only: true,
      },
    }),
  ],
  module: {
    preLoaders: [{ 
      test: /\.tag$/, 
      exclude: /node_modules/, 
      loader: 'riotjs-loader', 
      query: { type: 'es6', stage: 0} 
    }],
    loaders: [{ 
      test: /\.jsx?|\.tag$/, 
      exclude: [/bower_components/, /node_modules/],
      include: /src/, 
      loader: 'babel-loader', 
      query: { modules: 'common', stage: 0 } 
    }, { 
      test: /\.less$/, 
      loader: 'style!css!less!autoprefixer' 
    }, { 
      test: /\.css$/, 
      loader: 'style!css!autoprefixer' 
    }, {
      test: /\.(png|jpg|svg)$/, 
      loader: 'url-loader?limit=1000'
    }, {
      test: /\.scss$/,
      loader: 'style-loader!css-loader!autoprefixer-loader!sass-loader'
    }]
  },

  devServer: {
    contentBase: './build/',
    host: '0.0.0.0',
    port: 1337,
    hot: true,
    inline: true
  }
}
