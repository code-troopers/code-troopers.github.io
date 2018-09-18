import webpack from 'webpack';
import glob from 'glob';
import path from 'path';
import postCSS from './config/postcss';
import cssNano from './config/cssnano';
import fs from 'fs-extra';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import ManifestPlugin from 'webpack-manifest-plugin';
import ManifestReplacePlugin from 'webpack-manifest-replace-plugin';
import EventHooksPlugin from 'event-hooks-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import SuppressChunksPlugin from 'suppress-chunks-webpack-plugin';

export default function() {
  const optimizePlugins = [
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin('styles.[hash:4].css'),
    new ManifestPlugin(),
    new ManifestReplacePlugin({
      basedir: path.resolve(__dirname, 'dist'),
      src: '**/*.html',
      manifestFilename: 'manifest.json'
    }),
    new SuppressChunksPlugin(['img', 'html'])
  ];
  const cssLoaders = [
    { loader: 'css-loader', options: Object.assign({ minimize: {discardComments: { removeAll: true }}, sourceMap: true }, cssNano) },
    { loader: 'postcss-loader', options: Object.assign({ sourceMap: true }, postCSS) },
    { loader: 'resolve-url-loader', options: { sourceMap: true } },
    { loader: 'sass-loader', options: { sourceMap: true } }
  ];
  return {
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.(gif|png|jpe?g)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 6144,
                fallback: 'file-loader',
                name: '[path][name].[hash:4].[ext]'
              }
            }
          ]
        },
        {
          test: /\.((svg)|(mp4)|(webm))(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'file-loader?name=[path][name].[hash:4].[ext]'
        },
        {
          test: /\.((eot)|(woff)|(woff2)|(ttf))(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'file-loader?name=[name].[hash:4].[ext]'
        },
        {
          test: /\.json$/,
          loader: 'json-loader'
        },
        {
          test: /\.js?$/,
          exclude:  /node_modules\/(?!(dom7|swiper)\/).*/,
          loaders: [
            'babel-loader'
          ]
        },
        {
          test: /\.html$/,
          loader:  'file-loader?name=[path][name].[ext]!lozad-loader!extract-loader!html-loader?attrs[]=:data-src&attrs[]=img:src'
        },
        {
          test: /\.(scss|sass)?$/,
          use: ExtractTextPlugin.extract({ use: cssLoaders })
        }
      ]
    },
    context: path.join(__dirname, '.tmp'),
    entry: function() { //eslint-disable-line object-shorthand
      const js = ['./js/app.js'];
      const img = glob.sync('./img/**/*', {
        absolute: true,
        cwd: this.context,
        matchBase: true,
        nodir: true,
        nosort: true
      });
      const postsImg = glob.sync('./images/**/*', {
        absolute: true,
        cwd: this.context,
        matchBase: true,
        nodir: true,
        nosort: true
      });
      const html = glob.sync('./**/*.html', {
        absolute: true,
        cwd: this.context,
        matchBase: true,
        nodir: true,
        nosort: true
      });
      return {
        main: [...js],
        img: [...img, ...postsImg],
        html: [...html],
        blog: './js/blog.js'
      };
    },
    output: {
      path: path.join(__dirname, './dist'),
      publicPath: '/',
      filename: '[name].[chunkhash:6].js',
    },
    plugins: [
      new EventHooksPlugin({
        'before-run': (compilation, done) => {
          fs.copy('src', '.tmp', done);
        }
      }),
      new CopyWebpackPlugin([
        {
          from: 'index.xml',
          to: '../dist/index.xml'
        },
        {
            from: 'sitemap.xml',
            to: '../dist/sitemap.xml'
        },
        {
          from: 'favicon.ico',
          to: '../dist/favicon.ico'
        },
        {
          from: '.nojekyll',
          to: '../dist/'
        },
        {
          from: 'audio',
          to: '../dist/audio'
        },
        {
          from: 'files',
          to: '../dist/files'
        },
        {
          from: 'videos',
          to: '../dist/videos'
        },
      ]),
      new webpack.ProvidePlugin({
        fetch: 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
      }),
      ...optimizePlugins
    ],
    resolve: {
      modules: [
        path.resolve('src'),
        'node_modules'
      ]
    },
    resolveLoader: {
      modules: ['node_modules', path.resolve(__dirname, 'loaders')]
    }
  };
}
