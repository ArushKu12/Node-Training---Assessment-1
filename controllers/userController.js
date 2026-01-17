import { UserModel } from "../models/UserModel.js";
import { v4 as uuid } from "uuid";

export const register = (req, res) => {
  const { email, password } = req.body;

  if (UserModel.findByEmail(email)) {
    return res.send("User already exists");
  }

  UserModel.add({ id: uuid(), email, password });
  res.redirect("/login");
};

export const login = (req, res) => {
  const { email, password } = req.body;
  const user = UserModel.findByEmail(email);

  if (!user || user.password !== password) {
    return res.send("Invalid credentials");
  }

  req.session.user = user;
  res.redirect("/jobs");
};

export const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};
