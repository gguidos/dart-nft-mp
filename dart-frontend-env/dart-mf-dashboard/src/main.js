import Vue from 'vue';
import singleSpaVue from 'single-spa-vue';
import './set-public-path';
import App from './App.vue';
import vuetify from './plugins/vuetify'
import { BehaviorSubject } from 'rxjs'
import router from './router'

Vue.config.productionTip = false;

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    render(h) {
      return h(App, {
        
        props: {
          // single-spa props are available on the "this" object. Forward them to your component as needed.
          // https://single-spa.js.org/docs/building-applications#lifecycle-props
          // if you uncomment these, remember to add matching prop definitions for them in your App.vue file.
          /*
          name: this.name,
          mountParcel: this.mountParcel,
          singleSpa: this.singleSpa,
          */
         user: this.user
        },
      });
    },
    vuetify,
    router,
    BehaviorSubject
  },
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;