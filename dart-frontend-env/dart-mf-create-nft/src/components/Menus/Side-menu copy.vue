<template>
  <v-card
    height="300"
    tile
  >
   <UserSideMenu v-if="$route.path.includes('settings')" />
  </v-card>
</template>

<script>
import UserSideMenu from '@/components/User/Side-menu.vue'
  export default {
    components: {
      UserSideMenu
    }
  }
</script>