var express = require('express');
var router = express.Router();
var FoodSql = require('../../../db/FoodSql');
var upload = require('../../../fileUpload/upload');

// 导入MySQL模块
var mysql = require('mysql');
var dbConfig = require('../../../db/DbConfig');
var serverCongif = require("../../../server/serverConfig")
var userSQL = require('../../../db/UserSql');

// 使用DBConfig.js的配置信息创建一个MySQL连接池
var pool = mysql.createPool( dbConfig.mysql );
// 响应一个JSON数据
var responseJSON = function (res, ret) {
    if(typeof ret === 'undefined') {
        res.json({     code:'-200',     msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};

// 返回所有菜品进行的字符串处理
function handlestr(str) {
    console.log(str);
    goods = [];
    name = [];
    var goodsorder = -1;
    var foodsorder = -1;
    var nameorder = 0;
    for (var i in str) {
        if (str[i].Dishname != 'Test') {
            if (name.indexOf(str[i].Dishtypename) == -1) {
                ++goodsorder;
                name[nameorder++] = str[i].Dishtypename;
                goods[goodsorder] = new Object();
                goods[goodsorder]['foods'] = new Object();
                foodsorder = 0;

            } else {
                ++foodsorder;
            }
            goods[goodsorder]['name'] = str[i].Dishtypename;
            goods[goodsorder]['type'] = str[i].Dishtype;
            goods[goodsorder]['foods'][foodsorder] = new Object();
            goods[goodsorder]['foods'][foodsorder]['name'] = str[i].Dishname;
            goods[goodsorder]['foods'][foodsorder]['type'] = str[i].Dishtype;
            goods[goodsorder]['foods'][foodsorder]['price'] = str[i].Dishprice;
            goods[goodsorder]['foods'][foodsorder]['oldprice'] = str[i].DishOldprice;
            goods[goodsorder]['foods'][foodsorder]['sellcount'] = '0';
            goods[goodsorder]['foods'][foodsorder]['num'] = '0';
            goods[goodsorder]['foods'][foodsorder]['rating'] = '100';
            goods[goodsorder]['foods'][foodsorder]['info'] = str[i].Dishinfo;
            goods[goodsorder]['foods'][foodsorder]['icon'] = serverCongif.diandianserver.host+":"+serverCongif.diandianserver.port + "/" + serverCongif.diandianserver.imgDis + "/" + str[i].Dishimage;
            goods[goodsorder]['foods'][foodsorder]['image'] = serverCongif.diandianserver.host+":" + serverCongif.diandianserver.port + "/" + serverCongif.diandianserver.imgDis + "/"+ str[i].Dishimage;
            // goods[goodsorder]['foods'][foodsorder]['icon'] = str[i].Dishimage;
            goods[goodsorder]['foods'][foodsorder]['description'] = str[i].Dishdescription;
        }

    }
    return goods;
}

function handletypestr(str) {
    console.log(str);
    goods = [];
    var goodsorder = -1;
    for (var i in str) {
        ++goodsorder;
        goods[goodsorder] = new Object();
        goods[goodsorder]['name'] = str[i].Dishtypename;
        goods[goodsorder]['no'] = str[i].Dishtype;
    }
    return goods;
}


/* 展示某个商家的全部菜品 */
router.get('/', function(req, res, next) {
    // 从连接池获取连接
    pool.getConnection(function(err, connection) {
        // 获取前台页面传过来的参数
        var param = req.query || req.params;
        console.log("&&&&&&&&&&&&&&&&顾客主界面")
        console.log(param);
        // 建立连接 返回某个商家的全部菜品
        connection.query(FoodSql.getFoodListByUsername, [param.username], function(err, result) {
            if(result) {

                var str = JSON.stringify(result);
                resultjson = handlestr(result);
                res.json(resultjson);
            }

            connection.release();
        });
    });
});

/* 展示某个商家的全部菜品分类*/
router.get('/searchType', function(req, res, next) {
    // 从连接池获取连接
    pool.getConnection(function(err, connection) {
        // 获取前台页面传过来的参数
        var param = req.query || req.params;
        console.log(param);
        // 建立连接 返回某个商家的全部菜品
        connection.query(FoodSql.getFoodTypeListByUsername, [param.username], function(err, result) {
            if(result) {
                resultjson = handletypestr(result);
                res.json(resultjson);
            }

            connection.release();
        });
    });
});

/* 展示某个商家一个分类下的所有菜品 */
router.post('/queryType', function(req, res, next) {
    // 从连接池获取连接
    pool.getConnection(function(err, connection) {
        // 获取前台页面传过来的参数
        var param = req.body || req.params;
        console.log("############测试###type")
        console.log(param);
        // [ RowDataPacket {
        //     Username: 'ojxf_0HeOwRJXWcSB1KkMnlaKVhI',
        //     Dishname: 'Test',
        //     DishOldprice: 0,
        //     Dishprice: 0,
        //     Dishimage: null,
        //     Dishdescription: 'good',
        //     Dishtypename: '粤菜',
        //     Dishtype: 0 } ]
        // 建立连接 返回某个商家的全部菜品
        connection.query(FoodSql.getFoodTypeByUsername, [param.username, param.dishtypename], function(err, result) {
            if(result) {
                var str = JSON.stringify(result);
                resultjson = handlestr(result);
                res.json(resultjson);
            }

            connection.release();
        });
    });
});

/* 修改某个商家菜品分类 */
router.post('/changeType', function(req, res, next) {
    var param = req.body || req.params;
    if (param.currentlist.length != 0) {
        param.currentlist = param.currentlist.split(",");
    }
    if (param.deletelist.length != 0) {
        param.deletelist = param.deletelist.split(",");
    }
    if (param.addlist.length != 0) {
        param.addlist = param.addlist.split(",");
    }
    console.log("#######Change Type");
    console.log(param);
    for (var k in param.addlist) {
        (function(arg){
            pool.getConnection(function(err, connection) {
                console.log(param.addlist[arg]);
                // INSERT INTO business_dish(Username,Dishname,DishOldprice,Dishprice,Dishimage,Dishdescription,Dishtypename,Dishtype) VALUES(?,?,?,?,?,?,?,?)
                connection.query(FoodSql.addFoodInfo,[param.username, "Test", 0, 0, null, "good", param.addlist[arg], arg], function(err, result) {
                    connection.release();
                });
            });
        })(k);
    }
    for (var i  in param.deletelist) {
        (function(arg){
            pool.getConnection(function(err, connection) {
                console.log(param.deletelist[arg]);
                connection.query(FoodSql.deleteTypeInfo,[param.username, param.deletelist[arg]], function(err, result) {
                    connection.release();
                });
            });
        })(i);
    }
    for (var j in param.currentlist) {
        (function(arg){
            console.log(arg, param.currentlist[arg]);
            pool.getConnection(function(err, connection) {
                connection.query(FoodSql.updateTypeInfo,[arg, param.username, param.currentlist[arg]], function(err, result) {
                    connection.release();
                });
            });
        })(j);
    }
    var result = {
        code: 200,
        msg:'增加成功'
    };
    res.json(result);
});

/* 查询某个商家的一个菜品 */
router.get('/queryfood', function(req, res, next) {
    // 从连接池获取连接
    pool.getConnection(function(err, connection) {
        // 获取前台页面传过来的参数
        var param = req.query || req.params;
        console.log(param);
        // 建立连接 返回某个商家的全部菜品
        connection.query(FoodSql.getFoodByUsernameAndDishname, [param.username, param.dishname], function(err, result) {
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

/* 商家添加一个菜品 */
router.post('/addfood', upload.any(), function(req, res, next) {
    // 从连接池获取连接
    console.log("###########添加菜")
    pool.getConnection(function(err, connection) {
        // 获取前台页面传过来的参数
        var param = req.body;
        var files_img = req.files;
        var iconPath;
        if (files_img.length >= 1) {
            iconPath=files_img[0].filename;
        }
        console.log(param);
        // 建立连接 增加一个菜品信息
        // INSERT INTO business_dish(Username,Dishname,DishOldprice,Dishprice,Dishimage,Dishdescription,Dishtypename) VALUES(?,?,?,?,?,?,?)
        connection.query(FoodSql.addFoodInfo, [param.username, param.dishname, param.disholdprice || "null", param.dishprice, iconPath || "null", param.dishdescription, param.dishtypename, param.dishtype], function(err, result) {
            if(result) {
                console.log(result);
                result = {
                    code: 200,
                    msg:'增加成功'
                };
                res.json(result);
            } else {
                res.json({
                    code:403,
                    msg:'增加失败'
                })
            }
            // 以json形式，把操作结果返回给前台页面

            // 释放连接
            connection.release();
        });
    });

});

/* 商家删除一个菜品 */
router.post('/delfood', function(req, res, next) {
    var param = req.body || req.params;
    param.deletelist = param.deletelist.split(",");
    console.log(param);
    for (var i  in param.deletelist) {
        (function(arg){
            pool.getConnection(function(err, connection) {
                console.log("#$$$$$$$$$删除")
                console.log(param.deletelist[arg]);
                connection.query(FoodSql.deleteFoodInfo,[param.username, param.deletelist[arg], param.typenum], function(err, result) {

                    connection.release();
                });
            });
        })(i);
    }
    res.json({
        code:200,
        msg:'删除成功'
    })
});

/* 商家更新一个菜品 */
router.post('/updatefood', function(req, res, next) {
    // 从连接池获取连接
    console.log('*******************');
    console.log(req);
    pool.getConnection(function(err, connection) {
        // 获取前台页面传过来的参数
        var param = req.body || req.params;
        console.log(param);
        if (param.disholdprice != 'null') {
            param.disholdprice = parseInt(param.disholdprice);
        }
        param.dishprice = parseInt(param.dishprice);
        // 建立连接 更新一个菜品
        // "UPDATE business_dish SET DishOldprice = ?, Dishprice = ?,  Dishimage = ?,  Dishdescription = ?, Dishtypename = ? WHERE Username=? AND Dishname = ?"
        connection.query(FoodSql.updateFoodInfo, [param.disholdprice || "null", param.dishprice, param.dishimage || "null", param.dishdescription, param.dishtypename, param.dishtype, param.username, param.dishname], function(err, result) {
            if(result) {
                result = {
                    code: 200,
                    msg:'更新成功'
                };
                console.log(result);
                res.json(result)
            } else {
                result={
                    code:403,
                    msg:'更新失败'
                }
                res.json(result);
                console.log(result);
            }
            // 释放连接
            connection.release();
        });
    });

});
module.exports = router;