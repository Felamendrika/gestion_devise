import { Router } from "express";
import TauxController from "../controller/tauxController.js";

const router = Router();
const tauxController = new TauxController();

router.get("/reel", tauxController.getTauxReel);
router.get("/marge", tauxController.getTauxAvecMarge);

router.post("/conversion", tauxController.conversion);

// route pour les fluctuations
router.get("/fluctuation", tauxController.getFluctuation);
// router.post("/fluctuation", tauxController.getFluctuation);

router.get("/populaire", tauxController.getPopularPairs);
export default router;
