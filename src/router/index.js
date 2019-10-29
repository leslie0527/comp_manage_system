import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Index from '@/components/Index'
import info from '@/components/Info'
import log from '@/components/Log'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Index',
      name: 'Index',
      component: Index,
      children:[
        {
          path:'/info',
          component:info
        },
        {
          path:'/log',
          component:log
        }
      ]
    }
  ]
})
