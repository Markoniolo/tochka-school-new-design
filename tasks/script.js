// yarn add -D webpack-stream @babel/core @babel/preset-env babel-loader
const { src, dest, series } = require('gulp')
const concat = require('gulp-concat')

const env = require('./env')
const { browserSync } = require('./browserSync')

const path = {
  components: 'assets/scripts/components/*.js',
  watch: 'assets/scripts/components/*.js'
}

const script = function () {
  if (env.production) {
    return src(path.components)
      .pipe(concat('main.js'))
      .pipe(dest(`${env.outputFolder}/${env.staticFolder}/js`))
  }
  return src(path.components)
  .pipe(concat('main.js'))
  .pipe(dest(`${env.outputFolder}/${env.staticFolder}/js`))
  .on('end', browserSync.reload)
}

module.exports = {
  build: series(script),
  path
}
