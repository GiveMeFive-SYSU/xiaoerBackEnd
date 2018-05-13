var express = require('express');
var router = express.Router();
var crypto = require("crypto");
var tokenGen = require("../wxServer/msgTemplate");
var Token = "wuhuoshidai";
/* GET home page. */
router.get('/', function(req, res, next) {
    // var echostr, nonce, signature, timestamp;
    // signature = req.query.signature;
    // timestamp = req.query.timestamp;
    // nonce = req.query.nonce;
    // echostr = req.query.echostr;
    // if(check(timestamp,nonce,signature,Token)){
    //     return res.send(echostr);
    // }else{
    //     return res.end();
    // }
    return res.send("hello");
});
router.get('/testToken', function(req, res, next) {
    // console.log(global.wx_token);

});
function check(timestamp, nonce, signature ,token) {
    var currSign, tmp;
    tmp = [token, timestamp, nonce].sort().join("");
    currSign = crypto.createHash("sha1").update(tmp).digest("hex");
    return currSign === signature;
};

module.exports = router;
