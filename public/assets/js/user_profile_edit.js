$(function (){

    //数据回填，获取用户基本信息
    getUserInfo().then( res => {
        // console.log(res);
        $('#myemail').val(res.data.email);
        $('#myimg').attr('src',res.data.avatar);
    })


    $('#btn-submit').click(function (){
        var formData = new FormData();
        formData.append('avatar',$('#inp')[0].files[0]);

        $.ajax({
            url: '/users/updata',
            type: 'put',
            data: formData,
            headers: {
                Authorization: localStorage.getItem('token')
            },
            processData: false,
            contentType: false,
            success: function (res){
                // console.log(res);
                if(res.code == 0){
                    alert('修改成功');
                    //刷新页面
                    window.location.reload();
                }
            }
        })
    })

    $('#span1').click(function (){
        window.location.href = '/post/chatroom.html';
      })
  
})