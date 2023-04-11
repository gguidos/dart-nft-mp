<template>
 <v-card color="#363636" tile >
  <v-container>
      <v-row>
        <v-col cols="12">
           <v-card-text>
             <v-sheet height="500"
             @drop.prevent="mountImg($event)"
                  @dragover.prevent="dragover = true"
                  @dragenter.prevent="dragover = true"
                  @dragleave.prevent="dragover = false" >
                <Cropper

                  ref="cropper"
                  :src="imgSrc"
                  :stencil-props="stencilProps"
                  stencil-component="circle-stencil"
                  :default-size="defaultSize"
                />
                <p style="padding-left: 200px; padding-top:200px" v-if="!imgSrc">Drop your picture here!</p>
             </v-sheet>
             
            </v-card-text>
          </v-col>
      </v-row>
    <v-row>
      <v-col>
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
          @click="save()"
        >
          Save
        </v-btn>
      </v-card-actions>
      </v-col>
    </v-row>
      </v-container>

</v-card>
</template>
<script>

import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';
import { update, state$ } from '@app/app-api';

export default {
  data: () => ({
    dragOver: false,
    url: 'http://localhost:3006/api/v1/file/single',
    updateUrl: 'http://localhost:3005/api/v1/user',
    imgSrc: null,
    stencilProps: {
      previewClass: 'preview'
    }
  }),
  components: {
    Cropper
  },
  methods: {
    close() {
      this.$emit('close', false)
    },
    mountImg: function (e) {
      if (e.dataTransfer.files[0]) {
        let reader = new FileReader()
        reader.readAsDataURL(e.dataTransfer.files[0])
        reader.addEventListener('load', () => {
          this.imgSrc = reader.result
        })
      }
    },
    defaultSize({ imageSize, visibleArea }) {
			return {
				width: (visibleArea || imageSize).width,
				height: (visibleArea || imageSize).height,
			}
		},
    save: async function() {
      const { canvas } = this.$refs.cropper.getResult();
      if (canvas) {
      const formData = new FormData();
      canvas.toBlob(blob => {
          formData.append('file', blob);
          formData.append('username', 'guidog')
          const options = {
            method: 'post',
            body: formData
          }
          fetch(this.url, options).then(async res => {
            const data = await res.json();
            if (!res.ok) throw data;

            return data;
          })
          .then((res) => {
            const data = { pictureUrl: res.data.message}
            this.$emit('save', data)
          })
          .catch((err) => {
            this.$emit('close', false)
            // reject(err);
          });
        })
      }
    }
  }
}
</script>
<style>
.preview {
	border: dashed 1px white !important;
}
</style>