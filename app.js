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

//编写页面
app.get("/recording", router.showRecording);
//执行保存
app.post("/doRecording", router.doRecording);

//取得文章
app.post("/getArticle", router.getArticle);


//注册页面
app.get("/register", router.showRegister);
app.post("/doRegister",router.doRegister);

//登录界面
app.get("/login", router.showLogin);
app.post("/doLogin", router.doLogin);
//取得总页数
app.post("/getAllAmount", router.getAllAmount);
console.log("Server running");
app.listen(3000);