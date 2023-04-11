<template>
  <v-app>
   <v-row justify="center">
      <v-col cols="6">
      <v-card flat>
        <v-toolbar
            dark
            color="primary">
          <v-toolbar-title>
            <span style="color: #36454F">{{ title }}</span>
          </v-toolbar-title>
          <v-spacer></v-spacer>
            <span style="color: #36454F">owned by {{ owner }}</span>
        </v-toolbar>
        <v-row align-content="center">
          <v-col cols="4" offset-md="4" align="center" class="my-6">
            <img :src="imgSrc" width="70%"/>
          </v-col>
        </v-row>

        <div align="center" class="my-6">
          <audio
            controls
            controlsList="nodownload"
            id="audio-preview"
            volume="0.1"
          />
        </div>
        <div
          class="d-flex justify-center align-baseline"
          style="gap: 1rem; margin-bottom: 1rem"
          v-if="daysLeft >= 0">
          <v-btn
          color="primary"
          style="color: #36454F"
          @click="dialog=true">
            Place a bid
          </v-btn>
        </div>
        <v-divider></v-divider>
        <v-tabs
        color="primary accent-4"
        right>
          <v-tab v-for="tab in tabs" :key="tab.name">{{ tab.name }}</v-tab>
            <v-tab-item
              v-for="tab in tabs"
              :key="tab.text"
            >
              <v-container fluid>
                <v-row>
                  <v-col cols="12" class="offset-md-1">
                    <div 
                      class="transition-swing text-h4 mb-12 content-text"
                      >{{ tab.name }}
                    </div>
                    <div>
                      <v-list>
                        <v-list-item v-for="obj in tab.content" :key="obj.title">
                          <v-list-item-content >
                            <v-list-item-title 
                              class="font-weight-medium content-text" 
                              v-if="obj.text !== undefined"
                            >
                              {{ obj.title }}
                            </v-list-item-title>
                        
                              <v-list-item-subtitle
                                v-show="obj.title !== 'email' &&
                                obj.title !== 'account' &&
                                obj.title !== 'paystring' &&
                                obj.text !== undefined &&
                                tab.name !== 'IPFS'"
                                class="content-text"
                              >
                                  {{ obj.text }}
                              </v-list-item-subtitle>
                              <v-list-item-subtitle 
                                v-show="obj.title === 'email' ||
                                obj.title === 'account' ||
                                obj.title === 'paystring' ||
                                tab.name === 'IPFS'">
                                  {{ obj.text }}
                              </v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                    </div>
                  </v-col>
                </v-row>
            </v-container>
          </v-tab-item>
        </v-tabs>
        <v-dialog
      scrollable
      v-model="dialog"
      max-width="800">
        <BuyOfferDialog
        :NFTokenID="NFTokenID"
        @closeDialog="closeDialog"
        />
      </v-dialog>
    </v-card>
      </v-col>
    </v-row>
</v-app>
</template>
<script>
import { io } from 'socket.io'
import BuyOfferDialog from '@/components/Buy-offer-dialog'

export default {
  data: () => ({
    owned: false,
    owner: '',
    title: '',
    audioContext: null,
    audioC: null,
    audioSrc: '',
    imgSrc: '',
    tabs: [],
    dialog: false,
    socketUrl: 'http://localhost:4000/ws/ripple-account',
    NFTokenID: '',
    auctionExpired: false,
    initialPrice: 0,
    startDate: '',
    daysLeft: 0,
  }),
  components: {
    BuyOfferDialog
  },
  mounted() {
    this.NFTokenID = this.$route.params.id
    this.getData()
  },
  methods: {
    closeDialog: function() {
      this.dialog = false
      this.$router.go(this.$router.currentRoute)
    },
    getData: function () {
      try {
        let sellOffer = undefined;
        const requestData = { 
          token: sessionStorage.getItem('accessToken'),
          params: { NFTokenID: this.NFTokenID },
        }
        this.socket = io(
          'http://localhost:4005/ws/ripple-account',
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
          this.socket.disconnect();
          const res = data.data
          this.title = res[0].title
          this.owned = res[0].owned
          this.salable = res[0].salable
          this.owner = res[0].author
          if (res[0].hasOwnProperty('brokedSellOffer')) {
            const brokedSellOffer = res[0].brokedSellOffer
            
            if (brokedSellOffer.expiration > 0) {
              this.daysLeft = brokedSellOffer.daysLeft
              sellOffer = {
                'Initial Price': brokedSellOffer.startPrice,
                'Days Left': brokedSellOffer.daysLeft,
                'End Date': brokedSellOffer.endDate
              }
            }
          }

          this.imgSrc = `https://ipfs.io/ipfs/${res[0].coverFileURI}`
          this.audioSrc = `https://ipfs.io/ipfs/${res[0].audioFileURI}`
          const jsonFileSrc = `https://ipfs.io/ipfs/${res[0].jsonFileURI}`
          if (this.imgSrc !== '') this.mountAudio();
          
          fetch(jsonFileSrc).then(async res => {
            let data = await res.json();
            if (!res.ok) throw data;
            
            if (sellOffer) data = { 'Auction': sellOffer, ...data }
            this.buildTabs(data)
          })
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
    mountAudio: function () {
        let audio = document.getElementById('audio-preview')
        audio.src = this.audioSrc
    },
    buildTabs: function (metadata) {
      this.tabs = Object.keys(metadata).map(key => {
        return {
          name: key,
          text: key,
          content: Object.keys(metadata[key]).map(k => ({
            title: k,
            text: metadata[key][k]
          }))
        }
      })
    }
  }
}
</script>
<style>
  .content-text:first-letter {
    text-transform: capitalize
  }
  audio {
    filter: sepia(20%) saturate(70%) grayscale(4) contrast(99%) invert(12%);
    width: 300px;
    height: 25px;
  }
</style>