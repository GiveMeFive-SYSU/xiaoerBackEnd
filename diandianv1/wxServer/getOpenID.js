var request = require('request');
var http = require('https');
var querystring = require('querystring');
var wxApp = require('./wxAppConfig');
// https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code
https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code
getOpenID = function (js_code, cb) {

    var url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='+ wxApp.oqmenu.appid +'&secret='+wxApp.oqmenu.secret;
    var options = {
        protocol:'https:',
        host: 'api.weixin.qq.com',
        path:'/sns/jscode2session?appid='+wxApp.oqmenu.appid+'&secret='+wxApp.oqmenu.secret+'&js_code='+ js_code.toString()+'&grant_type=authorization_code', // 具体路径, 必须以'/'开头, 是相对于host而言的
        method: 'GET',
        headers: {
            'Accept' : 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Encoding' : 'gzip, deflate, br',
            'Accept-Language' : 'zh-CN,zh;q=0.8,en-US;q=0.5,en;q=0.3',
            'Connection' : 'keep-alive',
            'Host' : 'api.weixin.qq.com',
            'Upgrade-Insecure-Requests': 1,
            'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:54.0) Gecko/20100101 Firefox/54.0'
        }
    };
    http.get(options, function(res) {
        var resData = "";
        res.on("data",function(data){
            resData += data;
        });
        res.on("end", function() {
            // console.log("%%%%%%%%%%%");
            // console.log(JSON.parse(resData).openid);
            cb(JSON.parse(resData).openid)
        });
    });
};
module.exports = {
    getOpenID : getOpenID
};