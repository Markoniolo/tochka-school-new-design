const { src, dest, series } = require('gulp')
const env = require('./env')

const path = 'assets/fonts/*.*'

function fonts () {
  if (env.production) {
    return src(path)
      .pipe(dest(`${env.outputFolder}/${env.staticFolder}/fonts`))
  }
  return src(path)
    .pipe(dest(`${env.outputFolder}/${env.staticFolder}/fonts`))
}

module.exports = {
  build: series(fonts)
}
