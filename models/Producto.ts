import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  cantidad: { type: Number, required: true },
  imagen: { type: String, required: true },
  precio: { type: Number, required: true },
  medida: { type: String, required: true },
  estado: { type: String, enum: ["Activo", "Inactivo"], default: "Activo" },
});

export default mongoose.model("Producto", productoSchema);
