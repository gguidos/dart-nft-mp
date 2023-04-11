import Vue from 'vue';
import VueRouter from "vue-router";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import ('../views/User/User-register.vue')
  },
  {
    path: '/confirm',
    name: 'ConfirmMail',
    component: () => import ('../views/Confirm-mail.vue')
  }
]

const router = new VueRouter({
  base: '/registration',
  mode: 'history',
  props: true,
  routes
});

export default router;
