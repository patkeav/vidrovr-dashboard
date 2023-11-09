<template>
  <div id="asset">
    <DetailLoading :isLoading="loading" />

    <template v-if="!loading">
      <v-card elevation="16">
        <v-card-item>
          <HeroAsset
            :mediaUrl="asset.media_url"
            :thumbnail="asset.thumbnail"
            :height="asset.height"
            :width="asset.width"
            :assetMaxWidth="assetMaxWidth" />
        </v-card-item>
      </v-card>
    </template>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import API from '@/api/API.const';
import DetailLoading from '@/loaders/DetailLoading.vue';
import HeroAsset from './HeroAsset.vue';
import { type Asset } from '@/models/Asset.model';
import type { AxiosResponse } from 'axios';
import { onMounted } from 'vue';
import type { Ref } from 'vue';

const props = defineProps<{ uid: string }>();

const { uid } = props;

const loading = ref(true);

const assetMaxWidth = ref(0);

const asset: Ref<Asset> = ref(<Asset>{});

const getAssetDetail = async () => {
  try {
    const assetResponse: AxiosResponse<{ data: Asset }> =
      await API.get_asset_detail(uid);
    asset.value = assetResponse.data.data;
    console.table(assetResponse.data.data);
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  assetMaxWidth.value = document.getElementById('asset').offsetWidth - 50;
  getAssetDetail();
});
</script>
