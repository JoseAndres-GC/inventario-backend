import { RequestHandler } from "express";
import Producto from "../models/Producto";

export const obtenerProductos: RequestHandler = async (_, res) => {
  const productos = await Producto.find();
  res.json(productos);
};

export const crearProducto: RequestHandler = async (req, res) => {
  const nuevo = new Producto(req.body);
  await nuevo.save();
  res.json(nuevo);
};

export const obtenerProductoPorId: RequestHandler = async (req, res) => {
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

export const actualizarProducto: RequestHandler = async (req, res) => {
  try {
    const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!producto) {
      res.status(404).json({ msg: "Producto no encontrado" });
      return;
    }

    res.json(producto);
  } catch (error) {
    res.status(500).json({ msg: "Error al actualizar producto" });
  }
};

export const eliminarProducto: RequestHandler = async (req, res) => {
  try {
    const producto = await Producto.findByIdAndDelete(req.params.id);
    if (!producto) {
      res.status(404).json({ msg: "Producto no encontrado" });
      return; 
    }
    res.json({ msg: "Producto eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error del servidor" });
  }
};