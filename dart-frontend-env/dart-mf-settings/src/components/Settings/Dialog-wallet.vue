<template>
  <v-card color="#363636" tile>
      <v-card-title>
        <span class="text-h5">My Wallet</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col
              cols="12"
              sm="12"
              md="12"
            >
              <v-text-field
                v-model= "xrpWallet"
                label="Add an XRP Wallet address"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
        <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue darken-1"
          text
          @click="close()"
        >
          Close
        </v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click="save()"
        >
          Save
        </v-btn>
      </v-card-actions>
  </v-card>
</template>
<script>
import { update } from '@app/app-api'

export default {
  data: () => ({
    xrpWallet: ''
  }),
  props: {
    user: Object
  },
  mounted: function() {
    this.xrpWallet = this.user.xrpWallet
  },
  methods: {
    close: function() {
      this.$emit('close', false)
    },
    save: function() {
      const url = process.env.VUE_APP_API_URL ?
        process.env.VUE_APP_API_URL + process.env.VUE_APP_UPDATE_USER_PATH :
        process.env.VUE_APP_UPDATE_USER_PATH
      const data = {
        role: 'user',
        NFTTokenMinter: '',
        xrpWallet: this.xrpWallet
      }
      update(url, data)
      .then(res =>  this.$emit('saved'))
      .catch(err => console.log(err))
    }
  }
}
</script>