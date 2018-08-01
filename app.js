var express = require("express");
var app = express();
var router = require("./routers/router");
var path = require("path");
var bodyParser = require('body-parser');
var ejs = require('ejs');
var ueditor = require('ueditor');
var session = require('express-session');

app.use(session({
    secret:'keyboard cat',
    resave:false,
    saveUninitialized: true
}));

app.use(bodyParser.json());

app.use(express.static("./public"));



//模板引擎
app.set("view engine","ejs");
//首页
app.get("/",router.showIndex);

console.log("Server running");
app.listen(3000);