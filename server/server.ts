import express, { Request, Response } from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// Ruta de ejemplo para manejar solicitudes
app.get("/api/scrape", async (req: Request, res: Response) => {
  try {
    // Simulación de scraping (sustituye con tu lógica real)
    const data = { subscription: "Suscripción", platforms: ["Netflix", "Max"] };

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
});

// Inicia el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
