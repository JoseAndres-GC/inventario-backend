"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerPedidos = exports.registrarPedido = void 0;
const Pedido_1 = __importDefault(require("../models/Pedido"));
const Producto_1 = __importDefault(require("../models/Producto"));
const whatsapp_1 = require("../utils/whatsapp");
const registrarPedido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productoId, cantidad, trabajadorId } = req.body;
        const producto = yield Producto_1.default.findById(productoId);
        if (!producto ||
            typeof producto.cantidad !== "number" ||
            producto.cantidad < cantidad) {
            res.status(400).json({ msg: "Stock insuficiente" });
            return;
        }
        producto.cantidad -= cantidad;
        yield producto.save();
        const pedido = new Pedido_1.default({
            producto: productoId,
            cantidad,
            trabajador: trabajadorId,
        });
        yield pedido.save();
        yield (0, whatsapp_1.sendWhatsApp)(`📦 Retiro: ${cantidad}x ${producto.nombre}`);
        res.json({ msg: "Pedido guardado", pedido });
    }
    catch (error) {
        res.status(500).json({ msg: "Error al registrar pedido" });
    }
});
exports.registrarPedido = registrarPedido;
const obtenerPedidos = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pedidos = yield Pedido_1.default.find().populate("producto trabajador");
        res.json(pedidos);
    }
    catch (error) {
        res.status(500).json({ msg: "Error al obtener pedidos" });
    }
});
exports.obtenerPedidos = obtenerPedidos;
