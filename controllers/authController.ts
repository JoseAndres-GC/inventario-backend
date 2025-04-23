import { Request, Response } from "express";
import Usuario from "../models/Usuario";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await Usuario.findOne({ email });

    if (!user) {
      res.status(404).json({ msg: "Usuario no encontrado" });
      return;
    }

    if (!user.password) {
      res.status(400).json({ msg: "Contraseña no establecida" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ msg: "Contraseña incorrecta" });
      return;
    }

    const token = jwt.sign(
      { id: user._id, rol: user.rol },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    res.json({ token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error del servidor" });
  }
};
