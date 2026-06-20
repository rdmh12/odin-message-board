import { Router } from "express";

import * as controller from "../controllers/messages.js";

const router = Router();

router.get("/", controller.getAll);
router.get("/new", controller.getNew);
router.post("/new", controller.postNew);

export default router;
