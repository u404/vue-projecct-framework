var path = require('path')
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  loader: 'sass-resources-loader',
  options: {
    resources: [
      resolve('src/assets/styles/define.scss')
    ]
  }
}