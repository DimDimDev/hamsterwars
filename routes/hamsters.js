const { Router } = require('express');
const { db } = require('../firebase')

let router = new Router();


//Returns all hamsters
router.get('/', async (req, res) => {
    try {
        let hamstersArray = [];
        let hamstersDB = await db.collection('hamsters').get();

        hamstersDB.forEach(hamster => {
            hamstersArray.push(hamster.data());
        })

        res.status(200).send(hamstersArray)

    } catch (err) {
        res.status(500)
        console.error(err)
    }
})


//Returns a specific hamster
router.get('/:id', async (req, res) => {
    try {
        let hamster = await db.collection('hamsters')
            .where("id", "==", parseInt(req.params.id)).get();

        hamster.forEach(hamster => {
            res.status(200).send(hamster.data());
        })

    } catch (err) {
        res.status(500)
        console.error(err)
    }
})


//Returns a random hamster
router.get('/random', async (req, res) => {
    try {
        let hamstersArray = [];
        let hamstersDB = await db.collection('hamsters').get();

        hamstersDB.forEach(hamster => {
            hamstersArray.push(hamster.data());
        })

        res.status(200).send(hamstersArray)
        console.log(hamstersArray)

    } catch (err) {
        res.status(500)
        console.error(err)
    }
})


//Test
router.get('/test', async (req, res) => {
    res.send('test')

});


//Updates result from a match
router.put('/:id/result', async (req, res) => {
    try {
        let hamsterQuery = await db.collection('hamsters')
            .where("id", "==", parseInt(req.params.id)).get();

        hamsterQuery.forEach(hamster => {
            hamster = hamster.data();
            console.log(hamster)

            if (req.body.wins == 1) {
                hamster.wins += 1
                hamster.games += 1
            } else {
                hamster.defeats += 1
                hamster.games += 1
            }

            db.collection('hamsters').doc(parseInt(hamster.id)).set(hamster)

        })

        res.status(200).send(hamster)

    } catch (err) {
        console.error(err)
        res.status(500).send(err)
    }
})


module.exports = router;