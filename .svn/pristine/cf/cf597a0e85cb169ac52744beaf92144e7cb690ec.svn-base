<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
    String path = request.getContextPath();
    String baseurl = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<!DOCTYPE html>
<html style="width:100%;height:100%;">
<head>
<base href="<%=baseurl%>">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>交通气象服务系统</title>
<link rel="stylesheet" href="css/bootstrap.min.css" />
 <link rel="stylesheet" href="css/login.css" /> 
<script src="js/jquery.min.js"></script>
<script src="js/bootstrap.js"></script>
<script src="js/login.js"></script>
<script type="text/javascript">
	$(document).ready(function() {
		//实现回车登录
		var $inp = $("input");
		$(window).keypress(function(e) {
			var key = e.which;
			if (key == 13) {
				var name = $("#username").val();
				var password = $("#password").val();
				if (name.length < 1) {
					alert("用户名不能为空！");
					return false;
				} else if (password.length < 1) {
					alert("密码不能为空！");
					return false;
				} else {
					document.forms[0].submit();
				}
			}
		});
		var arrs = document.cookie.split(";");
		$("#username").bind("change", function() {
			for (var i = 0; i < arrs.length; i++) {
				var temp = arrs[i].split("=");
				if (temp[0] == this.value) {
					var ps = temp[1];
					$("#password").val(ps);
				}
			}
		});
	});
</script>
</head>
<body style="width:100%;height:100%;">
			<div class="login_main">
				<span class="tit">交通气象服务系统</span>
				<div class="head" id="head">
					<div class="left">用户登录</div>
					<div class="right"></div>
				</div>
				<form action="${ctx}/admin/login" method="POST">
					<div style="position: relative;">
						<div class="con">
							<font color="#FF0000">${msg}</font>
						</div>
						<div class="loginInfo">
							<div class="userName">
								<input type="text" name="username" id="username"
									placeholder="用户名" class="form-control">
								<div class="line"></div>
							</div>
							<div class="password">
								<input type="password" name="password" id="password"
									placeholder="密码" class="form-control">
								<div class="line"></div>
							</div>
							<div class="rember">
								<input type="checkbox" id="cbtest" name="cbtest"> <label
									for="cbtest" class="check-box"></label> <label
									style="margin-left: 8px;">记住密码</label>
							</div>
							<div class="lob">
								<div class="loginBut"
									onclick="javascript:document.forms[0].submit()">登录</div>
							</div>
						</div>
					</div>
				</form>
			</div>
</body>
</html>
