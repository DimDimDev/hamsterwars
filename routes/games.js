const { Router } = require('express');
const { db } = require('../firebase')

let router = new Router();

// GET /games
//Returnerar en array med samtliga matchobject som hållits.


// POST /games
//Sparar en match med formatet { timeStamp: Date, contestants: [{ hamsterobject }, { hamsterobject } ] }.


module.exports = router;