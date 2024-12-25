const { src, dest, series } = require('gulp')
const concat = require('gulp-concat');
const env = require('./env')
const { browserSync } = require('./browserSync')

const path = 'assets/scripts/libs/*.js'
const pathJquery = 'assets/scripts/jquery-3.4.0.min.js'

const scriptLibs = function () {
  if (env.production) {
    return src(path)
      .pipe(concat('libs.js'))
      .pipe(dest(`${env.outputFolder}/${env.staticFolder}/js`))
  }
  return src(path)
    .pipe(concat('libs.js'))
    .pipe(dest(`${env.outputFolder}/${env.staticFolder}/js`))
    .on('end', browserSync.reload)
}

const scriptJquery = function () {
  return src(pathJquery)
    .pipe(dest(`${env.outputFolder}/${env.staticFolder}/js`))
}

module.exports = {
  build: series(scriptLibs, scriptJquery),
  path
}
