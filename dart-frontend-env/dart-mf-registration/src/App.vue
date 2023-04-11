<template>
      <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>

// import RegisterForm from "@/components/Registration/Register-form"

export default {
  name: "RegistrationInit",
  components: {
    // RegisterForm
  },
  data: () => ({
  }),
  props: {
    user: Object,
  }
};
</script>
