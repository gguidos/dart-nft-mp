<template>
   
    <v-card color="#363636" tile >

        <v-card-title>
          <span class="text-h5">My Contact Info</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <!-- <v-row>
              <v-col
                cols="12"
                sm="12"
                md="12"
              >
                <v-text-field
                  v-model= "user.email"
                  label="Email"
                  required
                ></v-text-field>
              </v-col>
            </v-row> -->
            <v-row>
              <v-col
                cols="12"
                sm="12"
                md="12"
              >
                <v-text-field
                  v-model= "contactPhone"
                  label="Contact Phone"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
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
    </v-card>

</template>
<script>
export default {
  data: () => ({
    dialogOpen: false,
    contactPhone: ''
  }),
  props: {
    user: Object,
    dialog: Boolean
  },
  mounted: function() {
    this.contactPhone = this.user.contactPhone
    this.dialogOpen = this.dialog
  },
  methods: {
    close: function() {
      this.$emit('close', false)
    },
    save: function() {
      this.$emit('save', { contactPhone: this.contactPhone })
    }
  }
}
</script>