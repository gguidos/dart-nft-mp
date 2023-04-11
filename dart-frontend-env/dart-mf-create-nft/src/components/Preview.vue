<template>
  <div>
    <v-card
      class="mx-auto"
      style="height: 800px"
    >
    <v-toolbar
        dark
        color="primary"
      >
      <v-btn
        icon
        dark
        @click="closeDialog"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>{{ metadata.metadata.title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn
          dark
          text
          @click="sendFile"
        >
          Save
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-row align-content="center">
      <v-col cols="4" offset-md="4" align="center" class="my-6">
        <img :src="imgSrc" width="70%"/>
      </v-col>
    </v-row>
   
    <div align="center" class="my-6">
      <audio
        controls
        id="audio-preview"
        volume="0.1"
        v-show="files.audioFile"
      />
      
    </div>
    <v-divider></v-divider>
    <v-tabs
      color="deep-purple accent-4"
      right
    >
      <v-tab v-for="tab in tabs" :key="tab.name">{{ tab.name }}</v-tab>
        <v-tab-item
          v-for="tab in tabs"
          :key="tab.text"
        >
          <v-container fluid>
            <v-row>
              <v-col cols="12" class="offset-md-1">
                <div class="transition-swing text-h4 mb-12 content-text">{{ tab.name }}</div>
                <div>
                  <v-list>
                    <v-list-item v-for="obj in tab.content" :key="obj.title">
                      <v-list-item-content >
                        
                        <v-list-item-title class="font-weight-medium content-text" v-if="obj.text !== undefined">{{ obj.title }}</v-list-item-title>
                    
                          <v-list-item-subtitle
                            v-show="obj.title !== 'email' &&
                            obj.title !== 'account' &&
                            obj.title !== 'paystring' &&
                            obj.text !== undefined"
                            class="content-text"
                          >
                              {{ obj.text }}
                          </v-list-item-subtitle>
                          <v-list-item-subtitle 
                            v-show="obj.title === 'email' ||
                            obj.title === 'account' ||
                            obj.title === 'paystring'">
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
    </v-card>
  </div>
</template>

<script>


export default {
  data: () => ({
    audioContext: null,
    audioC: null,
    imgSrc: null,
    tabs: []
  }),
  props: {
    files: Object,
    dialog: Boolean,
    metadata: Object
  },
  mounted() {
      this.mountAudio();
      this.mountImg();
      this.buildTabs();
  },
  methods: {
    mountAudio: function () {
      if (this.files.audioFile) {
        let audio = document.getElementById('audio-preview')
        let reader = new FileReader()
        reader.readAsDataURL(this.files.audioFile)
        reader.addEventListener('load', () => {
          audio.src = reader.result
        })
      }
    },
    mountImg: function () {
      if (this.files.coverFile) {
        let reader = new FileReader()
        reader.readAsDataURL(this.files.coverFile)
        reader.addEventListener('load', () => {
          this.imgSrc = reader.result
        })
      }
    },
    buildTabs: function () {
      this.tabs = Object.keys(this.metadata).map(key => {
        return {
          name: key,
          text: key,
          content: Object.keys(this.metadata[key]).map(k => ({
            title: k,
            text: this.metadata[key][k]
          }))
        }
      })
    },
    async sendFile() {
      this.$emit('sendFile')
    },
    closeDialog() {
      this.$emit('closeDialog', this.dialog)
    }
  },
  
}
</script>
<style>
  .content-text:first-letter {
    text-transform: capitalize
  }
</style>