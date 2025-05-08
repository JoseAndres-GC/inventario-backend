import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import productoRoutes from "./routes/productoRoutes";
import pedidoRoutes from "./routes/pedidoRoutes";
import authRoutes from "./routes/authRoutes";
import testRoutes from "./routes/testRoutes";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/productos", productoRoutes);
app.use("/api/pedidos", pedidoRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);

mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => {
    console.log("✅ Conectado a MongoDB");
    app.listen(process.env.PORT, () =>
      console.log(`🚀 Servidor corriendo en el puerto ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error("❌ Error conectando MongoDB:", err));
