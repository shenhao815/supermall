import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";

import toast from 'components/common/toast'
import fastClick from 'fastclick'
import VueLazyload from "vue-lazyload";

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
// 安装toast插件
Vue.use(toast)

//解决移动端300ms延迟
fastClick.attach(document.body)

// 使用图片懒加载的插件
// 用此插件还需要将img标签的:src 改成 v-lazy (:src='imgUrl' -> v-lazy='imgUrl')
// Vue.use(VueLazyload)
Vue.use(VueLazyload,{
  loading: require('./assets/img/common/placeholder.png')
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
