//放大镜进阶版
		function magnify (imgbox,magnifybox,relateW,relateH) {
			//根据比例算出放大镜的大小
			var toolsSize = {
				width : imgbox.width()*magnifybox.width()/relateW,
				height : imgbox.height()*magnifybox.height()/relateH
			}
			//算出比例
			var scale = {
				x:relateW/imgbox.width(),
				y:relateH/imgbox.height()
			}
			//根据大小创建工具
			createTool (toolsSize,toolsSize);
			
			imgbox.on("mousemove",function (e) {
				//滚动距离兼容
				var scrollPos = {
					x : document.body.scrollLeft+document.documentElement.scrollLeft,
					y : document.body.scrollTop+document.documentElement.scrollTop
				}
				//规定鼠标移动时工具的位置在box里面
				var offsetx = Math.min(imgbox.width()-toolsSize.width,Math.max(0,e.clientX+scrollPos.x-imgbox.offset().left-toolsSize.width/2));
				var offsety = Math.min(imgbox.height()-toolsSize.height,Math.max(0,e.clientY+scrollPos.y-imgbox.offset().top-toolsSize.height/2));
				var offsetPos = {
					x : offsetx,
					y : offsety
				}
				//给工具设置位置
				$("#tools").css({left:offsetPos.x,top:offsetPos.y,display:"block"});
				magnifybox.children().css({left:-offsetPos.x*scale.x,top:-offsetPos.y*scale.y});
			});
			//鼠标划出工具消失
			imgbox.on("mouseout",function () {
				$("#tools").css("display","none");
			});
			
			//创建放大镜工具
			function createTool (toolsSize) {
				var ele = document.createElement("div");
				$(ele).width(toolsSize.width).height(toolsSize.height);
				ele.id = "tools"
				imgbox.append(ele);
			}
		}