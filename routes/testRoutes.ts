import { Router } from "express";
const router = Router();

router.get("/ping", (_, res) => {
  res.json({ status: "ok", mensaje: "El backend está funcionando correctamente" });
});

export default router;
