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
    route: '',
    items: [
      { text: 'Home', icon: 'mdi-home', to: '/channel' },
      { text: 'My NFTS', icon: 'mdi-account', to: '/channel/nfts' },
      { text: 'Broked NFTS', icon: 'mdi-account', to: '/channel/broked/nfts' },
    ],
  }),
  watch: {
    subscription: function(nVal) {
      if (nVal === 'logout') this.redirect()
    },
    $route: function(to, from) {
      if (to.path.includes('view/')) {
        const nftLinkItem = { 
          text: 'NFT',
          icon: 'mdi-home',
          to: '/channel/nft/view/' + to.params.id
        }
        this.items.push(nftLinkItem)

      } else {
        this.items = this.items.filter(item => item.text !== 'NFT')
      }
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
    this.route = this.$route.path;
  }
}
</script>
