var express = require('express');
var router = express.Router();
var mysql  = require('mysql');
var dbConfig = require('../db/DbConfig');
router.get("/connectionTest", function (req, res) {
    var connection = mysql.createConnection(dbConfig.mysql);
    connection.connect();

    connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
        if (error) throw error;

        console.log('The solution is: ', results[0].solution);
    });

    connection.end();
    res.send("ok");
});

module.exports = router;