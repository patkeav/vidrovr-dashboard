<script setup lang="ts">
import { RouterView } from 'vue-router';
import AppHeader from '@/layout/AppHeader.vue';
import AppFooter from '@/layout/AppFooter.vue';
</script>

<template>
  <v-app>
    <AppHeader />

    <div id="main">
      <RouterView />
    </div>

    <AppFooter />
  </v-app>
</template>

<style scoped></style>
