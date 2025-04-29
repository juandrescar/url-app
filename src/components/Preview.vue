<template>
  <v-row>
    <v-col cols="12" sm="10" class="pr-0">
      <v-card
        class="my-4"
        rel="noopener"
        :subtitle="details.domain"
        :title="details.title"
        min-height="200"
      >
        <template v-slot:prepend>
          <v-avatar color="blue-darken-2">
            <v-img
              target="_blank"
              :href="details.original_url"
              :src="details.favicon"></v-img>
          </v-avatar>
        </template>
        <v-card-text>
          {{ details.description }}
          <p>{{ details.original_url }}</p>

        </v-card-text>

        <v-card-actions>
          {{ props.details.url }}
          <v-btn
            @click="copyUrl"
          >
            copiar link
          </v-btn>
        </v-card-actions>
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

    <v-snackbar v-model="showSnackbar" :timeout="3000" location="top" color="success">
      URL copiada con éxito
    </v-snackbar>
  </v-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Details } from '../types';

  const props = defineProps<{
    details: Details
  }>()

  const showSnackbar = ref(false);

  async function copyUrl() {
    try {
      await navigator.clipboard.writeText(props.details.url);
      showSnackbar.value = true;
    } catch (err) {
      console.error('Error al copiar la URL:', err);
    }
  }
</script>
