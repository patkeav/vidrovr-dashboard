<template>
  <v-container v-if="props.isLoading" fluid>
    <v-skeleton-loader
      class="mx-auto border"
      max-width="700"
      type="card-avatar, article, actions"></v-skeleton-loader>
  </v-container>
</template>
<script setup lang="ts">
const props = defineProps<{ isLoading: boolean; maxGrid?: number }>();
</script>
