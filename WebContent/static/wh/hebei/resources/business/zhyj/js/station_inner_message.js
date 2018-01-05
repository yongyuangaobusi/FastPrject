/**
 * 
 */
STATION_INNER_MESSAGE = {
	msgInfoArr : [],
	init : function(){
		this.queryData();
		this.bindEvent();
		this.msgInfoArr = [];
	},
	queryData : function(){
		this.msgInfoArr = [];
		$(".inner-message-tips").hide();
		$(".station-inner-message-content-wrap").empty();
		var that = this;
		$.ajax({
			url :  G_CONTEXT.contextPath + "warnmake/getInnerMessage.do",
			type : "POST",
			data : {userId : userId},
			success : function(res){
				if(res && res.success && res.objectData && res.objectData.messages){
					that.buildMessageLayer(res.objectData.messages);
				}else{
					$(".inner-message-tips").hide();
					$(".station-inner-message-wrap").hide();
					$(".station-inner-message-content-wrap-bottom").hide();
				}
			}
		});
	},
	buildMessageLayer : function(data){
		this.msgInfoArr = data;
		if(data.length > 0){
			$(".inner-message-tips").show();
		}else{
			$(".inner-message-tips").hide();
			$(".station-inner-message-wrap").hide();
			$(".station-inner-message-content-wrap-bottom").hide();
			return;
		}
		
		$(".station-inner-message-wrap").height(200);
		$(".station-inner-message-wrap .station-inner-message-body").height(190);
		$(".station-inner-message-content-wrap-bottom").css({"top": "250px"});
		$(".station-inner-message-content-wrap-bottom").attr("item","0");
		$(".station-inner-message-content-wrap-bottom").text("查看更多");
		
		var levelObj = {"00" : "红色", "01" : "橙色", "02" : "黄色", "03" : "蓝色"};
    	var proObj = {"01" : "高温", "02" : "道路结冰", "03" : "霾", "04" : "大雾", "05" : "霜冻", "06" : "冰雹",
    			"07" : "雷电", "08" : "干旱", "09" : "", "10" : "大风", "11" : "寒潮", "12" : "暴雪", "13" : "暴雨",
    			"14" : "台风","15" : "沙尘暴"};
		var $wrap = $(".station-inner-message-content-wrap").empty();
		$(data).each(function(i, content){
			var $content = $("<div class='station-inner-message-content'>");
				$content.data("content", content);
				$wrap.append($content);
				$content.append('<div class="station-inner-message-content-header"></div>');
			var $contentBody = $('<div class="station-inner-message-content-body">');
				$content.append($contentBody);
				$content.append($('<div class="station-inner-message-content-body-detail">'));
			var title = proObj[content.warnType] + levelObj[content.warnLevel] + "预警信号";
			if(content.makeTime && content.makeTime.length > 16){
				title = content.makeTime.substring(0, 16) + title;
			}
			if(content.userType == "0"){
				title += "状态变更";
			}else if(content.userType == "1"){
				title += "待审核";
			}else if(content.userType == "2"){
				title += "待签发";
			}else if(content.userType == "3"){
				if(content.status == '0'){
					title += "待审核";
				}else if(content.status == '1'){
					title += "待签发";
				}
			}
			$contentBody.append('<div class="station-inner-message-content-body-arrows"></div>');
			$contentBody.append($('<div class="station-inner-message-content-body-content"></div>').text(title));
			$contentBody.append($('<div class="station-inner-message-content-body-hide"></div>'));
		});
		$(".station-inner-message-link-line").height((data.length - 1) * 50);
	},
	showDetail :function(obj){
		obj.find(".station-inner-message-content-body").addClass("selectOneDetail");
		obj.find(".station-inner-message-content-header").addClass("selectOneDetailHeader");
		obj.find(".station-inner-message-content-body-arrows").addClass("selectOneDetailArrows");
		obj.find(".station-inner-message-content-body-detail").show();
		obj.find(".station-inner-message-content-body-hide").show();
		
		if($(".station-inner-message-content-wrap-bottom").attr("item")=="0"){
			$(".station-inner-message-content-wrap-bottom").css({"top":"378px"});
			$(".station-inner-message-wrap").css({"height":"328px"});
			$(".station-inner-message-wrap .station-inner-message-body").css({"height":"318px"});
		}
		var dataNum	= $(".station-inner-message-content").size()-1;
		var showNum = $(".station-inner-message-content-body-detail:visible").size();
		var nextDiv = obj.next();
		if(nextDiv.length!=0){						//点击的不是最后一个
			var lastShowFlag = $(".station-inner-message-content-wrap>div:last").find(".station-inner-message-content-body-detail").css("display");
			if("none"==lastShowFlag){
				$(".station-inner-message-link-line").height((dataNum-showNum)*50+showNum*168);
			}else{
				$(".station-inner-message-link-line").height((dataNum-showNum+1)*50+(showNum-1)*168);
			}
		}
		
	},
	hideDetail:function(obj){
		$.modal.close("stationInnerMessageContent");
		obj.find(".station-inner-message-content-body").removeClass("selectOneDetail");
		obj.find(".station-inner-message-content-header").removeClass("selectOneDetailHeader");
		obj.find(".station-inner-message-content-body-arrows").removeClass("selectOneDetailArrows");
		obj.find(".station-inner-message-content-body-detail").empty();
		obj.find(".station-inner-message-content-body-detail").hide();
		obj.find(".station-inner-message-content-body-hide").hide();
		
		var dataNum	= $(".station-inner-message-content").size()-1;
		var showNum = $(".station-inner-message-content-body-detail:visible").size();
		if($(".station-inner-message-content-wrap-bottom").attr("item")=="0"){
			if(showNum==0){
				$(".station-inner-message-content-wrap-bottom").css({"top":"250px"});
				$(".station-inner-message-wrap").css({"height":"200px"});
				$(".station-inner-message-wrap .station-inner-message-body").css({"height":"190px"});
			}else{
				$(".station-inner-message-content-wrap-bottom").css({"top":"378px"});
				$(".station-inner-message-wrap").css({"height":"328px"});
				$(".station-inner-message-wrap .station-inner-message-body").css({"height":"318px"});
			}
		}
		var nextDiv = obj.next();
		if(nextDiv.length!=0){						//点击的不是最后一个
			var lastShowFlag = $(".station-inner-message-content-wrap>div:last").find(".station-inner-message-content-body-detail").css("display");
			if("none"==lastShowFlag){
				$(".station-inner-message-link-line").height((dataNum-showNum)*50+showNum*168);
			}else{
				$(".station-inner-message-link-line").height((dataNum-showNum+1)*50+(showNum-1)*168);
			}
		}
	},
	bindEvent : function(){
		var that = this;
		var levelObj = {"00" : "红色", "01" : "橙色", "02" : "黄色", "03" : "蓝色"};
    	var proObj = {"01" : "高温", "02" : "道路结冰", "03" : "霾", "04" : "大雾", "05" : "霜冻", "06" : "冰雹",
    			"07" : "雷电", "08" : "干旱", "09" : "", "10" : "大风", "11" : "寒潮", "12" : "暴雪", "13" : "暴雨",
    			"14" : "台风","15" : "沙尘暴"};
		
		$(".station-inner-message-content-wrap").undelegate(".station-inner-message-content-body", "click").delegate(".station-inner-message-content-body", "click", function(){
			if($(this).hasClass("selectOneDetail")){
				that.hideDetail($(this).parent());
				return;
			}
			var content = $(this).parent().data("content");
			if(!content){
				return;
			}
			var title = proObj[content.warnType] + levelObj[content.warnLevel] + "预警信号";
			var text = title;
			if(content.makeTime && content.makeTime.length > 16){
				title = content.makeTime.substring(0, 16) + title;
			}
			if(content.userType == "0"){
				title += "状态变更";
				text += "状态变更";
			}else if(content.userType == "1"){
				title += "待审核";
				text += "待审核";
			}else if(content.userType == "2"){
				title += "待签发";
				text += "待签发";
			}else if(content.userType == "3"){
				if(content.status == '0'){
					title += "待审核";
				}else if(content.status == '1'){
					title += "待签发";
				}
			}
			var $html = $("<div class='station-inner-message-detail-wrap'>");
			var $infoWrap = $('<div class="station-message-info">');
				$html.append($infoWrap);
				$infoWrap.append($('<div class="station-message-info-name">').text("预报员："));
				$infoWrap.append($('<div class="station-message-info-content">').text(content.publisherName));
			var $infoWrap2 = $('<div class="station-message-info station-message-info-warn-time">');
				$html.append($infoWrap2);
//				$infoWrap2.append($('<div class="station-message-info-name">').text("预报时间："));
			if(content.makeTime == null){
				$infoWrap2.append($('<div class="station-message-info-content">').text(""));
			}else{
				$infoWrap2.append($('<div class="station-message-info-content">').text(content.makeTime.substring(0, 16)));
			}
			var $warnContent = $('<div class="station-message-info station-message-info-warn-content">');
				$html.append($warnContent);
			if(content.makeTime ==null){
				text = "发布" + content.warnPeriod + "小时" + text;
			}else{
				text = content.makeTime.substring(0, 16) + "发布的" + content.warnPeriod + "小时" + text;
			}
				$warnContent.append($('<div class="station-message-info-content">').text(text));
			var $detailLink = $('<a class="detail-link"></a>').text("<详情>");
				$warnContent.append($("<div class='station-message-info-link'>").append($detailLink));
			
			//改造
			$(this).parent().find(".station-inner-message-content-body-detail").empty();
			$(this).parent().find(".station-inner-message-content-body-detail").append($('<div class="station-inner-message-content-body-detail-content">').text(text));
			var $detailInfo = $('<a class="detail-link-info"></a>').text("查看详情>>");
			$(this).parent().find(".station-inner-message-content-body-detail").append($('<div class="station-inner-message-content-body-detail-link">').append($detailInfo));
		//	var signalId = 
			$detailLink.unbind("click").bind("click", function(){
				$.modal.close("stationInnerMessageContent");
				var data = '';
				if(content.userType == "0"){
					data = {
						url : "zhyj/zhyj_warn_make.do",//跳转路径
						deMenuId : "5",//菜单的id
						flag : "yby",//标识
						signalId : content.id,//标识
					};
				}else{
					data = {
						url : "zhyj/zhyj_warn_make.do",//跳转路径
						deMenuId : "5",//菜单的id
						flag : "shqf",//标识
						signalId : content.id,//标识
					};
				}
				var url = G_CONTEXT.contextPath+"mainframe/init.do?t=" + new Date().getTime();//重新加载初始化界面
				var urlPost = G_CONTEXT.contextPath+"mainframe/getInitParam.do";//ajax请求封装参数
				$.ajax({
					type:'post',
					url:urlPost,
					data:data,
					dataJson:'json',
					async:false,
					success:function(data){
						window.open(url,'newwindow','');
//						$("#targetPage").attr("action", url).submit();
					}
				});
			});
			$detailInfo.unbind("click").bind("click", function(){
				$.modal.close("stationInnerMessageContent");
				var data = '';
				if(content.userType == "0"){
					data = {
						url : "zhyj/zhyj_warn_make.do",//跳转路径
						deMenuId : "5",//菜单的id
						flag : "yby",//标识
						signalId : content.id,//标识
					};
				}else{
					data = {
						url : "zhyj/zhyj_warn_make.do",//跳转路径
						deMenuId : "5",//菜单的id
						flag : "shqf",//标识
						signalId : content.id,//标识
					};
				}
				var url = G_CONTEXT.contextPath+"mainframe/init.do?t=" + new Date().getTime();//重新加载初始化界面
				var urlPost = G_CONTEXT.contextPath+"mainframe/getInitParam.do";//ajax请求封装参数
				$.ajax({
					type:'post',
					url:urlPost,
					data:data,
					dataJson:'json',
					async:false,
					success:function(data){
						window.open(url,'newwindow','');
//						$("#targetPage").attr("action", url).submit();
					}
				});
			});
			
			$.modal.close("stationInnerMessageContent");
			$.modal.show({
				id:"stationInnerMessageContent",//主键id
				title: title,//标题
				container: 'nPage', //加载容器
				m_left:'600px',//left;
				m_top:"100px",//top;
				html: $html,//加载url，在项目中可以是jsp或者是url链接
				width : "400",
				height: "97"
			});
			$("#stationInnerMessageContent>div").width(390);
			$("#modal_stationInnerMessageContent").hide();
			
			that.showDetail($(this).parent());
		});
		
		$(".nav-userMsg").unbind("click").bind("click", function(){
			if(!that.msgInfoArr || that.msgInfoArr.length == 0){
				return;
			}
			if($(".station-inner-message-wrap").is(":visible")){
				$.modal.close("stationInnerMessageContent");
				$(".station-inner-message-wrap").hide();
				$(".station-inner-message-content-wrap-bottom").hide();
			}else{
				$(".station-inner-message-wrap").show();
				$(".station-inner-message-content-wrap-bottom").show();
				that.queryData();
			}
		});
		
		$(".station-inner-message-wrap").mouseleave(function(){
//			$(this).hide();
		});
		
		//查看更多
		$(".station-inner-message-content-wrap-bottom").unbind("click").bind("click",function(){				//查看更多 设置固定高度					
			var size = $(".station-inner-message-content-wrap>div").length;
			if($(this).attr("item")=="0"){													//0-展开    1-闭合
				if(size>4){
					$(".station-inner-message-wrap").height(528);
					$(".station-inner-message-wrap .station-inner-message-body").height(518);
					$(".station-inner-message-content-wrap-bottom").css({"top": "578px"});
					$(".station-inner-message-content-wrap-bottom").attr('item',"1");		//标识 
					$(this).text("收起");
				}
			}else{
				var showNum = $(".station-inner-message-content-body-detail:visible").size();
				if(showNum==0){
					$(".station-inner-message-wrap").height(200);
					$(".station-inner-message-wrap .station-inner-message-body").height(190);
					$(".station-inner-message-content-wrap-bottom").css({"top": "250px"});
				}else{
					$(".station-inner-message-wrap").height(328);
					$(".station-inner-message-wrap .station-inner-message-body").height(318);
					$(".station-inner-message-content-wrap-bottom").css({"top":"378px"});
				}
				$(".station-inner-message-content-wrap-bottom").attr('item',"0");			//标识 
				$(this).text("查看更多");
			}
			
		})
	}
	
	
}

$(function(){
	if(userId != ""){
		STATION_INNER_MESSAGE.init();
	}
});