<template>
  <v-card
    class="mx-auto" width="700"
  >
    <v-card-title>Crear Url</v-card-title>
    <v-form v-model="isValid" @submit.prevent="handleCreate">
      <v-card-text>
        <v-text-field
          label="Url"
          v-model="url"
          :rules="urlRules"
          required
        ></v-text-field>

      </v-card-text>
      <v-card-actions>
        <v-btn 
          color="primary"
          :disabled="!isValid"
          type="submit"
        >
          Crear
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>
  
<script setup lang="ts">
  import { ref } from 'vue'
  import { urlRules } from "../rules"
  import { useRouter } from 'vue-router'
  import { AxiosError } from 'axios'
  import urls from '../services/urls'

  const url = ref('')
  const error = ref('')
  const router = useRouter()
  const isValid = ref(true)

  async function handleCreate() {
    try {
      await urls.create(url.value)
      router.push('/urls')
    } catch (err) {
      const axiosErr = err as AxiosError<{ message: string }>
      error.value = axiosErr.response?.data?.message || 'Error al registrarse'
    }
  }
</script>