import 'process';
import BrowserSync from 'browser-sync';
import cp from 'child_process';
import gulp from 'gulp';
import gutil from 'gulp-util';
import del from 'del';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack.conf';
import webpackDevConfig from './webpack.conf.dev';

const hugoBin = 'hugo';
const defaultArgs = ['-d', '.tmp', '--config', 'config.yml', '-v', '-t', 'code-troopers'];

const browserSync = BrowserSync.create();

gulp.task('build', ['js']);

gulp.task('serve-prod', ['build'], () => {
  browserSync.init({
    notify: false,
    open: false,
    server: {
      baseDir: './dist'
    }
  });
});

gulp.task('serve-dev', ['hugo-dev'], () => {
  const compiler = webpack(webpackDevConfig(true));
  const webpackMiddleware = webpackDevMiddleware(compiler, {
    publicPath: '/',
    reporter: webpackReporter
  });

  browserSync.init({
    notify: false,
    open: false,
    server: {
      baseDir: './dist',
      middleware: [
        webpackMiddleware,
        webpackHotMiddleware(compiler)
      ]
    }
  });
  gulp.watch('./site/**/*', ['hugo', () => webpackMiddleware.invalidate()]);
});



gulp.task('hugo-dist', (cb) => buildSite(cb, ['-d', '.tmp']));
gulp.task('hugo-dev', ['clean'], (cb) => buildSite(cb, ['-d', 'dist', '--buildDrafts', '--buildFuture'], { WEBPACK_HOT: true }));

gulp.task('clean', () => {
  return del(['dist/**', '.tmp/**']);
});

gulp.task('js', ['hugo-dist'], (cb) => {
  webpack(webpackConfig(), (err, stats) => {
    if (err) throw new gutil.PluginError('webpack', err);
    gutil.log('[webpack]', stats.toString({
      colors: true,
      progress: true
    }));
    cb();
  });
});


function buildSite(cb, options, env = null) {
  const args = options ? defaultArgs.concat(options) : defaultArgs;
  const nodeEnv = env && Object.assign({}, process.env, env);
  return cp.spawn(hugoBin, args, { stdio: 'inherit', env: nodeEnv }).on('close', (code) => {
    if (code === 0) {
      browserSync.reload();
      cb();
    } else {
      browserSync.notify('Hugo build failed :(');
      cb('Hugo build failed');
    }
  });
}
function webpackReporter(evt) {
  const statsOptions = {
    colors: true,
    progress: true
  };
  if (evt.state) {
    if (evt.stats.hasErrors()) {
      gutil.log('[webpack]', 'Failed to compile.');
    } else if (evt.stats.hasWarnings()) {
      gutil.log('[webpack]', 'Compiled with warnings.');
    }
    gutil.log('[webpack]', evt.stats.toString(statsOptions));
  } else {
    gutil.log('[webpack]', 'Compiling...');
  }
}
