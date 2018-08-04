var formidable = require('formidable');
var db = require("../model/db.js");
var md5 = require("../model/md5.js");
var fs = require("fs");
var moment = require('moment');
var MongoClient = require('mongodb').MongoClient, test = require('assert');

//首页
exports.showIndex = function (req,res,next) {
    res.render("index");
};

exports.showRecording = function (req, res, next) {
    if (req.session.login != "1") {
        res.render("login");
    } else {
        res.render("recording");
    }
};
exports.doRecording = function (req, res, next) {

    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields) {
        db.getAllCount("article", function (count) {
            var allCount = count.toString();
            var date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
            //写入数据库
            db.insertOne("article", {
                "ID" : parseInt(allCount) + 1,
                "topic" : fields.topic,
                "publisher" : fields.publisher,
                "classify" : fields.classify,
                "content" : fields.content,
                "date" : date,
                "thumbsUp": 0,
                "visitNum" : 0
            },function (err, result) {
                if(err){
                    res.send("-1");
                    return;
                }
                res.send("1");
            });
        });
    });
};

exports.getArticle = function (req, res, next) {
    var page = req.query.page;
    db.find("article",{},{"pageamount":10,"page":page,"sort":{"date":-1}},function (err, result) {
        var obj = {"allResult": result};
        res.json(obj);
    });
};
exports.getAllAmount = function (req, res, next) {
    db.getAllCount("article",function (count) {
        res.send(count.toString());
    });
};

exports.showRegister = function (req, res, result) {
    res.render("register");
};
exports.doRegister = function (req, res, result) {

    var form = new formidable.IncomingForm();
    form.parse(req,function (err, fields, files) {
        var username = fields.username;
        var password = fields.password;
        var md5Password = md5(md5(password).substr(4, 7) + md5(password));
        db.insertOne("user",{
            "username":username,
            "password": md5Password
        },function (err, result) {
            if (err) {
                res.send("-3");
                return;
            }
            req.session.login = "1";
            res.send("1");
        });
    });
};

exports.showLogin = function (req, res, result) {
    res.render("login");
};
exports.doLogin = function (req, res, result) {
    //得到用户填写的东西
    var form = new formidable.IncomingForm();
    form.parse(req,function (err, fields, files) {
        var username = fields.username;
        var password = fields.password;
        password = md5(md5(password).substr(4, 7) + md5(password));

        //检索数据库，按登录名检索数据库，查看密码是否匹配
        db.find("user",{"username":username},function (err, result) {
            if (err) {
                res.send("-3");//服务器错误
                return;
            }
            if (result.length == 0) {
                res.send("-1");//
                return;
            }
            var dbpassword = result[0].password;
            //要对用户这次输入的密码，进行相同的加密操作。然后与
            //数据库中的密码进行比对
            if (dbpassword === password) {
                req.session.login = "1";
                res.send("1");
                return;
            } else {
                res.send("-2");
            }
        });
    });
};
