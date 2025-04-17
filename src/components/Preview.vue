<template>
  <v-row>
    <v-col cols="12" sm="10" class="pr-0">
      <v-card
        append-icon="mdi-link"
        class="my-4"
        :href="details.original_url"
        rel="noopener"
        target="_blank"
        :subtitle="details.domain"
        :title="details.title"
        min-height="200"
      >
        <template v-slot:prepend>
          <v-avatar color="blue-darken-2">
            <v-img :src="details.favicon"></v-img>
          </v-avatar>
        </template>
        <v-card-text>{{ details.description }}</v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" sm="2" class="pl-0 pb-0">
      <v-card class="my-4">
        <v-img
          :src="details.image"
          cover
          :height="200"
          aspect-ratio="1/1"
        />
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import type { Details } from '../types';

  defineProps<{
    details: Details
  }>()
</script>
