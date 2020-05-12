const { Router } = require('express');
const { db } = require('../firebase')

let router = new Router();

// GET /charts/top
//Returnerar en array med top 5 mest vinnande hamsterobject


// GET /charts/bottom
//Returnerar en array med top 5 mest förlorande hamsterobject.


module.exports = router;