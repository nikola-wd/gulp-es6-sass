'use strict';

const gulp = require('gulp');

const concat = require('gulp-concat');
const eslint = require('gulp-eslint');
const babel = require('gulp-babel');

const sass = require('gulp-sass');

/* ES/JS Tasks */

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
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('scripts', [
  'eslint',
  'babel'
]);

/* SASS/CSS Tasks */

gulp.task('sass', () => {
  return gulp.src('./app/styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css/'));
});

/* Gulp Tasks */

gulp.task('default', [
  'scripts',
  'sass'
]);

gulp.task('watch', [
  'scripts'
]);
