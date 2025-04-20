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
exports.obtenerProductoPorId = exports.crearProducto = exports.obtenerProductos = void 0;
const Producto_1 = __importDefault(require("../models/Producto"));
const obtenerProductos = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productos = yield Producto_1.default.find();
    res.json(productos);
});
exports.obtenerProductos = obtenerProductos;
const crearProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nuevo = new Producto_1.default(req.body);
    yield nuevo.save();
    res.json(nuevo);
});
exports.crearProducto = crearProducto;
const obtenerProductoPorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const producto = yield Producto_1.default.findById(req.params.id);
        if (!producto) {
            res.status(404).json({ msg: "Producto no encontrado" });
            return;
        }
        res.json(producto);
    }
    catch (error) {
        res.status(500).json({ msg: "Error del servidor" });
    }
});
exports.obtenerProductoPorId = obtenerProductoPorId;
