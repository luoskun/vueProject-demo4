// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/reset.css'
import MyHttpServer from './plugins/http'
import moment from 'moment'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(MyHttpServer)

/* eslint-disable no-new */
// 全局过滤器-处理时间
Vue.filter('fmtdate', (v) => {
  return moment(v).format('YYYY-MM-DD')
})
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
