<template>
  <v-card-text
    class="pt-0"
  >
    <h1 class="text-h6 mb-1">
      {{ title }}
    </h1>

    <div>
      <v-chip
        class="mr-1"
        v-for="(count, location) in locationCounts"
        :key="location"
        variant="outlined"
        label
      >
        {{ location }}
        <v-badge
          color="secondary"
          :content="count"
          inline
        ></v-badge>
      </v-chip>
    </div>
  </v-card-text>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import type { Stat } from '../types';

  const props = defineProps<{
    title: string
    items: Stat[]
  }>()

  const locationCounts = computed(() => {
    const acc: Record<string, number> = {}
    for (const item of props.items) {
      acc[item.location] = (acc[item.location] || 0) + 1
    }
    return acc
  })
</script>
