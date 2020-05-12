const { Router } = require('express');
const { db } = require('../firebase')

let router = new Router();


//Test
router.get('/test', async (req, res) => {
    try {
        let hamstersArray = [];
        let hamstersDB = await db.collection('hamsters').get();

        hamstersDB.forEach(hamster => {
            hamstersArray.push(hamster.data());
        })

        res.status(200).send({ msg: "test", hamstersArray })

    } catch (err) {
        res.status(500)
        console.error(err)
    }
})


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