$(function (){
    //定义一些需要使用的变量
    var pageNum = 1;//当前页码数
    var pageSize = 5;//每页显示条数
    var totalPage = 1;//总的页数
    var searchTitle = '' //标题搜索关键字
  
    //定义一个getData的方法专门去发送ajax请求获取数据
    function getData(){
        $.get('http://localhost:3000/posts',{
            pageNum:pageNum,
            pageSize:pageSize,
            title:searchTitle
        }, function (res){
            console.log(res);
        if(res.code == 0){//只有等于0的时候才是真正的成功
          //列表数据
            var html = '';
            res.data.list.forEach((item,index) => {
                html += `
                <li class="list-group-item flex-column align-items-start py-3">
                <div class="d-flex justify-content-between">
                  <a class="text-dark w-75" href="./show.html?id=${item._id}">
                    <h4>${item.title}</h4>
                  </a>
                  <small class="text-black-50 text-right">${moment(item.updatedAt).format('YYYY-MM-DD hh:mm:ss')}</small>
                </div>
                <div class="font-weight-light text-truncate">${item.content}</div>
              </li>
                `;
            })
            $('.list-group').html(html);
        }
        
            //分页按钮的数据
            //将后台返回的res.data.totalPage 赋值给totalPage
            totalPage = res.data.totalPage;
            var pageHtml = '';
            //上一页
            pageHtml += `
              <li data-page="${pageNum > 1 ? pageNum - 1 : 1}" class="page-item"><a class="page-link" href="javascript:;">Prev</a></li>
            `;
    
            //循环计算出页码 totalPage是个数字，不能使用forEach，但是可以通过普通的for循环去处理
            for(var i = 0 ; i < totalPage ; i++){
              pageHtml += `
              <li data-page="${i + 1}" class="page-item ${i + 1 === pageNum ? 'active' : '' }"><a class="page-link" href="javascript:;">${i+1}</a></li>
              `;
            }
            //下一页
            pageHtml += `
            <li data-page="${pageNum < totalPage ? pageNum + 1 : totalPage}" class="page-item"><a class="page-link" href="javascript:;">Next</a></li>
            `;
            //写入页面中
            $('.pagination').html(pageHtml);
        })
    }
    //页面打开默认要获取一次
    getData();

    //绑定分页事件
    $('.pagination').on('click','.page-item',function (){
        //获取toPage
        var toPage = $(this).data('page');

        //判断是否是重复的请求
        if(toPage == pageNum){
            return;
        }
        //将toPage赋值给PageNum
        pageNum = toPage;
        //再调用getData
        getData();
    })

    //点击搜索框确定按钮
    $('#search-btn').click(function (){
      var value = $('#search-input').val();
      searchTitle = value;
      pageNum = 1;//将pageNum重置为1
      //发送ajax请求，还是去调用getData这个，但是这个方法需要修改点内容
      getData();
    })
});
