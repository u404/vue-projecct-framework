import Vue from 'vue'

import Router from 'vue-router'

import store from '../store'
import Index from '@/views/Index' // 命名chunk，内部注释是必须的

Vue.use(Router)

const partRouter = {
  path: '/',
  name: 'Part',
  component: Index,
  // beforeEnter: (to, from, next) => {
  //   store
  //     .dispatch('userCheckLogin')
  //     .then(() => {
  //       next()
  //     })
  //     .catch(() => {
  //     })
  // },
  children: [
    {
      path: '/ChildIndex',
      name: 'ChildIndex',
      component: Index
    }
  ]
}

const router = new Router({
  routes: [
    partRouter,
    {
      path: '/Index',
      name: 'Index',
      component: Index
    }
  ]
})

export default router
