# gulp-es6-sass

Front-end boilerplate with ES6 and Sass support.

## Tasks

- `gulp` - run necessary tasks for production deployment.
- `gulp --dev` - build a more verbose output of dist for debugging.
- `gulp watch` - watch app files for changes and run associated tasks.

## Important

When building, the gulp copy task will copy anything new inside `./app/` to `./dist/`. If there is a new file or directory you do not want to copy, simply add the path to the `copyPaths` array in the gulpfile.
