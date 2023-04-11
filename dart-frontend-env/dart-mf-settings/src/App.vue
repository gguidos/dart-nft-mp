<template>
<v-app>
  <v-row style="margin: 0; padding: 0">
    <v-col cols="2">
      <v-row>
        <v-col cols="12"><SideMenu :items="items" :user="user"/></v-col>
      </v-row>
    </v-col>
    <v-col cols="8">

      <router-view></router-view>
 
    </v-col>
  </v-row>
</v-app>
</template>
<script>
import SideMenu from '@/components/Menus/Side-menu.vue'
import { state$ } from '@app/app-api'
export default {
  components: {
    SideMenu
  },
  data: () => ({
    user: {},
    items: [{ text: 'Home', icon: 'mdi-home', to: '/settings/home' },
      { text: 'Profile', icon: 'mdi-account', to: '/settings/profile' },
      { text: 'Wallets', icon: 'mdi-wallet', to: '/settings/wallet'},
      { text: 'Security', icon: 'mdi-shield-account', to: '/settings/security'}],
  }),
  watch: {
    subscription: function(nVal) {
      if (nVal === 'logout') this.redirect()
    }
  },
  methods: {
    authenticate: function() {
      this.user = JSON.parse(sessionStorage.getItem('user'))
      state$.subscribe(data => {
          this.subscription = data
        })
    },
    redirect: function() {
      this.$router.push('/login')
    }
  },
  created: function() {
    this.authenticate();
  }
}
</script>
