"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const productoRoutes_1 = __importDefault(require("./routes/productoRoutes"));
const pedidoRoutes_1 = __importDefault(require("./routes/pedidoRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/productos", productoRoutes_1.default);
app.use("/api/pedidos", pedidoRoutes_1.default);
app.use("/api/auth", authRoutes_1.default);
mongoose_1.default
    .connect(process.env.MONGODB_URI)
    .then(() => {
    console.log("✅ Conectado a MongoDB");
    app.listen(process.env.PORT, () => console.log(`🚀 Servidor corriendo en el puerto ${process.env.PORT}`));
})
    .catch((err) => console.error("❌ Error conectando MongoDB:", err));
