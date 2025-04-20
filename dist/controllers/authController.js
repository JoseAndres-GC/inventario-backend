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
exports.login = void 0;
const Usuario_1 = __importDefault(require("../models/Usuario"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield Usuario_1.default.findOne({ email });
        if (!user) {
            res.status(404).json({ msg: "Usuario no encontrado" });
            return;
        }
        if (!user.password) {
            res.status(400).json({ msg: "Contraseña no establecida" });
            return;
        }
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ msg: "Contraseña incorrecta" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id, rol: user.rol }, process.env.JWT_SECRET, { expiresIn: "2h" });
        res.json({ token, user });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error del servidor" });
    }
});
exports.login = login;
