var request = require('request');
var http = require('https');
var querystring = require('querystring');
var wxApp = require('./wxAppConfig');


refreshAccess_token =  function () {
    setInterval(getToken, 5400000);
};
getToken = function () {
    var url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='+ wxApp.oqmenu.appid +'&secret='+wxApp.oqmenu.secret;
    var options = {
        protocol:'https:',
        host: 'api.weixin.qq.com',
        path:'/cgi-bin/token?grant_type=client_credential&appid='+wxApp.oqmenu.appid+'&secret='+wxApp.oqmenu.secret, // 具体路径, 必须以'/'开头, 是相对于host而言的
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
            // console.log(JSON.parse(resData).access_token);
            global.wx_token = JSON.parse(resData).access_token;
        });
    });
};
startWxService = function () {
    getToken();
    refreshAccess_token();
};


// 需要测试
sendMsg = function (params) {
    var data = {
        "touser": params.touser,
        "template_id": wxApp.oqmenu.templateid,
        "page": "index",
        "form_id": params.form_id,
        "data": {
            "keyword1": {
                "value": params.keyword1,
            },
            "keyword2": {
                "value": params.keyword2,
            },
            "keyword3": {
                "value": params.keyword3,
            },
            "emphasis_keyword": "keyword1.DATA"
        }
    };
    var options = {
        protocol:'https:',
        host: 'api.weixin.qq.com',
        path:'/cgi-bin/wxopen/template/library/get?access_token='+global.wx_token, // 具体路径, 必须以'/'开头, 是相对于host而言的
        method: 'POST',
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

    var req = http.request(options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log("body: " + chunk);
        });
        res.on('end',function(chunk){
            console.log("body: " + chunk);
        })
    });
    req.write(data);
    req.end();
};


module.exports = {
    refreshAccess_token : refreshAccess_token,
    getToken : getToken,
    startWxService : startWxService,
};