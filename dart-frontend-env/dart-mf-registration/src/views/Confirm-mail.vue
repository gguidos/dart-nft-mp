<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="4">
        <v-alert
          :color="color"
          dark
          prominent
          :icon="icon"
          border="right"
        >{{ text }}</v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>

export default {
  data: () => ({
    success: false,
    text: 'Alien email address!',
    color: '#C51162',
    icon: 'mdi-alien-outline'
  }),
  created: function(){
    this.tokenExists()
  },
  methods: {
    tokenExists: async function() {
      let url = process.env.VUE_APP_API_URL  ?
        process.env.VUE_APP_API_URL + process.env.VUE_APP_CONFIRM_MAIL_PATH :
        process.env.VUE_APP_CONFIRM_MAIL_PATH
      try {
        const body = JSON.stringify({ email: this.$route.query.email, token: this.$route.query.token })
        fetch(url, {
        method: 'POST',
        body
      }).then((res) => {
        if (res.ok) {
          this.text = 'Your account is now registered and ready to be used!'
          this.color = 'primary'
          this.icon = 'mdi-headphones'
        }
      }).catch(err => {
        console.log(err)
      })

      } catch(err) {
        console.log(err)
        if (err) this.fail = true
      }
      
    }
  }
}
</script>