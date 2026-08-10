import {Router} from "express";
import {SpecsController} from "../controllers/specs.controller.ts";

const router = Router();
const specsController = new SpecsController();

router.get('/cpu', specsController.getCpuInfo.bind(specsController));
router.get('/memory', specsController.getMemoryInfo.bind(specsController));
router.get('/system', specsController.getSystemInfo.bind(specsController));

export default router;