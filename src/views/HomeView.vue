<template>
  <div class="home">
    <GridLoading :isLoading="loading" />
    {{ assetPreviews }}
  </div>
</template>
<script setup lang="ts">
import GridLoading from '@/loaders/GridLoading.vue';
import API from '@/api/API.const';
import { onMounted, ref } from 'vue';
import type { Ref } from 'vue';
import type { AxiosResponse } from 'axios';

interface Asset {
  id: string;
  mime_type: string;
  feed_id: string;
  creation_date: string;
  title: string;
  thumbnail: string;
  media_url: string;
  height: number;
  width: number;
  duration: number;
  fps: number;
  processing_info: {
    status: string;
    start: string;
    end: string;
  };
}

interface AssetPreview {
  id: string;
  creation_date: string;
  title: string;
  thumbnail: string;
}

const loading = ref(true);
const assetPreviews: Ref<AssetPreview[]> = ref([]);

const getAssets = async () => {
  try {
    const assets: AxiosResponse<{ data: string[] }> = await API.get_assets();
    const previews: AxiosResponse<{ data: AssetPreview[] }> =
      await API.get_asset_previews(assets.data.data);
    assetPreviews.value = previews.data.data;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  getAssets();
});
</script>
