define([],function () {
	return `<% for(var i=0;i<data.length;i++){ %>
		<ul class="shop1" id="<%=data[i].newid%>">
				<li style="width: 28px;padding-right: 12px;"><i style="float: right;" class="check"></i></li>
				<li style="width: 305px;"><img src="<%=data[i].src%>"/>
				<p class="pname"><a href="javascript:;"><%=data[i].name%></a></p></li>
				<li style="width: 150px;padding-right: 10px;"><p class="psize">规格：盒装</p></li>
				<li style="width: 110px" class="pricebox">
				<p class="marketprice"><%=data[i].price%></p>
				<p class="nowprice">￥<em><%=data[i].price%></em></p>
				</li>
				<li style="width: 130px"><div class="countbox clear"><i class="sub">-</i> <input type="text" class="count" value="<%=data[i].count%>" /> <i class="add">+</i></div></li>
				<li style="width: 110px">￥<em class="relaPrice"><%=data[i].price%></em></li>
				<li style="width: 100px"><div class="btn delete">删除</div></li>
		</ul>
		<%}%>`
	
});
/*"log(`
		`); for(var i =0 ;i<data.length ; i++){ 
			log(`<ul class="shop1" pid = "`);
			log(data[i].newid);
			log(`"><li style="width: 28px;padding-right: 12px;"><i style="float: right;" class="check"></i></li><li style="width: 305px;"><img src="../img/details/1d41226b5a713.jpg"/><p class="pname"><a href="javascript:;">`);
			log(data[i].name);
			log(`</a></p></li><li style="width: 150px;padding-right: 10px;"><p class="psize">规格：盒装</p></li><li style="width: 110px" class="pricebox"><p class="marketprice">`);
			log(data[i].markeparice%></p><p class="nowprice">￥<em><%=data[i].price);log(`</em></p></li>
				<li style="width: 130px"><div class="countbox clear"><i class="sub">-</i> <input type="text" class="count" value="`);log(data[i].count);log(`" /> <i class="add">+</i></div></li>
				<li style="width: 110px">￥<em class="relaPrice">`);log(data[i].price);log(`</em></li>
				<li style="width: 100px"><div class="btn delete">删除</div></li>
			</ul>
		`); } log(`
	}
	`)"*/
