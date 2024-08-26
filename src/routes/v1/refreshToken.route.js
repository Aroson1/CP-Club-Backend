import express from "express";
import jwt from "jsonwebtoken";
import db from "../../models/index.js";

const { User } = db.db;
const router = express.Router();

router.post("/", async (req, res) => {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

    const user = await User.findOne({ where: { id: decoded.id, refreshToken } });
    if (!user) return res.status(403).json({ message: "Forbidden" });

    const accessToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.json({ accessToken });
  } catch (error) {
    res.status(403).json({ message: "Forbidden" });
  }
});

export default router;
