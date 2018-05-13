var express = require('express');
var router = express.Router();
var getOpenID = require('../../../wxServer/getOpenID');
router.get('/', function (req, res) {
    // console.log(req)
    var pa = req.query;
    var js_code = pa.js_code;
    console.log("Start get open id");
    console.log(js_code);

    getOpenID.getOpenID(js_code, function (OpenID) {
        res.json({'openid': OpenID});
    });
});
module.exports = router;