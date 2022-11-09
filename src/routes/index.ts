import cors from "cors";
import { Router } from "express";
import usersRoute from "./Users.routes";

const router = Router();

router.use(
  cors({
    allowedHeaders: "GET, POST, OPTIONS, PUT, DELETE",
    origin: process.env.EXPRESS_ALLOW_ORIGIN,
  })
);

router.use("/usuarios", usersRoute);

export default router;
