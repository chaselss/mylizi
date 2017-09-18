define([],function () {
    return function (text, data) {
	text = "log(`" + text + "`)";
	text = text.replace(/<%=(.+)%>/g, "`);log($1);log(`");
	text = text.replace(/<%(.+)%>/g, "`); $1 log(`");
	var html = "";

	function log(str) {
		html += str;
	}
	eval(`${text}`);
	return html;
  }
})