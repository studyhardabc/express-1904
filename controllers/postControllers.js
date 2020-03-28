//帖子的控制器，暴露一系列中间件方法给到帖子的路由去使用

//引入PostModel
const PostModel = require('../models/postModels')

//查询帖子列表
exports.index = async(req,res) => {
    //Model.find()
    try{
        const data = await PostModel.find()
        res.send({ code:0, msg: '成功', data })
    }catch(error){
        console.log(error);
        res.send({ code: -1, msg: '失败' })
    }
}

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

    try{
        await PostModel.create({title,content});
        res.send({code:0, msg: '成功'});
    }catch(error){
        console.log(error);
        res.send({code:-1, msg: '失败'});
    }
}

//更新帖子
exports.update = async(req,res) => {
    //要更新的帖子的id
    const { id } = req.params;
    //Model.updateOne()
    try{
        await PostModel.updateOne({ _id: id }, req.body)
        res.send({ code: 0, msg: '成功'})
    }catch(error){
        console.log(error);
        res.send({ code: -1, msg: '失败' })
    }
}

//删除帖子
exports.remove = async(req,res) => {
    //获取id
    const { id } = req.params;
    try{
        await PostModel.deleteOne({ _id: id });
        res.send({ code: 0, msg: '成功'})
    }catch(error){
        console.log(error);
        res.send({ code: -1, msg: '失败' })
    }
}