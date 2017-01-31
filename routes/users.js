// route handler
// presumably, this will be mounted at /users by main app
var express = require('express');
var router = express.Router();

// middleware
router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
});

// define route for: /users
router.get('/', function (req, res) {
    res.send('Users: Home page')
});

// define route for: /users/about
router.get('/about', function (req, res) {
    res.send('Users: About users')
});

module.exports = router;
