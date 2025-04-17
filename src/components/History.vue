<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :header-props="{ class: 'myDarkTheme bg-primary text-white' }"
  >
    <template #item="{ item, index }">
      <tr :class="index % 2 === 0 ? 'even-row' : 'odd-row'">
        <td>{{ item.browser }}</td>
        <td class="text-end">{{ item.location }}</td>
        <td class="text-end">{{ formatDate(item.createdAt) }}</td>
      </tr>
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
  import moment from 'moment';
  import type { DataTableHeader } from 'vuetify'
  import type { Stat } from '../types';

  defineProps<{
    items: Stat[]
  }>();

  const headers: DataTableHeader[] = [
    { title: 'Browser', align: 'start', key: 'browser' },
    { title: 'Lugar', align: 'end', key: 'location' },
    { title: 'Fecha', align: 'end', key: 'createdAt' }
  ]

  function formatDate(value: string | Date): string {
    return moment(String(value)).format('MM/DD/YYYY hh:mm')
  }
</script>

<style scoped>
  .even-row {
    background-color: rgb(var(--v-theme-background)) !important;
  }
  
  .odd-row {
    background-color: rgb(var(--v-theme-surface)) !important;
  }

  tr:hover {
    background-color: rgb(var(--v-theme-on-surface), 0.5) !important;
    cursor: pointer;
  }
</style>