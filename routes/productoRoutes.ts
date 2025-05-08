import express from "express";
import {
  obtenerProductos,
  crearProducto,
  obtenerProductoPorId,
  actualizarProducto,
  eliminarProducto,
} from "../controllers/productoController";
import { verificarToken, soloAdmin } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/", verificarToken, obtenerProductos);
router.get("/:id", verificarToken, obtenerProductoPorId);
router.post("/", verificarToken, soloAdmin, crearProducto);
router.put("/:id", verificarToken, soloAdmin, actualizarProducto);
router.delete("/:id", verificarToken, soloAdmin, eliminarProducto);

export default router;
