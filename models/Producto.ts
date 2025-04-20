import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  cantidad: { type: Number, required: true },
  imagen: { type: String, required: true },
});

export default mongoose.model("Producto", productoSchema);
