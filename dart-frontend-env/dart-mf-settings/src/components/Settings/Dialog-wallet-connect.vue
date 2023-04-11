<template>

    <v-card color="#363636" tile >

      <v-card-title>
        <span class="text-h5">Connect My Wallet</span>
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
                v-model= "seed"
                label="Wallet Seed"
                :value="seed"
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
          @click="fillData()"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
</template>
<script>
import { io } from 'socket.io'
import { update } from '@app/app-api'

export default {
  data: () => ({
    seed: '',
    socket: {}
  }),
  methods: {
    close: function() {
    
      this.$emit('close', false)
    },
    fillData: async function () {
      this.socket = io('http://localhost:4000/ws/ripple-account')
      this.socket.emit('update_account_info', { seed: this.seed })
      this.socket.on('account', async data => {
        const res = data.data
        t
        this.save({ NFTTokenMinter: res.NFTokenMinter })
      })
    },
    save: async function(NFTTokenMinter) {
      const url = process.env.VUE_APP_API_URL ?
        process.env.VUE_APP_API_URL + process.env.VUE_APP_UPDATE_USER_PATH :
        process.env.VUE_APP_UPDATE_USER_PATH
      update(url, NFTTokenMinter)
      .then(() => this.$emit('saved'))
      .catch(err => console.log(err))
    },
  }
}
</script>