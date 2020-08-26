(function(){

	var products = [
		{
			name:"喝不起的特仑苏牛奶",
			pic:"./img/1.jpg",
			price:80,
			id:333333
		},
		{
			name:"不知名的三鹿奶粉",
			pic:"./img/3.jpg",
			price:100,
			id:666666
		},
		{
			name:"不知道被谁用过的原味面膜",
			pic:"./img/4.jpg",
			price:60,
			id:999999
		}
	]

	class ShoppingCart{
		constructor(containerId,products){
			this.container = document.getElementById(containerId);//购物车和商品列表所在的容器
			this.shopList = document.createElement('table');//商品列表
			this.cartList = document.createElement('table');//购物车列表
			this.products = products;//为了后面的方法都可以使用products
			this.cartProducts = this.getStorage()||[];//购物车里面的商品集合
			this.container.appendChild(this.shopList);
			this.container.appendChild(this.cartList);
		}
		setStorage(json){
			localStorage.setItem('cart',JSON.stringify(json));
		}
		getStorage(){
			return JSON.parse(localStorage.getItem('cart'))||[];
		}
		init(){
			this.initShopList();//初始化我们的商品列表方法
			if(this.getStorage().length>0){
				//如果本地存储有数据,调用一次渲染购物车函数
				this.renderCartList()
			}
		}
		initShopList(){
			//初始化我们的商品列表方法
			var str = `<thead>
						<tr>
							<th>商品ID</th>
							<th>商品名称</th>
							<th>商品图片</th>
							<th>商品价格</th>
							<th>操作</th>
						</tr>
					   </thead>`;

			str+="<tbody>";
			//products里面有几个数据就显示几个tr
			this.products.forEach((value)=>{
				str+=`<tr>
					<td>${value.id}</td>
					<td>${value.name}</td>
					<td><img src="${value.pic}"></td>
					<td>${value.price}</td>
					<td>
						<a href="javascript:;" class="addCart">点击获取快乐</a>
					</td>
				</tr>`
			})
			str+"</tbody>";
			this.shopList.innerHTML = str;
			
			//调用addCartListEvent,给加入购物车按钮添加事件
			this.addCartListEvent()
		}

		addCartListEvent(){
			//添加加入购物车事件
			var that = this;//that是实例对象
			var addCartBtnArr = this.container.querySelectorAll('.addCart');//当前购物车里面的加入购物车按钮
			addCartBtnArr.forEach((addCartBtn)=>{
				addCartBtn.onclick = function(){
					//事件函数中的this是事件源:当前被点击的a标签
					var tr = this.parentNode.parentNode;//当前被点击的a所在的tr
					var currentProduct = {
						name:tr.children[1].innerHTML,
						price:tr.children[3].innerHTML,
						pic:tr.children[2].children[0].src,
						id:tr.children[0].innerHTML
					}	
					that.addToCartProducts(currentProduct);
					that.renderCartList();
				}
			})
		}
		addToCartProducts(currentProduct){
			this.cartProducts = this.getStorage();
			//该方法负责接收一个新商品信息,然后把这个商品信息加入到本地存储中			
			for(var i=0;i<this.cartProducts.length;i++){
				if(this.cartProducts[i].id==currentProduct.id){
					//如果你传入的这个新商品在购物车列表中有重复,就直接把购物车列表中这个重复的商品数量加1
					this.cartProducts[i].num++;
					this.setStorage(this.cartProducts);
					return;
				}
			}
			//如果你传入的这个新商品在购物车列表中没有重复,就直接添加到购物车列表中,数量为1
			currentProduct.num = 1;
			//
			this.cartProducts.push(currentProduct);		
			this.setStorage(this.cartProducts);
		}
		renderCartList(){
			//该方法负责渲染购物车列表
			var str = `<thead>
				<tr>
					<th>商品ID</th>
					<th>商品名称</th>
					<th>商品图片</th>
					<th>商品价格</th>
					<th>商品数量</th>
					<th>操作</th>
				</tr>
			</thead>`;

			str+="<tbody>";
			this.getStorage().forEach((product)=>{
				str+=`<tr>
					<td>${product.id}</td>
					<td>${product.name}</td>
					<td>
						<img src="${product.pic}">
					</td>
					<td>${product.price*product.num}</td>
					<td class="change">
						<span class="jian">-</span>
						${product.num}
						<span class="jia">+</span>
					</td>
					<td>
						<a href="javascript:;" class="del">剁手</a>
					</td>
				</tr>`
			});

			str+="</tbody>";
			this.cartList.innerHTML = str;
			this.deleteProductEvent();
			this.changeNumEvent();

		}
		changeNumEvent(){
			var that = this;
			var changeNumTdArr = this.container.querySelectorAll('.change');
			changeNumTdArr.forEach((changeNumTd)=>{
				changeNumTd.onclick = function(e){
					//事件函数中的this是事件源
					var target = e.target;
					var id = this.parentNode.children[0].innerHTML;//被点击的商品的id
					if(e.target.className=="jian"){
						that.jianNum(id);
						
					}
					if(e.target.className=="jia"){
						that.jiaNum(id)
						that.renderCartList();

					}
				}
			})
		}
		jianNum(id){
			var arr = this.getStorage();
			for(var i=0;i<arr.length;i++){
				if(arr[i].id==id){
					arr[i].num--;
					this.setStorage(arr);	
					this.renderCartList();
					if(arr[i].num<=0){
						this.deleteFromCartProducts(id);
						return;
					}										
					return;
				}
			}
		}
		jiaNum(id){
			var arr = this.getStorage();
			for(var i=0;i<arr.length;i++){
				if(arr[i].id==id){
					arr[i].num++;					
					this.setStorage(arr);
					return;
				}
			}
		}
		deleteProductEvent(){
			var that = this;
			//添加删除商品事件
			var delBtnArr = this.container.querySelectorAll('.del');//所有的删除按钮
			delBtnArr.forEach((delBtn)=>{
				delBtn.onclick = function(){
					//在事件函数中,this是的是事件源:删除按钮a标签
					var id = this.parentNode.parentNode.children[0].innerHTML;
					that.deleteFromCartProducts(id);					
					
				}
			})
		}
		deleteFromCartProducts(id){
			// console.log(id)
			this.cartProducts = this.getStorage();
			//从购物车列表中删除商品方法
			this.cartProducts = this.cartProducts.filter((product)=>{
				if(product.id==id){
					return false;
				}else{
					return true;
				}
			});
			this.setStorage(this.cartProducts);	
			this.renderCartList();
			if(this.getStorage().length<1){
				//如果本地存储中已经没有数据,请请求购物车里面的内容
				this.cartList.innerHTML = "";
			}

		}

	}

	var car = new ShoppingCart("container",products);
	car.init()

})(   )

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
var str = document.cookie ||"";
var arr = str.split("=");
if (!(arr[0] == 0)) {
  $('.uname')[0].style.display = 'block';
  $('.uname').html(arr[0]);
  $('.log-btn')[0].style.display = 'none';
  $('.reg-btn')[0].style.display = 'none';
}