<template>
  <div id="asset">
    <DetailLoading :is-loading="loading" />

    <div v-if="!loading">
      <v-card v-if="!assetError" elevation="6" class="pa-4 my-4" color="white">
        <v-card-item>
          <div
            class="asset-title text-h4 pb-6 mb-6"
            v-text="`Title: ${asset.title}`"></div>
          <HeroAsset
            :media-url="asset.media_url"
            :thumbnail="asset.thumbnail"
            :height="asset.height"
            :width="asset.width"
            :asset-max-width="assetMaxWidth" />
          <HeroMeta
            :created="formatDate(asset.creation_date)"
            :duration="formatDuration(asset.duration)" />
        </v-card-item>
      </v-card>
      <v-card v-if="!personError" class="pa-4 my-4" color="white">
        <v-card-item>
          <DetectionChart
            v-if="detectedPersonLength"
            :detections="detectedPersonCount" />
          <v-progress-circular
            v-if="!detectedPersonLength"
            model-value="20"></v-progress-circular>
        </v-card-item>
      </v-card>
      <v-card v-if="!personError" elevation="6" class="pa-4 my-4" color="white">
        <v-card-item>
          <PersonDataTable
            v-if="detectedThumbsLength"
            :detected-person-thumbs="detectedPersonThumbs"
            :is-loading="personLoading" />
        </v-card-item>
      </v-card>
      <v-card v-if="personError">
        <v-card-item>
          <GeneralErrorBanner />
        </v-card-item>
      </v-card>
    </div>
    <v-container v-if="assetError && personError">
      <GeneralErrorBanner />
    </v-container>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import API from '@/api/API.const';
import DetailLoading from '@/loaders/DetailLoading.vue';
import GeneralErrorBanner from '@/components/GeneralErrorBanner.vue';
import HeroAsset from './HeroAsset.vue';
import HeroMeta from './HeroMeta.vue';
import PersonDataTable from './PersonDataTable.vue';
import DetectionChart from './DetectionChart.vue';
import { type Asset } from '@/models/Asset.model';
import type { AxiosResponse } from 'axios';
import { onMounted } from 'vue';
import type { Ref } from 'vue';
import type { Person } from '@/models/Person.model';
import { computed } from 'vue';
import HELPERS from '@/helpers/helpers.const';

const props = defineProps<{ uid: string }>();

const { uid } = props;

const loading = ref(true);
const personLoading = ref(true);
const assetError = ref('');
const personError = ref('');

const assetMaxWidth = ref(0);

const asset: Ref<Asset> = ref(<Asset>{});

const persons: Ref<Person[]> = ref([]);

const formatDate = HELPERS.formatDate;
const formatDuration = HELPERS.formatDuration;

/**
 * Gets the asset from the API and sets it to ref() variable
 *
 * @returns {void}
 */
const getAssetDetail = async () => {
  try {
    const assetResponse: AxiosResponse<{ data: Asset }> =
      await API.get_asset_detail(uid);
    asset.value = assetResponse.data.data;
  } catch (err) {
    assetError.value = (<Error>err).message;
  } finally {
    loading.value = false;
  }
};

/**
 * Gets the persons detected from the API and sets it to ref() variable
 *
 * @returns {void}
 */
const getPersonInfo = async () => {
  try {
    const personResponse: AxiosResponse<{ data: Person[] }> =
      await API.get_person_info(uid);
    persons.value = personResponse.data.data;
  } catch (err) {
    personError.value = (<Error>err).message;
  } finally {
    personLoading.value = false;
  }
};

onMounted(() => {
  assetMaxWidth.value = document.getElementById('asset')!.offsetWidth - 64; // padding around card;
  getAssetDetail();
  getPersonInfo();
});

/**
 * Computed function: Returns an array of persons:thumbnails
 *
 * @returns {{name: string, thumbnails: string[]}[]}
 */
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

/**
 * Computed function: Returns a sorted array of persons detected per times detected
 *
 * @returns {{name: string, count: number}[]}
 */
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
  return detectionCount.sort((a, b) => b.count - a.count);
});

/**
 * Computed function: Returns whether detected persons is truthy
 *
 * @returns {boolean}
 */
const detectedPersonLength = computed(() => {
  return detectedPersonCount.value.length > 0;
});

/**
 * Computed function: Returns whether detected thumbs is truthy
 *
 * @returns {boolean}
 */
const detectedThumbsLength = computed(() => {
  return detectedPersonThumbs.value.length > 0;
});
</script>
<style lang="scss" scoped>
.asset-title {
  border-bottom: 1px solid #ccc;
}
.detection-image {
  border: 1px solid #fff;
  border-radius: 5px;
}
</style>
