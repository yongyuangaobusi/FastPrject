<!DOCTYPE HTML PUBLIC "-//W3C//Dtd HTML 4.01 transitional//EN">
<%@ page contentType="text/html; charset=UTF-8" %>
<%
    String path = request.getContextPath();
    String baseurl = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
%>
<html>
<head>
    <base href="<%=baseurl%>">
    <title>交通气象服务平台</title>
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE10"/>
    <meta name="renderer" content="webkit|ie-comp|ie-stand">
	<link rel="stylesheet" type="text/css" href="static/ljf/css/menu.css"/>
	<script type="text/javascript" src="static/ljf/js/jquery-1.9.1.min.js" ></script>
	<script type="text/javascript" src="static/ljf/js/menu.js"></script>
    <style type="text/css">
    	html,body{
			width: 100%;
			height: 100%;
		}
		body{
			background-color: #f0f3f4;
			display: flex;
			flex-direction: column;
		}
		.top{
			height: 50px;
			line-height: 50px;
			background: #354045;
			font-size: 22px;
			color: white;
			font-weight: 900;
			padding-left: 30px;
			/*background: url(img/2017-09-20_153710.png) no-repeat;
			background-size: 100% 100%;*/
		}
		.content{
			flex: 1;
			width: 100%;
			height: 100%;
			/* background: url(static/ljf/img/2017-09-11_085802.png) no-repeat;
			background-size: 100% 100%; */
		}
    </style>
</head>
<body>
	<div class="top">
		<p title="woshi">交通气象服务系统</p>
		<div id="exitBtn" style="width: 50px;position: absolute;top: 0px;right: 8px;height: 50px;">
			<img style="width: 20px;height: 30px;margin-top: 10px;margin-left: 15px;" src="static/ljf/img/exit.png" />
		</div>
	</div>
	<div style="width: 100%;height: 100%;display: flex;">
		<div class="middle">
			<!-- 隐藏菜单 -->
			<div class="hidLeftMenu" style="display: none; ">
				<img class="openMenu" src="static/ljf/img/open.png">
				<p class="hidTitle">产品</p>
			</div>
			<!-- 隐藏菜单结束 -->
			<!-- 菜单-开始 -->
			<div class="leftMenu" style="margin-left: 0px; display: block; ">
				<div class="topMenu">
					<img class="banshi" src="static/ljf/img/banshidating.png">
					<p class="menuTitle">产品</p>
					<img class="changeMenu" src="static/ljf/img/shouqicaidan.png" id="hidIcon">
				</div>
				<div class="menu_list">
					<ul>
						<li class="lis">
							<p class="fuMenu">实况</p>
							<img class="xiala" src="static/ljf/img/xiala.png">
							<div class="div1">
								<!-- <p class="zcd" id="zcd3">24小时预报</p> -->
								<p class="zcd" id="zcd1"><a style="float: right;" href="jsp/gis/map.jsp" target="ifrPage">实况</a></p>
							</div>
						</li>
						<li class="lis">
							<p class="fuMenu">预报</p>
							<img class="xiala" src="static/ljf/img/xiala.png">
							<div class="div1">
								<p class="zcd" id="zcd3"><a style="float: right;" href="jsp/24WeatherInfo.jsp" target="ifrPage">未来24小时预报</a></p>
								<p class="zcd" id="zcd4"><a style="float: right;" href="jsp/72WeatherInfo.jsp" target="ifrPage">未来三天预报</a></p>
								<p class="zcd" id="zcd4"><a style="float: right;" href="jsp/gis/SimpleReport.jsp" target="ifrPage">高速气象简报</a></p>
							</div>
						</li>
						<li class="lis">
							<p class="fuMenu">预警</p>
							<img class="xiala" src="static/ljf/img/xiala.png">
							<div class="div1">
								<p class="zcd" id="zcd6"><a style="float: right;" href="pages/warning.jsp" target="ifrPage">预警</a></p>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<!-- 菜单-结束 -->
		</div>
	
		<div class="content">
			<iframe style="width: 100%;height: 100%;" id="ifrPage" name="ifrPage" src="jsp/gis/map.jsp"  frameborder="0" ></iframe>
		</div>
	</div>
</body>
<script type="text/javascript">
$(function(){

	//退出点击
	$("#exitBtn").on("click",function(){
		window.location.href = "login";
	})
	
	
	
	$.post("ShowWord/show.action",{},function(data){
		for(var i=0;i<data.length;i++){
			for(var key in data[i]){
			    if(key.substring(0,4) == 'road'){
			    	for(var j=0;j<data[i][key].length;j++){
			    		var roadHtml = '';
			    	 	 roadHtml += '<div><img src="'+data[i][key][j]+'" /></div>';
			    	 	 $(".wn-word-inf-road").append(roadHtml);
			    	}
			    }else{
			    	for(var j=0;j<data[i][key].length;j++){
			    		console.log(data[i][key][j])
			    		var roadHtml = '';
			    	 	 roadHtml += '<div><img src="'+data[i][key][j]+'" /></div>';
			    	 	 $(".wn-word-inf-area").append(roadHtml);
			    	}
			    }
			}
		}
	},"json");
	
	$(".wn-showway button").on("click",function(){
		if($(this).hasClass("on")){
			$(".wn-word-inf-div").eq($(this).index()).addClass("show-word-img").siblings().removeClass("show-word-img")
		}else{
			$(this).addClass("on").siblings().removeClass("on");
			$(".wn-word-inf-div").eq($(this).index()).addClass("show-word-img").siblings().removeClass("show-word-img")
		}
	})
})



</script>
</html>
