define([], function() {
	return {
		text:`<ul>
		<%for(var i =0;i<data.length;i++){%> 
			<li>
				<%=data[i]%> 
			</li>
		<%}%> 
		</ul>`
	}
})