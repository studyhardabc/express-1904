$(function (){

  //定义一些需要使用到达变量
  var pageNum = 1;//当前页码数
  var pageSize = 2;//每页显示条数
  var totalPage = 1;//总的页数

    $.get('http://localhost:3000/posts', function (res){
        console.log(res);
    if(res.code == 0){//只有等于0的时候才是真正的成功
      //列表数据
        var html = '';
        res.data.list.forEach((item,index) => {
            html += `
            <li class="list-group-item flex-column align-items-start py-3">
            <div class="d-flex justify-content-between">
              <a class="text-dark w-75" href="./show.html">
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

    //监听分页的点击事件
    $('.pagination').on('click','.page-item',function (){
        // var num = $(this).text();//推荐使用自定义属性的操作获取
        // console.log($(this).attr('data-page'));
        // console.log($(this).data('page'));
        var toPage = $(this).data('page');
        //重新发送ajax请求 toPage 的数据
        $.get('http://localhost:3000/posts',{
          pageNum:toPage
        },
        function (res){
          if(res.code == 0){//只有等于0的时候才是真正的成功
            //列表数据
              var html = '';
              res.data.list.forEach((item,index) => {
                  html += `
                  <li class="list-group-item flex-column align-items-start py-3">
                  <div class="d-flex justify-content-between">
                    <a class="text-dark w-75" href="./show.html">
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
        })
    })
})
