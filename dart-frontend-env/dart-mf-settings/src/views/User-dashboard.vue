<template>
  <v-app>
    <v-main>
      <Dashboard />
    </v-main>
  </v-app>
</template>

<script>
import Dashboard from '@/components/User-dashboard'
import { state$, getCachedItem } from '@app/app-api'

export default {
  name: 'Dashboard-home',
  data: () => ({
    subscription: ''
  }),
  watch: {
    subscription: function(nVal) {
      if (nVal === 'logout') this.redirect()
    }
  },
  components: {
   Dashboard
  },
  methods: {
    authenticate: function() {
      if (getCachedItem({itemName: 'user'}) === null) {
        this.redirect()
        return
      }
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

