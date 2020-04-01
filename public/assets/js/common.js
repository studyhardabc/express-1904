//判断有登录
function isLogined(){
    return localStorage.getItem('token');
}

//页面权限
//页面中调用这个方法，如果没有登录，就弹窗提示，并跳转回登录页面
function needLogin(){
    if(!isLogined()){
        alert('需要登录');
        window.location.href = '/login.html';
    }
}

//渲染右侧navbar的
async function renderNavbar(){
    //判断是否有登录状态，去控制navbar的右侧显示
//登录成功之后我会将token信息写入到cookie中，所以这块就从cookie中获取token来判断是否登录了
var html = '';
if(localStorage.getItem('token')){

    //获取用户的基本信息
    const res = await getUserInfo();


    html = `
    <li class="nav-item">
    <a href="/post/create.html" class="nav-link">
      <i class="fas fa-plus"></i>
    </a>
  </li>
  <li class="nav-item dropdown">
    <a href="javascript:;" class="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown">
      <img src="${res.data.avatar}" class="rounded" width="30" height="30" alt="" />
    </a>
    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
      <a class="dropdown-item" href="/user/settings/profile/edit.html">Profile</a>
      <a class="dropdown-item" href="/user/settings/password/edit.html">Settings</a>
      <div class="dropdown-divider"></div>
      <button id="logout-btn" class="dropdown-item" type="submit">Logout</button>
    </div>
  </li>

    `;
}else{
    html = `
    <li class="nav-item">
    <a href="/post/create.html" class="nav-link">
      <i class="fas fa-plus"></i>
    </a>
  </li>
  <li class="nav-item">
    <a href="/login.html" class="nav-link">login</a>
  </li>
    `;
}
$('#navbar-nav-right').html(html);

//退出登录
$('#navbar-nav-right').on('click','#logout-btn', function (){
    //删除cokie中的token
    //去首页
    localStorage.removeItem('token');
    window.location.href = '/post/index.html';
})
}










//获取当前登录用户的基本信息
function getUserInfo(){
    return new Promise((resolve,reject) => {
        $.ajax({
            url: 'http://localhost:3000/getInfo',
            type: 'get',
            headers: {
                Authorization: localStorage.getItem('token')
            },
            success: function (res){
                // console.log(res);
                resolve(res);
            }
        })
    })
}


$(function (){
    //默认调用一次
    renderNavbar();
})