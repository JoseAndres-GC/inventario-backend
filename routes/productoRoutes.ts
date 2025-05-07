import express from "express";
import {
  obtenerProductos,
  crearProducto,
  obtenerProductoPorId,
  actualizarProducto,
} from "../controllers/productoController";
import { verificarToken, soloAdmin } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/", verificarToken, obtenerProductos);
router.get("/:id", verificarToken, obtenerProductoPorId);
router.post("/", verificarToken, soloAdmin, crearProducto);
router.put("/:id", verificarToken, soloAdmin, actualizarProducto);

export default router;
