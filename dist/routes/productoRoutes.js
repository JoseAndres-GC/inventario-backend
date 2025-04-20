"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productoController_1 = require("../controllers/productoController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
router.get("/", authMiddleware_1.verificarToken, productoController_1.obtenerProductos);
router.get("/:id", authMiddleware_1.verificarToken, productoController_1.obtenerProductoPorId);
router.post("/", authMiddleware_1.verificarToken, authMiddleware_1.soloAdmin, productoController_1.crearProducto);
exports.default = router;
