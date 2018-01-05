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
    <title>预警</title>
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE10"/>
    <meta name="renderer" content="webkit|ie-comp|ie-stand">
	<script type="text/javascript" src="static/ljf/js/jquery-1.9.1.min.js" ></script>
    <style type="text/css">
    	html,body{
			width: 100%;
			height: 100%;
			font-family: "微软雅黑";
		}
		*{
			margin: 0;
			padding: 0;
		}
		
		.wn-showway{
			padding: 10px 0;
			text-align: center;
		}
		.wn-showway button{
			padding: 6px 35px;
		    border: none;
		    color: white;
		    border-radius: 3px;
		    font-weight: 900;
		    cursor: pointer;
		}
		.wn-showway .on{
			background: #A3CDFF;
		}
		.wn-word-inf{
			margin: 0 auto;
			text-align: center;
			min-width: 1190px;
		}
		.wn-word-inf-div{
			display: none;
		}
		.wn-word-inf .show-word-img{
			display: block;
		}
		img{
			width: 900px;
		}
    </style>
</head>
<body>
	<div class="wn-word">
		<div class="wn-showway">
			<button class="on">行政区域</button>
			<button>高速线路</button>
		</div>
		<div class="wn-word-inf">
			<div class="wn-word-inf-div wn-word-inf-area show-word-img">
				<!-- <div>
					<img src="img/27.jpg" />
				</div>
				<div>
					<img src="img/28.jpg" />
				</div>
				<div>
					<img src="img/29.jpg" />
				</div> -->
			</div>
			<div class="wn-word-inf-div wn-word-inf-road">
				<!-- <div>
					<img src="img/29.jpg" />
				</div>
				<div>
					<img src="img/28.jpg" />
				</div>
				<div>
					<img src="img/29.jpg" />
				</div> -->
			</div>
		</div>
	</div>
</body>
<script type="text/javascript">
$(function(){

	$.post("/Automation/ShowWord/show.action",{},function(data){
		console.log(data)
		if(data == false){
			var myHtml = '<p style="text-align: center;line-height: 50px;font-size: 30px;margin-top: 35px;">此时无预警！</p>';
			$("body").append(myHtml)
		}else{
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
