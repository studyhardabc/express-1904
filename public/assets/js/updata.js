$(function (){
    //需要登录
    needLogin();

    //获取当前帖子id
    var href = window.location.href;
    var str = href.split('?')[1] //id = 5e7f6ea7306cb72a68c65e2b
    //判断str是否存在
    if(!str){
        alert('请注意查看是否有id');
        return;
    }
    var arr = str.split('&');
    var result = {};
    arr.forEach(item => {
        var tmp = item.split('=');
        result[tmp[0]] = tmp[1];
    });
    
    console.log(result.id);

    $.ajax({
        url: `/${result.id}`,
        type: 'get',
        success: function (res){
            $('#inp').val(res.data.title),
            $('#inp1').val(res.data.content)
        }
    })

    $('#inp2').click(function (){
        $.ajax({
            url: `/${result.id}`,
            type: 'put',
            data: {
                title: $('#inp').val(),
                content: $('#inp1').val()
            },
            headers: {
                Authorization: localStorage.getItem('token')
            },
            success: function (res){
                if(res.code == 0){
                    alert('更新成功');
                    window.location.href = '/post/index.html'
                }else{
                    console.log(res.msg);
                }
            }
        })
    })
    
})