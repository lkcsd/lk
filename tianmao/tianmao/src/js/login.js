//设置cookie
function setCookie(un,pw){
	var date = new Date();
	date.setDate(date.getDate()+3);
	document.cookie = un+"="+pw+";expires="+date.toString();
}
//输入用户名得到密码
function getCookie(un){
	var str = document.cookie;
	var arr = str.split("; ");
	for(var i = 0; i < arr.length ; i++){
		var newArr = arr[i].split("=");
		if(newArr[0]==un){
			return newArr[1];
		}else{
			return 0;
		}
	}
}

var $un = $('#txt');//获取用户名
var $pw = $('#pw');//获取密码
var $logBtn = $("#log-btn");//登陆按钮
var $regBtn = $("#reg-btn");//注册按钮

//点击登陆
$logBtn.on('click',function(){
	var un = $un.val();//用户名
	un = $.trim(un);
	var pw = $pw.val();//密码
	pw = $.trim(pw);
	var result = getCookie(un);
	if(result==0){
		var p = $("<p>用户名错误</p>");
		$('.defeat')[0].style.display = "block";
		$('.defeat').html('');
		$('.defeat').append(p);
		return;
	}
	if(!(result==pw)){
		var p = $("<p>密码错误</p>");
		$('.defeat')[0].style.display = "block";
		$('.defeat').html('');
		$('.defeat').append(p);
		return;
	}
	$('.defeat')[0].style.display = "none";
	var p = $("<p>"+un+"欢迎回来<a href='http://localhost:8080'>喵,快乐购物</a></p>");
	$('.box')[0].style.display = "none";
	$('.success')[0].style.display = "block";
	$('.success').html('');
	$('.success').append(p);
})

//点击注册
$regBtn.on('click',function(){
	$('.defeat')[0].style.display = "none";
	var un = $un.val();//用户名
	un = $.trim(un);
	var pw = $pw.val();//密码
	pw = $.trim(pw);

	//用户名和密码验证
	var reg = /^([a-z_]\w{2,5})|([\u4E00-\u9FA0]{2,4})$/
	if(!(reg.test(un))){
		var p = $("<p>3-6位,非数字开头</p>");
		$('.defeat')[0].style.display = "block";
		$('.defeat').html('');
		$('.defeat').append(p);
		return;
	}
	var regPw =/^\d{6}$/
	if(!(regPw.test(pw))){
		var p = $("<p>密码必须6位数字</p>");
		$('.defeat')[0].style.display = "block";
		$('.defeat').html('');
		$('.defeat').append(p);
		return;
	}
	
	$('.defeat')[0].style.display = "none";
	setCookie(un,pw)
	
	var result = getCookie(un);
	if(result==pw){
		var p = $("<p>"+un+"注册成功<a href='#' class='log-click'>点击登陆</a></p>");
		var a = $("")
		$('.box')[0].style.display = "none";
		$('.success')[0].style.display = "block";
		$('.success').html('');
		$('.success').append(p);
		$('.log-click').on('click',function(){
			location.reload();
		})
	}
})

