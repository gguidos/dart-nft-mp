<template>
   <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          @input="cleanErrors"
        >
          <v-text-field
            v-model="name"
            single-line
            solo
            :counter="40"
            :rules="rules.nameRules"
            label="Name"
            required
            @focus="cleanErrors"
          ></v-text-field>
          <v-text-field
            v-model="username"
            single-line
            solo
            :counter="10"
            :rules="rules.usernameRules"
            label="Username"
            required
          ></v-text-field>
          <v-text-field
            v-model="email"
            type="email"
            single-line
            solo
            :rules="rules.emailRules"
            label="E-mail"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            single-line
            solo
            type="password"
            :rules="rules.passwordRules"
            label="Password"
            required
          ></v-text-field>
          <v-text-field
            v-model="cfrmPassword"
            single-line
            solo
            type="password"
            :rules="rules.passwordRules"
            label="Confirm password"
            :disabled="password.length < 8"
            required
            @input="comparePasswords"
          ></v-text-field>
          <v-btn
            :disabled="!valid"
            color="primary"
            class="mr-4"
            @click="register"
            style="margin-left: 38%"
          >
            Register
          </v-btn>

        </v-form>
</template>

<script>

export default {
  name: 'FormComponent',
  data: () => ({
    name: 'guidog',
    email: 'gjgmenendez@gmail.com',
    username: 'guidog',
    password: 'asdf',
    cfrmPassword: '',
    errors: [],
    success: false,
    rules: {
      nameRules: [ 
        v => !!v || 'Name is required', 
        v => (v && v.length <= 40) || 'Name is too large'
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      usernameRules: [
        v => !!v || 'Username is required',
        v => (v && v.length <= 10) || 'Name is too large'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length <= 15) || 'Password is too large'
      ]
    },
    valid: true
  }),
  methods: {
    comparePasswords: function(val) {
      if (val !== this.password) {
        this.errors = ['Passwords must match']
        return
      }
      this.errors = []
    },
    resetValidation: function() {
      this.$refs.form.resetValidation()
    },
    cleanErrors: function() {
      this.errors = []
    },
    register: function() {
      const body = JSON.stringify({
        name: this.name,
        email: this.email,
        username: this.username,
        password: this.password
      })
      if (this.errors.length < 1) this.resetValidation()
      
      this.$emit('register', body)
    }
  }
}
</script>
