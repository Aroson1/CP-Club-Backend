import db from "../models/index.js";
const { User, SemPoint, sequelize } = db.db;

const updatePoints = async (userId, sem, year, chartData) => {
  try {
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
      semPoint = await SemPoint.create({
        userId,
        sem,
        year,
        chartData,
        points,
      });
    }
    return semPoint;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateMultiplePoints = async (semPoints) => {
  const transaction = await sequelize.transaction();
  try {
    // Step 1: Find all users in bulk
    const users = await User.findAll({
      where: {
        rollNumber: semPoints.map((sp) => sp.rollNumber),
      },
      attributes: ["id", "rollNumber"],
      raw: true,
      transaction,
    });

    // Create a map of rollNumbers to userIds for quick lookup
    const userMap = new Map(users.map((user) => [user.rollNumber, user.id]));

    // Step 2: Fetch existing SemPoints in bulk
    const existingSemPoints = await SemPoint.findAll({
      where: {
        userId: users.map((user) => user.id),
        sem: semPoints.map((sp) => sp.sem),
        year: semPoints.map((sp) => sp.year),
      },
      attributes: ["id", "userId", "sem", "year"],
      raw: true,
      transaction,
    });

    // Create a map for quick lookup of existing SemPoints
    const existingSemPointsMap = new Map(
      existingSemPoints.map((sp) => [
        `${sp.userId}-${sp.sem}-${sp.year}`,
        sp.id,
      ])
    );

    // Step 3: Prepare data for bulk create and update
    const pointsToCreate = [];
    const pointsToUpdate = [];

    for (const x of semPoints) {
      const { rollNumber, sem, year, chartData } = x;
      const userId = userMap.get(rollNumber);
      if (!userId) {
        throw new Error(`User not found for rollNumber: ${rollNumber}`);
      }

      const points = Object.values(chartData).reduce(
        (sum, point) => sum + point,
        0
      );
      const existingPointId = existingSemPointsMap.get(
        `${userId}-${sem}-${year}`
      );

      if (existingPointId) {
        pointsToUpdate.push({
          id: existingPointId,
          userId,
          sem,
          year,
          chartData,
          points,
        });
      } else {
        pointsToCreate.push({
          userId,
          sem,
          year,
          chartData,
          points,
        });
      }
    }

    // Step 4: Perform bulk create and update
    await Promise.all([
      pointsToCreate.length > 0
        ? SemPoint.bulkCreate(pointsToCreate, { transaction })
        : null,
      pointsToUpdate.length > 0
        ? SemPoint.bulkCreate(pointsToUpdate, {
            updateOnDuplicate: ["chartData", "points"],
            transaction,
          })
        : null,
    ]);

    await transaction.commit();
    console.log("All points processed successfully");

    // Return the original semPoints array with added userId
    return semPoints.map((x) => ({
      ...x,
      userId: userMap.get(x.rollNumber),
    }));
  } catch (error) {
    await transaction.rollback();
    console.error("Error updating multiple points:", error);
    throw error;
  }
};

const getLeaderboardBySemAndYear = async (sem, year) => {
  console.log("sem", sem, "year", year);
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

export { updatePoints, getLeaderboardBySemAndYear, updateMultiplePoints };
