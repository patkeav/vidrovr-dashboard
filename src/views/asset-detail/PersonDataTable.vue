<!-- eslint-disable vue/valid-v-slot -->
<!-- eslint-disable vue/require-v-for-key -->
<template>
  <div>
    <div class="asset-title text-h4 pb-6 mb-6">
      Detected persons with Thumbnails
    </div>

    <v-data-table
      v-if="!isLoading"
      :items="detectedPersonThumbs"
      class="asset-detections v-theme--light"
      color="white"
      light>
      <template #item.thumbnails="{ value }">
        <img
          v-for="v in value"
          :src="v"
          alt="Thumbnail"
          class="detection-image mx-2" />
      </template>
    </v-data-table>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  detectedPersonThumbs: { name: string; thumbnails: string[] }[];
  isLoading: boolean;
}>();

const { detectedPersonThumbs, isLoading } = props;
</script>
