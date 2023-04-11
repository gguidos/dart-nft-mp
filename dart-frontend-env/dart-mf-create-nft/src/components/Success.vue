<template>
<v-container>
    <v-snackbar
      v-model="snackbar"
    >
        {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>

export default {
  data: () => ({
    snackbar: true,
    text: 'Your NFT was successfuly created',
    audioContext: null,
    audioC: null,
    audioSrc: '',
    imgSrc: '',
    tabs: [],
  }),
  props: {
    metadata: Object
  },
  // mounted() {
  //     this.audioSrc = `${this.metadata.IPFS.gateway_url}${this.metadata.IPFS.ipfs_base}${this.metadata.IPFS.audioFile}`
  //     this.imgSrc = `${this.metadata.IPFS.gateway_url}${this.metadata.IPFS.ipfs_base}${this.metadata.IPFS.coverFile}`
  //     this.mountAudio();
  //     this.buildTabs();
  // },
  // methods: {
  //   mountAudio: function () {
  //     console.log(this.audioSrc)
  //       let audio = document.getElementById('audio-preview')
  //       audio.src = this.audioSrc
  //   },
  //   buildTabs: function () {
  //     this.tabs = Object.keys(this.metadata).map(key => {
  //       return {
  //         name: key,
  //         text: key,
  //         content: Object.keys(this.metadata[key]).map(k => ({
  //           title: k,
  //           text: this.metadata[key][k]
  //         }))
  //       }
  //     })
  //   }
  // }
}
</script>
<style>
  .content-text:first-letter {
    text-transform: capitalize
  }
</style>