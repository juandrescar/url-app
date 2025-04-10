<template>
  <Line :data="chartData" :options="chartOptions" />
</template>

<script setup lang="ts">
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
} from 'chart.js';
import { Line } from 'vue-chartjs';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, Filler);

const props = defineProps({
  labels: Array,
  data: Array,
});

const chartData = {
  labels: props.labels  as string[],
  datasets: [
    {
      label: 'Visitas',
      data: props.data as number[],
      borderColor: '#3f51b5',
      backgroundColor: '#3f51b580',
      fill: true,
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { position: 'top' },
    title: { display: true, text: 'Estadísticas de visitas' },
  },
};
</script>