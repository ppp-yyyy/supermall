import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
import toast from "components/common/Toast"

Vue.config.productionTip = false

//安装toast插件
Vue.use(toast)

//两个无关的组件进行通信，可以使用事件总线，默认情况下$bus没有值
Vue.prototype.$bus = new Vue()

//解决移动端300ms延迟问题
FastClick.attach(document.body)

//图片懒加载
Vue.use(VueLazyLoad,{
  loading: require('./assets/img/common/placeholder.png')
})
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
