module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 375,  //视框的宽度，对用的是我们设计稿的宽度
      viewportHeight: 667, //视框的高度，对应的是我们设计稿的高度（也可以不配置）
      unitPrecision: 5,   //指定“px”转换成的视窗单位，建议使用vw
      viewportUnit: 'vw',
      selectorBlackList: ['ignore', 'tab-bar', 'tab-bar-item'], //指定不需要转换的类
      minPixelValue: 1,  //小于或者等于‘1px’不转换为视窗单位
      mediaQuery: false,  //允许在媒体查询中转换‘px’
      exclude: [/TabBar/,]
    }
  }

}
