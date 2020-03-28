//引入express
const express = require('express')

//引入抽离出去的路由文件
const postRouter = require('./routers/postRouter')

//实例化一个express的实力
const app = express()

//req.body中间件处理
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/posts', postRouter)

//监听端口，启动服务
app.listen(3000, () => {
    console.log('服务启动成功');
})