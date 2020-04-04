const express = require('express');
const auth = require('../middlewares/auth');
const router = express.Router();

//GET /chatroom 聊天室页面
router.get('/chatroom', auth, (req,res) => {
    res.send('123')
})

module.exports = router;
