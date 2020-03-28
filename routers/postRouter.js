//post路由文件

//引入express
const express = require('express')

//引入postControllers
const {index,create,update,remove} = require('../controllers/postControllers')


//生成express.Router的实例
const router = express.Router()

//定义帖子相关的路由
//GET /POSTS
router.get('/', index);

//POST /POSTS
router.post('/', create);

//PUT /POSTS/:id
router.put('/:id', update);

//DELETE /POSTS/:id
router.delete('/:id', remove);



//暴露router的实例
module.exports = router