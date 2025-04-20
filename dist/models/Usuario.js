"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const usuarioSchema = new mongoose_1.default.Schema({
    nombre: String,
    email: { type: String, unique: true },
    password: String,
    rol: { type: String, enum: ["admin", "trabajador"], default: "trabajador" },
});
exports.default = mongoose_1.default.model("Usuario", usuarioSchema);
