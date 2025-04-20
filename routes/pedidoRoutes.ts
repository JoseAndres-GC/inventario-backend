import express from "express";
import {
  registrarPedido,
  obtenerPedidos,
} from "../controllers/pedidoController";
import { verificarToken } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/", verificarToken, registrarPedido);
router.get("/", verificarToken, obtenerPedidos);

export default router;
