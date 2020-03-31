$(function (){
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
    

    //直接发送ajax请求获取详情数据
    var url = `http://localhost:3000/posts/${result.id}`;
    $.get(url,function (res){
        if(res.code == 0){
            var html = `
            <h1 class="mb-5 font-weight-light">${res.data.title}</h1>
            <div class="py-4">${res.data.content}</div>
            <div class="mt-2 text-black-50">
              <small>张三</small>
            </div>
            <div class="mt-2">
              <a href="#" class="badge badge-pill badge-primary px-2 py-1">工作</a>
              <a href="#" class="badge badge-pill badge-primary px-2 py-1">生活</a>
            </div>
            <div class="border-top py-4 mt-4">
              <ul class="nav justify-content-end">
                <li class="nav-item">
                  <a href="./edit.html" class="nav-link btn btn-link">Edit</a>
                </li>
                <li class="nav-item">
                  <a href="javascript:;" class="nav-link btn btn-link">Delete</a>
                </li>
              </ul>
            </div>
            `;
        }
        $('.container').html(html);
    });
})