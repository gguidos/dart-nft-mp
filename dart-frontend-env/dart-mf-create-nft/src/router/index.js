import Vue from 'vue';
import VueRouter from "vue-router";

Vue.use(VueRouter)

const routes = [
  {
    path: '/channel/',
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
    path: '/channel/nft/new',
    name: 'new-nft',
    component: () => import ('@/views/New-NFT'),
    beforeEnter: (to, from, next) => {
      if (sessionStorage.getItem('user') === null) {
        next({ path: 'login'})
      } else {
        next()
      }
    },
    
  },
  {
    path: '/channel/nft/view/:id',
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
