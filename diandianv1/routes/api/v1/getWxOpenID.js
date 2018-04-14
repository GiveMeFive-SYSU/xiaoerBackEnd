var express = require('express');
var router = express.Router();
var getOpenID = require('../../../wxServer/getOpenID');
router.get('/', function (req, res) {
    var pa = req.query;
    var js_code = pa.jscode;
    console.log(req);

    getOpenID.getOpenID(js_code, function (OpenID) {
        res.json({'openid': OpenID});
    });
});
module.exports = router;