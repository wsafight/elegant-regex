const { src, series, dest } = require('gulp');
const gulpTs = require('gulp-typescript');


const tsProject = gulpTs.createProject('tsconfig.json');

function ts() {
  return src('src/**/*.ts')
    .pipe(tsProject())
    .pipe(dest('dist/'));

}

exports.ts = ts;

exports.default = series(ts);