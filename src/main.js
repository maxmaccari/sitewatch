import Vue from 'vue'
import App from './App.vue'
import store from './store'
import InlineSvg from 'vue-inline-svg'

Vue.config.productionTip = false
Vue.component('inline-svg', InlineSvg)

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
