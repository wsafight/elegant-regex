const {src, series, dest} = require('gulp');
const gulpTs = require('gulp-typescript');
const exec = require('gulp-exec');
const rename = require('gulp-rename')
const execSync = require('child_process').execSync;

function execJs() {
  var options = {
    continueOnError: false, // default = false, true means don't emit error event
    pipeStdout: false, // default = false, true means stdout is written to file.contents
  };
  var reportOptions = {
    err: true, // default = true, false means don't write err
    stderr: true, // default = true, false means don't write stderr
    stdout: true // default = true, false means don't write stdout
  };
  return src('dist/**/*.ms')
    .pipe(exec(file => `node ${file.path}`, options))
    .pipe(exec.reporter(reportOptions))
}

const tsProject = gulpTs.createProject('tsconfig.json');

function ts() {
  return src('src/**/*.ts')
    .pipe(tsProject())
    .pipe(dest('dist/'));
}

function renameMjs() {
  return src('dist/**/*.js')
    .pipe(rename(function (path) {
      path.extname = ".mjs";
    }))
    .pipe(dest('dist/'));
}

exports.ts = ts;
exports.renameMjs = renameMjs
exports.execJs = execJs

exports.default = series(ts, renameMjs,execJs);