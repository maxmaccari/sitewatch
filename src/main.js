import Vue from 'vue'
import App from './App.vue'
import store from './store'
import InlineSvg from 'vue-inline-svg'

Vue.config.productionTip = false

/* To use the svg icons and to be able to style then using css */
Vue.component('inline-svg', InlineSvg)

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
