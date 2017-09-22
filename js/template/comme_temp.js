define([],function () {
	return `
	<%for(var i=0;i<data.length;i++){%>
		<div class="c1">
			<div class="left_c1"><img src="../img/details/tou.png"/></div>
			<div class="right_c1">
				<div class="r1_c1_top">
					<div class="x1">
						<span class="tel"><%=data[i].userName%></span>
						<span class="jifu"><%=data[i].skin%></span>
					</div>
					<div class="x2">
						<span class="star">
							<%for(var k=0;k<data[i].score;k++){%>
							<i class="fa fa-star"></i>
							<%}%>
						</span>
						<span class="time"><%=data[i].dateCreated%></span>
					</div>
				</div>
				<p class="data"><%=data[i].content%></p>
			</div>
		</div>
	<%}%>
	`
})
	