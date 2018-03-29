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

router.post('/',function(req,res,next){
    var user = req.body.user;
    var pass = req.body.password;
    var login = false;
    console.log(user);
    console.log(pass);
    var sql = `SELECT * FROM user where username='${user}' AND password='${pass}'`;
    conn.query(sql, function (err, result) {
         if (err) throw err;
         console.log("login fetched from datatable");
         console.log(result.length);
         if(result.length > 0) res.render('enter-id',{title: 'enter the id'});
         else res.render('wrong-login',{title: 'Wrong Login | Try Again'});
       });
  
});

module.exports = router;
