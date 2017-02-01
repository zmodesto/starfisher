// Main module for project. Run this.
var express = require('express');

var bodyParser = require('body-parser');
var fs = require("fs");
var path = require('path');

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
var users = require('./routes/users');
app.use('/users', users);
var things = require('./routes/things');
app.use('/things', things);

// Static file stuff
app.use('/static', express.static(path.join(__dirname, 'public')));
//app.use(express.static('public'));

// Look into these later. p sure these calls are deprecated in current.
//app.use(express.favicon());
//app.use(express.logger('dev'));
//app.use(express.methodOverride());

// sqlite3 stuff. should end up in "dev only" eventually.
var sqlite3 = require("sqlite3").verbose();
var dbfile = "dbdata/test.db";
var dbexists = fs.existsSync(dbfile);
var db = new sqlite3.Database(dbfile);


db.serialize(function() {
    if (!dbexists) {
        db.run("CREATE TABLE Stuff (thing TEXT)");
    }

    var stmt = db.prepare("INSERT INTO Stuff VALUES (?)");

    // Insert random Data
    var rnd;
    for (var i = 0; i < 10; i++) {
        rnd = Math.floor(Math.random() * 1000000);
        stmt.run("Thing #" + rnd);
    }
    stmt.finalize();
    db.each("SELECT rowid AS id, thing FROM Stuff", function(err, row) {
        console.log(row.id + ": " + row.thing);
    });
});  // db.serialize()

db.close();

app.listen(app.get('port'), function () {
  console.log('Started! App is now listening on port: ' + app.get('port'));
});

app.get('/', function (req, res) {
//  res.send('Hello this is the starfisher frontpage')
    res.render('index', { title: 'Hey', message: 'Hello there!'})
});
