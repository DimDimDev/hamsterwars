const { Router } = require('express');
const { db } = require('../firebase')

let router = new Router();

//Returnerar en array med top 5 mest vinnande hamsterobject
router.get('/top', async (req, res) => {
    try {
        let hamstersArray = [];
        let hamstersDB = await db.collection('hamsters').orderBy('wins', 'desc').limit(5).get();

        hamstersDB.forEach(hamster => {
            hamstersArray.push(hamster.data());
        })

        res.status(200).send(hamstersArray)

    } catch (err) {
        res.status(500)
        console.error(err)
    }
})


//Returnerar en array med top 5 mest förlorande hamsterobject.
router.get('/bottom', async (req, res) => {
    try {
        let hamstersArray = [];
        let hamstersDB = await db.collection('hamsters').orderBy('defeats', 'desc').limit(5).get();

        hamstersDB.forEach(hamster => {
            hamstersArray.push(hamster.data());
        })

        res.status(200).send(hamstersArray)

    } catch (err) {
        res.status(500)
        console.error(err)
    }
})

module.exports = router;