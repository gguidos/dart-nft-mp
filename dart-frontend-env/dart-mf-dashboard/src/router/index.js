import Vue from 'vue';
import VueRouter from "vue-router";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'new-nft',
    component: () => import ('@/views/Home'),
    beforeEnter: (to, from, next) => {
      if (sessionStorage.getItem('user') === null) {
        next({ path: 'login'})
      } else {
        next()
      }
    },
  },
  {
    path: '/view/:id',
    name: 'view-nft',
    component: () => import ('@/views/NFT'),
    beforeEnter: (to, from, next) => {
      if (sessionStorage.getItem('user') === null) {
        next({ path: 'login'})
      } else {
        next()
      }
    }
  }
]

const router = new VueRouter({
  base: '/',
  mode: 'history',
  props: true,
  routes
});

export default router;
