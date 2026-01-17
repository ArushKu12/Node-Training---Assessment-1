import "./config/env.js"

import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import { trackLastVisit } from "./middlewares/lastVisitMiddleware.js";

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());

app.use(
  session({
    secret: "jobportal_secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(trackLastVisit);

app.use(authRoutes);
app.use(jobRoutes);

app.use((req, res) => {
  res.status(404).render("error/404");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
