<template>
  <v-card
    class="mx-auto" width="700"
  >
    <v-card-title>Login Form</v-card-title>
    <v-form v-model="isValid" @submit.prevent="handleRegister">
      <v-card-text>
        <v-text-field
          label="Nombre"
          v-model="name"
          :rules="nameRules"
          required
        ></v-text-field>

        <v-text-field
          label="Email"
          v-model="email"
          :rules="emailRules"
          required
        ></v-text-field>

        <v-text-field
          label="Password"
          v-model="password"
          type="password"
          :rules="passwordRules"
          required
        ></v-text-field>

        <v-text-field
          label="Confirmar Contraseña"
          v-model="password_confirmation"
          type="password"
          :rules="confirmPassword"
          required
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn 
          color="primary"
          :disabled="!isValid"
          type="submit"
        >
          Login
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import Auth from "../services/auth";
import { nameRules, emailRules, passwordRules, confirmPasswordRules } from "../rules"
import { useRouter } from 'vue-router'
import type { AxiosError } from 'axios';

const name = ref('')
const email = ref('')
const password = ref('')
const password_confirmation = ref('')
const error = ref('')
const router = useRouter()
const isValid = ref(true)

const confirmPassword = computed(() => [
  confirmPasswordRules(password.value)
])

async function handleRegister() {
  try {
    await Auth.register({
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: password_confirmation.value
    })
    router.push('/')
  } catch (err) {
    const axiosErr = err as AxiosError<{ message: string }>
    error.value = axiosErr.response?.data?.message || 'Error al registrarse'
  }
}
</script>
