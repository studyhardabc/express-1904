$(function (){
    $('#login-btn').click(function (){
        $.ajax({
            url: 'http://localhost:3000/login',
            type: 'post',
            data:{
                email: $('#inputEmail').val(),
                password: $('#inputPassword').val()
            },
            success: function (res){
                console.log(res);
                if(res.code !== 0){
                    alert(res.msg);
                    return;
                }
                localStorage.setItem('token',res.token);
                window.location.href = './post/index.html'
            }
        })
    })
})