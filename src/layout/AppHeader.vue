<template>
  <v-layout>
    <v-app-bar color="deep-purple">
      <router-link to="/" class="app-link px-4">
        <v-app-bar-title>
          <span v-text="title"></span>
        </v-app-bar-title>
      </router-link>
    </v-app-bar>
  </v-layout>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const nameMapping: { [key: string]: string } = {
  home: 'Dashboard',
  assetDetail: 'Metadata Inspector'
};

const title = computed(() => {
  const name = String(route.name);
  return `Vidrovr - ${name ? nameMapping[name] : 'Dashboard'}`;
});
</script>
<style lang="scss" scoped>
.app-link {
  color: #fff;
}
</style>
