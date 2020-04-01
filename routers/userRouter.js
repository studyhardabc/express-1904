const express = require('express');

const multer = require('multer');
const upload = multer({
    dest: './uploads'
})

const auth = require('../middlewares/auth');

const userController = require('../controllers/userControllers');

const router = express.Router();

/**
 * @api {post} http://localhost:3000/register 用户注册
 * @apiGroup 用户
 *
 * @apiParam (body) {String} email 用户邮箱
 * @apiParam (body) {String} password 用户密码
 *
 * @apiSuccess {Number} code 错误状态码.
 * @apiSuccess {String} msg  错误消息.
 */
router.post('/register', userController.register);

/**
 * @api {post} http://localhost:3000/login 用户登录
 * @apiGroup 用户
 *
 * @apiParam (body) {String} email 用户邮箱
 * @apiParam (body) {String} password 用户密码
 *
 * @apiSuccess {Number} code 错误状态码.
 * @apiSuccess {String} msg  错误消息.
 * @apiSuccess {String} token  token.
 */
router.post('/login', userController.login);

/**
 * @api {post} http://localhost:3000/getInfo 获取当钱登录用户的基本信息
 * @apiGroup 用户
 *
 * @apiParam (Headers) {String} Authorization  token信息.
 *
 * @apiSuccess {Number} code 错误状态码.
 * @apiSuccess {String} msg  错误消息.
 * @apiSuccess {Object} data  当前用户的基本信息.
 */
router.get('/getInfo', auth, userController.getInfo)

/**
 * @api {put} http://localhost:3000/users/updata 修改当前用户的基本信息
 * @apiGroup 用户
 * 
 * @apiParam (body) {Object} avatar  要修改的头像.
 * @apiParam (Headers) {String} Authorization  token信息.
 *
 * @apiSuccess {Number} code 错误状态码.
 * @apiSuccess {String} msg  错误消息.
 * @apiSuccess {Object} data  修改之后的当前用户的基本信息.
 */
router.put('/users/updata', auth, upload.single('avatar'), userController.updata)


module.exports = router;