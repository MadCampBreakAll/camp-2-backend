import express from "express";

let router = express.Router();

router.get("/", (req, res) => {
  res.json({ status: "OK" });
});

export default router;
