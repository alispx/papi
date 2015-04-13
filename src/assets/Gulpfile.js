var gulp = require('gulp');
var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

function ember (f, p) {
    'use strict';

    var base   = '/src/assets/js/packages/';
    var libdir = '/lib/';
    var parts  = f.split('/');
    var file   = parts.pop();
    var first  = parts.shift();
    var path   = parts.join('/');

    if (!first) {
        first = file;
    }

    return (__dirname + base + first + libdir + (path.length ? path + '/' : '') + file).replace('//', '/');
}

// babel scripts
gulp.task('default', function () {
    browserify({
        entries: './js/main.js',
        debug: true
    })
    .transform(babelify.configure({
        resolveModuleSource: ember,
        sourceMapRelative: './src/assets/js/packages/'
    }))
    .bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('./dist/js'));
});

// old scripts
gulp.task('scripts', function() {
  return gulp.src(config.scripts.files)
    .pipe(concat(
      'main.min.js'
    ))
    .pipe(uglify())
    .pipe(header(banner, {
      package: pkg
    }))
    .pipe(gulp.dest(config.scripts.dest));
});

// behöver bygga ihop /src/assets/js/components/
// och lägga till det innan den ihop byggda babel filen