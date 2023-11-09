<template>
  <div class="home">
    <GridLoading :isLoading="loading" :maxGrid="3" />
    <v-container fluid>
      <v-row>
        <v-col
          class="home-grid d-flex flex-column"
          v-for="a in sortedAssetPreviews"
          :key="a.id">
          <v-card
            class="home-grid-item mx-auto flex-grow-1 d-flex flex-column"
            max-width="344"
            color="secondary">
            <v-card-item>
              <div>
                <img
                  :src="a.thumbnail"
                  :title="`${a.title} Thumbnail`"
                  class="home-grid-item-thumb d-block mx-auto"
                  alt="Asset Thumbnail" />
                <div class="my-2 text-overline mb-1">
                  Created:
                  <span v-text="formatDate(a.creation_date)"></span>
                </div>
                <div class="text-h6 mb-1">
                  <strong v-text="formatTitle(a.title)"></strong>
                </div>
              </div>
            </v-card-item>

            <v-card-actions class="mt-auto">
              <v-btn
                block
                class="text-none mb-4"
                color="indigo-darken-3"
                size="x-large"
                variant="flat"
                append-icon="mdi-arrow-right"
                :to="'/'">
                See detail
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script setup lang="ts">
import GridLoading from '@/loaders/GridLoading.vue';
import API from '@/api/API.const';
import HELPERS from '@/helpers/helpers.const';
import { onMounted, ref } from 'vue';
import type { Ref } from 'vue';
import type { AxiosResponse } from 'axios';
import { computed } from 'vue';

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

const formatTitle = HELPERS.formatTitle;
const formatDate = HELPERS.formatDate;

const sortedAssetPreviews = computed(() => {
  const assets = assetPreviews.value;
  return assets.sort((a: AssetPreview, b: AssetPreview) => {
    const aDate = new Date(a.creation_date);
    const bDate = new Date(b.creation_date);
    return aDate.getTime() - bDate.getTime();
  });
});

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
<style lang="scss" scoped>
.home-grid-item-thumb {
  width: 300px;
}
</style>
