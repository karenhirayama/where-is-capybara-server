import dotenv from "dotenv";

import { Bounds } from "../types";

dotenv.config();


export const capybaraBounds: Bounds = {
    x1: Number(process.env.CAPYBARA_X1),
    y1: Number(process.env.CAPYBARA_Y1),
    x2: Number(process.env.CAPYBARA_X2),
    y2: Number(process.env.CAPYBARA_Y2),
}