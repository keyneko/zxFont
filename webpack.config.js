var webpack = require('webpack')

module.exports = {
  entry: {
    'demo': __dirname + '/src/index.js',
    'vendors': [
      'npm-zepto',
    ]
  },
  output: {
    path: __dirname + '/build/',
    filename: '[name].js',
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'npm-zepto',
    }),
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
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
