<template>
  <v-card
    class="mb-3"
  >
    <v-card-text
      class="pb-0"
    >
      <h2 class="text-h6 mb-1">Total de visitas: {{ total }}</h2>
    </v-card-text>
    <TopBrowserComponent title="Navegadores" :items="items"/>
    <TopLocationComponent title="Paises" :items="items"/>
  </v-card> 
</template>

<script setup lang="ts">
  import TopBrowserComponent from "../components/TopBrowserComponent.vue";
  import TopLocationComponent from "../components/TopLocationComponent.vue";
  import type { Stat } from '../types';

  defineProps<{
    total: number
    items: Stat[]
  }>()
</script>
