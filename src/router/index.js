import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Index from '@/components/Index'
import info from '@/components/Info'
import log from '@/components/Log'
import adminLogin from '@/components/adminLogin'
import ClockIn from "@/components/ClockIn"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      meta:{
        isLogin:false
      }
    },
    {
      path:'/adminLogin',
      name:'adminLogin',
      component:adminLogin,
      meta:{
        isLogin:false
      }
    },
    {
      path: '/Index',
      name: 'Index',
      component: Index,
      children:[
        {
          path:'/info',
          component:info,
          meta:{
            isLogin:true
          }
        },
        {
          path:'/log',
          component:log,
          meta:{
            isLogin:true
          }
        },
        {
          path:'/ClockIn',
          component:ClockIn,
          meta:{
            isLogin:ClockIn
          }
        },
      ]
    }
  ]
})
