<template>
  <v-layout>
    <v-app-bar color="primary-darken-1" density="compact">
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click="toggleNav"></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title>Vidrovr Dashboard</v-app-bar-title>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer">
      <v-list>
        <v-list-item title="All Assets" subtitle="Vuetify" :to="'/'"></v-list-item>
        <v-divider></v-divider>
      </v-list>
    </v-navigation-drawer>
  </v-layout>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const drawer = ref(false)

const toggleNav = () => {
  drawer.value = !drawer.value
}
</script>
