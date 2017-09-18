define([],function () {
	var dateobj;	
	   //day6时间对象---------------------------------------------------------------------------------------------------
	return dateobj = {
		//计算从起始时间到结束时间有多少天
		cauDate: function(a, b) {
			var atime = new Date(a);
			var btime = new Date(b);
			var secondsss = Math.abs(atime.getTime() - btime.getTime());
			console.log("ok");
			console.log(secondsss / (1000 * 3600 * 24) + "天");
		},
		//多少天以后的日期
		numAfter: function(num) {
			var now = new Date();
			now.setDate(now.getDate() + 100);
			return now;
		},
		//倒计时
		countDown: function(time, p1) {
			var millitime = Date.parse(time);
			setInterval(function() {
				var now = new Date();
				var totle = (millitime - now.getTime()) / 1000;
				var day = Math.floor(totle / (3600 * 24));
				var hours = Math.floor((totle - day * 3600 * 24) / 3600);
				var minutes = Math.floor((totle - day * 3600 * 24 - hours * 3600) / 60);
				var sconds = Math.floor(totle % 60);
				document.getElementById(p1).innerHTML = day + "天" + hours + "时" + minutes + "分" + sconds + "秒";
			}, 1000);
		},
		//字符串转日期(字符串，符号)
		stringToDate: function(str1, str2) {
			str2 = str2 || "-";
			str1 = str1.replace(new RegExp(str2, "gi"), "-");
			return new Date(str1);
		},
		//判断两个日期相差的天数
		countBetweenDate: function(d1, d2) {
			if(typeof d1 == "string") {
				d1 = stringToDate(d1);
			}
			if(typeof d2 == "string") {
				d2 = stringToDate(d2);
			}
			return Math.abs(d1.getTime() - d2.getTime()) / (1000 * 3600 * 24);
		},
		//判断年份是否位闰年
		isLeapYear: function(year) {
			if(year % 400 == 0 && (year % 100 != 0 && year % 4 == 0)) {
				return true;
			}
			return false;
		}
	
	}
})