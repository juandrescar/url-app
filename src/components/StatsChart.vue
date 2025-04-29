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

  function getCssVariableRgb(name: string): string {
    const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
    return `rgb(${value})`
  }

  const color = getCssVariableRgb('--v-theme-primary')
  const background = getCssVariableRgb('--v-theme-background')

  const chartData = {
    labels: props.labels  as string[],
    datasets: [
      {
        label: 'Visitas',
        data: props.data as number[],
        borderColor: color,
        backgroundColor: background,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' as const, },
      title: { display: true, text: 'Estadísticas de visitas' },
    },
    scales: {
      x: {
        beginAtZero: true,
        min: 0,
        ticks: {
          precision: 0,
        },
      },
    },
  };
</script>