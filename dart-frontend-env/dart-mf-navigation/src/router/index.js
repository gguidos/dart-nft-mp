import Vue from 'vue';
import VueRouter from "vue-router";

Vue.use(VueRouter)

const routes = []

const router = new VueRouter({
  base: '/',
  mode: 'history',
  props: true,
  routes
});

export default router;
