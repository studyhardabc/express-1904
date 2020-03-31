const UserModer = require('../models/userModels');

exports.register = async (req,res) => {
    //要获取前端传递过来的用户信息 body方法接收
    // const {email,password,nickname} = req.body;

    //Moder.create()写入数据库
//     await UserModer.create(
//         Object.assign({}, req.body, {
//         password: bcryptjs.hashSync(req.body.password)
//     })
// );

    //上面代码可以不修改
    await UserModer.create(req.body);

    //响应
    res.send({
        code: 0,
        msg: '注册成功'
    });
};

exports.login = (req,res) => {
    res.send('用户登录');
}