var express = require('express');
var assert = require('assert');
const sql = require('mssql');
var router = express.Router();

var config = {
  user: 'apu',
  password: 'Sel12345',
  server: '116.193.220.12',
  database: 'cuet_meter'
}

router.post('/',function(req,res,next){
    var user = req.body.user;
    var pass = req.body.password;
    var login = false;
    console.log(user);
    console.log(pass);
    sql.connect(config, function(err){
      if(err) console.log(err);
      var request = new sql.Request();
      request.query(`SELECT * FROM users where username='${user}' AND password='${pass}'`, function (err, recordset) { 
      if (err) console.log(err)
      console.log("login fetched from datatable");
      console.log(recordset['recordset']);
      if(recordset['recordset'].length > 0) res.render('enter-id',{title: 'enter the id'});
      else res.render('wrong-login',{title: 'Wrong Login | Try Again'});
      sql.close();
    });
    
  });
  
});


module.exports = router;
