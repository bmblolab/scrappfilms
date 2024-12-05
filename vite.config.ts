import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  base: "/scrappfilms/", // Reemplaza con el nombre de tu repositorio
});
