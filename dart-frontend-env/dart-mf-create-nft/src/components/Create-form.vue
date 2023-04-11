<template>
  <v-card color="background" min-height="800px" flat tile>
    <v-card-title>Mint your NFT</v-card-title>
    <v-container style="height: 400px;" v-if="thinking">
      <v-row
        class="fill-height"
        align-content="center"
        justify="center"
      >
        <v-col
          class="text-subtitle-1 text-center"
          cols="12"
        >
          Uploading your files...
        </v-col>
        <v-col cols="6">
          <v-progress-linear
            color="deep-purple accent-4"
            indeterminate
            rounded
            height="6"
          ></v-progress-linear>
        </v-col>
      </v-row>
    </v-container>

  <form v-if="!thinking" @submit.prevent="sendFile" enctype="multipart/form-data">
    
    <v-row justify="center">
      <v-col cols="9">
        <v-file-input
          v-model="audioFile"
          :rules="rules.file"
          show-size
          small-chips
          truncate-length="15"
          label="Choose sound file..."
          prepend-icon="fa fa-file-audio"
          aria-required="true"
        ></v-file-input>
        <v-file-input
          v-model="coverFile"
          show-size
          small-chips
          truncate-length="15"
          label="Choose sound file cover..."
          prepend-icon="fa fa-camera-retro"
        ></v-file-input>
         <v-text-field
          v-model="title"
          :rules="rules.title"
          color="teal"
          label="Title"
          required
        ></v-text-field>

        <v-textarea
          v-model="description"
          color="teal"
          :rules="rules.description"
          required
        >
          <template v-slot:label>
            <div>
              Description
            </div>
          </template>
        </v-textarea>
      </v-col>
    </v-row>
    <v-row justify="center" align-content="center">
      <v-col cols="4" class="offset-md-1">
        <v-btn
          depressed
          color="primary"
          :disabled="disabled()"
          @click="enableDialog"
        >
          Preview
        </v-btn>
      </v-col>
      <v-col cols="4">
        <v-btn
          depressed
          color="success"
          :disabled="disabled()"
          @click="enableDialog1"
        >
          Submit
        </v-btn>
        <v-dialog
        v-model="dialog1"
        max-width="600px">
          <DialogWalletConnect @done="done" @close="close" />
        </v-dialog>
        <v-dialog
          scrollable
          v-model="dialog"
          max-width="800">
          <Preview 
          :metadata="metadata" 
          :files="files" 
          :dialog="dialog"
          @closeDialog="dialog=false"
          @sendFile="sendFile"/>
        </v-dialog>
      </v-col>
    </v-row>
    </form>
  </v-card>
</template>

<script>
import DialogWalletConnect from '@/components/Dialog-wallet-connect'
import Preview from './Preview'

export default {
  data: () => ({
    dialog: false,
    dialog1: false,
    thinking: false,
    uploadUrl: 'http://localhost:3006/api/v1/file/multiple',
    audioEnable: false,
    audioFile: undefined,
    coverFile: undefined,
    files: {},
    title: 'test',
    description: 'test',
    metadata: {},
    rules: {
      file: [
        value => !!value || 'Required'
      ],
      title: [
        value => !!value || 'Required',
        value => (value && value.length >= 3) || 'Min 3 characters',
      ],
      description: [
        value => !!value || 'Required',
        value => (value && value.length >= 3) || 'Min 4 characters',
      ],
    },
    username: ''
  }),
  props: {
    user: {}
  },
  components: {
    Preview,
    DialogWalletConnect
  },
  methods: {
    disabled() {
      if (this.audioFile === '' &&
        (this.title === '' || this.title.length < 3) &&
        (this.description === '' || this.description.length < 3)) {
          return true
      }

      return false
    },
    closeDialog() {
      this.dialog = false
    },
    buildMetadata() {
      this.metadata = {
        metadata: {
          title: this.title,
          description: this.description,
          filename: this.audioFile.name,
          size: this.audioFile.size,
          cover: this.coverFile ? this.coverFile.name : undefined,
        },
        author: {
          name: this.user.name,
          email: this.user.email,
          xrpWallet: this.user.xrpWallet
        }
      }
      console.log(this.metadata.author)
      this.files = {
        audioFile: this.audioFile,
        coverFile: this.coverFile
      }
    },
    close() {
      this.dialog = false
      this.dialog1 = false
    },
    enableDialog() {
      this.buildMetadata()
      this.dialog = true
    },
    enableDialog1() {
      this.dialog1 = true
    },
    done(seed) {
      this.dialog1 = false
      this.dialog = false
      this.sendFile(seed)
    },
    async sendFile(seed) {
       try {
        if (Object.keys(this.metadata).length < 1) this.buildMetadata()
        this.dialog = false
        this.thinking = true

        const formData = new FormData()
        formData.append('metadata', JSON.stringify(this.metadata))
        formData.append('username', this.user.username)
        formData.append('file', this.audioFile)
        formData.append('file', this.coverFile)
        const options = {
          method: 'post',
          body: formData
        }
        fetch(this.uploadUrl, options)
        .then(async res => {
          const response = await res.json();
          response.data.message.seed = seed;
          this.thinking = false
          this.$emit('success', response.data.message)
        })
      } catch(err) {
        this.thinking = false
        console.log(err)
      }
    }
  }
}
</script>