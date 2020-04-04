//引入express
const express = require('express');
const socketIo = require('socket.io');

require('dotenv').config();

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
const server = app.listen(4000, () => {
    console.log('服务启动成功');
})

const io = socketIo.listen(server);

//建立io的connection事件去处理客户端连接
io.on('connection', socket => {
    //提供一个事件叫做setName供客户端去设置名字
    socket.on('setName', username => {
      //给当前socket添加一个名字，值就是传递过来的username
      socket.username = username;
  
      //给其他人发送一个系统消息，xxx进入聊天室
      socket.broadcast.emit('message', {
        username: 'System',
        message: `欢迎${socket.username}进入直播间`
      })
    });
  
    //监听message事件，这个事件由客户端触发
    socket.on('message', data => {
      //data {message: value}
  
      //转给当前客户端
      socket.emit('message', {
        username: socket.username,
        message: data.message
      })
  
      //转发给其他客户端
      socket.broadcast.emit('message', {
        username: socket.username,
        message: data.message
      })
    })
  });
  
