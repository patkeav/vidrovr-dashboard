<template>
  <v-chip
    v-for="(d, key) in detections"
    :key="key"
    :color="getChipColor()"
    class="mr-2"
    flat>
    <strong v-text="`${d.name}(${d.count})`"></strong>
  </v-chip>
</template>
<script setup lang="ts">
const props = defineProps<{ detections: { name: string; count: number }[] }>();

const { detections } = props;

const getChipColor = () => {
  const rand = Math.floor(Math.random() * 4);
  switch (rand) {
    case 1:
      return 'teal';
    case 2:
      return 'pink';
    case 3:
      return 'indigo';
    case 4:
      return 'orange';
    default:
      return 'red';
  }
};
</script>
