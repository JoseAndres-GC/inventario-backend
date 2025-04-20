import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Usuario from "./models/Usuario";

dotenv.config();

async function crearAdmin() {
  await mongoose.connect(process.env.MONGODB_URI!);

  const hashedPassword = await bcrypt.hash("Ctr3107", 10);

  const admin = new Usuario({
    nombre: "Administrador",
    email: "admin@gmail.com",
    password: hashedPassword,
    rol: "admin",
  });

  await admin.save();
  console.log("✅ Usuario admin creado correctamente");
  mongoose.disconnect();
}

crearAdmin();
