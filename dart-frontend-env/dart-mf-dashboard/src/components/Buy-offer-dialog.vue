<template>
  <v-card color="#363636" tile>
    <v-card-title>
      <span class="text-h5">Buy offer</span>
    </v-card-title>
    <v-container>
      <v-row
        class="fill-height"
        align-content="center"
        align="center"
        justify="center"
        v-if="(error || success) && !thinking">
        <v-alert
          v-if="success"
          type="success"
          dark
          prominent>
          Bid placed successfuly!
        </v-alert>
        <v-alert
          v-if="error"
          type="error"
          dark
          prominent>
          Something went wrong...
        </v-alert>
      </v-row>
      <v-row
        class="fill-height"
        align-content="center"
        justify="center"
        v-if="thinking && !success">
        <v-col
          class="text-subtitle-1 text-center"
          cols="12">
          <v-list>
            <v-list-item v-for="msg in logMsgs" :key="msg">
              {{ msg }}
            </v-list-item>
          </v-list>
          <v-progress-linear
            color="deep-purple accent-4"
            indeterminate
            rounded
            height="6"
            v-if="!error && !success"
          ></v-progress-linear>
        </v-col>
      </v-row>
      <v-card-text v-if="!thinking && !success && !error">
        <v-container>
          <v-row
          align-content="center"
          justify="center">
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
              <v-slider
                class="my-4"
                v-model="amount"
                label="Bid amount"
                min="0"
                step="1"
                thumb-label
                ticks
                hint="How many XRP?"
                persistent-hint
              ></v-slider>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-container>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
      color="blue darken-1"
      text
      @click="close()">
        Close
      </v-btn>
      <v-btn
      v-if="!thinking && !success && !error"
      color="blue darken-1"
      text
      @click="save()">
        Place bid
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { io } from 'socket.io'

export default {
  data: () => ({
    thinking: false,
    success: false,
    error: false,
    logMsgs: [],
    amount: 0,
    seed: 'sEdVDyzorh9hR4kRvoufpDvAoSTfa4K',
    expiration: 0,
    endDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
  }),
  props: {
    NFTokenID: String
  },
  methods: {
    save: function () {
      try {
        this.thinking = true
        const requestData = { 
          token: sessionStorage.getItem('accessToken'),
          params: { 
            NFTokenID: this.NFTokenID,
            seed: this.seed,
            amount: this.amount.toString()
          },
        }

        this.socket = io(
          'http://localhost:4005/ws/ripple-account',
          { reconnection: false}
        )

        this.socket.on('connect', data => console.log(this.socket.id))
        this.socket.on("connect_error", (err) => {
          console.log(`server unavailable`);
        });
        
        this.socket.emit('createBuyOffer', requestData)

        this.socket.on('log', data => {
          const res = data.data
          this.logMsgs.push(res)
        })
        this.socket.on('buy_offer', data => {
          const res = data.data
          this.thinking = false;
          this.success = true;
          this.socket.disconnect()
        })
        this.socket.on('error', err => {
          this.error = false
          this.thinking = false
          this.socket.disconnect()

        })
      } catch (error) {
        console.log(error)
      }
    },
    close: function() {
      this.$forceUpdate();
      this.$emit('closeDialog')
    }
  }
}
</script>