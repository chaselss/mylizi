require(["../config"], function() {
	var newid;		//商品id
	var comment_temp;	//字符串模版
	var comment_tempengine;		//字符串模版引擎
	var comment_page;			//评论总页数
	var get_comment_data;		//评论总数
	require(["jquery", "cookie","tempengine","comment_tem","magnify","pager"], function($,cookie,tempengine,comment_tem) {
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
		/*shopnav*/
		shopnav ();
		/*放大镜*/
		magnifyfn();
		/*获取页面数据*//*评论区*/
		var searchId = cookie.get("searchId");
		comment_temp = comment_tem;
		comment_tempengine=tempengine;
		$(".lcontent ul li").on("click",function () {
			$(".dcenter:eq("+$(this).index()+")").show().siblings().hide();
			$(this).addClass("li1").siblings().removeClass("li1");
		})
		new Promise(function (ok) {
			getAjaxDate(searchId,ok);		//加载页面数据
		}).then(function () {
			get_comment_data ()		 	//评论区加载数据
		});
	 	get_comment_data = function  (type,page) {		//获取评论区数据       //懒加载
			type=type?type:1;
			page=page?page:1;
			console.log("haha");
			$.ajax({
					type:"post",
					url:"/api/item/commentList",
					data:{
						id:newid,
						type:type,
						page:page
					},
					success: function (data) {
						var html = comment_tempengine(comment_temp,data.comments);
						$(".commcontent").html(html);		//生成评论
						comment_page = data.pages.total;	//获取评论总数
						creatPageNav()						//创建分页导航
					}
					
				});
			get_comment_data = function (type,page) {
				$.ajax({
					type:"post",
					url:"/api/item/commentList",
					data:{
						id:newid,
						type:type,
						page:page
					},
					success: function (data) {
						var html = comment_tempengine(comment_temp,data.comments);
						$(".commcontent").html(html);		//再次生成评论
					}
					
				});
			}
		}			
		/*加减商品数量*/
		click_add_substract ();
		/*尾部信息*/
		$("#footbox").load("common/foot.html");
	})
	function click_add_substract () {
		$(".sub").on("click",function () {
			var count = $(this).siblings(".count").html();
			if (count>1) {
				$(this).siblings(".count").html(+count-1);
			}
		})
		$(".add").on("click",function () {
			var count = $(this).siblings(".count").html();
			console.log()
			if (count<9999) {
				$(this).siblings(".count").html(+count+1);
			}
		})
	}
	function creatPageNav () {
		Page({								//根据页数生成分页导航
		    num: comment_page,
		    elem: $('#page1'),
		    callback: function(n) {
		    	get_comment_data(1,n);
		    }
		});
	}
	function getAjaxDate (searchId,ok) {
		$.ajax({
				type:"post",
				url:"/api/item/item_detail",
				data:{itemNum:searchId},
				success: function (data) {
					newid = data.skus[0].itemId;
					loaddata(data);  	//加载数据
					ok();
				},
				dataType:"json"
			});
	}
	function loaddata (data) {
		$(".marketpriice").html(data.skus[0].marketPrice);
		$("#now_price").html(data.skus[0].price);
		$(".d3 em").html(data.salesVolume);
		$(".d4 em").html(data.comment);
		$(".d4 a i").html(data.comment_num);
		$(".all em").html(data.comment_num);
	}
	function magnifyfn () {
		$(".pic").hover(function () {
			$("#maginfy").css({display:"block"});
			magnify ($("#imgbox"),$("#maginfy"),800,800);
		},function () {
			$("#maginfy").css({display:"none"});
		});
	}
	function shopnav () {
		$(".ul").parent().hover(function () {
			$(".ul").css({display:"block"});
			$(this).children("a").children("i").removeClass().addClass("fa fa-caret-up");
		},function () {
			$(".ul").css({display:"none"});
			$(this).children("a").children("i").removeClass().addClass("fa fa-caret-down");
		})	
	}
});
