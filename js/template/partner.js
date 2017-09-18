define([],function () {
	return {
		html: `<%for (var i=0;i<data.length;i++) {%>
		<li class="clear">
			<a>
				
				<img src=<%=data[i].src%>>
			</a>
		</li>
	<%}%>`
	};
});