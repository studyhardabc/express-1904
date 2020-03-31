const mongoose = require('../config/db');
const bcryptjs = require('bcryptjs');

const userSchema = new mongoose.Schema({
    //电子邮箱
    email: {
        type: String, 
        required: true,
        //自定义验证
        validate: {
            //验证的函数，接收的v是传递的值
            validator: function(v) {
                //需要返回，返回为true，验证成功，返回为false，验证失败
              return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(v);
            },
            //验证失败时输出的错误信息
            message: '请输入正确的邮箱地址'
          }
    },

    //用户密码
    password: {type: String, required: true},

    //用户昵称
    //default 设置默认值，没有传递这个字段时，就使用默认值
    nickname: {type: String, default: ''}
}, 
  {
    timestamps: true
  }
);

//可以提供一些钩子函数，在一些特定操作的时候会自动执行的函数
//下面这个代码会在Model.create() 也就是新创建一个UserModel实例的时候，会执行callback
//不能使用箭头函数
//callback会接收到一个next函数，调用这个函数让代码下流执行
// callback 中的this指向的内容时当前创建的那个文档，就是对象
userSchema.pre('save', function (next){
    //对this.password加密之后，再赋值给this.password
    this.password = bcryptjs.hashSync(this.password,10);
    next();
})

//给UserModel的实力(document)用户，添加一个实例方法
//验证密码
userSchema.methods.comparePassword = function (password){
    return bcryptjs.compareSync(password,this.password)//原密码，加密后的密码,返回一个布尔类型
}

const UserModel = mongoose.model('user',userSchema);

module.exports = UserModel;