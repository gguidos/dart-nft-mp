<template>
  <v-card
    flat
    tile
    color="background"
    v-if="user"
  >
    <v-navigation-drawer permanent width="100%" color="background">
      <v-list>
        <v-list-item>
          <v-list-item-avatar size="100">
            <v-img v-if="pictureUrl" :src="pictureUrl"></v-img>
            <v-icon v-if="!pictureUrl" size="100">mdi-alien</v-icon>
          </v-list-item-avatar>
        </v-list-item>
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              {{ user.name }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ user.username }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="selectedItem"
          color="primary"
        >
        <router-link :to="item.to" style="text-decoration: none; color: inherit;"  v-for="(item, i) in items" :key="i">
          <v-list-item>
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          </router-link>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>
<script>

import { state$ } from '@app/app-api'

export default {
  data: () => ({
    selectedItem: 0,
    user: {},
    subscription: '',
    pictureUrl: ''
  }),
  props: {
    items: Array
  },
  watch: {
    '$route.path': {
      handler: function(path) {
        this.setSelectedItem(path)
      },
      immediate: true
    },
    subscription: function(nVal) {
      if (nVal === 'update') {
        this.user = JSON.parse(sessionStorage.getItem('user'))
        this.pictureUrl = this.user.pictureUrl
      }
    },
    immediate: true
  },
  mounted: function() {
    this.subscribe();
    this.user = JSON.parse(sessionStorage.getItem('user'))
    this.pictureUrl = this.user.pictureUrl
    const path = this.$route.path
    this.setSelectedItem(path)
  },
  methods: {
    subscribe: function() {
      state$.subscribe(data => {
        this.subscription = data
        
      })
    },
    setSelectedItem: function(path) {
      for (let i in this.items) {
        if (this.items[i].to === path) {
          this.selectedItem = typeof i === 'string' ? parseInt(i) : i
        }
      }
    }
  }
}
</script>
<style scoped>
 a { text-decoration: none !important}
</style>