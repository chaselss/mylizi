require(["../config"],function () {
	require(["jquery","cookie"],function ($,cookie) {
		$("#headbox").load("common/rl_top.html");
		$("#footbox").load("common/foot.html");
		$(".submit").on("click", function(e) {
			e.preventDefault();
			$.ajax({				//jquery的ajax进行注册操作
						type: "post",
						url: "http://datainfo.duapp.com/shopdata/userinfo.php",
						async: true,
						data: {
							status: "login",
							userID: $("#tel").val(),
							password: $("#pwd").val()
						},
						success: function(data) {
							console.log($("#info").children(),data);
							console.log(typeof data);
							switch(data){
								case "0" :console.log("0"); $("#info").children().html("用户名不存在！");break;
								case "2" :console.log("2"); $("#info").children().html("密码错误！");break;
								default :  setcookie(data,cookie); $("form").submit();
							}
						}
					}); 
		});
	});
	function setcookie (data,cookie) {
		var data = JSON.parse(data);
		var data = {
			userID:data.userID,
			flag:true
		}
		console.log(data);
		cookie.set("user",JSON.stringify(data),10);
		
	}
});