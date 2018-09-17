
import "babel-polyfill";
import Vue from 'vue'
import App from './App'
import router from './router'
import * as filters from './filters'
import ElementUI from 'element-ui'





import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/iconfont.css'
import '@/common/css/common.css'

Vue.config.productionTip = false;

Vue.use(ElementUI)

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

export default new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

