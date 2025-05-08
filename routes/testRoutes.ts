import express from "express";

const router = express.Router();

// Ruta simple de prueba para verificar si el backend responde
router.get("/ping", (_, res) => {
  res.json({ status: "ok", mensaje: "El backend está funcionando correctamente" });
});

export default router;
