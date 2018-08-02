##ejs模板引擎

##mongodb Node源生驱动使用(数据库模块封装)

##crypto 加密

##formidable 表单数据处理

##moment 日期时间库

##underscore 模板解析引擎
```js
//定义一个模板
<script type="text/template" id="allArticle">
    <div class="col-md-11 news-1">
        <a href="/article?ID={{= ID }}"><h5>{{= topic }}</h5></a>
        <h6>{{= date }}</h6>
        <div class="post-body">
            <p> {{= content.substring(0,200).replace(/<[^>]+>/g,"") }} </p>
        </div>
        <div class="news-footer">
            <h6 class="post-footer">
                分类：{{= classify }} <!--| 评论：未开放--> | 浏览：{{= visitNum }} | 点赞：{{= thumbsUp }} |
                <a href="/article?ID={{= ID }}">阅读全文 ></a>
            </h6>
        </div>
    </div>
</script>
```
```js
//使用underscore解析模板
import * as _ from "../public/js/underscore-noflect";

    var getAllArticle = $('#getAllArticle');
    //得到模板
    var compiled = _.template($("#allArticle").html());
    getPage(0);
    //AJAX读取文章列表
    function getPage(page) {
        $.post("/getArticle?page="+page,function (result) {
            for(var i = 0; i<result.allResult.length; i++){
                var htmlstring = compiled(result.allResult[i]);
                getAllArticle.append(htmlstring);
            }
        });
    }
```