<template>
  <v-container fluid>
    <v-row>
      <v-col class="meta">
        <strong>Created</strong>
        <div v-text="created"></div>
      </v-col>
      <v-col class="meta">
        <strong>Duration</strong>
        <div v-text="duration"></div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
const props = defineProps<{ created: Date; duration: string }>();

const { created, duration } = props;
</script>
<style lang="scss" scoped>
.meta {
  border: 1px solid #ccc;
}
</style>
