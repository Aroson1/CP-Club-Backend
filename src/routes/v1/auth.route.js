import { Router } from "express";
import passport from "passport";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import db from "../../models/index.js";

const { User } = db.db;
const router = Router();

// Generate a new refresh token
const generateRefreshToken = () => {
  return crypto.randomBytes(40).toString("hex");
};

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  (req, res) => {
    const user = req.user;

    // Create access token (short-lived)
    const accessToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role || "user",
        userName: user.userName,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Short expiration time
    );

    // Create refresh token (long-lived)
    const refreshToken = generateRefreshToken();

    // Update user with the new refresh token
    user.refreshToken = refreshToken;
    user.save();

    // Redirect to frontend with tokens
    res.redirect(
      `${process.env.FRONTEND_URL}/auth/callback?accessToken=${accessToken}&refreshToken=${refreshToken}`
    );
  }
);

// Endpoint to refresh access token
router.post("/refresh-token", async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token is required" });
  }

  try {
    // Find user with this refresh token
    const user = await User.findOne({ where: { refreshToken } });

    if (!user) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    // Create new access token
    const accessToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role || "user",
        userName: user.userName,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ accessToken });
  } catch (error) {
    console.error("Refresh token error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/logout", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Invalidate refresh token
      const user = await User.findByPk(decoded.id);
      if (user) {
        user.refreshToken = null;
        await user.save();
      }
    } catch (error) {
      // Token verification failed, but we'll continue with logout
      console.error("Token verification error during logout:", error);
    }
  }

  res.status(200).json({ message: "Logged out successfully" });
});

// Check current user's authentication status
router.get("/me", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.id);
    if (user) {
      decoded.role = user.role;
    }
    console.log(user);
    res.status(200).json({ user: decoded });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired", expired: true });
    }
    res.status(401).json({ message: "Invalid token" });
  }
});

export default router;
