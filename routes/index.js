import express from "express";
import users from "./users";

var router = express.Router();

// Get DB
// req.app.get('db');
router.use("/users", users);
router.get("/health-check", function(req, res, next) {
  res.json({ message: "Server is alive" });
});

export default router;