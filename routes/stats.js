const { Router } = require('express');
const { db } = require('../firebase')

let router = new Router();

// GET /stats/total
//Returnerar ett statsobject med totalt antal matcher som hållits.


// GET /stats/{opt}
//Känner er fria att sammanställa annan spännande statistik, ex. hur många % gillar majs? Vad är medelåldern på samtliga hamstrar, etc.

module.exports = router;