import Vue from 'vue';
import VueRouter from "vue-router";

Vue.use(VueRouter)

const routes = [
  {
    path: '/settings/home',
    name: 'settings-home',
    component: () => import ('@/views/Settings-home'),
    beforeEnter: (to, from, next) => {
      if (sessionStorage.getItem('user') === null) {
        next({ path: 'login'})
      } else {
        next()
      }
    },
  },
  {
    path: '/settings/profile',
    name: 'Settings-profile',
    component: () => import ('@/views/Settings-profile'),
    beforeEnter: (to, from, next) => {
      if (sessionStorage.getItem('user') === null) {
        next({ path: 'login'})
      } else {
        next()
      }
    },
  },
  {
    path: '/settings/wallet',
    name: 'Settings-wallet',
    component: () => import ('@/views/Settings-wallet'),
    beforeEnter: (to, from, next) => {
      if (sessionStorage.getItem('user') === null) {
        next({ path: 'login'})
      } else {
        next()
      }
    },
  }
]

const router = new VueRouter({
  base: '/',
  mode: 'history',
  props: true,
  routes
});

export default router;
