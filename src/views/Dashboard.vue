<template>
  <v-container>
    <h1>📊 Dashboard</h1>
    <PeriodChart />
    <BrowserChart data-url="stats/top-browsers"  title="Navegador"/>
    <!-- <BrowserChart data-url="/stats/top-locations" title="Ubicación"/> -->
  </v-container>
</template>

<script setup lang="ts">
  import BrowserChart from '../components/BrowserChart.vue';
  import PeriodChart from '../components/PeriodChart.vue';
</script>
