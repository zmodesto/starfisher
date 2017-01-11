var express = require('express')
var app = express()
var fs = require("fs");
var dbfile = "dbdata/test.db";
var exists = fs.existsSync(dbfile);


var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(dbfile);


db.serialize(function() {
    if (!exists) {
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

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
