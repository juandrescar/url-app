<template>
  <v-container>
    <h1>🔗 URLs</h1>
    <v-list>
      <v-list-item v-for="url in urls" :key="url.id" :to="'/urls/' + url.id">
        {{ url.original_url }}
      </v-list-item>
    </v-list>
  </v-container>
</template>
  
<script lang="ts">
  import urls from "../apis/urls";

  interface Url {
    id: number;
    original_url: string;
    short_code: string;
  }

  export default {
    data() {
      return {
        urls: [] as Url[],
        loading: true,
      };
    },
    async created() {
    try {
         const response = await urls.get("/");
         
        this.urls = response.data.data;
        console.log(this.urls);
      } catch (error) {
        console.error("Error al obtener URLs", error);
      } finally {
        this.loading = false;
      }
    },
  };
</script>