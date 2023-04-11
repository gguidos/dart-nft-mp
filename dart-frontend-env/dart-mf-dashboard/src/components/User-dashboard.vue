<template>
 
      <v-row class="justify-center">
        <v-col v-for="route in routes" :key="route.text">
      
          <v-card class="mx-auto pa-12" align="center">
          
               <v-card-text>
            <v-row align="center">
              <v-col cols="12">
                <v-icon x-large>{{ route.icon }}</v-icon>
              </v-col>
            </v-row>
            <v-row align="center">
        <v-col
          class="text-h4 text-uppercase"
          cols="12"
        >
          <p>{{ route.text }}</p>
        </v-col>
      </v-row>
          </v-card-text>
          </v-card>
        </v-col>
        
      
      </v-row>

</template>
<script>
import { routes } from '@app/app-api'

export default {
  name: "User-dashboard",
  data: () => ({
    routes: [],
    navItems: [],
    authenticated: false
  }),
  methods: {
    setRoutes: function () {
      this.routes = this.navItems.filter(item => item.text !== 'logout')
      this.routes.push({
          text: 'nft',
          icon: 'mdi-cassette',
          link: '/nft'
        })
    }
  },
   created: function() {
    if (localStorage.getItem('tokens')) this.authenticated = true
    this.navItems = routes;
  },
  mounted: function () {
    
    this.setRoutes()
  }
}
</script>
<style>
.box {
  padding: 40px;
}
</style>