import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/RegisterPage.vue')
  },
  {
    path: '/auth',
    component: () => import(/* webpackChunkName: "about" */ '../views/AuthPage.vue')
  },
  {
    path: '/goods',
    component: () => import(/* webpackChunkName: "about" */ '../views/GoodsPage.vue')
  },
  {
    path: '/cards',
    component: () => import(/* webpackChunkName: "about" */ '../views/CardsPage.vue')
  },
  {
    path: '/all',
    component: () => import(/* webpackChunkName: "about" */ '../views/AllPage.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
