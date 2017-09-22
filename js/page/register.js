require(["../config"], function() {
	require(["jquery", "cookie", "ajax"], function($, cookie) {
		$("#headbox").load("common/rl_top.html");
		$("#footbox").load("common/foot.html");
		verify();
		$(".submit").on("click", function(e) {
			e.preventDefault();
			verifysubmit();
		});
	})

	function verifysubmit() {

		$(".submit").on("click", function(e) {
			e.preventDefault();
			var flag;
			$("input:lt(4)").each(function(index) {
				if($("input:first").get(0).flag == true) {
					flag = true;
				}
				if(this.flag == false) {
					flag = false;
				}
			})
			if(flag && $("#agree").prop("checked")) {
				$.ajax({				//jquery的ajax进行注册操作
					type: "post",
					url: "http://datainfo.duapp.com/shopdata/userinfo.php",
					async: true,
					data: {
						status: "register",
						userID: $("#tel").val(),
						password: $("#pwd").val()
					},
					success: function(data) {
						console.log($("#info").children(),data);
						switch(data){
							case "0" :console.log("0"); $("#info").children().html("手机号已经被注册，请直接登录！");break;
							case "1" :console.log("1"); $("#info").children().html("恭喜您已注册成功！");break;
							case "2" :console.log("2"); $("#info").children().html("error！");break;
						}
					}
				}); 
			} else {
				console.log("0");
			}
		})

		/*var data = {
					status:"register",
					userID:$("#tel").val(),
					password:$("#pwd").val()
				}
		var option = {
			type:"post",
			params:data,
			url:"http://datainfo.duapp.com/shopdata/userinfo.php",
			success:success
		}
		function success (data) {
			switch (data){
				case 0 : console.log(0);
				case 1 : console.log(1);
				case 2 : console.log(2);
				
			}
		}
		ajax(option);*/
		/*$.ajax({
			type: "post",
			url: "http://datainfo.duapp.com/shopdata/userinfo.php",
			async: true,
			data: {
				status: "register",
				userID: $("#tel").val(),
				password: $("#pwd").val()
			},
			success: function(data) {
				console.log(data)
			}
		});*/
	}
	
	function verify() {
		$("#tel").on("keyup", function() {
			if(/^1[3|5|7|8]\d{9}$/.test($(this).val())) {
				$(this).css({
					borderColor: "green"
				});
				this.flag = true;
			} else {
				$(this).css({
					borderColor: "#FF616F"
				});
				this.flag = false;
			}
		});
		$("#pwd").on("keyup", function() {
			if(/^[A-Za-z_]\w{5}\w{0,14}$/.test($(this).val())) {
				$(this).css({
					borderColor: "green"
				});
				this.flag = true;
			} else {
				$(this).css({
					borderColor: "#FF616F"
				});
				this.flag = false;
			}
		});
		$("#pwds").on("keyup", function() {
			if($(this).val() == $("#pwd").val() && $(this).val() != "") {
				$(this).css({
					borderColor: "green"
				});
				this.flag = true;
			} else {
				$(this).css({
					borderColor: "#FF616F"
				});
				this.flag = false;
			}
		})
		$("#yanzheng").on("change", function() {
			if(/^[A-Za-z0-9]{4}$/.test($(this).val())) {
				$(this).css({
					borderColor: "green"
				});
				this.flag = true;
			} else {
				$(this).css({
					borderColor: "#FF616F"
				});
				this.flag = false;
			}
		})

	}
})