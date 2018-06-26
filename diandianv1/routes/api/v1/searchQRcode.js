var express = require('express');
var router = express.Router();
var qr_image = require('qr-image');

var serverConfig = require("../../../server/serverConfig");

router.get('/generateQR', function(req, res, next) {
    var param = req.query || req.params;
    console.log(param);
    var temp_qrcode = qr_image.image(String(serverConfig.diandianserver.host) + ':' +String(serverConfig.diandianserver.port) +'/api/v1/searchFood?username=' + param.username + "&tablenum=" + param.tablenum);
    res.type('png');
    temp_qrcode.pipe(res);
});

router.get('/getRestaurantAndTableByQrCode', function (req, res, next) {
   var param = req.query || req.params;
    console.log(param);

    // 这里的还可能需要验证username是否还在数据库 （应该是不用的，因为生成的时候一定在
    //
    //

   res.json({
       'username': param.username,
       'table' : param.table
   })
});

module.exports = router;