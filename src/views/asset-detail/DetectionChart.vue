<template>
  <div class="detection-chart">
    <h4 class="text-h4 mb-6 text-center">Detections per person:</h4>
    <canvas id="detectionChart"></canvas>
  </div>
</template>

<script setup lang="ts">
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { onMounted } from 'vue';

const props = defineProps<{ detections: { name: string; count: number }[] }>();

const { detections } = props;

Chart.register(...registerables);
Chart.register(ChartDataLabels);

onMounted(() => {
  const ctx = <HTMLCanvasElement>document.getElementById('detectionChart');
  new Chart(ctx, {
    data: {
      labels: detections.map((d) => `${d.name} (${d.count})`),
      datasets: [
        {
          label: 'Detections: ',
          data: detections.map((d) => d.count),
          backgroundColor: detections.map((n) => getSectionColor(n.count)),
          hoverOffset: 4
        }
      ]
    },
    type: 'doughnut',
    options: {
      plugins: {
        datalabels: {
          color: 'white',
          font: {
            weight: 'bold'
          },
          formatter: function (value, context) {
            return value > 3
              ? context.chart.data.labels![context.dataIndex]
              : value;
          }
        }
      }
    }
  });
});

/**
 * Sets a random color based on count
 *
 * @param {number} count the number of times the person was detected
 * @returns {string}
 */
const getSectionColor = (count: number) => {
  const rand = Math.floor(Math.random() * 2);
  if (count > 3) {
    switch (rand) {
      case 1:
        return '#F06292';
      case 2:
        return '#D81B60';
      default:
        return '#FF4081';
    }
  } else return '#BDBDBD';
};
</script>
