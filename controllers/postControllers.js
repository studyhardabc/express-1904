//帖子的控制器，暴露一系列中间件方法给到帖子的路由去使用

//引入PostModel
const PostModel = require('../models/postModels')

//查询帖子列表
exports.index = async(req,res) => {
    //获取前端传递过来的分页数据 pageNum,pageSize query是问号传参
    const pageNum = req.query.pageNum || 1;//页码
    const pageSize = req.query.pageSize || 2;//每页显示条数

    //查询数据库 Model.find().skip(pageNum - 1 * pageSize).limit(pageSize)
    const data = await PostModel.find()
    .skip((pageNum - 1) * pageSize)
    .limit(pageSize);

    //响应
    res.send({
        code:0,
        msg:'0k',
        data
    })
};

//创建帖子
exports.create = async(req,res) => {
    //获取前端传递过来的参数
    const {title,content} = req.body;

    //Model.create
    // PostModel.create({
    //     title,
    //     content
    // })
    // .then(() => {
    //     res.send({
    //         code:0,
    //         msg:'成功'
    //     })
    // })
    // .catch((error) => {
    //     res.send({
    //         code: -1,
    //         msg: '失败'
    //     })
    // })

    await PostModel.create({title,content});
    res.send({code:0, msg: '成功'});
}

//更新帖子
exports.update = async(req,res) => {
    //要更新的帖子的id
    const { id } = req.params;
    //Model.updateOne()
    await PostModel.updateOne({ _id: id }, req.body)
    res.send({ code: 0, msg: '成功'})
}

//删除帖子
exports.remove = async(req,res) => {
    //获取id
    const { id } = req.params;
    await PostModel.deleteOne({ _id: id });
    res.send({ code: 0, msg: '成功'})
}