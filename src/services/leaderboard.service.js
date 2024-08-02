import db from "../models/index.js";

const { User, SemPoint } = db.db;

const updatePoints = async (userId, sem, year, points) => {
  let semPoint = await SemPoint.findOne({ where: { userId, sem, year } });
  if (semPoint) {
    semPoint.points = points;
    await semPoint.save();
  } else {
    semPoint = await SemPoint.create({ userId, sem, year, points });
  }
  return semPoint;
};

const getLeaderboardBySemAndYear = async (sem, year) => {
  const leaderboard = await SemPoint.findAll({
    where: { sem, year },
    include: [{ model: User }],
    order: [["points", "DESC"]],
  });
  return leaderboard.map((semPoint) => ({
    userName: semPoint.User.userName,
    profileImage: semPoint.User.profileImage,
    points: semPoint.points,
    batch: semPoint.User.batch,
  }));
};

export { updatePoints, getLeaderboardBySemAndYear };
