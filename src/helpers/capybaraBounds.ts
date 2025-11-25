import dotenv from "dotenv";

import { Bounds } from "../types";

dotenv.config();

export const capybaraBounds: Bounds = {
    x: Number(process.env.CAPYBARA_X),
    y: Number(process.env.CAPYBARA_Y),
}