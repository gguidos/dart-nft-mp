<template>
  <v-app>
    <v-card v-if="thinking && !success">
        <v-container style="height: 400px;" >
          <v-row
            class="fill-height"
            align-content="center"
            justify="center"
          >
            <v-col
              class="text-subtitle-1 text-center"
              cols="12"
            >
              <v-list>
                <v-list-item v-for="msg in nftMintMsgs" :key="msg">
                  {{ msg }}
                </v-list-item>
              </v-list>
            </v-col>
            </v-row>
            <v-row>
            <v-col cols="8">
              <v-progress-linear
                color="deep-purple accent-4"
                indeterminate
                rounded
                height="6"
              ></v-progress-linear>
            </v-col>
          </v-row>
      </v-container>
    </v-card>
    <v-row justify="center" v-if="!thinking && !success">
      <v-col cols="6">
        <v-card flat>
          <CreateForm :user="user" @success="uploadSuccess" :thinking="thinking"/>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center" v-if="!thinking && success">
      <v-col cols="6">
        <v-card flat>
          <Success />
        </v-card>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import CreateForm from '@/components/Create-form'
import Success from '@/components/Success'
import { state$ } from '@app/app-api'
import { io } from 'socket.io'

export default {
  name: 'App',
  components: {
    CreateForm,
    Success
  },
  data: () => ({
    user: {},
    socketUrl: 'http://localhost:4000/ws/ripple-account',
    nftInsertUrl: '',
    nftMintMsgs: [],
    socket: {},
    restArr: [],
    thinking: false,
    success: false
  }),
  watch: {
    subscription: function(nVal) {
      if (nVal === 'logout') this.redirect()
    }
  },
  created: function() {
    this.user = JSON.parse(sessionStorage.getItem('user'))
  },
  methods: {
    mintNFT: function(uploadInfo) {
      try {
        const requestData = {
          token: sessionStorage.getItem('accessToken'),
          uploadID: uploadInfo.uploadID,
          ipfsAddress: uploadInfo.ipfsAddress,
          audioFileURI: uploadInfo.audioFile,
          coverFileURI: uploadInfo.coverFile,
          jsonFileURI: uploadInfo.jsonFile,
          metadata: uploadInfo.metadata,
          seed: uploadInfo.seed
        }
        this.socket = io(
          'http://localhost:4005/ws/ripple-account',
          { reconnection: false}
        )
        this.socket.on("connect_error", (err) => {
          console.log(`server unavailable`);
        });
        this.socket.emit('mint_nfts', requestData)
        this.socket.on('nftLog', data => {
          const res = data.data
          this.nftMintMsgs.push(res)
        })
        this.socket.on('nfts', data => {
          const res = data.data
          this.socket.disconnect();
          this.thinking = false;
          this.success = false;
          this.redirect(res.NFTokenID)
        })
        this.socket.on('error', err => {
          this.socket.disconnect()
        })
      } catch(err) {
        console.log('err')
      }
    },
    uploadSuccess: async function(uploadInfo) {
      this.thinking = true;
      this.mintNFT(uploadInfo)
    },
    redirect: function(NFTokenID) {
      this.$router.push('/channel/nft/view/' + NFTokenID)
    }
  }
}
</script>

<style>

</style>
