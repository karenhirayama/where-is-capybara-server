import { Router } from "express";

import { ScoreController } from "../controllers/scoreController";

const router = Router()

router.post('/submit', ScoreController.submitScore)

export default router