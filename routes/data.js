var express = require('express');
var assert = require('assert');
var db = require('mysql');
var router = express.Router();

router.get('/id/:id/datetime/:datetime/pulse/:pulse',function(req,res,next){
  var id = req.params['id'];
  var datetime = req.params['datetime'];
  var pulse = req.params['pulse'];

  var conn = db.createConnection({
    host: "sql12.freemysqlhosting.net",
    user: "sql12228905",
    password: "id6Gb2BAqI",
    database: "sql12228905"
  });
    var sql = `INSERT INTO datatable (Id, DateTime, Pulse) VALUES ('${id}', '${datetime}', '${pulse}')`;
    console.log(sql);
    conn.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
  res.send(req.params);
});

module.exports = router;
