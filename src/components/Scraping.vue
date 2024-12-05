<template>
  <div>
    <h1>Scraping con Axios y Cheerio</h1>
    <input v-model="url" placeholder="Ingresa una URL" />
    <button @click="scrape">Realizar Scraping</button>

    <div v-if="loading">Cargando...</div>

    <div v-if="data">
      <h2>Resultados:</h2>
      <p><strong>Suscripción:</strong> {{ data.subscription }}</p>
      <p><strong>Plataformas:</strong> {{ data.platforms.join(", ") }}</p>
    </div>

    <div v-if="error" style="color: red">Error: {{ error }}</div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import axios from "axios";

export default {
  setup() {
    const url = ref("");
    const loading = ref(false);
    const data = ref(null);
    const error = ref(null);

    const scrape = async () => {
      loading.value = true;
      error.value = null;
      data.value = null;

      try {
        const response = await axios.get("http://localhost:3000/api/scrape", {
          params: { url: url.value },
        });
        data.value = response.data;
      } catch (err) {
        error.value = err.message;
      } finally {
        loading.value = false;
      }
    };

    return { url, loading, data, error, scrape };
  },
};
</script>
