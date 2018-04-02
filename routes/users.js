import express from "express";
import { validateEmail } from "../utils/userHelpers";

const router = express.Router();

// Get DB
// req.app.get('db');
router.post("/checkEmail", validateEmail, (req, res, next) => {
  res.send({
    available: true
  });
});

export default router;
