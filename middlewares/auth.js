//专门处理身份验证的中间件
//一个中间件其实就是一个中间件函数，接收到req，res，next这三个参数的函数
const jsonwebtoken = require('jsonwebtoken');

module.exports = (req,res,next) => {
    //获取请求头中的Authorization，得到的值就是一个token
    const token = req.get('Authorization')
    
    //判断token是否存在
    if(token){
        //存在，还要去验证token是否有效
        jsonwebtoken.verify(token, 'abc', async (err,data) => {
            if(err){
                //验证失败
                res.status(401).send('身份验证失败');
            }else{
                //验证成功,再去做你后续的操作
                // console.log(data);//data中的信息就是之前生成token时的 payload {userId:xxx, nickname:yyy}
                //中间件可以在req与res身上添加属性或者方法
                req.auth = data;
                next();
            }
        });
    }else{
        //不存在，直接响应了，不需要next了
        res.status(401).send('请携带token');
    }

}