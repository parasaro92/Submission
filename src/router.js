import Vue from 'vue'
import Router from 'vue-router'
import Interview from './components/interview.vue'
import Details from './components/details.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'algo',
      component: Interview
    },
    {
      path: '/details',
      name: 'view',
      component: Details
    }
  ]
})