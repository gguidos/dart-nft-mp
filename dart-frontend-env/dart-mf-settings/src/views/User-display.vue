<template>
  <v-row style="margin: 0; padding: 0">
    <v-col cols="2">
      <v-row>
        <v-col cols="9"><SideMenu :items="items"/></v-col>
      </v-row>
      
    </v-col>
    <v-col cols="8">
     
      <router-view></router-view>
  
    </v-col>
  </v-row>
</template>
<script>
import SideMenu from '@/components/Menus/Side-menu.vue'
export default {
  components: {
    SideMenu
  },
  data: ()=> ({
    items: [],
    itemObj: {
      'settings': [
      { text: 'Home', icon: 'mdi-home', to: '/settings' },
      { text: 'Profile', icon: 'mdi-account', to: '/settings/profile' },
      { text: 'Wallets', icon: 'mdi-wallet', to: '/settings/wallet'},
      { text: 'Security', icon: 'mdi-shield-account', to: '/settings/security'},
      // { text: 'Starred', icon: 'mdi-star' },
      // { text: 'Recent', icon: 'mdi-history' },
      // { text: 'Offline', icon: 'mdi-check-circle' },
      // { text: 'Uploads', icon: 'mdi-upload' }
    ],
    'channel': [
      { text: 'Home', icon: 'mdi-home', to: '/channel' },
      { text: 'NFTs', icon: 'mdi-cassette', to: '/channel/nft' },
      { text: 'History', icon: 'mdi-clipboard-text-clock-outline', to: '/channel/history' }
    ]}
  }),
  watch: {
    '$route.path': {
      handler: function(path) {
        this.items = this.itemObj[path.split('/')[1]]
      }
    }
  },
  created: function() {
    this.items = this.itemObj[this.$route.path.split('/')[1]]
  }
}
</script>
