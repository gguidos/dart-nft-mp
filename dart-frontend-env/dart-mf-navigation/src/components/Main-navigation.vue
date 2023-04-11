<template>
  <v-app-bar
      app
      color="background"
      style="border-bottom: 1px solid #4BBABE !important; height: 75px"
      dark
  >
    <v-toolbar-title class="mr-4">
      <v-img
        max-width="70px"
        style="margin-top: 5px"
        src="@/assets/darttrader-sm.png"
      ></v-img>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <div v-if="this.authenticated">
    <v-btn
    icon
    v-if="user.NFTTokenMinter"
    @click="redirect('/channel/nft/new')">
        <v-icon dark size="20">mdi-radio</v-icon>
    </v-btn>
       <v-menu
        left
        bottom
        min-width="140px"
      >

    <template v-slot:activator="{ on }" >
      <v-btn
        icon
        v-on="on"
      >
        <v-list-item-avatar size="40" v-if="Object.keys(user)">
          <v-img v-if="pictureUrl" :src="pictureUrl" max-width="50px"></v-img>
          <v-icon dark v-if="!pictureUrl" size="40">mdi-alien</v-icon>
        </v-list-item-avatar>

      </v-btn>
    </template>
        <v-list
          dense
        >
          <v-list-item v-for="navItem in routes" :key="navItem.text" @click="invokeMethod(navItem.action, navItem.anchor)">
            <v-btn icon>
              <v-icon>{{ navItem.icon }}</v-icon>
            </v-btn>
              <v-list-item-content>
                  <v-list-item-title>{{ navItem.text }}</v-list-item-title>
              </v-list-item-content>
          </v-list-item>
        </v-list>
    </v-menu>
    </div>
  </v-app-bar>
</template>
<script>
import { state$, clearCache } from '@app/app-api'

export default {
  name: "Main-nav",
  data: () => ({
    subscription: '',
    navItems: [],
    authenticated: false,
    user: {},
    pictureUrl: '',
    routes: [
      {
        text: "dashboard",
        icon: "mdi-home",
        anchor: "/",
        action: "redirect",
      },
      {
        text: "channel",
        icon: "mdi-radio",
        anchor: "/channel",
        action: "redirect",
      },
      {
        text: "settings",
        icon: "mdi-head",
        anchor: "/settings/home",
        action: "redirect",
      },
      {
        text: "logout",
        icon: "mdi-door",
        action: "logout",
      },
    ]
  }),
  watch: {
    subscription: function(nVal) {
      if (nVal === 'loggedIn') {
        this.authenticated = true
        
      }
     
      if (nVal === 'update') {
        this.user = JSON.parse(sessionStorage.getItem('user'))
        this.pictureUrl = this.user.pictureUrl
      }
    }
  },
  methods: {
    invokeMethod(methodName, anchor) {
        this[methodName](anchor);
    },
    loadData: function() {
      if (sessionStorage.getItem('user')) {
        this.authenticated = true
        this.user = JSON.parse(sessionStorage.getItem('user'))
        this.pictureUrl = this.user.pictureUrl
      }
      state$.subscribe(data => {
        this.subscription = data
      })
    },
    unSubscribe: function() {
      this.subscription.unsubscribe()
    },
    redirect: function(anchor) {
      this.$router.push(anchor)
    },
    settings: function() {
      this.$router.push('/settings/home')
    },
    logout: function() {
      this.authenticated = false
      clearCache()
      state$.next('logout')
    }
  },
  mounted: function() {
    this.loadData()
  },
}
</script>