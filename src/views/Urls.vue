<template>
  <v-container>
    <h1>🔗 URLs</h1>
    <v-btn to="/urls/create">Agregar</v-btn>
    <v-list>
      <v-list-item 
        v-for="url in urls" 
        :key="url.id" 
        :to="'/urls/' + url.id"
        :title="getTitle(url.title)"
        :prepend-avatar="getFavicon(url.favicon)"
        :subtitle=url.short_code
      >
        <template v-slot:prepend>
          <v-avatar color="grey-lighten-1">
            <v-img
              v-if="url.favicon"
              alt="favicon"
              :src=url.favicon
            ></v-img>
            <v-icon v-else color="white">mdi-alert-circle-outline</v-icon>
          </v-avatar>
        </template>
      </v-list-item>
    </v-list>
  </v-container>
</template>
  
<script lang="ts">
  import urls from '../apis/urls';

  const defaultFavicon = '/images/default-favicon.png'

  interface Url {
    id: number;
    original_url: string;
    short_code: string;
    title: string,
    favicon: string
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
        const response = await urls.index();
        this.urls = response.data.data;
      } catch (error) {
        console.error("Error al obtener URLs", error);
      } finally {
        this.loading = false;
      }
    },
    methods: {
      getFavicon(favicon:string) {
        return favicon && favicon.trim() !== '' ? favicon : defaultFavicon
      },
      getTitle(title:string) {
        return title && title.trim() !== '' ? title : "Sin titulo"
      }
    }
  }
</script>