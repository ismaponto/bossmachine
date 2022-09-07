const express = require('express');
const db = require('./db')
const bodyparser = require('body-parser');

const meetingRouter = express.Router();
meetingRouter.use(bodyparser.json());

// populate data set
let meeting = db.getAllFromDatabase('meetings');

// GET / api / meetings to get an array of all meetings.
meetingRouter.get('/', (req, res, next) => {
    res.status(200).send(meeting);
})

// POST / api / meetings to create a new meeting and save it to the database.

meetingRouter.post('/', (req, res, next) => {
    const newMeeting = db.createMeeting()
    if (!meeting) {
        res.status(400).send();
    } else {
        db.addToDatabase('meetings', newMeeting);
        res.status(201).send(newMeeting);
    }
})


// DELETE / api / meetings to delete all meetings from the database.
meetingRouter.delete('/', (req, res, next) => {
    db.deleteAllFromDatabase("meetings");
    meeting = [];
    res.status(204).send();
})
module.exports = meetingRouter;