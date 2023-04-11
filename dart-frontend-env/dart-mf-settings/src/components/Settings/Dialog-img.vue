<template>

    <v-card color="#363636" tile >

      <v-card-title>
        <span class="text-h5">Apply for an artist account</span>
      </v-card-title>
      <!-- <v-card-text>
        <v-container>
          <v-row>
            <v-col
              cols="12"
              sm="12"
              md="12"
            >
             <p>A response to your application will arrive within 24 hours</p>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text> -->
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
          Accept
        </v-btn>
      </v-card-actions>
    </v-card>
</template>
<script>
export default {
  data: () => ({
    nUser: {}
  }),
  props: {
    user: Object
  },
  mounted: function() {
    this.nUser = this.user
  },
  methods: {
    close: function() {
      this.$emit('close', false)
    },
    save: function() {
      this.$emit('save', this.nUser)
    }
  }
}
</script>