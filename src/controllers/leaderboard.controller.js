import httpStatus from 'http-status';
import * as response from '../middlewares/response-handler.js';
import { updatePoints, getLeaderboardBySemAndYear } from '../services/leaderboard.service.js';

const responseHandler = response.default;

const updateSemPoints = async (req, res) => {
  const { userId } = req.params;
  const { sem, year, chartData } = req.body;
  const updatedSemPoints = await updatePoints(userId, sem, year, chartData);
  res.status(httpStatus.OK).send(responseHandler(updatedSemPoints));
};

const getLeaderboard = async (req, res) => {
  const { sem, year } = req.query;
  const leaderboard = await getLeaderboardBySemAndYear(sem, year);
  res.status(httpStatus.OK).send(responseHandler(leaderboard));
};

export { updateSemPoints, getLeaderboard };
