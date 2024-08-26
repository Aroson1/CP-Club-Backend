import express from 'express';

import usersRoute from './user.route.js';
import blogsRoute from './blog.route.js';
import leaderboardRoute from './leaderboard.route.js';
import eventsRoute from './event.route.js';
import resourcesRoute from './resource.route.js';
import hallOfFameRoute from './hallOfFame.route.js';
import authRoute from './auth.route.js';
import userDetailRoute from './userDetails.route.js';
import refreshTokenRoute from './refreshToken.route.js';


const router = express.Router();

router.use('/users', usersRoute);
router.use('/blogs', blogsRoute);
router.use('/leaderboard', leaderboardRoute);
router.use('/events', eventsRoute);
router.use('/resources', resourcesRoute);
router.use('/hallOfFame', hallOfFameRoute);
router.use('/auth', authRoute);
router.use('/user-details', userDetailRoute);
router.use('/refresh-token', refreshTokenRoute);




export default router;
