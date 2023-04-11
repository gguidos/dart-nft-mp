<template>
  <v-container>
        <v-row  justify="center" v-if="errors.length > 0">
      <v-col cols="4">
        <v-alert
          color="#C51162"
          dark
          prominent
          icon="mdi-head-alert"
          border="right"
        >
          <v-list density="compact" color="#C51162">
            <v-list-item
              v-for="(item, i) in errors"
              :key="i"
              :value="item"
            >
              <v-list-item-title v-text="item"></v-list-item-title>
            </v-list-item>
          </v-list>
        </v-alert>
      </v-col>
    </v-row>
    <v-row  justify="center" v-if="ok">
      <v-col cols="4">
        <v-alert
          color="primary"
          dark
          prominent
          icon="mdi-head-alert"
          border="right"
        >
        <p>A confirmation link has been mailed to: {{ email }}<br>Please use the link to complete the registration<br>process.</p>
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: 'SuccessAlert',
  data: () => ({
    ok: false
  }),
  props: {
    errors: Array,
    success: Boolean
  },
  watch: {
    success: function(val) {
        this.ok = val
    }
  },
}
</script>