require(["../config"], function() {
	
	require(["jquery", "cookie","tempengine","comment_tem","magnify","pager"], function($,cookie,tempengine,comment_tem) {
		
		/*头部信息*/
		$("#headbox").load("common/headFoot.html",function () {
				var searcheinp = $("#search");
				var searchbtn = $("#searchbtn");
				//页面头部信息
				var heart = $("#headFoot li");
				//检查cookie是否有登录信息
				var data = JSON.parse(cookie.get("user"));
				if(!!data) {
					if (!!data.flag) {
						
						$(".login").attr("href", "").html(data.userID);
						$(".register").attr("href", "login.html").html("注销");
					}
				}
				//划过顶部li变色
				heart.on("mouseover", function(e) {
					if(e.target.nodeName == "LI" && $(e.target).index() != 0) {
						if($(e.target).index() == 0) {

						} else {

							$(e.target).children().css("color", "#FF616F").end().siblings().children().css("color", "#9e9e9e");
						}
					} else if($(e.target.parentNode).index() == 0) {
						$(e.target).css("color", "#FF616F").siblings().css("color", "#9e9e9e");
					}
					if(e.target.className.indexOf("fa-heart") > -1) {
						e.target.style.color = "#fff";
						e.target.style.transform = "scale(1.8)";
						setTimeout(function() {
							e.target.style.color = "#9e9e9e";
							e.target.style.transform = "scale(1)";
						}.bind(this), 50);
					}

				})
				//划过关注我们
				$(".more_menu").hover(function(e) {
					if(e.target == this) {
						$(".more_bd:first").css("top", 35).stop(true, true).animate({
							opacity: "1",
							top: 28
						}, 300);
					}
				}, function(e) {
					$(".more_bd:first").stop(true, true).animate({
						opacity: "0"
					}, 10);
				});
		});
		
		/*tab_line滑动效果*/
		slide_tab_line()
		
		/*全选-单选 效果实现*/
		click_checkbox();			//checkbox
		click_add_substract();		//购物车数量增减
		quick_change_count()		//快速修改商品数量
		
		/*删除按钮实现*/
		
		deletemsg()
		/*尾部信息*/
		$("#footbox").load("common/foot.html");
	
	});
	function slide_tab_line () {

		$(".item_tab a").on("mouseenter",function () {
			$(".tab_line").stop().animate({left:$(this).index()*137},200);
		})
	}
	function click_checkbox () {
		/*给checkbox添加点击事件添加点击事件*/
		$(".check").on("click",function () {
			//第一次点击成选中状态，第二次是取消状态
			if (!this.check) {
				this.check = true;
				$(this).addClass("ischecked");
			}else{
				this.check = false;
				$(this).removeClass("ischecked");
			}
			
			//判断是否全选
			if (this.className.indexOf("all")>-1) {
				
				if (this.check) {
					$(".check").addClass("ischecked");
					$(".check").each(function () {
						this.check=true;
					})
				}else{
					$(".check").removeClass("ischecked");
					$(".check").each(function () {
						this.check=false;
					})
				}
				setprice($(".check:not('.all')"));
			}else{
				setprice (this);
			}
			//判断商品是否被全部选中
				var result = [];
				result = $(".check").not(".all").filter(function () {
					return !!this.check==false;
				})
				if (result.length==0) {
					$(".check").addClass("ischecked");
					$(".check").each(function () {
						this.check=true;
					})
				}else{
					$(".all").each(function () {
						this.check = false;
						$(this).removeClass("ischecked");
					})
				}
		})
	}
	function caculate () {
		//算勾选商品的总价格
		var sum = 0;
		var flag = false;
		var ele = [];
		ele =  $(".check:not(.all)").filter(function () {
			return this.check==true;
		})
		if (ele.length ==0) {
			$(".duoshou").html("0.00");
			$(".pay").removeClass("pay");
		}else{
			for (var s = 0; s<ele.length;s++) {
				var parent = $(ele[s]).parents(".shop1").get(0);
					sum += parseInt(parent.sum);
					$("button").addClass("pay");
			}
		}
	}
	function click_add_substract () {
		$(".sub").on("click",function () {
			var count = $(this).siblings("input").val();
			if (count>1) {
				$(this).siblings("input").val(+count-1);
				setprice (this);
			}
		})
		$(".add").on("click",function () {
			var count = $(this).siblings("input").val();
			if (count<9999) {
				$(this).siblings("input").val(+count+1);
				setprice (this);
			}
		})
	}
	function setprice (ele) {
		if (ele.length) {
			for (var i =0;i<ele.length;i++) {
				var price = parseInt($(ele[i]).parents(".shop1").find(".nowprice").children().html())*(+$(ele[i]).parents(".shop1").find("input").val())
				$(ele[i]).parents(".shop1").find(".relaPrice").html(price);
				$(ele[i]).parents(".shop1").get(0).sum =  price;
			}
		}else{
			var price = parseInt($(ele).parents(".shop1").find(".nowprice").children().html())*(+$(ele).parents(".shop1").find("input").val())
			$(ele).parents(".shop1").find(".relaPrice").html(price);
			$(ele).parents(".shop1").get(0).sum =  price;
		}
		caculate ();
	}
	function quick_change_count () {
		
		//确保输入的值不能为非数字
		$(".count").on("keyup",function (e) {
			if (e.keyCode>=48&&e.keyCode<=57||e.keyCode==8||e.keyCode==39||e.keyCode==37) {
				//确保输入以后value不能为0
				if (!$(this).val()) {
					$(this).val(1);
				}
				setprice(this);
			}else{
				var str;
				str = $(this).val().replace(/\D/g,function (value) {
					return "";
				})
				$(this).val(str);
			}
		})
	}
	function deletemsg () {
		$(".delete").on("click",function () {			//单次删除
			$(this).parents(".shop1").remove();
			if (!$(".check:not('.all')").length) {
				$(".page").hide(100);
				$(".empty").show(100);
			}
		})
		$(".del_bat").on("click",function () {			//批量删除
			$(".check:not('.all')").each(function () {
				var parent = $(this).parents(".shop1");
				if (this.check) {
					parent.get(0).remove();
					caculate();
					if (!$(".check:not('.all')").length) {
						$(".page").hide(100);
						$(".empty").show(100);
					}
				}
			})
			
		})
	}
});