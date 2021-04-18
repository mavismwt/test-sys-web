// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
//import './themes/element-dark/index.css'

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.HOST = '/api'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,//路由配置
  store,//使用 Vuex 进行状态管理
  components: { App },
  template: '<App/>'
})
