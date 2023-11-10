<template>
  <div class="detection-chart">
    <canvas id="detectionChart"></canvas>
  </div>
</template>

<script setup lang="ts">
import { Chart, registerables } from 'chart.js';
import { onMounted } from 'vue';

const props = defineProps<{ detections: { name: string; count: number }[] }>();

const { detections } = props;

Chart.register(...registerables);

onMounted(() => {
  const ctx = <HTMLCanvasElement>document.getElementById('detectionChart');
  new Chart(ctx, {
    data: {
      labels: detections.map((d) => d.name),
      datasets: [
        {
          label: 'Detections (By Person)',
          data: detections.map((d) => d.count),
          backgroundColor: detections.map(() => getSectionColor()),
          hoverOffset: 4
        }
      ]
    },
    type: 'doughnut'
  });
});

const getSectionColor = () => {
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
