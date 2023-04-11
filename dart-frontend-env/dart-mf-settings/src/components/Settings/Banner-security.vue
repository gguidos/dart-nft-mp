<template>
  <v-card
    class="mx-auto"
  >
  <v-row>
    <v-col>
      <v-card-text>
        <p class="text-h4 text--primary">
          Enable privacy and security
        </p>
        <p>adjective</p>
        <div class="text--primary">
          Don't let your profile get lost in the ether,<br>
          a complete profile is more attractive to other users...
        </div>
      </v-card-text>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <v-card-actions>
      <v-btn
        text
        color="teal accent-4"
        @click="reveal = true"
      >
        Learn More
      </v-btn>
    </v-card-actions>
    </v-col>
  </v-row>
  </v-card>
</template>