<template>
  <v-app>
    <AuthForm />
  </v-app>
</template>

<script>
import AuthForm from '@/components/Auth-form'

export default {
  name: 'User-login',
  components: {
   AuthForm
  }
}
</script>
