const express = require('express');
const app = express();

app.use(express.json());

//Static route to assets
app.use('/assets', express.static('assets'))

//Routes imports
const hamstersRoute = require('./routes/hamsters');
const chartsRoute = require('./routes/charts');
const gamesRoute = require('./routes/games');
const statsRoute = require('./routes/stats');

//Routes
app.use('/hamsters', hamstersRoute);
app.use('/charts', chartsRoute);
app.use('/games', gamesRoute);
app.use('/stats', statsRoute);

app.listen(3000, () => {
    console.log('servern igång på 3000')
})