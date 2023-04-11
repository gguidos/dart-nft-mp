<template>
  <v-row>
    <v-col cols="12">
      <SettingsProfile />
    </v-col>
  </v-row>
  
</template>
<script>
import SettingsProfile from '@/components/Settings/Settings-profile.vue'
import { getCachedItem, state$ } from '@app/app-api'

export default {
  components: {
    SettingsProfile
  },
   data: () => ({
    subscription: '',
  }),
  watch: {
    subscription: function(nVal) {
      if (nVal === 'logout') this.redirect()
    }
  },
  methods: {
    authenticate: function() {
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
