import jwt from "jsonwebtoken";
import db from "../models/index.js";
import { parseEmail } from "../utils/parseEmail.js";
import { promisify } from "util";
const { User, SemPoint, sequelize } = db.db;

const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

const findAll = async () =>
  User.findAll({
    include: [{ model: SemPoint }],
  });

const findById = async (userId) =>
  User.findOne({
    where: { id: userId },
    include: [{ model: SemPoint }],
  });

const create = async (profile) => {
  const transaction = await sequelize.transaction();
  try {
    let user = await User.findOne({
      where: { googleId: profile.id },
      transaction,
    });

    if (!user) {
      const email = profile.email;
      const { rollNumber, batch } = parseEmail(email);

      user = await User.create(
        {
          userName: profile.given_name,
          email: email,
          rollNumber: rollNumber,
          batch: batch,
          profileImage: profile.picture,
          googleId: profile.id,
          displayName: profile.name,
          role: profile.role,
        },
        { transaction }
      );
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await user.update({ refreshToken }, { transaction });

    await transaction.commit();

    return { user, accessToken, refreshToken };
  } catch (error) {
    await transaction.rollback();
    console.error(error);
    throw error;
  }
};

export { findAll, findById, create };
