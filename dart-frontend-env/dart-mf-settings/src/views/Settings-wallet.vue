<template>
  <v-row>
    <v-col cols="12">
      <SettingsWallet />
    </v-col>
  </v-row>
  
</template>
<script>
import SettingsWallet from '@/components/Settings/Settings-wallet.vue'
export default {
  components: {
    SettingsWallet
  }
}
</script>