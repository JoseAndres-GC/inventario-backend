import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Usuario from "./models/Usuario";

dotenv.config();

async function run() {
  await mongoose.connect(process.env.MONGODB_URI!);

  const hashed = await bcrypt.hash("123456", 10);

  const nuevo = new Usuario({
    nombre: "Trabajador",
    email: "trabajador@gmail.com",
    password: hashed,
    rol: "trabajador",
  });

  await nuevo.save();
  console.log("✅ Usuario creado correctamente");
  mongoose.disconnect();
}

run();
