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

// 响应一个JSON数据
var responseJSON = function (res, ret) {
    if(typeof ret === 'undefined') {
        res.json({     code:'-200',     msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};


function check(timestamp, nonce, signature ,token) {
    var currSign, tmp;
    tmp = [token, timestamp, nonce].sort().join("");
    currSign = crypto.createHash("sha1").update(tmp).digest("hex");
    return currSign === signature;
};

function handlestr(str) {
    OrderList = [];
    var s1 = new Set();

    for (var i in str) {
        s1.add(str[i].Tablenumber);
    }
    var Tablenum = 0;
    s1.forEach(function (t) { console.log(t); })
    for (var item of s1) {
        OrderList[Tablenum] = new Object();
        OrderList[Tablenum]['tableno'] = item;
        OrderList[Tablenum]['order'] = new Object();
        OrderList[Tablenum]['order'].dishes = new Array();
        for (var i in str) {
            if (str[i].Tablenumber == item) {
                OrderList[Tablenum]['ordernum'] = str[i].Ordernumber;
                OrderList[Tablenum]['order'].dishes.push({
                    'dishname' : str[i].Dishname,
                    'price' : str[i].Dishprice,
                    'num' : str[i].Count
                });
            }
        }
        Tablenum += 1;
    }
    return OrderList;
}

/* 展示某个商家没有完成的全部订单 */
router.get('/showUnfinishedOrder', function(req, res, next) {
    // 从连接池获取连接
    pool.getConnection(function(err, connection) {
        // 获取前台页面传过来的参数
        var param = req.query || req.params;
        console.log(param);
        // 建立连接 返回某个商家没有完成的全部订单
        connection.query(OrderSql.getOrderTetailByUsername, [param.username], function(err, result) {
            if(result) {
                resultobj = handlestr(result);
                console.log(resultobj);
                res.json({
                    data:resultobj
                });
            }
            connection.release();
        });
    });

});


/* 完成某个商家没有完成的订单 */
router.get('/setFinished', function(req, res, next) {
    // 从连接池获取连接
    pool.getConnection(function(err, connection) {
        // 获取前台页面传过来的参数
        var param = req.query || req.params;
        console.log(param);
        // 建立连接 返回某个商家没有完成的全部订单
        connection.query(OrderSql.setFished, [param.username, param.tablenumber], function(err, result) {
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
    console.log("################################添加order")
    pool.getConnection(function(err, connection) {
        // 获取前台页面传过来的参数
        var param = req.body || req.params;
        console.log(param);
        // 建立连接 增加一个订单信息
        // INSERT INTO business_order(Username, Ordernumber, Ordertime, Tablenumber, Tastenode, Price) VALUES(?,?,?,?,?)
        connection.query(OrderSql.insert, [param.username, param.Ordernumber, param.Ordertime, param.Tablenumber, param.Tastenote, param.Price], function(err, result) {
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

/* 增加某个商家的一个订单 */
router.post('/addorderDetail', function(req, res, next) {
    // 获取前台页面传过来的参数
    var param = req.body || req.params;
    console.log(param);

    param.ordertail = JSON.parse(param.ordertail);

    for (var i  in param.ordertail) {
        (function(arg){
            // 从连接池获取连接
            pool.getConnection(function(err, connection) {
                console.log("@@@@@@@@@@@@@@@@添加订单详情");
                console.log(param.username);
                console.log(param.ordertail[arg].dishname)
                // INSERT INTO business_orderdetail(Username,Ordernumber,Dishname,Count, Dishprice) VALUES(?,?,?,?,?)
                connection.query(OrderdetailSql.insert, [param.username, param.Ordernumber, param.ordertail[arg].dishname, param.ordertail[arg].dishcount, param.ordertail[arg].dishprice], function(err, result) {
                    if(result) {
                        console.log(result);
                        result = {
                            code: 200,
                            msg:'增加成功'
                        };
                    }
                    // 释放连接
                    if (arg == param.Orderlen) {
                        responseJSON(res, result);
                    }
                    connection.release();
                });

            });
        })(i);
    }


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
