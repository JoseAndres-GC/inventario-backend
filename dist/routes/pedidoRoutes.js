"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pedidoController_1 = require("../controllers/pedidoController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
router.post("/", authMiddleware_1.verificarToken, pedidoController_1.registrarPedido);
router.get("/", authMiddleware_1.verificarToken, pedidoController_1.obtenerPedidos);
exports.default = router;
