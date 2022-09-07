const express = require('express');
const db = require('./db')
const bodyparser = require('body-parser');

const minionRouter = express.Router();
minionRouter.use(bodyparser.json());

//populate data set\

let minions = db.getAllFromDatabase('minions');

// GET / api / minions to get an array of all minions.


minionRouter.get('/', (req, res, next) => {
    res.status(200).send(minions);
})

// POST / api / minions to create a new minion and save it to the database.

minionRouter.post('/', (req, res, next) => {
    const newMinion = req.body;
    if (!newMinion) {
        res.status(400).send();
    } else {
        db.addToDatabase('minions', newMinion);
        res.status(201).send(newMinion);
    }
})

// GET / api / minions /: minionId to get a single minion by id.

minionRouter.get('/:minionId', (req, res, next) => {
    const minionId = req.params.minionId;
    const searchMinion = db.getFromDatabaseById('minions', minionId);
    if (!searchMinion) {
        res.status(404).send('Minon not found!');
    } else {
        res.status(200).send(searchMinion);
    }
})


// PUT / api / minions /: minionId to update a single minion by id.
minionRouter.put('/:minionId', (req, res, next) => {
        const minionId = req.params.minionId;
        const searchMinion = db.getFromDatabaseById('minions', minionId)
        if (searchMinion) {
            searchMinion.name = req.body.name;
            searchMinion.salary = req.body.salary
            searchMinion.title = req.body.title
            res.status(201).send(searchMinion);
        } else {
            res.status(404).send('Minon not found!');

        }
    })
    // DELETE / api / minions /: minionId to delete a single minion by id.
minionRouter.delete('/:minionId', (req, res, next) => {
    const minionId = req.params.minionId;
    const searchMinion = db.getFromDatabaseById('minions', minionId)
    if (searchMinion) {
        db.deleteFromDatabasebyId('minions', minionId);
        res.status(204).send();

    } else {
        res.status(404).send('Minon not found!');

    }
})



// minionRouter.use('/:minionId', (req, res, next) => {
//     let minionId = req.params.minionId;
//     let minionIndex = minions.findIndex(obj => obj.id === minionId);
//     if (minionIndex !== -1) {
//         req.minionIndex = minionIndex;
//         req.minionId = minionId;
//         res.status(200).send(minionIndex);
//         next();
//     } else {
//         res.status(404).send('Minon not found!');
//     }
// })


module.exports = minionRouter;