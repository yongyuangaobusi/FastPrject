/**
 * 系统工具 控件
 */
$.fn.productAnalysisTitle = function(param){
	var obj = $(this);
	if(param == null){
		obj.empty();
		return;
	}
	obj.empty();
	var timeSpace = param.space;//时间间隔
	var titleName = param.name;//名称
	var timeEnd = param.time;//查询时间
	var timeTotle = param.timeTotle ? param.timeTotle : 60;
	var grids = param.grids ? param.grids : {};
	var data = param.data ? param.data : {};
	var type = param.type ? param.type : "analysis";//"analysis":产品分析；"reference":相关产品；"name":产品分分析无数据
	var content = $('<div class="product-analysis-title-container"></div>');
	obj.append(content);
	var titleBtn = $('<div class="close-button"></div>');
	content.append(titleBtn);
	var titleName = $('<div class="title-name">'+ titleName +'</div>');
	content.append(titleName);
	if("reference" == type || "factor" == type){//当参考产品和相关因子进行叠加分析时清除产品分析的叠加
		$.modal.close("lightninglegend");
		$.modal.close("monostaticradar");
		GIS.GridEdit.clearByTypes("nGis", ["splash","wind","number", "isoline"]);
		GIS.LayerManage.removeLayer("nGis","rasterlayerLightDistribute");
		$("#warningAnalysisLegend").remove();
		$(".selectedpro").removeClass("selectedpro");
		$(".signal-rada-detail-item i").removeClass("signal-rada-detail-item-i");
		$(".signal-rada-angle .signal-rada-angle-item").removeClass("signal-rada-angle-item-i");
		$(".signal-rada-angle-item.item-click").removeClass("item-click");
		if("reference" == type){//当参考产品进行叠加时判断相关因子是否已经叠加但还未移除叠加
			if(!$.isEmptyObject(ZHYJ_MAIN.relevantFactor)){
				var layerId = "relevant_factor_" + ZHYJ_MAIN.relevantFactor.name + "_" + ZHYJ_MAIN.relevantFactor.time;
				GIS.Warning.ReMoveLayerById("nGis", layerId);
				$(".relevant-factor-product-djfx").removeClass("factor-btn-click").text("叠加分析");
				$(".product-analysis-title").productAnalysisTitle();
				ZHYJ_MAIN.relevantFactor = {};
			}
		}else{//当相关因子进行叠加时判断参考产品是否已经叠加还未移除叠加
			if(!$.isEmptyObject(ZHYJ_MAIN.referenceProduct)){
				var layerId = "reference_product_" + ZHYJ_MAIN.referenceProduct["referenceProductName"] + ZHYJ_MAIN.referenceProduct["referenceProductTime"];
				GIS.Warning.ReMoveLayerById("nGis", layerId);
				$(".reference-product-content-wrap .btn-click").text("叠加分析");
				$(".reference-product-content-wrap .btn-click").removeClass("btn-click");
				$(".product-analysis-title").productAnalysisTitle();
				ZHYJ_MAIN.referenceProduct = {};
			}
		}
		
	}else{
		if(!$.isEmptyObject(ZHYJ_MAIN.referenceProduct)){//判断参考产品是否已经叠加还未移除叠加
			var layerId = "reference_product_" + ZHYJ_MAIN.referenceProduct["referenceProductName"] + ZHYJ_MAIN.referenceProduct["referenceProductTime"];
			GIS.Warning.ReMoveLayerById("nGis", layerId);
			$(".reference-product-content-wrap .btn-click").text("叠加分析");
			$(".reference-product-content-wrap .btn-click").removeClass("btn-click");
			$(".product-analysis-title").productAnalysisTitle();
			ZHYJ_MAIN.referenceProduct = {};
		}
		if(!$.isEmptyObject(ZHYJ_MAIN.relevantFactor)){//判断相关因子是否已经叠加但还未移除叠加
			var layerId = "relevant_factor_" + ZHYJ_MAIN.relevantFactor.name + "_" + ZHYJ_MAIN.relevantFactor.time;
			GIS.Warning.ReMoveLayerById("nGis", layerId);
			$(".relevant-factor-product-djfx").removeClass("factor-btn-click").text("叠加分析");
			$(".product-analysis-title").productAnalysisTitle();
			ZHYJ_MAIN.relevantFactor = {};
		}
	}
	
	//构建时间轴
	function buildTimeLine(inTimeTotle, reverse){
		inTimeTotle = inTimeTotle ? inTimeTotle : timeTotle;
		timeContainer.empty();
		var timeTotleT = Math.floor(inTimeTotle/timeSpace);
		for(var i = 0; i < timeTotleT; i++){
			var timeT = new Date(new Date(timeEnd).getTime() - 60*1000*i*timeSpace);
			var timeFull = timeT.format("yyyy-MM-dd hh:mm");
			var timeDetail;
			var proId = $(".warning-analysis-container div.selectedpro").closest(".analysisPro").attr("data-value");
			var timStr = timeFull;
			if("R_TREC" == proId || "QPF" == proId){
				timStr = new Date(Date.parse(timeFull) + (3600 * 1000)).format("yyyy-MM-dd hh:mm");
			}
			if(reverse){
				if(i == timeTotleT - 1){
					timeDetail= $('<div class="title-time-detail"><div class="title-time-detail-content title-time-click" timefull="'+ timeFull +'" title="'+ timStr +'">'+ timStr.substring(10, timStr.length) +'</div></div>');
				}else{
					timeDetail= $('<div class="title-time-detail"><div class="title-time-detail-content" timefull="'+ timeFull +'" title="'+ timStr +'">'+ timStr.substring(10, timStr.length) +'</div></div>');
				}
			}else{
				if(i == 0){
					timeDetail= $('<div class="title-time-detail"><div class="title-time-detail-content title-time-click" timefull="'+ timeFull +'" title="'+ timStr +'">'+ timStr.substring(10, timStr.length) +'</div></div>');
					var inTimeTotleT = Math.floor((Date.parse($("#happenTimeOpr").customDateBlack("getTime")) - timeT.getTime()) / (timeSpace * 60 * 1000));
					if(inTimeTotleT == 0){
						content.find(".time-change-down").addClass("time-change-down-unclick");
					}
				}else{
					timeDetail= $('<div class="title-time-detail"><div class="title-time-detail-content" timefull="'+ timeFull +'" title="'+ timStr +'">'+ timStr.substring(10, timStr.length) +'</div></div>');
				}
			}
			timeContainer.append(timeDetail);
		}
		return timeTotleT;
	}
	
	if("analysis" == type){
		var timeContainer = $('<div class="title-time-container"></div>');
		var timeChange = $('<div class="time-change-up"></div><div class="time-change-down"></div>');
		content.append(timeChange);
		content.append(timeContainer);
		var timeTotleT = buildTimeLine();
		content.width(titleName.width() + (55 * timeTotleT) + 130);
	}else if("forecast" == type){
		var timeContainer = $('<div class="title-time-container"></div>');
		var timeChange = $('<div class="time-change-up time-change-up-unclick"></div><div class="time-change-down"></div>');
		content.append(timeChange);
		content.append(timeContainer);
		var keys = Object.keys(grids).sort(function(n1, n2){
			return parseInt(n2) - parseInt(n1);
		});
		$.each(keys, function(i, key){
			var timeT = new Date(new Date(timeEnd).getTime() + (60 * 1000 * parseInt(key)));
			var timeFull = timeT.format("yyyy-MM-dd hh:mm");
			var timeDetail;
			if(i == keys.length - 1){
				ZHYJ_PRO.getForecastGridData(null, grids[key], data[key]);
				timeDetail= $('<div class="title-time-detail"><div class="title-time-detail-content title-time-click" timefull="'+ timeFull +'" title="'+ timeFull +'">'+ timeT.format("hh:mm") +'</div></div>');
			}else{
				timeDetail= $('<div class="title-time-detail"><div class="title-time-detail-content" timefull="'+ timeFull +'" title="'+ timeFull +'">'+ timeT.format("hh:mm") +'</div></div>');
			}
			timeContainer.append(timeDetail);
			timeDetail.find(".title-time-detail-content").data("data", data[key]).data("grid", grids[key]);
		});
		content.width(titleName.width() + (55 * keys.length) + 130);
	}
	bindItemEvent();
	var position_top = param.top ? param.top : "55px";
	var position_left = param.left ? param.left : (document.body.clientWidth - obj.width())/2;
	obj.css({'top':position_top});
	obj.css({'left':position_left});

	$(".product-analysis-title .time-change-up").unbind("click").bind("click",function(){
		var temp = $(".title-time-click");//当前
		var tempUp = temp.parent().next().find(".title-time-detail-content");//前一个
		if(tempUp.length == 0){//没有前一个
			if("analysis" == type){
				timeEnd = new Date(temp.attr("timefull")).format("yyyy-MM-dd hh:mm");
				var timeTotleT = buildTimeLine();
				bindItemEvent();
				content.width(titleName.width() + (55 * timeTotleT) + 130);
			}
		}else{
			temp.removeClass("title-time-click");
			if("forecast" == type){
				if(tempUp.parent().next(".title-time-detail").length == 0){//前一个的前一个
					$(this).addClass("time-change-up-unclick");
				}
			}
			tempUp.addClass("title-time-click");
			if($(".product-analysis-title-container .time-change-down.time-change-down-unclick")){
				$(".product-analysis-title-container .time-change-down").removeClass("time-change-down-unclick");
			}
			var time = new Date($(tempUp).attr("timefull")).format("yyyy-MM-dd hh:mm");
			var proId = $(".warning-analysis-container div.selectedpro").closest(".analysisPro").attr("data-value");
			if("INCA" == proId){
				ZHYJ_PRO.getForecastGridData(time, tempUp.data("grid"), tempUp.data("data"));
			}else{
				ZHYJ_PRO.queryGridData(true, time);
			}
		}
	});

	$(".product-analysis-title .time-change-down").unbind("click").bind("click",function(){
		var temp = $(".title-time-click");
		var timeDown = temp.parent().prev().find(".title-time-detail-content");
		if(timeDown.length == 0){
			if(type == "analysis"){
				var timeTemp = Date.parse($("#happenTimeOpr").customDateBlack("getTime"));
				var inTimeTotleT = Math.floor((timeTemp - Date.parse(temp.attr("timefull"))) / (timeSpace * 60 * 1000));
				if(inTimeTotleT > 0){
					var inTimeTotleTT = Math.floor(timeTotle/timeSpace);
					if(inTimeTotleT > inTimeTotleTT){
						inTimeTotleT = inTimeTotleTT - 1;
					}else{
						inTimeTotleTT = inTimeTotleT + 1;
						inTimeTotleT = inTimeTotleT;
					}
					timeEnd = new Date(Date.parse(temp.attr("timefull")) + (inTimeTotleT * timeSpace * 60 * 1000)).format("yyyy-MM-dd hh:mm");
					var timeTotleT = buildTimeLine(inTimeTotleTT*timeSpace, true);
					content.width(titleName.width() + (55 * timeTotleT) + 130);
					bindItemEvent();
				}
			}
		}else{
			temp.removeClass("title-time-click");
			if(timeDown.parent().prev(".title-time-detail").length == 0){
				if(type == "forecast"){
					$(this).addClass("time-change-down-unclick");
				}else if(type == "analysis"){
					var inTimeTotleT = Math.floor((Date.parse($("#happenTimeOpr").customDateBlack("getTime")) - Date.parse(timeDown.attr("timefull"))) / (timeSpace * 60 * 1000));
					if(inTimeTotleT == 0){
						$(this).addClass("time-change-down-unclick");
					}
				}
			}
			timeDown.addClass("title-time-click");
			if($(".product-analysis-title-container .time-change-up.time-change-up-unclick")){
				$(".product-analysis-title-container .time-change-up").removeClass("time-change-up-unclick");
			}
			var time = new Date($(timeDown).attr("timefull")).format("yyyy-MM-dd hh:mm");
			var proId = $(".warning-analysis-container div.selectedpro").closest(".analysisPro").attr("data-value");
			if("INCA" == proId){
				ZHYJ_PRO.getForecastGridData(time, timeDown.data("grid"), timeDown.data("data"));
			}else{
				ZHYJ_PRO.queryGridData(true, time);
			}
		}
	});
	
	function bindItemEvent(){
		$(".product-analysis-title .title-time-detail-content").unbind("click").bind("click",function(){
			if($(this).hasClass("title-time-click")){

			}else{
				$(".title-time-click").removeClass("title-time-click");
				$(this).addClass("title-time-click");
				if($(".time-change-up-unclick").length != 0 ){
					$(".time-change-up-unclick").removeClass("time-change-up-unclick");
				}else if($(".time-change-down-unclick") != 0 ){
					$(".time-change-down-unclick").removeClass("time-change-down-unclick");
				}
				if($(this).parent().prev(".title-time-detail").length == 0){
					if("forecast" == type){
						$(".time-change-down").addClass("time-change-down-unclick");
					}else{
						var inTimeTotleT = Math.floor((Date.parse($("#happenTimeOpr").customDateBlack("getTime")) - Date.parse($(this).attr("timefull"))) / (timeSpace * 60 * 1000));
						if(inTimeTotleT == 0){
							$(".time-change-down").addClass("time-change-down-unclick");
						}
					}
				}else if($(this).parent().next(".title-time-detail").length == 0){
					if("forecast" == type){
						$(".time-change-up").addClass("time-change-up-unclick");
					}
				}
				var time = new Date($(this).attr("timefull")).format("yyyy-MM-dd hh:mm");
				var proType = $(".warning-analysis-container div.selectedpro").closest(".analysisPro").attr("channel");
				var proId = $(".warning-analysis-container div.selectedpro").closest(".analysisPro").attr("data-value");
//				if(proType.indexOf("FORECAST") > -1){
				if("INCA" == proId){
					ZHYJ_PRO.getForecastGridData(time, $(this).data("grid"), $(this).data("data"));
				}else{
					ZHYJ_PRO.queryGridData(true, time);
				}
			}
		});
	}

	$(".product-analysis-title .close-button").unbind("click").bind("click",function(){
		obj.empty();
		if("forecast" == type || "analysis" == type || "name" == type){
			$.modal.close("lightninglegend");
			$.modal.close("monostaticradar");
			GIS.Element.clearStation('nGis');
			GIS.GridEdit.clearByTypes("nGis", ["splash","wind","number", "isoline"]);
			GIS.LayerManage.removeLayer("nGis","rasterlayerLightDistribute");
			$("#warningAnalysisLegend").remove();
			$(".selectedpro").removeClass("selectedpro");
			$(".signal-rada-detail-item i").removeClass("signal-rada-detail-item-i");
			$(".signal-rada-angle .signal-rada-angle-item").removeClass("signal-rada-angle-item-i");
			$(".signal-rada-angle-item.item-click").removeClass("item-click");
		}else if("reference" == type){
			var layerId = "reference_product_" + ZHYJ_MAIN.referenceProduct["referenceProductName"] + ZHYJ_MAIN.referenceProduct["referenceProductTime"];
			GIS.Warning.ReMoveLayerById("nGis", layerId);
			$(".reference-product-content-wrap .btn-click").text("叠加分析");
			$(".reference-product-content-wrap .btn-click").removeClass("btn-click");
			$(".product-analysis-title").productAnalysisTitle();
			ZHYJ_MAIN.referenceProduct = {};
		}else if("factor" == type){
			var layerId = "relevant_factor_" + ZHYJ_MAIN.relevantFactor.name + "_" + ZHYJ_MAIN.relevantFactor.time;
			GIS.Warning.ReMoveLayerById("nGis", layerId);
			$(".relevant-factor-product-djfx").removeClass("factor-btn-click").text("叠加分析");
			$(".product-analysis-title").productAnalysisTitle();
			ZHYJ_MAIN.relevantFactor = {};
		}
	});
	
	$(".product-analysis-title").off("click").on("mousedown",function(){
		var isMove = true;
		var _this = $(this);
		$(this).css({"cursor": "move"});//点击鼠标切换为手势图形
		var m_x = Number(_this.css("left").split("px")[0]);//点击窗体时，left
		var m_y = Number(_this.css("top").split("px")[0]);//点击窗体时，top
		var abs_x = event.pageX;//点击窗体时，左边距
		var abs_y = event.pageY;//点击窗体时，上边距
		//单击住头部可进行拖拽，计算移动大小，以及移动范围限制
		$(document).unbind('mousemove').bind('mousemove',function(event){
			if(isMove) {
				//event.pageX,移动后的左边距;event.pageY,移动后的上边距
				var ebs_x = m_x-(abs_x-event.pageX); //移动后的left
				var ebs_y = m_y+(event.pageY - abs_y);//移动后的top

				var body_w = $("body").width();
				var body_h = $("body").height();
				var div_w = _this.width();
				var div_h = _this.height();
				//不可超出左右边框
				if(ebs_x <= 0) {
					ebs_x = 0;
				} else if (ebs_x > body_w - div_w) {
					ebs_x = body_w - div_w;
				} else {

				}
				//不可超出上下边框
				if(ebs_y <= 0) {
					ebs_y = 0;
				} else if (ebs_y > body_h - div_h - 50) {
					ebs_y = body_h - div_h - 50;
				} else {

				}
				//重新设定弹出框的左边距，上边距
				_this.css({'left':ebs_x,'top':ebs_y });
			}
		}).mouseup(function(){
			isMove = false
			$(document).unbind('mousemove');
			$(".product-analysis-title").css({"cursor": "default"});//点击鼠标切换为手势图形
		});//鼠标移除事件；单击事件结束事件。
	});
};