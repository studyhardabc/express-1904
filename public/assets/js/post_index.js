$(function (){
    $.get('http://localhost:3000/posts', function (res){
        console.log(res);
    if(res.code == 0){//只有等于0的时候才是真正的成功
        var html = '';
        res.data.forEach((item,index) => {
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
