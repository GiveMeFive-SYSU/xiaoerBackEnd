/**
 * Created by 90747 on 7/23/2017.
 */

var express = require('express');
var router = express.Router();
var crypto = require('crypto');

// 导入MySQL模块
var mysql = require('mysql');
var dbConfig = require('../../../db/DbConfig');
var userSQL = require('../../../db/UserSql');
var OrderSql = require('../../../db/OrderSql');
var OrderdetailSql = require('../../../db/OrdertailSql');
var sha = require('../../../encrypt/sha1');

// 使用DBConfig.js的配置信息创建一个MySQL连接池
var pool = mysql.createPool( dbConfig.mysql );
var Token = "wuhuoshidai";
/* 微信验证 */
router.get('/wechatcheck', function (req, res, next) {
    var echostr, nonce, signature, timestamp;
    signature = req.query.signature;
    timestamp = req.query.timestamp;
    nonce = req.query.nonce;
    echostr = req.query.echostr;
    if(check(timestamp,nonce,signature,Token)){
        return res.send(echostr);
    }else{
        return res.end();
    }
});
function check(timestamp, nonce, signature ,token) {
    var currSign, tmp;
    tmp = [token, timestamp, nonce].sort().join("");
    currSign = crypto.createHash("sha1").update(tmp).digest("hex");
    return currSign === signature;
};

/* 展示某个商家的全部订单 */
router.get('/', function(req, res, next) {
    // 从连接池获取连接
    pool.getConnection(function(err, connection) {
        // 获取前台页面传过来的参数
        var param = req.query || req.params;
        console.log(param);
        // 建立连接 返回某个商家的全部订单
        connection.query(OrderSql.getOrderByUsername, [param.username], function(err, result) {
            if(result) {
                console.log(result);
                res.json({
                    data:result
                });
            }
            connection.release();
        });
    });

});

/* 插入某个商家的一个订单 */
router.post('/addorder', function(req, res, next) {
    // 从连接池获取连接
    pool.getConnection(function(err, connection) {
        // 获取前台页面传过来的参数
        var param = req.query || req.params;
        console.log(param);
        // 建立连接 增加一个订单信息
        // INSERT INTO business_order(Username, Ordernumber, Ordertime, Tablenumber, Tastenode, Price) VALUES(?,?,?,?,?)
        connection.query(OrderSql.insert, [param.username, param.Ordernumber, param.Ordertime, param.Tablenumber, param.Tastenote || "null" ,param.Price], function(err, result) {
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
        for(var i in param.ordertail) {
            connection.query(OrderdetailSql.insert, [param.username, param.ordernumber,param.ordertail[i].dishname, param.ordertail[i].dishcount], function(err, result) {
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
        }
    });
});

/* 查询某个商家的一个订单 */
router.post('/queryorder', function(req, res, next) {
    // 从连接池获取连接
    pool.getConnection(function(err, connection) {
        // 获取前台页面传过来的参数
        var param = req.query || req.params;
        console.log(param);
        // 建立连接 查询一个订单信息
        // SELECT * FROM business_ordertail WHERE Username = ? AND Ordernumber=?
        connection.query(OrderdetailSql.getOrderByUsernameAndOrdernumber, [param.username, param.ordernumber], function(err, result) {
            if(result) {
                console.log(result);
                res.json({
                    data:result
                })
            }
            // 释放连接
            connection.release();
        });
    });
});

/* 删除某个商家的一个订单 */
router.post('/delorder', function(req, res, next) {
    // 从连接池获取连接
    pool.getConnection(function(err, connection) {
        // 获取前台页面传过来的参数
        var param = req.query || req.params;
        console.log(param);
        // 建立连接 删除一个订单信息
        // DELETE FROM business_ordertail WHERE Username=? AND Ordernumber=?
        connection.query(OrderdetailSql.deleteOrderInfo, [param.username, param.ordernumber], function(err, result) {
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

module.exports = router;
