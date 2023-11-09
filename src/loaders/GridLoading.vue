<template>
  <v-container v-if="props.isLoading" fluid>
    <v-row>
      <v-col cols="12" md="4" v-for="i in skeletonItems" :key="i">
        <v-skeleton-loader class="mx-auto border" max-width="300" type="card-avatar, actions">
        </v-skeleton-loader>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
const props = defineProps<{ isLoading: boolean; maxGrid?: number }>()

const max = props.maxGrid || 6
const skeletonItems = Array.from({ length: max }, (x, i) => i)
</script>
