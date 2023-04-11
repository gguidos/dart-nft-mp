import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify)

const opts = {
  icons: {
    iconfont: 'mdi',
  },
  theme: { 
    themes: {
      dark: {
       primary: '#00FFFF',
       secondary: '#DAECEC',
       accent: '#82B1FF',
       error: '#FF5252',
       info: '#2196F3',
       success: '#4CAF50',
       warning: '#FFC107',
       background: '#121212'
     }
    },
    dark: true 
   }
}

export default new Vuetify(opts)
