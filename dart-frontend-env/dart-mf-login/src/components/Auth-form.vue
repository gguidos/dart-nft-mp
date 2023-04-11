<template>
  <v-row class="justify-center">
    <v-col cols="12">
      <v-row class="justify-center">
        <v-col cols="3">
         <v-img
          :src="require('@/assets/darttrader-2.png')"
          class="my-3"
          contain
          height="200"
        />
        </v-col>
      </v-row>
      <v-row class="justify-center">
        <v-col cols="3">
          <v-text-field
            label="Username"
            single-line
            solo
            v-model="username"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="justify-center">
        <v-col cols="3">
          <v-text-field
            label="Password"
            type="password"
            single-line
            solo
            v-model="password"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="justify-center">
        <v-col cols="4" align="center">
          <v-btn
            color="primary"
            @click="submit"
          >
            Sign in
          </v-btn>
        </v-col>
      </v-row>
      <v-row class="justify-center">
        <v-col cols="4" align="center">
          <p>
            <a href="/registration">
              <span>Register</span>
            </a>, if you dont have an account already!
          </p>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { state$, auth } from '@app/app-api'
export default {
  name: 'Login-form',
  data: () => ({
      username: 'guidog',
      password: 'asdf',
      subscription: {},
      error: '',
  }),
  methods: {
    mounted: function() {
      if (sessionStorage.getItem('user')) this.$router.push('/dashboard')
    },
    submit: function() {
      const url = process.env.VUE_APP_API_URL ?
        process.env.VUE_APP_API_URL + process.env.VUE_APP_AUTH_PATH :
        process.env.VUE_APP_AUTH_PATH;
      auth({ username: this.username, password: this.password, url })
      .then(res => {
        state$.next('loggedIn')
        this.$router.push(`/`)
      }).catch(err => {
        this.error = err
      })
    }
  }
}
</script>
<style scoped>
  h3 { 
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>