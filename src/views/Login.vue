<template>
  <v-card
    class="mx-auto" width="700"
  >
    <v-card-title>Login Form</v-card-title>
      <v-form v-model="isValid" @submit.prevent="handleLogin">
        <v-card-text>
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
                  :rules="passwordRequired"
                  required
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn 
            color="primary"
            :disabled="!isValid"
            type="submit"
          >
            Login - {{isValid}}
          </v-btn>
        </v-card-actions>
      </v-form>
    <p v-if="error">{{ error }}</p>
  </v-card>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import Auth from "../services/auth";
  import { emailRules, passwordRequired } from "../rules"
  import { useRouter } from 'vue-router'

  const emit = defineEmits(['login-success'])

  const email = ref('')
  const password = ref('')
  const error = ref('')
  const router = useRouter()
  const isValid = ref(true)

  async function handleLogin() {
    try {
      const response = await Auth.login({ email: email.value, password: password.value })
      localStorage.setItem('auth_token', response.data.access_token);
      emit('login-success')
      router.push('/')
    } catch (err) {
      error.value = 'Credenciales inválidas'
    }
  }
</script>
