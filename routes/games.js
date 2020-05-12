const { Router } = require('express');
const { db } = require('../firebase')

let router = new Router();

//Returns all games
router.get('/', async (req, res) => {
    try {
        let gamesArray = [];
        let gamesDB = await db.collection('games').get();

        gamesDB.forEach(game => {
            gamesArray.push(game.data());
        })

        res.status(200).send(gamesArray)

    } catch (err) {
        res.status(500)
        console.error(err)
    }
})


//Saves a game
router.post('/', async (req, res) => {
    try {
        let match = {
            timeStamp: new Date(),
            contestants: [req.body.contestant1, req.body.contestant2],
            winner: req.body.winner
        }

        await db.collection('games').doc().set(match);
        res.status(200).send("New match added to games")

    } catch (err) {
        res.status(500)
        console.error(err)
    }
})


module.exports = router;