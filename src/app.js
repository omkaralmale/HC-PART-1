import express, { json, urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

// define CORS policies
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

// cookies
app.use(cookieParser());

app.use(
  json({
    limit: "20kb",
  })
);

app.use(urlencoded({ extended: true }));

export default app;
