 //轮播图
 var mySwiper = new Swiper ('.swiper-container', {
    autoplay:true,
	loop: true, // 循环模式选项
    
    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination',
    },
 })
 
 // 鼠标划入显示图片
 $('.brand-mask').on('mouseenter',function(e){
	 var e = window.event || e;
	 var target = e.target || e.which;
	if(target.nodeName=="SPAN"){
		target.parentNode.parentNode.style.opacity = 1;
		target.parentNode.parentNode.style.filter = "alpha(opacity=100)";
	}else if(target.nodeName=="A"){
		target.style.opacity = 1;
		target.style.filter = "alpha(opacity=100)";
	}else if(target.children[0].innerHTML=="点击进入"){
		target.parentNode.style.opacity = 1;
		target.parentNode.style.filter = "alpha(opacity=100)";
	}
	var that = target;
	$('.brand-mask').on('mouseleave',function(){
		if(target.nodeName=="SPAN"){
			target.parentNode.parentNode.style.opacity = 0;
			target.parentNode.parentNode.style.filter = "alpha(opacity=0)";
		}else if(target.nodeName=="A"){
			target.style.opacity = 0;
			target.style.filter = "alpha(opacity=0)";
		}else if(target.children[0].innerHTML=="点击进入"){
			target.parentNode.style.opacity = 0;
			target.parentNode.style.filter = "alpha(opacity=0)";
		}
	})
 })
 
 // 通过关键字进行搜索
 var $inp = $('#txt')[0];//关键字的输入框
 var $box = $('.boxTxt')[0];//显示结果的盒子
 //文字防抖
 var flag = true;//判断用户是否输入完成,默认是完成的
 $inp.addEventListener('compositionstart',function(){
 	flag = false;
 })
 $inp.addEventListener('compositionend',function(){
 	flag = true;
 })
 $inp.oninput = function(){
 	setTimeout(function(){
 		if(flag){
 			var keyword = $inp.value;//输入的关键字
 			$.ajax({
 				dataType:'jsonp',
 				url:'https://suggest.taobao.com/sug',
 				data:{
 					code:"utf-8",
 					q:keyword,
 					_ksTS:"1563970517892_385",
 					k:1,
 					area:"c2c",
 					bucketid:10
 				},
 				success:function(data){
 					var result = data.result;//是一个数组
 					var str = "";
 					result.forEach(function(value){
 						str+="<li>"+value[0]+"</li>"
 					})
 					$box.innerHTML = str;
 				}
 			})
 		}
 	},0)
 }

//用户cookie没有过期时
var str = document.cookie;
var arr = str.split("=")
if(!(arr[0]==0)){
	$('.uname')[0].style.display = 'block';
	$('.uname').html(arr[0]);
	$('.log-btn')[0].style.display = 'none';
	$('.reg-btn')[0].style.display = 'none';
}










