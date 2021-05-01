import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/horde',
    name: 'HordeGame',
    component: () => import(/* webpackChunkName: "game" */ '../views/HordeGame.vue')
  },
  {
<<<<<<< HEAD
    path: '/pvp-host',
    name: 'PvpHostGame',
    component: () => import(/* webpackChunkName: "pvpHost" */ '../views/PvpHostGame.vue')
=======
    path: '/pvp-host/:roomId',
    name: 'PvpHostGame',
    component: () => import(/* webpackChunkName: "pvpHost" */ '../views/PvpHostGame.vue')
  },
  {
    path: '/pvp-guest/:roomId',
    name: 'PvpGuestGame',
    component: () => import(/*webpackChunkName: "pvpGuest" */ '../views/PvpGuestGame.vue')
>>>>>>> a6ddd2d8c0e7efe488107321f9708075ecbf461a
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
