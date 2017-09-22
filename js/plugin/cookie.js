define([],function () {
	return {
			get: function(str) {
				var list = document.cookie.split("; ");
				for(var i in list) {
					var cie = list[i].split("=");
					if(cie[0] == str) {
						return cie[1];
					}
				}
				return null;
			},
			set: function(str, value, expires, path) {
				if(!!expires) {
					var day = new Date();
					day.setDate(day.getDate() + expires);
				}
				document.cookie = str + "=" + value + ";" + (expires ? "expires=" + day + ";" : "") + (path ? "path=" + path + ";" : "");
			}
		}
})