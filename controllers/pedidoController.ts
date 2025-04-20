import { Request, Response } from "express";
import Pedido from "../models/Pedido";
import Producto from "../models/Producto";
import { sendWhatsApp } from "../utils/whatsapp";

export const registrarPedido = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { productoId, cantidad, trabajadorId } = req.body;

    const producto = await Producto.findById(productoId);
    if (
      !producto ||
      typeof producto.cantidad !== "number" ||
      producto.cantidad < cantidad
    ) {
      res.status(400).json({ msg: "Stock insuficiente" });
      return;
    }

    producto.cantidad -= cantidad;
    await producto.save();

    const pedido = new Pedido({
      producto: productoId,
      cantidad,
      trabajador: trabajadorId,
    });

    await pedido.save();
    await sendWhatsApp(`📦 Retiro: ${cantidad}x ${producto.nombre}`);

    res.json({ msg: "Pedido guardado", pedido });
  } catch (error) {
    res.status(500).json({ msg: "Error al registrar pedido" });
  }
};

export const obtenerPedidos = async (
  _: Request,
  res: Response
): Promise<void> => {
  try {
    const pedidos = await Pedido.find().populate("producto trabajador");
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener pedidos" });
  }
};
