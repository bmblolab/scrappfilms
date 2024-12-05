import express from "express";
import cors from "cors";
import axios from "axios";
import * as cheerio from "cheerio";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Ruta para realizar scraping
app.get("/api/scrape", async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "Falta la URL en la solicitud." });
  }

  try {
    // Obtener el contenido HTML
    const response = await axios.get(url as string);
    const html = response.data;

    // Cargar el HTML en Cheerio
    const $ = cheerio.load(html);

    // Extraer datos
    const subscriptionBlock = $("div.sub-title").text().trim();
    const platforms: string[] = [];
    $("div.sub-title ~ a[target='_blank']").each((_, el) => {
      const title = $(el).attr("title");
      if (title) platforms.push(title);
    });

    // Devolver los datos como JSON
    res.json({
      subscription: subscriptionBlock,
      platforms,
    });
  } catch (error) {
    console.error("Error durante el scraping:", error);
    res.status(500).json({ error: "Error al realizar el scraping." });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
