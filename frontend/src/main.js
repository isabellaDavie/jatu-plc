import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
// import '@fortawesome/Fontawesome-svg-core'
// import '@fortawesome/free-solid-svg-icons'
// import '@fortawesome/vue-fontawesome'

Vue.filter('dateFormat', function (value) {
  let s = new Date(value)
  s = s.toString().split(' ')
  let date = `${s[0]} ${s[1]} ${s[2]} ${s[3]}`
  return date
})


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
