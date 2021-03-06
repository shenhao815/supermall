const path = require('path');//引入path模块
function resolve(dir) {
  return path.join(__dirname, dir)//path.join(__dirname)设置绝对路径
}

module.exports = {
  lintOnSave: false, //禁用eslint
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('./src'))
      .set('components', resolve('./src/components'))
      .set('assets', resolve('./src/assets'))
      .set('common', resolve('./src/common'))
      .set('network', resolve('./src/network'))
      .set('views', resolve('./src/views'))
    //set第一个参数：设置的别名，第二个参数：设置的路径
  },

  devServer: {
    host: 'localhost',
    port: 8080,
    https: false,
    proxy: {
      '/why': {
        target: 'http://123.207.32.32:8000',
        changeOrigin: true,
        pathRewrite: {
          '^/why': ''
        }
      },
      'loc': {
        target: 'http://192.168.1.107:8888',
        changeOrigin: true,
        pathRewrite: {
          '^/loc': ''
        }
      }
    }
  }

}
