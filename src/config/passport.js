import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import db from "../models/index.js";
import { parseEmail } from "../utils/parseEmail.js";

const { User } = db.db;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/v1/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ where: { googleId: profile.id } });

        if (!user) {
          const email = profile.emails[0].value;
          const { rollNumber, batch } = parseEmail(email);

          user = await User.create({
            userName: profile.displayName.replace(/-IIITK$/, ""),
            email: email,
            rollNumber: rollNumber,
            batch: batch,
            profileImage: profile.photos[0].value,
            googleId: profile.id,
            displayName: profile.displayName,
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passport;
