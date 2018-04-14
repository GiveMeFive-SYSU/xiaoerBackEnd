var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbConfig = require('../db/DbConfig');
var bancCardSQL = require('../db/BankCardSql');


// 使用DBConfig.js的配置信息创建一个MySQL连接池
var pool = mysql.createPool( dbConfig.mysql );
// 响应一个JSON数据
var responseJSON = function (res, ans) {
    if(typeof ans === 'undefined') {
        res.json({
            code:'403',
            msg: '操作失败,参数错误'
        });
    } else {
        res.json(ans);
    }};

router.get('/delCard', function (req, res) {
    // 从连接池获取连接
    pool.getConnection(function(err, connection) {
        // 获取前台页面传过来的参数
        var param = req.query || req.params;
        // 建立连接 删除一个用户信息
        connection.query(bancCardSQL.deleteCardInfo, [param.account,param.accountname,param.username], function(err, result) {
            if(result) {
                console.log(result);
                result = {
                    code: 200,
                    msg:'删除成功'
                };
            }
            // 以json形式，把操作结果返回给前台页面
            responseJSON(res, result);
            // 释放连接
            connection.release();
        });
    });
});


// 添加card
router.post('/addCard', function(req, res, next){
    // 从连接池获取连接
    pool.getConnection(function(err, connection) {
        // 获取前台页面传过来的参数
        var param = req.body || req.params;
        // 建立连接 增加一个用户信息
        connection.query(bancCardSQL.insert, [param.account,param.accountname,param.username], function(err, result) {
            if(result) {
                console.log(result);
                result = {
                    code: 200,
                    msg:'增加成功'
                };
            }
            // 以json形式，把操作结果返回给前台页面
            responseJSON(res, result);
            // 释放连接
            connection.release();
        });
    });
});


module.exports = router;