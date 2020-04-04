$(function (){
    $('#login-btn').click(function (){
        $.ajax({
            url: '/login',
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
                localStorage.setItem('username',res.nickname);
                window.location.href = './post/index.html';
            }
        })
    })

    $('#register-btn').click(function (){
        window.location.href = './register.html';
    })
})