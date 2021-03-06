var express = require('express');
var assert = require('assert');
const url = require('url'); 
const sql = require('mssql');
var router = express.Router();

// var conn = db.createConnection({
//   host: "116.193.220.12",
//   port: 3306,
//   user: "apu",
//   password: "Sel12345",
//   database: "cuet_meter"
// });

var config = {
  user: 'apu',
  password: 'Sel12345',
  server: '116.193.220.12',
  database: 'cuet_meter',
  multipleStatements: true
}

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home | Smart Water Meter' });
});

router.get('/enter-id', function(req, res, next) {
  var meterid = req.body.id;
  res.render('enter-id',{title: 'ID of Water Meter'});
});

router.post('/meter-info', function(req, res, next) {
  var meterid = req.body.msg;
  sql.connect(config, function(err){
    if(err) console.log(err);
    var request = new sql.Request();
    request.query(`SELECT * FROM datatable WHERE Id='${meterid}' ORDER BY rowID DESC`, function (err, recordset) {
      
      if (err) console.log(err)
      console.log('done');
      console.log(recordset['recordset']);
      if(recordset['recordset'].length > 0) res.render('meter-info',{items : recordset['recordset'], id: meterid});
      else res.render('wrong-meter',{title: 'Wrong Login | Try Again'});
      sql.close();
    });
  });
});

router.get('/dbconnect',function(req, res, next) {
  sql.connect(config, function(err){
    if(err) console.log(err);
    var request = new sql.Request();
    request.query("select * from datatable", function (err, recordset) {
      
      if (err) console.log(err)
  
      // send records as a response
      res.send(recordset);
      console.log('done');
    console.log("connection successfull");
    sql.close();
  });
  
});

});

router.post('/all-data',function(req, res, next) {
  var meterid = req.body.meterid;
  console.log(meterid);
  sql.connect(config, function(err){
    if(err) console.log(err);
    var request = new sql.Request();
    request.query(`SELECT * FROM datatable WHERE Id='${meterid}'`, function (err, recordset) {
      if (err) console.log(err)
      console.log('done');
      console.log(recordset['recordset']);
      res.render('all-data',{items : recordset['recordset'], id: meterid});
      sql.close();
    });
  });
});

router.post('/instant-fetching/id/:id',function(req, res, next) {
  var meterid = req.body.meterid;
  sql.connect(config, function(err){
    if(err) console.log(err);
    var request = new sql.Request();
    var request2 = new sql.Request();
    var request3 = new sql.Request();

    request.query(`update instadata set Status='1' where Id='${meterid}'`, function (err, recordset) {
      if (err) console.log(err);
      console.log('done');
    });
    request2.query(`SELECT * FROM datatable WHERE Id='${meterid}'`, function (err, recordset) {
      if (err) console.log(err)
      console.log('done');
      console.log(recordset['recordset']);
      res.render('meter-info',{items : recordset['recordset'], id: meterid});
      sql.close();
    });
  });
});

router.get('/all-meters',function(req, res, next) {
  sql.connect(config, function(err){
    console.log('aisi');
    if(err) console.log(err);
    var request = new sql.Request();
    request.query("SELECT DISTINCT Id from datatable", function (err, recordset) {
      if (err) console.log(err)
      console.log('done');
      console.log(recordset['recordset']);
      res.render('all-meters',{items : recordset['recordset']});
      sql.close();
    });
  });
});

module.exports = router;
