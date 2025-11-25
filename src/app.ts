import express from "express";
import session from "express-session";

import gameRouter from "./routes/game";
import scoreRouter from "./routes/scores";

import config from "./config/config";

const app = express();

app.use(
  session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
      httpOnly: true,
    },
  })
);

app.use(express.json());

app.use("/api/game", gameRouter);
app.use("/api/scores", scoreRouter);

app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date() });
});

export default app;
