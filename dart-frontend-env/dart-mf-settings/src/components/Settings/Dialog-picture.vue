<template>
  <ImageUpload @close="close" @save="save"/>
</template>

<script>
import ImageUpload from '@/components/Settings/Image-upload'
export default {
  components: {
    ImageUpload
  },
  methods: {
    save: function(data) {
      this.$emit('save', data)
    },
    close: function() {
      this.$emit('close')
    }
  }
}
</script>