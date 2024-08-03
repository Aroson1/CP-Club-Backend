import { Router } from "express";
import passport from "passport";

const router = Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    // successRedirect: "/login-done",
  }),
  (req, res) => {
    const user = req.user;
    res.send(user);
  }
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

export default router;
