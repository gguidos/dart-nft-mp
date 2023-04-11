<template>

  <v-card min-height="800px" flat tile>
      <div class="py-5">
      <v-row justify-content="center">
        <v-col v-if="noPicture ===  false" cols="12" class="d-flex justify-center">
          <v-icon size="200">mdi-alien</v-icon>
        </v-col>
        <v-col v-if="noPicture ===  true" cols="12" class="d-flex justify-center">
                      <v-list-item-avatar size="200">

          <v-img :src="user.pictureUrl" ></v-img>
                      </v-list-item-avatar>
        </v-col>
      </v-row>
      <v-row class="d-flex justify-center" style="margin-top: 0px">
        <v-col cols="5">
          <v-list color="background">
            <v-list-item-content>
              <v-list-item-title class="d-flex justify-center"><p class="text-h4 text--primary"> Welcome, {{ user.name }}!</p></v-list-item-title>
              <v-list-item-title class="d-flex justify-center"><span>Member since: {{ memberSince }}</span></v-list-item-title>
              <v-list-item-title class="d-flex justify-center"><span>Username: <b>{{ user.username }}</b></span></v-list-item-title>
              <v-list-item-title class="d-flex justify-center"><span>Email: <b>{{ user.email }}</b></span></v-list-item-title>
            </v-list-item-content>
          </v-list>
        </v-col>
      </v-row>
    <v-row class="d-flex justify-left ma-5">
      <v-col cols="5" offset="1">
        <BannerProfile />
      </v-col>
      <v-col cols="5">
        <BannerWallet />
      </v-col>
    </v-row>
    <v-row class="d-flex justify-left ma-5">
      <v-col cols="10" offset="1">
        <BannerSecurity />
      </v-col>
    </v-row>
    </div>
  </v-card>

</template>
<script>
import * as moment from 'moment'
import BannerProfile from '@/components/Settings/Banner-profile'
import BannerWallet from '@/components/Settings/Banner-wallet'
import BannerSecurity from '@/components/Settings/Banner-security'

export default {
  data: () => ({
    dragOver: false,
    noPicture: false,
    thinking: false,
    memberSince: '',
  }),
  props: {
    user: {}
  },
  components: {
    BannerProfile,
    BannerWallet,
    BannerSecurity
  },
  mounted: function() {
    if (this.user.pictureUrl) this.noPicture = true
    this.memberSince = moment(this.user.created).format('YYYY-MM-DD') 
  },
  methods: {
    
  }
}
</script>