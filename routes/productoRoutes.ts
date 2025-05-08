import express from "express";
import {
  obtenerProductos,
  crearProducto,
  obtenerProductoPorId,
} from "../controllers/productoController";
import { verificarToken, soloAdmin } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/", verificarToken, obtenerProductos);
router.get("/:id", verificarToken, obtenerProductoPorId);
router.post("/", verificarToken, soloAdmin, crearProducto);

export default router;
