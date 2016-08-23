'use strict';

/**
 * Tasks:
 * gulp         run necessary tasks for production deployment
 * gulp --dev   build a more verbose output of dist for debugging
 * gulp watch   watch app files for changes and run associated tasks
 */

const gulp = require('gulp');

const gutil = require('gulp-util');
const concat = require('gulp-concat');
const eslint = require('gulp-eslint');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

const isProduction = !gutil.env.dev;

/**
 * ES/JS Tasks
 */

// Run ESLint on code.
gulp.task('eslint', () => {
  return gulp.src('./app/js/**')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

// Compile and concat ES6 to JS.
gulp.task('babel', () => {
  return gulp.src('./app/js/**')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(concat('app.js'))
    .pipe(isProduction ? uglify() : gutil.noop())
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('scripts', [
  'eslint',
  'babel'
]);

/**
 * SASS/CSS Tasks
 */

gulp.task('sass', () => {
  return gulp.src('./app/styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(isProduction ? cleanCSS() : gutil.noop())
    .pipe(gulp.dest('./dist/css/'));
});

/**
 * Copy Task
 */

const copyPaths = [
  '!./app/styles/',
  '!./app/styles/**',
  '!./app/js/',
  '!./app/js/**',
  './app/**'
];

gulp.task('copy', () => {
  return gulp.src(copyPaths)
    .pipe(gulp.dest('./dist/'));
});

/**
 * Gulp Tasks
 */

gulp.task('default', [
  'sass',
  'scripts',
  'copy'
]);

const changeEvent = (e) => {
  gutil.log('File', gutil.colors.cyan(e.path.replace(new RegExp('/.*(?=/app/)/'), '')), 'was', gutil.colors.magenta(e.type));
};

gulp.task('watch', () => {
  gulp.watch('./app/styles/**/*.scss', ['sass'], (e) => {
    changeEvent(e);
  });
  gulp.watch('./app/js/**/*.js', ['scripts'], (e) => {
    changeEvent(e);
  });
  gulp.watch(['./app/**/*.html', './app/images/**/*'], (e) => {
    changeEvent(e);
    gulp.src(e.path)
      .pipe(gulp.dest('./dist'));
    gutil.log('File', gutil.colors.cyan(e.path.replace(new RegExp('/.*(?=/app/)/'), '')), 'was', gutil.colors.magenta('copied'));
  });
});
