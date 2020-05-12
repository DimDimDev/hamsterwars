const { Router } = require('express');
const { db } = require('../firebase')

let router = new Router();


//Returns total of games played
router.get('/total', async (req, res) => {
    try {
        let gamesArray = [];
        let gamesDB = await db.collection('games').get();

        gamesDB.forEach(game => {
            gamesArray.push(game.data());
        })

        res.status(200).send({ totalGames: gamesArray.length, gamesArray })

    } catch (err) {
        res.status(500)
        console.error(err)
    }
})


//Returns the ten oldest hamsters
router.get('/oldest', async (req, res) => {
    try {
        let hamstersArray = [];
        let hamstersDB = await db.collection('hamsters').orderBy('age', 'desc').limit(10).get();

        hamstersDB.forEach(hamster => {
            hamstersArray.push(hamster.data());
        })

        res.status(200).send(hamstersArray)

    } catch (err) {
        res.status(500)
        console.error(err)
    }
})


//Returns the ten youngest hamsters
router.get('/youngest', async (req, res) => {
    try {
        let hamstersArray = [];
        let hamstersDB = await db.collection('hamsters').orderBy('age', 'asc').limit(10).get();

        hamstersDB.forEach(hamster => {
            hamstersArray.push(hamster.data());
        })

        res.status(200).send(hamstersArray)

    } catch (err) {
        res.status(500)
        console.error(err)
    }
})


//Returns percentage of favFood
router.get('/:favFood', async (req, res) => {
    try {
        let hamstersArray = [];
        let favFoodArray = [];
        let hamsterDB = await db.collection('hamsters')
            .where("favFood", "==", req.params.favFood).get();

        hamsterDB.forEach(favFood => {
            favFoodArray.push(favFood.data());
        })

        let hamsterTotal = await db.collection('hamsters').get();

        hamsterTotal.forEach(total => {
            hamstersArray.push(total.data());
        })


        res.status(200).send({ Total: hamstersArray.length, favFood: favFoodArray.length, Percentag: (favFoodArray.length / hamstersArray.length) * 100 + "%" });

    } catch (err) {
        res.status(500)
        console.error(err)
    }
})


module.exports = router;