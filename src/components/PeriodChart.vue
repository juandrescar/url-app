<template>
  <v-tabs v-model="selectedTab" grow>
        <v-tab value="daily">Diario</v-tab>
        <v-tab value="weekly">Semanal</v-tab>
        <v-tab value="monthly">Mensual</v-tab>
      </v-tabs>

      <v-progress-circular v-if="loading" indeterminate color="primary" class="ma-4" />

      <StatsChart v-if="!loading" :labels="chartLabels" :data="chartValues" />
</template>

<script setup lang="ts">
  import { ref, watchEffect } from 'vue';
  import StatsChart from '../components/StatsChart.vue';
  import stats from "../apis/stats";

  const selectedTab = ref('daily');
  const statsData = ref<{ period: string; visits: number }[]>([]);
  const loading = ref(false);
  const chartLabels = ref<string[]>([]);
  const chartValues = ref<number[]>([]);

  const fetchStats = async () => {
    loading.value = true;
    try {
      const response = await stats.get(`/stats/${selectedTab.value}?date=${new Date().toISOString().split('T')[0]}`);
      statsData.value = response.data;

      chartLabels.value = statsData.value.map((s) => s.period);
      chartValues.value = statsData.value.map((s) => s.visits);
    } catch (error) {
      console.error('Error al obtener estadísticas:', error);
    } finally {
      loading.value = false;
    }
  };

  watchEffect(fetchStats);
</script>