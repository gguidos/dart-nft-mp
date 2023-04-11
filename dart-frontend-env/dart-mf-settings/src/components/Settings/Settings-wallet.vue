<template>
  <v-card color="background" min-height="800px" tile >
    <v-row>
      <v-col cols="8" offset="2" class="py-10">
        <v-card
          tile
          class="mx-auto"
        >
          <v-row>
            <v-col>
              <v-card-text>
                <p class="text-h4 text--primary">
                  Connect your XRP wallet and mint!
                </p>
                <p>adjective</p>
                <div class="text--primary">
                   <v-switch
                      v-model="connect"
                      label="Connect"
                      color="primary"
                      hide-details
                      @click="openDialogConnect"
                    ></v-switch>
                </div>
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="8" offset="2" class="py-5">
        <v-card
      
          tile
          class="mx-auto"
        >
        
        </v-card>
        <p class="text-h4 text--primary">Wallet information</p>
        <v-list class="px-5">
           <v-list-item class="pt-2">
            <v-list-item-content>
              <v-row>
                <v-col cols="2">
                  <v-list-item-subtitle>Wallet</v-list-item-subtitle>
                </v-col>
                <v-col>
                  <v-list-item-title>{{ user.xrpWallet || 'Add an XRP wallet to your account' }}</v-list-item-title>
                </v-col>
              </v-row>

            </v-list-item-content>
            <v-list-item-icon class="pr-2">
                <v-btn
                  class="ma-2"
                  outlined
                  small
                  fab
                  color="white"
                  @click="openDialogWallet"
                >
                <v-icon v-if="user.email">mdi-pencil</v-icon>
                <v-icon v-if="!user.email">mdi-plus</v-icon>
              </v-btn>
            </v-list-item-icon>
           </v-list-item>
           
         
        </v-list>
      </v-col>
    </v-row>
    <v-dialog
        v-model="dialog1"
        max-width="600px"
      >
      <DialogWalletConnect @saved="saved" @close="close" />
    </v-dialog>
      <v-dialog
        v-model="dialog"
        max-width="600px"
      >
      <DialogWallet @close="close" :user="user" @saved="saved"/>
    </v-dialog>
  </v-card>
</template>
<script>

import DialogWalletConnect from '@/components/Settings/Dialog-wallet-connect'
import DialogWallet from '@/components/Settings/Dialog-wallet'
import { update, state$ } from '@app/app-api'

export default {
  data: () => ({
    wallet: {},
    dialog: false,
    dialog1: false,
    connect: false,
    nUser: {},
    user: {}
  }),
  components: {
    DialogWalletConnect,
    DialogWallet
  },
  mounted: function() {
    this.user = JSON.parse(sessionStorage.getItem('user'))
    if (this.user.NFTTokenMinter !== '' &&
    this.user.role === 'creator') this.connect = true
  },
  methods: {
    accepted: async function () {
      this.close()
    },
    openDialogWallet: function() {
      this.dialog = true
    },
    openDialogConnect: function() {
      this.dialog1 = true
    },
    saved: function() {
      state$.next('update')
      this.dialog1 = false
      this.dialog = false
      this.user = JSON.parse(sessionStorage.getItem('user'));
      if (this.user.NFTTokenMinter !== '' 
        && this.user.role === 'creator') this.connect = true
    },
    close: function() {
      this.dialog = false
      this.dialog1 = false
    }
  }
}
</script>