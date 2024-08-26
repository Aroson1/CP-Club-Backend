import db from "../models/index.js";

const { User, SemPoint } = db.db;

const updatePoints = async (userId, sem, year, chartData) => {
  let semPoint = await SemPoint.findOne({ where: { userId, sem, year } });
  if (semPoint) {
    semPoint.chartData = chartData;
    semPoint.points = Object.values(chartData).reduce(
      (sum, point) => sum + point,
      0
    );
    await semPoint.save();
  } else {
    let points = Object.values(chartData).reduce(
      (sum, point) => sum + point,
      0
    );
    semPoint = await SemPoint.create({ userId, sem, year, chartData, points });
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
    chartData: semPoint.chartData,
    batch: semPoint.User.batch,
    id: semPoint.User.id,
  }));
};

export { updatePoints, getLeaderboardBySemAndYear };
