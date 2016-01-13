// 在 Cloud code 里初始化 Express 框架
var express = require('express');
var app = express();
var StudySessionOption = AV.Object.extend("StudySessionOption")
var Vote = AV.Object.extend("Vote")

// App 全局配置
app.set('views','cloud/views');   // 设置模板目录
app.set('view engine', 'ejs');    // 设置 template 引擎
app.use(express.bodyParser());    // 读取请求 body 的中间件
app.use(express.static(__dirname + '/public'));

// 使用 Express 路由 API 服务 /hello 的 HTTP GET 请求
app.get('/hello', function(req, res) {
  res.render('hello', { message: 'Congrats, you just set up your app!' });
});

app.get("/votes", function(req, res) {
  var query = new AV.Query(StudySessionOption)
  query.find({
    success:function(options){
      res.render('votes/votes',{
        title:"select your session time",
        options:options
      })
    }
  })
});

app.post("/votes/addVote", function(req, res) {
  var vote = new Vote()
  vote.set("name",req.body.name);
  vote.set("email",req.body.email);
  var relation = vote.get("option")
  for(var i in req.body.option){
    vote.relation("options").add(AV.Object.createWithoutData("StudySessionOption",req.body.option[i]))
  }
  res.redirect("/vote/result")
});

app.get('/success', function(req, res) {
  res.render('votes/result', { title: 'voted' });
});
// 最后，必须有这行代码来使 express 响应 HTTP 请求
app.listen();