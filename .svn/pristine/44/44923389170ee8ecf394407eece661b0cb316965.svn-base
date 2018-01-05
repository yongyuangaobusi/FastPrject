/**
 * GIS 工具 控件
 */
$.fn.gisTools = function(param){
	var picturePath = G_CONTEXT.contextPath + 'HB/n-ui/widgets/nriet/gis_tool/img/';
	//gis工具种类
	var gisTools = [
            {name:"big",text:"放大",cls:"gis-big.png"},
            {name:"small",text:"缩小",cls:"gis-small.png"},
            {name:"roma",text:"漫游",cls:"gis-roma.png"},
            {name:"distance",text:"距离",cls:"gis-distance.png"},
            {name:"proportion",text:"面积",cls:"gis-proportion.png"},
            {name:"show",text:"关注区显示",cls:"gis-show.png"},
            {name:"feedback",text:"超时提醒控制",cls:"gis01.png"}
        ];
	//gis工具种类
	//开发人员之定义位置
	var position_top = param.top ? param.top : "30px";
	var position_right = param.right ? param.right : "0px"; 
	//dom元素
	var obj = $(this);
	
	//组装页面元素
	$(".gistools_content").remove();
	var content = $('<div></div>').addClass("gistools_content");
	content.css({'top':position_top});
	content.css({'right':position_right});
//	content.css("display","none");
	var gis_check = $('<div class="gis_tool_checked" title="GIS"><div class="gis_tool_title">GIS</div></div>');
	content.append(gis_check);
	var buttonContainer = $('<div class="buttonContainer"><div>')
	content.append(buttonContainer);
	for(var i=0;i<gisTools.length;i++) {
		var button = $('<div class="single_tool" name="'+gisTools[i].name+'" num="'+i+'" title="'+gisTools[i].text+'"><img src="'+picturePath+gisTools[i].cls+'" class="picsize"></div>');
		if("show" == gisTools[i].name){
			button.addClass("buttonclick");
		}
		buttonContainer.append(button);
		button.click(param,function(){
			var div = $(this);
			if(div.hasClass("buttonclick")) {
				div.removeClass("buttonclick");
				GIS.Warning.editDropArea("nGis","mapPan");//设置为漫游状态
				GIS.Common.deactiveTool();
				if("show" == div.attr("name")){
					if (param.reCalls) {
						param.reCalls(div);
					}
				}
				if("feedback" == div.attr("name")){
					$("#signalFeedBack").hide();
				}
			} else {
				
				GIS.Common.deactiveTool();
				if("show" == $(".buttonclick").attr("name")){
					if (param.reCalls) {
						param.reCalls($(".buttonclick"));
					}
				}
				$('.single_tool').removeClass('buttonclick');
				GIS.Warning.ClearLayerById("nGis","customgraphiclayerP");//去除已经绘制的关注区
				if("big" != div.attr("name") && "small" != div.attr("name") && "histogram" != div.attr("name")){//放大、缩小、矩形出图不需要样式
					div.addClass("buttonclick");					
				}
				if("feedback" == div.attr("name")){
					$("#signalFeedBack").show();
				}
				if (param.reCalls) {
					param.reCalls(div);
				}
			}
		});
	}
	
	obj.after(content);
	obj.hide();
	
	//隐藏工具条内容
	var hideContent = null;
	hideContent = function(){
		var gisTool = $('.gistools_content'); 
			buttonContainer.animate({width:"0px"},0);
			gisTool.attr("isShow","false"); 
	};
	
//	setTimeout(hideContent, 100); 
	hideContent();
	
	/**
	 * 监听事件 : gis工具隐藏
	 */
	$(".gis_tool_checked").unbind("click").bind('click',function(){
		if($("#signalMean").length>0){					//如果是预警制作页面隐藏预警超时提醒
			$(".single_tool[name='feedback']").hide();
		}
		var that = $(this);
		var content = $(this).parent();
		var isShow = content.attr("isShow");
		if (!isShow || isShow == 'false'){
			if($(".single_tool[name='feedback']:visible").length>0){
				buttonContainer.animate({width:"275px"},500,function(){
					that.addClass("gis_tool_checked_click");
				});
			}else{
				buttonContainer.animate({width:"240px"},500,function(){
					that.addClass("gis_tool_checked_click");
				});
			}
			content.attr("isShow","true");
		}else{
			var cR = -1 * content.width() + content.find(".gis_tool_checked").width();
			buttonContainer.animate({width:"0px"},500,function(){
				that.removeClass("gis_tool_checked_click");
			});
			content.attr("isShow","false");
		}
	});
		
};