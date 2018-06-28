var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var keyGen = require("../keyMgr/keyMgr");

// 导入MySQL模块
var mysql = require('mysql');
var dbConfig = require('../db/DbConfig');
var userSQL = require('../db/UserSql');

// 使用DBConfig.js的配置信息创建一个MySQL连接池
var pool = mysql.createPool( dbConfig.mysql );

// 响应一个JSON数据
var responseJSON = function (res, ret) {
    if(typeof ret === 'undefined') {
        res.json({     code:'-200',     msg: '操作失败'
        });
    } else {
        res.json(ret);
    }};
// 添加用户
router.post('/addUser', function(req, res, next){
    console.log("adduser");
    // 从连接池获取连接
    pool.getConnection(function(err, connection) {
        // 获取前台页面传过来的参数
        var param = req.body || req.params;
        // 建立连接 增加一个用户信息
        var password = param.password;
        console.log(password);
        var salt = bcrypt.genSaltSync(10);
        password = bcrypt.hashSync(password, salt);
        // console.log(password);

        var Key = keyGen.keyGenerate(param.username);
        console.log([param.username, password, param.shopname, param.phonenum, Key]);
        connection.query(userSQL.insert, [param.username, password, param.shopname, param.phonenum, Key], function(err, result) {

            // 这里还需要添加重名检测
            //
            //
            //
            //
            //
            //

            if (err) {
                // 以json形式，把操作结果返回给前台页面
                responseJSON(res, result);
            }
            if(result) {
                console.log(result);
                result = {
                    code: 200,
                    msg:'增加成功'
                };
                res.json(result);
            }


            // 释放连接
            connection.release();

        });
    });
});

// // 查找所有用户
// router.get('/query', function (req, res) {
//     pool.getConnection(function(err, connection) {
// // 获取前台页面传过来的参数
//         var param = req.query || req.params;
// // 建立连接 显示所有用户信息
//         connection.query(userSQL.getUserByUsername, [param.username || "none"], function(err, result) {
//             if(result) {
//                 console.log(result);
//                 result = {
//                     "err" : 0,
//                     "data": result
//                 }
//             } else {
//                 result = {
//                     "err" : 1,
//                     "msg" : "登录失败"
//                 }
//             }
//
//             // 以json形式，把操作结果返回给前台页面
//             res.json(result);
//             // 释放连接
//             connection.release();
//
//         });
//     });
// });


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('users');
});


router.get('/Checkexist', function(req, res, next) {
    console.log("Start Check exist!");
    pool.getConnection(function(err, connection) {
        var params = req.query || req.params;
        console.log(userSQL.getUserByUsername);
        connection.query(userSQL.getUserByUsername, [params.username], function(err, result) {
            if(result.length) {
                result = {
                    "err" : 0,
                    "msg" : "查找成功",
                    "accessKey": result[0].accessKey
                }
            } else {
                result = {
                    "err" : 1,
                    "msg" : "找不到用户"
                }
            }

            // 以json形式，把操作结果返回给前台页面
            responseJSON(res, result);
            // 释放连接
            connection.release();

        });
    });
});

router.get('/queryshopname', function(req, res, next) {
   console.log("queryshopname");
   pool.getConnection(function (err, connection) {
       var params = req.query || req.params;
       console.log(params);
        connection.query(userSQL.getShopNameByUsername, [params.username], function (err, result) {
            if (result) {
                result = {
                    "err" : 0,
                    "msg" : "查询成功",
                    "shopname": result[0].Shopname
                }

            } else {
                result = {
                    "err" : 1,
                    "msg": "用户名不存在"
                }
            }
            // 以json形式，把操作结果返回给前台页面
            responseJSON(res, result);
            // 释放连接
            connection.release();
        })
   })
});

router.post('/login', function(req, res, next) {
    console.log("login");
    pool.getConnection(function(err, connection) {
        var params = req.body || req.params;
        connection.query(userSQL.getUserByUsername, [params.username], function(err, result) {
            if(result) {
                var pswd = params.password;
                // console.log(pswd);
                // var salt = bcrypt.genSaltSync(10);
                // pswd = bcrypt.hashSync(pswd, salt);
                // // $2a$10$OOZofkNM3AxFU6EuYwIiRuqlC/qJSUx3F9gWbXnihQu3JKRAw4mV6
                // console.log(pswd);
                if (bcrypt.compareSync(pswd, result[0].Password)) {
                    result = {
                        "err" : 0,
                        "msg" : "登录成功",
                        "accessKey": result[0].accessKey
                    }
                } else {
                    result = {
                        "err" : 1,
                        "msg": "密码错误"
                    }
                }
            } else {
                result = {
                    "err" : 1,
                    "msg" : "找不到用户"
                }
            }

            // 以json形式，把操作结果返回给前台页面
            responseJSON(res, result);
            // 释放连接
            connection.release();

        });
    });
});


// 更新商铺名
router.get('/updateName', function(req, res, next) {
    pool.getConnection(function(err, connection) {
        var params = req.query || req.params;
        connection.query(userSQL.updateShopName, [params.newshopname, params.username], function(err, result) {
            if(result.length) {
                result = {
                    "err" : 0,
                    "msg" : "更改成功",
                }
            } else {
                result = {
                    "err" : 1,
                    "msg" : "失败"
                }
            }

            // 以json形式，把操作结果返回给前台页面
            responseJSON(res, result);
            // 释放连接
            connection.release();

        });
    });
});



module.exports = router;
