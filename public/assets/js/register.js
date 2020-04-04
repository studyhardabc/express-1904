$(function (){
    $('#register-btn').click(function (){
        $.ajax({
            url: '/register',
            type: 'post',
            data: {
                email: $('#inputEmail').val(),
                password: $('#inputPassword').val(),
                nickname: $('#inputname').val()
            },
            success: function (res){
                if(res.code !== 0){
                    alert(res.msg);
                    return;
                }
                window.location.href = './login.html';
            }
        })
    })

    $('#login-btn').click(function (){
        window.location.href = './login.html';
    })
})