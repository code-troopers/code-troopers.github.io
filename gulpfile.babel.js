import BrowserSync from 'browser-sync';
import cp from 'child_process';
import gulp from 'gulp';
import gutil from 'gulp-util';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack.conf';

const hugoBin = 'hugo';
const defaultArgs = ['-d', 'dist', '--config', 'config.yml', '-v', '-t', 'code-troopers'];

const browserSync = BrowserSync.create();

gulp.task('hugo', (cb) => buildSite(cb));
gulp.task('hugo-hot', (cb) => buildSite(cb, null, { WEBPACK_HOT: true }));
gulp.task('hugo-preview', (cb) => buildSite(cb, ['--buildDrafts', '--buildFuture']));

gulp.task('build', ['clean', 'js', 'hugo']);
gulp.task('build-preview', ['clean', 'js', 'hugo-preview']);

gulp.task('clean', () => {
  return cp.spawn('rm', ['-rf', 'dist']);
});

gulp.task('js', (cb) => {
  webpack(webpackConfig(), (err, stats) => {
    if (err) throw new gutil.PluginError('webpack', err);
    gutil.log('[webpack]', stats.toString({
      colors: true,
      progress: true
    }));
    cb();
  });
});

gulp.task('serve-prod', ['clean', 'hugo', 'js'], () => {
  browserSync.init({
    notify: false,
    open: false,
    server: {
      baseDir: './dist'
    }
  });
});

gulp.task('serve-dev', ['clean', 'hugo'], () => {
  const compiler = webpack(webpackConfig(true));
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

function buildSite(cb, options, env = null) {
  const args = options ? defaultArgs.concat(options) : defaultArgs;
  const nodeEnv = env && Object.assign({ PATH: '/usr/local/bin' }, env);

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
