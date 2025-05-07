import { Request, Response } from "express";
import Producto from "../models/Producto";

export const obtenerProductos = async (
  _: Request,
  res: Response
): Promise<void> => {
  const productos = await Producto.find();
  res.json(productos);
};

export const crearProducto = async (
  req: Request,
  res: Response
): Promise<void> => {
  const nuevo = new Producto(req.body);
  await nuevo.save();
  res.json(nuevo);
};

export const obtenerProductoPorId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) {
      res.status(404).json({ msg: "Producto no encontrado" });
      return;
    }
    res.json(producto);
  } catch (error) {
    res.status(500).json({ msg: "Error del servidor" });
  }
};

export const actualizarProducto = async (req: Request, res: Response) => {
  const productoActualizado = await Producto.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!productoActualizado) {
    return res.status(404).json({ mensaje: "Producto no encontrado" });
  }

  res.json(productoActualizado);
};