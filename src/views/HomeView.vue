<template>
  <div class="home">
    <GridLoading :is-loading="loading" :max-grid="3" />
    <v-container v-if="!error" fluid>
      <v-row>
        <v-col
          v-for="a in sortedAssetPreviews"
          :key="a.id"
          class="home-grid d-flex flex-column">
          <v-card
            class="home-grid-item mx-auto flex-grow-1 d-flex flex-column"
            max-width="344"
            color="secondary"
            :to="`/asset-detail/${a.id}`">
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
                :to="`/asset-detail/${a.id}`">
                See detail
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-if="error">
      <v-banner
        lines="two"
        icon="mdi-weather-hurricane"
        color="error"
        class="my-4">
        <v-banner-text>
          We're sorry, but something went wrong. Please try again later.
        </v-banner-text>
      </v-banner>
    </v-container>
  </div>
</template>
<script setup lang="ts">
import GridLoading from '@/loaders/GridLoading.vue';
import API from '@/api/API.const';
import HELPERS from '@/helpers/helpers.const';
import { type Asset, type AssetPreview } from '@/models/Asset.model';
import { onMounted, ref } from 'vue';
import type { Ref } from 'vue';
import type { AxiosResponse } from 'axios';
import { computed } from 'vue';

const loading = ref(true);
const error = ref('');
const assetPreviews: Ref<AssetPreview[]> = ref([]);

const formatTitle = HELPERS.formatTitle;
const formatDate = HELPERS.formatDate;

/**
 * Computed function: Returns a sorted array of assets in ascending by creation_date
 *
 * @returns {Asset[]}
 */
const sortedAssetPreviews = computed(() => {
  const assets = assetPreviews.value;
  return assets.sort((a: AssetPreview, b: AssetPreview) => {
    const aDate = new Date(a.creation_date);
    const bDate = new Date(b.creation_date);
    return aDate.getTime() - bDate.getTime();
  });
});

/**
 * Gets the available assets from the API, then gets each asset's details from the API and sets it to ref() var
 *
 * @returns {void}
 */
const getAssets = async () => {
  try {
    const assets: AxiosResponse<{ data: string[] }> = await API.get_assets();
    const promises = assets.data.data.map((a) => API.get_asset_detail(a));
    const resolved: AxiosResponse<{ data: Asset }>[] =
      await Promise.all(promises);
    assetPreviews.value = resolved.map(
      (r: AxiosResponse<{ data: Asset }>) => r.data.data
    );
  } catch (err) {
    error.value = (err as Error).message;
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
