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