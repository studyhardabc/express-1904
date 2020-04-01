//帖子模型文件

//引入已经连接MongoDB的mongoose
const mongoose = require('../config/db')

//定义schema
const postSchema = new mongoose.Schema({
    //帖子标题
    //type：String  类型
    //required: true    必须填
    title: { type: String, required: true },

    //帖子内容
    content: { type: String, required: true },

    //用户id，关联的是users集合
    //在mongoose中不说集合，说模型
    //mongoose.Schema.Types.ObjectId
    //mongoose.SchemaTypes.ObjectId
    //ref 关联的是哪个模型 也就是mongoose.model()时传递传递的第一个参数
    userId: {type:mongoose.SchemaTypes.ObjectId, ref: 'user', required: true}

}, {
    //timestamps: true 会多出2个字段 createdAt updateAt
    timestamps: true
});

//创建模型，构造函数
const PostModel = mongoose.model('post', postSchema)

//暴露模型
module.exports = PostModel;