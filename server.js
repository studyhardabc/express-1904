//引入express
const express = require('express')

//引入express-async-errors
require('express-async-errors');

//引入抽离出去的路由文件
const postRouter = require('./routers/postRouter')
const userRouter = require('./routers/userRouter')

//实例化一个express的实力
const app = express()

//req.body中间件处理
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//静态资源托管处理
app.use(express.static('./public'));

app.use('/posts', postRouter);
app.use(userRouter);

//统一错误处理
app.use((err,req,res,next) => {
    console.error(err);
    res.status(500).send(err.message);
    next();
})

//监听端口，启动服务
app.listen(3000, () => {
    console.log('服务启动成功');
})