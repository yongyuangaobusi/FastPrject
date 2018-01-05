<%@ page language="java" contentType="text/html;charset=UTF-8"
	import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>

<base href="<%=basePath%>">
<link rel="icon" href="static/ico/favicon.ico">
<link rel="shortcut icon" href="static/ico/favicon.ico">
<title>朔黄铁路气象信息服务网</title>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<script src="js/jquery-3.2.0.min.js"></script>
<script src="js/PDFObject-master/pdfobject.min.js"></script>
<!-- <script type="text/javascript" src="static/nst/js/easyui-lang-zh_CN.js"></script> -->

<style>
.pdfobject-container {
	height: 780px;
}

.pdfobject {
	border: 1px solid #666;
}
</style>
</head>
<body>
	<div id="main" style="margin-top: 75px; text-align: center">
		<div style="width: 1000px; margin: 0 auto;">
			<div id="pdf" style=""></div>
		</div>
		<button id="inintePdf" style="visibility: hidden" onclick="initePdf()">刷新</button>
	</div>
</body>
<script type="text/javascript">
/**
 * 加载pdf
 */
function initePdf(){
	
	$.post("WeatherReport/getSimpleReport",{fag:'1'},function(data,textStatus){
		if(data!=""){
		PDFObject.embed("static/pdf/"+data+"#zoom=120", "#pdf");
		}else{
			 alert("未发现最新简报,请稍后重试……");
		}
	});
}

$(function(){
	$.post("WeatherReport/getSimpleReport", {fag:'1'}, function(data, textStatus) {
	    if(data!=null&&data!=""){
		    PDFObject.embed("static/pdf/"+data+"#zoom=120", "#pdf");
	    }else{
	    	if($("#inintePdf").css("visibility")=="hidden"){
	    	$("#inintePdf").css("visibility","visible");
	    	}
	    }
	});
})
</script>
</html>