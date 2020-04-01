//帖子的控制器，暴露一系列中间件方法给到帖子的路由去使用

//引入PostModel
const PostModel = require('../models/postModels');

//查询帖子列表
exports.index = async(req,res) => {
    //获取前端传递过来的分页数据 pageNum,pageSize query是问号传参
    const pageNum = parseInt(req.query.pageNum) || 1;//页码 问号传参过来都是字符串，所有要转成数字
    const pageSize = parseInt(req.query.pageSize) || 2;//每页显示条数
    //获取前端传递过来的搜索的数据 title
    const title = req.query.title;

    //查询数据库 Model.find().skip(pageNum - 1 * pageSize).limit(pageSize)
    const data = await PostModel.find({title: new RegExp(title)})
    .populate('userId', ['nickname','email'])
    .skip((pageNum - 1) * pageSize)
    .limit(pageSize);

    //前端还需要早点一共有多少页，需要后台告诉他
    //totalPage = Math.ceil(总条数 / 每页显示条数) = Math.ceil(总条数 / pageSize)
    const total = await PostModel.find({title: new RegExp(title)}).countDocuments(); //查找数据库，然后用count这个方法可以得到数据库有多少条
    //再计算出totalPage
    const totalPage = Math.ceil(total / pageSize);

    //响应
    res.send({
        code:0,
        msg:'0k',
        data: {
            list:data,
            totalPage: totalPage
        }
        
    })
};

//创建帖子
// exports.create = async(req,res) => {
//     //获取前端传递过来的参数
//     const {title,content} = req.body;

//     //Model.create
//     // PostModel.create({
//     //     title,
//     //     content
//     // })
//     // .then(() => {
//     //     res.send({
//     //         code:0,
//     //         msg:'成功'
//     //     })
//     // })
//     // .catch((error) => {
//     //     res.send({
//     //         code: -1,
//     //         msg: '失败'
//     //     })
//     // })

//     await PostModel.create({title,content});
//     res.send({code:0, msg: '成功'});
// }

// exports.create = async(req,res) => {
//     //验证token是否存在并有效，token一般都是请求头传递过来

//     const token = req.get('Authorization')

//     if(token){
//         //存在，还要去验证token是否有效
//         jsonwebtoken.verify(token, 'abc', async (err,data) => {
//             if(err){
//                 //验证失败
//                 res.status(401).send('身份验证失败');
//             }else{
//                 //验证成功
//                 const {title,content} = req.body;

//                 await PostModel.create({title,content});
//                 res.send({code:0, msg: '成功'});
//             }
//         })

//     }else{
//         res.status(401).send('请携带token');
//     }


// }

exports.create = async(req,res) => {
    //验证成功
    // const {title,content,userId} = req.body;
    // await PostModel.create({title,content,userId});
    // console.log(req.auth);
    const {userId} = req.auth;
    req.body.userId = userId;
    
    await PostModel.create(req.body);
    res.send({code:0, msg: '成功'});

}



//更新帖子
exports.update = async(req,res) => {
    //要更新的帖子的id
    const { id } = req.params;
    //Model.updateOne()
    await PostModel.updateOne({ _id: id }, req.body)
    const data = await PostModel.findOne({_id: id});
    res.send({ code: 0, msg: '成功',data});
}

//删除帖子
exports.remove = async(req,res) => {
    //获取id
    const { id } = req.params;
    await PostModel.deleteOne({ _id: id });
    res.send({ code: 0, msg: '成功'})
}

//帖子详情
exports.show = async(req,res) => {
    //获取id 动态路径传参用req.params
    const { id } = req.params;

    //Model.find() => []
    //Model.findOne() => {}
    const data = await PostModel.findOne({ _id: id }).populate('userId',['nickname','email'])
    res.send({ code: 0, msg: '成功',data})
}