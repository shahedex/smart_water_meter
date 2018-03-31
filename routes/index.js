var express = require('express');
var assert = require('assert');
var db = require('mysql');
var router = express.Router();

var conn = db.createConnection({
  host: "sql12.freemysqlhosting.net",
  user: "sql12228905",
  password: "id6Gb2BAqI",
  database: "sql12228905"
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home | Smart Water Meter' });
});

router.get('/enter-id', function(req, res, next) {
  var meterid = req.body.id;
  res.render('enter-id',{title: 'ID of Water Meter'});
});

router.get('/meter-info',function(req, res, next) {
  res.render('meter-info',{title: 'Meter Info'});
});

router.get('/all-data',function(req, res, next) {
  res.render('all-data',{title: 'All Data'});
});

router.get('/instant-data',function(req, res, next) {
  res.render('instant-data',{title: 'Instant Data'});
});

router.get('/all-meters',function(req, res, next) {
    var sql = `SELECT DISTINCT Id from datatable`;
    conn.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Id fetched from datatable");
      // for (var val in result){
      //   console.log(result[val]['Id']);
      // }
      res.render('all-meters',{items : result});
    });
});
module.exports = router;
