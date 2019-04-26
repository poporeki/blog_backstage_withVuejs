import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/router/home'
import Login from '@/router/login'
import BlankView from '@/views/blank'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      redirect: '/index'
    },
    Login,
    Home,
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "about" */ '@/views/About.vue')
    },
    {
      path: '/blank',
      name: '空白页',
      component: BlankView
    }
  ]
})