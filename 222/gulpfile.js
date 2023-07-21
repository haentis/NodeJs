const gulp = require('gulp');
const watch = require('gulp-watch');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const autoprefixer = require('gulp-autoprefixer');
const webpack = require('webpack-stream');

const paths = {
  src: {
    js: 'src/js/**/*.js',
    html: 'src/**/*.html',
    css: 'src/css/**/*.css',
  },
  dist: {
    js: 'dist/js',
    html: 'dist',
    css: 'dist/css',
  },
};

function js() {
  return gulp
    .src(paths.src.js)
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(uglify())
    .pipe(gulp.dest(paths.dist.js));
}


function html() {
  return gulp
    .src(paths.src.html)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(paths.dist.html));
}


function css() {
  return gulp
    .src(paths.src.css)
    .pipe(autoprefixer())
    .pipe(gulp.dest(paths.dist.css));
}

function watchFiles() {
  gulp.watch(paths.src.js, js);
  gulp.watch(paths.src.html, html);
  gulp.watch(paths.src.css, css);
}

exports.default = gulp.series(gulp.parallel(js, html, css), watchFiles);
