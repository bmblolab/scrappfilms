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

// Define la interfaz para los datos de scraping
interface ScrapingResult {
  subscription: string;
  platforms: string[];
}

export default {
  setup() {
    const url = ref<string>(""); // El URL ingresado por el usuario
    const loading = ref<boolean>(false); // Estado de carga
    const data = ref<ScrapingResult | null>(null); // Datos del scraping
    const error = ref<string | null>(null); // Mensaje de error

    const scrape = async () => {
      loading.value = true;
      error.value = null;
      data.value = null;

      try {
        const response = await axios.get<ScrapingResult>(
          "http://localhost:3000/api/scrape",
          {
            params: { url: url.value },
          }
        );
        data.value = response.data; // TypeScript ahora reconoce las propiedades
      } catch (err: any) {
        error.value = err.message || "Error desconocido";
      } finally {
        loading.value = false;
      }
    };

    return { url, loading, data, error, scrape };
  },
};
</script>
