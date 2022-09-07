const express = require('express');
const apiRouter = express.Router();

const minionsRouter = require('./minion');
apiRouter.use('/minions', minionsRouter);

const ideaRouter = require('./idea');
apiRouter.use('/ideas', ideaRouter);

const meetingRouter = require('./meeting');
apiRouter.use('/meetings', meetingRouter);

module.exports = apiRouter;