import { Router } from "express";
import passport from "passport";
import httpStatus from "http-status";

const router = Router();

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
    
    res.status(httpStatus.OK).json(user);
  }
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

export default router;
