<template>
  <div id="asset">
    <DetailLoading :isLoading="loading" />

    <template v-if="!loading">
      <v-card elevation="6">
        <v-card-item>
          <HeroAsset
            :mediaUrl="asset.media_url"
            :thumbnail="asset.thumbnail"
            :height="asset.height"
            :width="asset.width"
            :assetMaxWidth="assetMaxWidth" />
          <div class="text-h4 mt-6" v-text="`Title: ${asset.title}`"></div>
          <div class="my-4">
            <div class="text-h6 mt-6 mb-3">Detections per person:</div>
            <DetectionAggregate
              :detections="detectedPersonCount"
              v-if="detectedPersonLength" />
          </div>
        </v-card-item>
      </v-card>
      <v-card elevation="6">
        <v-card-item>
          <div class="text-h4 mt-6">Detected persons with Thumbnails</div>

          <v-data-table
            :items="detectedPersonThumbs"
            v-if="!personLoading"
            class="asset-detections">
            <template v-slot:item.thumbnails="{ value }">
              <img
                :src="v"
                v-for="v in value"
                alt="Thumbnail"
                class="detection-image mx-2" />
            </template>
          </v-data-table>
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
import DetectionAggregate from './DetectionAggregate.vue';
import { type Asset } from '@/models/Asset.model';
import type { AxiosResponse } from 'axios';
import { onMounted } from 'vue';
import type { Ref } from 'vue';
import type { Person } from '@/models/Person.model';
import { computed } from 'vue';

const props = defineProps<{ uid: string }>();

const { uid } = props;

const loading = ref(true);
const personLoading = ref(true);

const assetMaxWidth = ref(0);

const asset: Ref<Asset> = ref(<Asset>{});

const persons: Ref<Person[]> = ref([]);

const getAssetDetail = async () => {
  try {
    const assetResponse: AxiosResponse<{ data: Asset }> =
      await API.get_asset_detail(uid);
    asset.value = assetResponse.data.data;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const getPersonInfo = async () => {
  try {
    const personResponse: AxiosResponse<{ data: Person[] }> =
      await API.get_person_info(uid);
    persons.value = personResponse.data.data;
  } catch (error) {
    console.error(error);
  } finally {
    personLoading.value = false;
  }
};

onMounted(() => {
  assetMaxWidth.value = document.getElementById('asset')!.offsetWidth - 50;
  getAssetDetail();
  getPersonInfo();
});

const detectedPersonThumbs = computed(() => {
  const detections: Person[] = persons.value;
  const compiledDetections: { name: string; thumbnails: string[] }[] = [];
  detections.forEach((current) => {
    const index = compiledDetections.findIndex((p) => p.name === current.name);
    if (index > -1) {
      const thumbs = [
        ...compiledDetections[index].thumbnails,
        ...current.appearances.map((a) => a.thumbnail)
      ];
      compiledDetections[index].thumbnails = thumbs;
    } else {
      compiledDetections.push({
        name: current.name,
        thumbnails: [...current.appearances.map((a) => a.thumbnail)]
      });
    }
  });

  return compiledDetections;
});

const detectedPersonCount = computed(() => {
  const detections: Person[] = persons.value;
  const detectionCount: { name: string; count: number }[] = [];
  detections.forEach((current) => {
    const index = detectionCount.findIndex((p) => p.name === current.name);
    if (index > -1) {
      const counts =
        detectionCount[index].count +
        current.appearances.reduce((accumulator) => (accumulator += 1), 0);

      detectionCount[index].count = counts;
    } else {
      detectionCount.push({
        name: current.name,
        count: current.appearances.reduce(
          (accumulator) => (accumulator += 1),
          0
        )
      });
    }
  });
  return detectionCount;
});

const detectedPersonLength = computed(() => {
  return detectedPersonCount.value.length > 0;
});
</script>
<style lang="scss" scoped>
.detection-image {
  border: 1px solid #fff;
  border-radius: 5px;
}
</style>
