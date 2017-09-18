require(["../config"], function() {
	require(["jquery","temp","tempengine","date","partemp","swiper","ajax"], function($,temp,tempengine,mydate,partemp) {
		$(window).load(function() {
			$("#headFoot").load("common/headFoot.html", function() {
				var searcheinp = $("#search");
				var searchbtn = $("#searchbtn");
				//页面头部信息
				var heart = $("#headFoot li");

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
			$("#footbox").load("common/foot.html");
			//导航
			//swiper
			//搜索框获取数据JSOP
			//http://suggest.taobao.com/sug?code=utf-8&q=商品关键字&callback=cb
			getsearch_jsonp ();
			//鼠标划过显示全部商品列表
			showallpro();
			//侧边栏
			setSideBar();
			//scrollFloor
			floorclick();
			scrollfloor()
			//banner轮播图
			banner ({
				name:'.banner',
				time:2000,
				pagination:'.pag1'
			});
			//60秒抢购
			rushbuy ();
			banner ({
				name:'.productul',
				time:1000*60,
				pagination:'.pag2'
			});
			var $card = $(".card");//card动画效果设置
			setshadow($card);
			//hotactivity
			setcountTime ($(".c1 span"),"2018/11/16 14:55:25");//设置倒计时时间
			setcountTime ($(".c2 span"),"2018/11/18 11:55:52");//设置倒计时时间
			setcountTime ($(".c3 span"),"2018/11/1 10:55:45");//设置倒计时时间
			setcountTime ($(".c4 span"),"2018/11/3 21:55:57");//设置倒计时时间
			setblink();									     //鼠标划过效果
			//recommend
			getProductData ($(".floor1:first"),"../json/productData.json",seteledate);	//给页面添加信息
			getProductData ($(".floor2:first"),"../json/productData.json",seteledate);	//给页面添加信息
			getProductData ($(".floor3:first"),"../json/productData.json",seteledate);	//给页面添加信息
			getProductData ($(".floor4:first"),"../json/productData.json",seteledate);	//给页面添加信息
			getProductData ($(".floor5:first"),"../json/productData.json",seteledate);	//给页面添加信息
			getProductData ($(".floor6:first"),"../json/productData.json",seteledate);	//给页面添加信息
			setTimeout(function () {
				setmovex();
			},1000)
			//partner
			$(".big").hover(function () {
				$(this).children().stop().animate({width:"106%",height:"106%",top:"-3%",left:"-3%"},500);
			},function () {
				$(this).children().stop().animate({width:"100%",height:"100%",top:0,left:0},500);
			})
			
			new Promise(function (success) {
				getProductData($(".partner ul"),"../json/partner.json",setPartner,success);
			}).then(function () {
				setparhover ();                               //设置鼠标划过特效
			})
		
		})
		function floorclick () {
			var ul = $("#scrollFloor");
			ul.children(":not(:last)").on("click",function () {		//定位到各自的楼层
				var index = $(this).index();
				$("body").stop(true).animate({scrollTop:2000+index*880},200);
				$(document.documentElement).stop(true).animate({scrollTop: 2000+index*880}, 200);
				$(this).css({background:"#FF616F"}).siblings().css({background:"#FC9D9B"});
			})
			ul.children(":last").on("click",function () {		//回到顶部
				$("body").stop(true).animate({scrollTop:0},500);
				$(document.documentElement).stop(true).animate({scrollTop: 0}, 1000);
			})
			
		}
		function scrollfloor () {
			var ul = $("#scrollFloor");
			$(window).on("scroll",function () {
				var distance = $(this).scrollTop();
				if (distance>2000) {
					$("#scrollFloor").fadeIn(500);
					var index = parseInt((distance-2000)/880);
					ul.children(":not(:last)").eq(index).css({background:"#FF616F"}).siblings().css({background:"#FC9D9B"});
				}else{
					$("#scrollFloor").fadeOut(500);
				}
				
			})
			
		}
		function setSideBar () {
			var height = document.documentElement.clientHeight;
			$(".sidebar").css({"height":height});
			window.onresize = function () {
				var height = document.documentElement.clientHeight;
				$(".sidebar").css({height:height});
			}
			//滑倒一定距离侧边栏才出现
			$(window).on("scroll",function () {
				if ($(window).scrollTop()>=500) {
					$(".sidebar").stop().animate({right:0},100);
				}else{
					$(".sidebar").stop().animate({right:-40},100);
				}
			})
			$(".bottom:first").children(":last").click(function () {
				$("body").stop(true).animate({scrollTop:0},500);
				$(document.documentElement).stop(true).animate({scrollTop: 0}, 1000);
			})
			$(".bottom").children().children("i").on("mouseenter",function (e) {
				var $tip = $(this).siblings();
				$tip.css({display:"block"}).stop().animate({right:40},300);
			})
			$(".bottom").children().children("i").on("mouseout",function () {
				var $tip = $(this).siblings();
				$tip.stop().css({right:60,display:"none"});
			});
		}
		function setmovex () {
			$(".small_content li").hover(function (e) {
				var scale = (e.clientX- $(this).offset().left)/ $(this).width();
				if (scale<0.5) {
					$(this).children().children(".imgbox").children().stop(true).animate({left:-5},100);
				}else{
					$(this).children().children(".imgbox").children().stop(true).animate({left:5},100);
				}
			},function (e) {
				$(this).children().children(".imgbox").children().stop(true).animate({left:0},400);
			})
		}
		function setblink () {
			$(".blink").on("mouseover",function () {
				$(this).children(".after").css("left","-15%").stop(true).animate({left:"120%"},1000);
			})
		}
		function setparhover () {
			var $li = $(".partner ul li");
			$li.hover(function () {
				$(this).children("a").children("img").stop().animate({top:-5},300);
			},function () {
				$(this).children("a").children("img").stop().animate({top:0},300);
			})
		}
		function setPartner ($ul,data,success) {
			var data = Object.values(JSON.parse(data));
			$ul.html(tempengine(partemp.html,data));
			success();
		}
		function getProductData ($ele,url,loaddate,success) {
			var a = new XMLHttpRequest();
			a.open("get",url,"true");
			a.onload = function () {
			loaddate ($ele,a.response,success); //加信息
			};
			a.send();
		}
		
		function seteledate ($floor,data) {
			var $lilist = $floor.children("ul").children("li");
			var data = JSON.parse(data);	//数据对象
			var keys = Object.keys(data);	//keys
			for(var i =0;i<$lilist.length;i++){
				var $li = $($lilist.get(i)).children();
				$($lilist.get(i)).get(0).productID = keys[i];
				var $btmbox = $($lilist.get(i)).children().children(".btmbox");
				$li.children().children().attr("src",data[keys[i]].imgurl);
				$li.children(".pname").html(data[keys[i]].pname);
				$btmbox.children(".price").html(data[keys[i]].price);
				$btmbox.children().has("i").children(".sale").html(data[keys[i]].salesVloume);
				
			}
		}
		
		function setcountTime ($timegroup,endtime) {
			var timeoption = {
				day:$timegroup.eq(0),
				hours:$timegroup.eq(1),
				minutes:$timegroup.eq(2),
				sconds:$timegroup.eq(3),
			}
			var settime;
			var millitime = Date.parse(endtime);
			setInterval(function() {
				var now = new Date();
				var totle = (millitime - now.getTime()) / 1000;
				var day = Math.floor(totle / (3600 * 24));
				var hours = Math.floor((totle - day * 3600 * 24) / 3600);
				var minutes = Math.floor((totle - day * 3600 * 24 - hours * 3600) / 60);
				var sconds = Math.floor(totle % 60);
				timeoption.day.html(day);
				timeoption.hours.html(hours);
				timeoption.minutes.html(minutes);
				timeoption.sconds.html(sconds);
			}, 1000);
			
		}
		function setshadow ($list) {
			$list.hover(function (e) {
				$(this).css({boxShadow:"2px 2px 5px #ccc"}).children(".right").stop().animate({bottom:40},200);
				
			},function () {
				$(this).css("boxShadow","").children(".right").stop().animate({bottom:30},200);
			})
		}
		function rushbuy () {
			var $time = $("#counttime");
			const TIME = 60;
			setTimeout(function () {
				if ($time.html()=="0") {
					$time.html(TIME);
				}else{
					$time.html(+$time.html()-1);
				}
				setTimeout(arguments.callee,1000);
			},1000);
		}
		function banner (option) {
			new Swiper(option.name,{
				autoplay : option.time,//可选选项，自动滑动
				speed : 1000, //可选选项，动画运行时间
				loop : true,//可选选项，开启循环
				pagination: option.pagination,
				paginationClickable :true,
			    autoplayDisableOnInteraction : false,

			})
		}
		function showallpro () {
			var $all = $(".all");
			var $productlist = $(".productlist:first");
			var flag = false;
			$all.hover(function () {
				$productlist.show(200);
			},function () {
				setTimeout(function () {
					if (!flag) {
						$productlist.hide(200);
					}
				},200)
			})
			$productlist.hover(function () {
				flag = true;
			},function () {
				flag = false;
				$(this).hide(200);
			})
		}
		function getsearch_jsonp () {
			var $search = $(".top_center #search");
			var $result = $(".top_center .result:first");
			function success (data) {
				var html = tempengine(temp.text,data.s);
				$result.get(0).innerHTML=html;
			}
			$(document).on("click",function (e) {
				if (e.target.parentNode.parentNode.className=="result") {
					$search.val(e.target.innerText);
				}
				$result.get(0).innerHTML="";
			})
			//输入框按下键时触发ajax请求
			$search.on("keyup",function () {
				if ($(this).val()=="") {
					$result.get(0).innerHTML="";
					return;
				}
				var option={
					type:"jsonp",
					url:"http://suggestion.baidu.com?wd="+$search.val(),
					jsonpcallback:"cb",
					success:success
				}
				ajax(option);
			});
		}
	})
})