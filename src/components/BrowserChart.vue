<template>
  <div v-if="chartData">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { Bar } from 'vue-chartjs';
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
  } from 'chart.js';
  import stats from "../apis/stats";

  ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement)

  interface StatItem {
    browser?: string
    location?: string
    visits: number
  }

  const props = defineProps<{
    dataUrl: string,
    title: string
  }>()

  const chartData = ref()
  const chartOptions = {
    responsive: true,
    indexAxis: 'y' as const,
    plugins: {
      legend: { display: true },
      title: {
        display: true,
        text: getTitle(props.title),
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  }

  function getCssVariableRgb(name: string): string {
    const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
    return `rgb(${value})`
  }

  function getTitle(title: string): string {
    return `Visitas por ${title}`;
  }

  onMounted(async () => {
    const response = await stats.get(props.dataUrl);
    const data: StatItem[] = await response.data

    const labels = data.map((item) => item.browser ?? item.location)
    const values = data.map((item) => item.visits)
    const color = getCssVariableRgb('--v-theme-primary')

    chartData.value = {
      labels,
      datasets: [
        {
          label: 'Visitas',
          data: values,
          backgroundColor: color,
        },
      ],
    }
  })
</script>

<style scoped>
  div {
    padding: 1rem;
  }
</style>