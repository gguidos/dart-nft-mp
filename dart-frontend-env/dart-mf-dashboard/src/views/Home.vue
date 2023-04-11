<template>
  <v-sheet
    class="mx-auto"
    elevation="0"
    max-width="1200"
  >
    <v-slide-group
      v-model="model"
      class="pa-4"
      active-class="success"
      show-arrows
    >
      <v-slide-item
        v-for="(nft,i) in nfts"
        :key="i"
        v-slot="{ active }"
      >
      <v-sheet outlined rounded class="border" >
        <v-card
          :color="active ? undefined : 'background primary'"
          class="ma-4 border"
          height="200"
          width="200"
          @click="$router.push({ path: '/view/' + nft.NFTokenID })"
        >
          <v-row
          class="ma-4"
            align="center"
            justify="center"
          >
            <h2>{{ nft.title }}</h2>
          </v-row>
          <v-row
            align="center"
            justify="center">
            <img :src="nft.imgSrc" width="40%"/>
          </v-row>
        </v-card>
      </v-sheet>
      </v-slide-item>
    </v-slide-group>
  </v-sheet>
</template>
<script>
import { io } from 'socket.io'
import { state$ } from '@app/app-api'

export default {
  name: 'Channel-home',
  data: () => ({
    socketUrl: 'http://localhost:4005/ws/ripple-account',
    model: null,
    nfts: []
  }),
  created: function() {
    this.getData()
    state$.subscribe(data => {
      this.subscription = data
    })
  },
  subscription: function(nVal) {
    if (nVal === 'logout') this.redirect()
  },
  methods:{
    redirect: function() {
      this.$router.push('/login')
    },
    getData: function () {
      try {
        const requestData = { 
          token: sessionStorage.getItem('accessToken')
        }
        this.socket = io(
          this.socketUrl,
          { reconnection: false}
        )
        this.socket.on("connect_error", (err) => {
          console.log(`server unavailable`);
        });
        this.socket.emit('list_salable_nfts', requestData)
        this.socket.on('nftLog', data => {
          const res = data.data
          this.nftMintMsgs.push(res)
        })
        this.socket.on('list_salable_nfts', data => {
          this.nfts = data.data.map(nft => {
            nft.imgSrc = `https://ipfs.io/ipfs/${nft.coverFileURI}`
            return nft
          });

          this.socket.disconnect();
          this.thinking = false;
          this.success = true;
        })
        this.socket.on('error', err => {
          this.socket.disconnect()
        })
      } catch (error) {
        this.socket.disconnect()
      }
    },
  }
}
</script>
<style>
  .border.v-sheet{
    border-width:1px;
    border-color: #00FFFF;
    background-color: '#121212'
  }
</style>