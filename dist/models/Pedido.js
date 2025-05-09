"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const pedidoSchema = new mongoose_1.default.Schema({
    producto: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Producto" },
    cantidad: Number,
    trabajador: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Usuario" },
}, { timestamps: true });
exports.default = mongoose_1.default.model("Pedido", pedidoSchema);
