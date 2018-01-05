/**
 * 获取websocket路径
 */
var webSocketUrl = "";
$(function(){
	$.ajax({
		type : "GET",
		async : false,
		url : G_CONTEXT.contextPath + "warn/getServerPath.do?t="+ new Date().getTime(),
		dataType: "json",
		success:function(res){
			webSocketUrl = res.params.serverPath;
		}
	});
});