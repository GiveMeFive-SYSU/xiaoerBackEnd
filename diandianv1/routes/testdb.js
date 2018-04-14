var express = require('express');
var router = express.Router();

var mysql  = require('mysql');
router.get("/connectionTest", function (req, res) {
    var connection = mysql.createConnection({
        host: '192.168.1.152',
        user: 'root',
        password: '123456',
        database:'diandianmeal',
        port: 3306
    });
    connection.connect();

    connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
        if (error) throw error;

        console.log('The solution is: ', results[0].solution);
    });

    connection.end();
});

module.exports = router;