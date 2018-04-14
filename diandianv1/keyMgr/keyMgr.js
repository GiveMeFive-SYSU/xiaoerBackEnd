var bcrypt = require('bcrypt');
var KeySql = require('../db/KeySql');

var mysql = require('mysql');
var dbConfig = require('../db/DbConfig');

// 使用DBConfig.js的配置信息创建一个MySQL连接池
var pool = mysql.createPool( dbConfig.mysql );


module.exports = {
    keyGenerate : function (username) {
        var salt = bcrypt.genSaltSync(3);
        return bcrypt.hashSync(username+Date.now(), salt);
    },
    verifyKey : function (username,key) {

    }

};