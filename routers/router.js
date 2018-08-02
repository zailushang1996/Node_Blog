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