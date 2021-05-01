import Vue from 'vue'
import VueRouter from 'vue-router'
import { auth, db } from '@/utils/firebase'

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
    path: '/pvp-host/:roomId',
    name: 'PvpHostGame',
    component: () => import(/* webpackChunkName: "pvpHost" */ '../views/PvpHostGame.vue'),
    async beforeEnter(to) {
      const roomId = to.params.roomId
      console.log("TO", roomId)
      console.log("Current UID", auth.currentUser.uid)
      const doc = db.collection(`rooms/${roomId}/players`).doc(auth.currentUser.uid)
      await doc.set({ name: auth.currentUser.displayName }, { merge: true })
    },
    async beforeRouteLeave(to, from, next) {
      const doc = db.collection(`rooms/${this.roomId}/players`).doc(this.user.uid)
      await doc.set({ name: this.playerName })
      next()
    }
  },
  {
    path: '/pvp-guest/:roomId',
    name: 'PvpGuestGame',
    component: () => import(/*webpackChunkName: "pvpGuest" */ '../views/PvpGuestGame.vue')
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
