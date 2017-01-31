// route handler
// presumably, this will be mounted at /things by main app
var express = require('express');
var router = express.Router();

// middleware
router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
});

// define route for: /things
router.get('/', function (req, res) {
    res.send('Things: Home page')
});

// define route for: /Things/about
router.get('/about', function (req, res, next) {
    console.log('harbl barbl Time: ', Date.now())
    next();
});


// define route for: /Things/about
router.get('/about', function (req, res, next) {
    console.log('NARBL BARBL Time: ', Date.now())
    res.send('Things: About things')
});

router.get('/:thingId', function(req, res) {
    res.send('Things: Oh, you were looking for thing # ' + req.params.thingId);
})

module.exports = router;
