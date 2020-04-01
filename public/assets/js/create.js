$(function (){
    //判断是否有登录，没有登录需要去登录页面
    //使用写在
    needLogin();



    $('#create-post').click(function (){
        $.ajax({
            url: 'http://localhost:3000/posts',
            type: 'post',
            data: {
                title: $('#inp').val(),
                content: $('#inp1').val()
            },
            headers:{
                Authorization:localStorage.getItem('token')
            },
            success: function (res){
                if(res.code == 0){
                    window.location.href = '/post/index.html'
                }
            }
        })
    })
})