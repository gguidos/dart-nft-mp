<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="6">
        <h1>Member registration {{ user }}</h1>
      </v-col>
    </v-row>
    
     <v-row  justify="center" v-if="errors.length > 0">
      <v-col cols="6">
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
    <v-row  justify="center" v-if="success">
      <v-col cols="6">
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

    <v-row justify="center" v-if="!success">
      <v-col cols="6" md-offset="2">
       <FormComponent v-if="!success" @register="register" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>

import FormComponent from './Form-component'

export default {
  name: 'RegistratironForm',
  data: () => ({
    errors: [],
    email: '',
    success: false
  }),
  props: {
    user: {}
  },
  components: {
    FormComponent
  },
  mounted: function(){},
  methods: {
    register: async function(body) {
      let url = process.env.VUE_APP_API_URL ?
        process.env.VUE_APP_API_URL + process.env.VUE_APP_USERS_PATH :
        process.env.VUE_APP_USERS_PATH
      this.email = body.email;
      fetch(url, {
        method: 'POST',
        body
      }).then((res) => {
        this.success = res.ok
        if (!this.success) this.errors.push(res.statusText)
      }).catch(() => {
        return
      })
    }
  }
}
</script>
<style scoped>
input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px black inset;
    box-shadow: 0 0 0px 1000px black inset;
}
</style>