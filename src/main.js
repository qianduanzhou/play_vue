import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import VueQuillEditor from 'vue-quill-editor'


import '@/icons' // icon
// import '@/permission' // permission control

Vue.use(ElementUI, { locale })
Vue.use(VueQuillEditor)
Vue.config.productionTip = false

console.log('Vue',Vue.prototype)
Vue.prototype.Message = function(type,msg) {
  Vue.prototype.$message({
    type: type,
    message: msg
  })
}

const vue = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

export default vue
