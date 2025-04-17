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
        v-for="(count, browser) in browserCounts"
        :key="browser"
        :prepend-icon="getBrowserIcon(browser)"
        variant="outlined"
        label
      >
        {{ browser }}
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

  const icons: Record<string, string> = {
    "Google Chrome": "mdi-google-chrome",
    Chrome: "mdi-google-chrome",
    Firefox: "mdi-firefox",
    Safari: "mdi-apple-safari",
    "Microsoft Edge": "mdi-microsoft-edge",
    Edge: "mdi-microsoft-edge",
    Opera: "mdi-opera",
  }

  function getBrowserIcon(browser: string): string {
    return icons[browser] || "mdi-web"
  }

  const browserCounts = computed(() => {
    const acc: Record<string, number> = {}
    for (const item of props.items) {
      acc[item.browser] = (acc[item.browser] || 0) + 1
    }
    return acc
  })
</script>
