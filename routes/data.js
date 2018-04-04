var express = require('express');
var assert = require('assert');
const sql = require('mssql');
var router = express.Router();

router.get('/id/:id/datetime/:datetime/pulse/:pulse',function(req,res,next){
  var id = req.params['id'];
  var datetime = req.params['datetime'];
  var pulse = req.params['pulse'];

  var config = {
    user: 'apu',
    password: 'Sel12345',
    server: '116.193.220.12',
    database: 'cuet_meter'
  }
  sql.connect(config, function(err){
    if(err) console.log(err);
    var request = new sql.Request();
    request.query(`INSERT INTO datatable (Id, DateTime, Pulse) VALUES ('${id}', '${datetime}', '${pulse}')`, function (err, recordset) {
      
      if (err) console.log(err)
      console.log("1 record inserted");
      // send records as a response
      res.send(recordset);
      console.log('done');
      sql.close();
  });
  
});
});

module.exports = router;
