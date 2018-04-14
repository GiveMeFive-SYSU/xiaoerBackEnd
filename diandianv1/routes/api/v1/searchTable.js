var express = require('express');
var router = express.Router();
// 导入MySQL模块
var mysql = require('mysql');
var dbConfig = require('../../../db/DbConfig');
var serverCongif = require("../../../server/serverConfig");
var TableSql = require('../../../db/TableSql');
// 使用DBConfig.js的配置信息创建一个MySQL连接池
var pool = mysql.createPool( dbConfig.mysql );
router.get('/', function(req, res, next) {
    pool.getConnection(function(err, connection) {
        // 获取前台页面传过来的参数
        var param = req.query || req.params;
        console.log(param);
        // 建立连接 返回某个商家的全部菜品
        connection.query(TableSql.getTableInfoByUsername, [param.username], function(err, result) {
            if(result) {
                res.json(result);
            }
            connection.release();
        });
    });
});
router.post('/addtable', function(req, res, next) {
    // 获取前台页面传过来的参数
    var param = req.body || req.params;

    if (param.addtablelist.length != 0) {
        param.addtablelist = param.addtablelist.split(",");
    }
    console.log(param);
    for (var i  in param.addtablelist) {
        (function(arg){
            pool.getConnection(function(err, connection) {
                console.log(param.addtablelist[arg]);
                connection.query(TableSql.addTableInfo,[param.username, param.addtablelist[arg]], function(err, result) {
                    connection.release();
                });
            });
        })(i);
    }
    var result = {
        code: 200,
        msg:'增加成功'
    };
    res.json(result);
});
router.post('/deltable', function(req, res, next) {
    // 获取前台页面传过来的参数
    var param = req.query || req.params;
    console.log(param);
    for (var i  in param.deltablelist) {
        (function(arg){
            pool.getConnection(function(err, connection) {
                console.log(param.deletelist[arg]);
                connection.query(FoodSql.deleteTableInfo,[param.username, param.deltablelist[arg]], function(err, result) {
                    connection.release();
                });
            });
        })(i);
    }
    var result = {
        code: 200,
        msg:'删除成功'
    };
    res.json(result);
});
module.exports = router;