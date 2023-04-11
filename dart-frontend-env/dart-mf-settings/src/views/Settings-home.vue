<template>
  <v-row>
    <v-col cols="12">
      <AccountSettings :user="user"/>
    </v-col>
  </v-row>
  
</template>
<script>
import AccountSettings from '@/components/Settings/Settings-home.vue'
import { getCachedItem, state$ } from '@app/app-api'

export default {
  name: "User-settings",
  components: {
    AccountSettings
  },
   data: () => ({
    subscription: '',
    user: {}
  }),
  watch: {
    subscription: function(nVal) {
      if (nVal === 'logout') this.redirect()
    }
  },
  methods: {
    authenticate: function() {
      if (sessionStorage.getItem('user') === null) {
        this.redirect()
        return;
      }
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
    this.authenticate()
  }
}
</script>