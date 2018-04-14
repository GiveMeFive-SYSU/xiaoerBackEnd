var  multer=require('multer');
var keyVerify = require('../keyMgr/keyMgr');

var storage = multer.diskStorage({
    //设置上传后文件路径，uploads文件夹需要手动创建
    // 待测试 手动创建
    destination: function (req, file, cb) {
        // console.log("set dist");
        cb(null, './public/images')
    },
    //给上传文件重命名，获取添加后缀名
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        var icon_name_suffix = (Date.now() + (Math.round(Math.random() * 999)));//生成随机后缀名称
        cb(null, icon_name_suffix + "." + fileFormat[fileFormat.length - 1]);
        req.iconFileName = icon_name_suffix;
    }
});
//添加配置文件到muler对象。
var upload = multer({
        storage: storage,
        fileFilter: function fileFilter(req, file, cb) {
            // 这个函数应该调用 `cb` 用boolean值来
            // 指示是否应接受该文件

            var icon_file = file;
            // console.log(file);
            // var _iconName = req.file.mimetype.split("/")[1];
            // re = /^\d+[a-z]+\d$/;
            if (icon_file) {
                var type = icon_file.mimetype, extension_name = '';
                // console.log(type);
                switch (type) { //判断文件类型
                    case 'image/pjpeg':
                        extension_name = 'jpg';
                        break;
                    case 'image/jpeg':
                        extension_name = 'jpg';
                        break;
                    case 'image/gif':
                        extension_name = 'gif';
                        break;
                    case 'image/png':
                        extension_name = 'png';
                        break;
                    case 'image/x-png':
                        extension_name = 'png';
                        break;
                    case 'image/bmp':
                        extension_name = 'bmp';
                        break;
                    default:
                        // 拒绝这个文件，使用`false`, 像这样:
                        cb(null, false);
                }
                // 接受这个文件，使用`true`, 像这样:

                cb(null, true);
                // 如果有问题，你可以总是这样发送一个错误:
                //
            } else {
                // console.log("true");
                cb(null, false);
                // cb(new Error('没有文件'));
            }
        },
        limits : {
            files : 3
        }

    }
);

//如需其他设置，请参考multer的limits,使用方法如下。
//var upload = multer({
//    storage: storage,
//    limits:{}
// });
module.exports = upload;