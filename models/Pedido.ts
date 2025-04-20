import mongoose from "mongoose";

const pedidoSchema = new mongoose.Schema(
  {
    producto: { type: mongoose.Schema.Types.ObjectId, ref: "Producto" },
    cantidad: Number,
    trabajador: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" },
  },
  { timestamps: true }
);

export default mongoose.model("Pedido", pedidoSchema);
