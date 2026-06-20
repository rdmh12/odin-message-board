import { Router } from "express";

import * as controller from "../controllers/messages.js";

const router = Router();

router.use("/", controller.getAll);

export default router;
