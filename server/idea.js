const express = require('express');
const db = require('./db')
const bodyparser = require('body-parser');
const checkMillionDollarIdea = require('./checkMillionDollarIdea');

const ideaRouter = express.Router();

ideaRouter.use(bodyparser.json());

//populate data set
let ideas = db.getAllFromDatabase('ideas');


// GET / api / ideas to get an array of all ideas.
ideaRouter.get('/', (req, res, next) => {
    res.status(200).send(ideas);
})

// POST / api / ideas to create a new idea and save it to the database.
ideaRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    const newIdea = req.body;
    if (!newIdea) {
        res.status(400).send();
    } else {
        db.addToDatabase('ideas', newIdea);
        res.status(201).send(newIdea);


    }
})


// GET / api / ideas /: ideaId to get a single idea by id.
ideaRouter.get('/:ideaId', (req, res, next) => {
    const ideaId = req.params.ideaId;
    const searchIdea = db.getFromDatabaseById('ideas', ideaId);
    if (!searchIdea) {
        res.status(404).send('Idea not found!');
    } else {
        res.status(200).send(searchIdea);
    }
})

// PUT / api / ideas /: ideaId to update a single idea by id.

ideaRouter.put('/:ideaId', (req, res, next) => {
    const ideaId = req.params.ideaId;
    const searchIdea = db.getFromDatabaseById('ideas', ideaId)
    if (searchIdea) {
        searchIdea.name = req.body.name;
        searchIdea.description = req.body.description
        searchIdea.numWeeks = req.body.numWeeks
        searchIdea.weeklyRevenue = req.body.weeklyRevenue;
        res.status(201).send(searchIdea);
    } else {
        res.status(404).send('Idea not found!');

    }
})

// DELETE / api / ideas /: ideaId to delete a single idea by id.
ideaRouter.delete('/:minionId', (req, res, next) => {
    const ideaId = req.params.minionId;
    const searchIdea = db.getFromDatabaseById('ideas', ideaId)
    if (searchIdea) {
        db.deleteFromDatabasebyId('ideas', ideaId);
        res.status(204).send();

    } else {
        res.status(404).send('Idea not found!');

    }
})




module.exports = ideaRouter;