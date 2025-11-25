import { Router } from "express";
import { GameController } from "../controllers/gameController";

const router = Router();

router.post('/start', GameController.startGame)

router.post('/validate-position', GameController.validatePostion)

router.post('/complete', GameController.completeGame)

export default router