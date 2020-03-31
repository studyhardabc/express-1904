const UserModer = require('../models/userModels');
const jsonwebtoken = require('jsonwebtoken');

// exports.register = async (req,res) => {
//     //要获取前端传递过来的用户信息 body方法接收
//     // const {email,password,nickname} = req.body;

//     //Moder.create()写入数据库
// //     await UserModer.create(
// //         Object.assign({}, req.body, {
// //         password: bcryptjs.hashSync(req.body.password)
// //     })
// // );

//     //上面代码可以不修改
//     await UserModer.create(req.body);

//     //响应
//     res.send({
//         code: 0,
//         msg: '注册成功'
//     });
// };

exports.register = async (req,res) => {
    //获取email
    const {email} = req.body;
    //判断是否已经注册过，能查找到说明已经注册过
    const data = await UserModer.findOne({email});
    if(data){
        res.send({code: -1,msg: '用户已经注册了'});
    }else{
        await UserModer.create(req.body);
        res.send({code:0, msg: '用户名注册成功'});
    }
}

exports.login = async (req,res) => {
    //获取前端传递过来的email和password
    const {email,password} = req.body;
    //根据email去查询数据库
    const data = await UserModer.findOne({email});
    //判断data是否有值
    if(!data){
        res.send({code: -1, msg: '用户邮箱不正确'});
        return;
    }

    //验证密码是否正确
    if(!data.comparePassword(password)){
        res.send({code: -1, msg: '密码不正确'});
        return;
    }

    //生成token
    const token = jsonwebtoken.sign({
        //思考将哪些信息写入到token中，一般时用户角色信息，用户id信息，不要写太多数据进去
        userId: data._id,
        nickname: data.nickname
    }, 
        'abc',
        {
            expiresIn: '2h'
        }
    );

    res.send({code:0, msg: '登录成功', token});
}