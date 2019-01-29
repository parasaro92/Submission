import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VeeValidate from 'vee-validate'
import './plugins/vuetify'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
export const eventBus = new Vue()
Vue.use(VeeValidate)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
