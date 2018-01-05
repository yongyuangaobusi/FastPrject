var ZHYJ_PRO = {
	LegentPicker: null,
	elementUnit : {
		RAIN : "mm", WIND : "m/s", TEMP : "℃", PRESS : "hPa", "VISI" : "km"
	},
	init: function(){
		var _this = this;
		this.bindEvent();
//		this.queryGridData();
	},
	queryCondition : "",
	refreshData : function(){
		if($(".product-analysis-title-container").length != 0){
			$(".product-analysis-title").productAnalysisTitle();
		}
		$.modal.close("lightninglegend");
		$.modal.close("monostaticradar");
		GIS.Element.clearStation('nGis');
		GIS.GridEdit.clearByTypes("nGis", ["splash","wind","number", "isoline"]);
		GIS.LayerManage.removeLayer("nGis","rasterlayerLightDistribute");
		$("#warningAnalysisLegend").remove();
		if($("#modal_warningAnalysis").is(":visible")){
			$("#modal_warningLegend>div").css({
				left: "362px"
			});
		}else{
			$("#modal_warningLegend>div").css({
				left: "10px"
			});
		}
		if($(".selectedpro").parent().attr("channel") == "Monostation-Radar"){
			this.querySignalRadar();
		}else{
			this.queryGridData();
		}
	},
	queryGridData: function(isCurrent, queryTime){
		$.modal.close("lightninglegend");
		$.modal.close("monostaticradar");
		GIS.GridEdit.clearByTypes("nGis", ["splash","wind","number", "isoline"]);
		GIS.LayerManage.removeLayer("nGis","rasterlayerLightDistribute");
		GIS.Element.clearStation('nGis');
		$("#warningAnalysisLegend").remove();
		var _this = this;
		var proType = $(".warning-analysis-container div.selectedpro").closest(".analysisPro").attr("channel");
		var proId = $(".warning-analysis-container div.selectedpro").closest(".analysisPro").attr("data-value");
		var date = $("#happenTimeOpr").customDateBlack("getTime");
		var name = $(".warning-analysis-container div.selectedpro").closest(".analysisPro").attr("title");
		if(["RAIN", "WIND", "TEMP", "PRESS", "VISI"].indexOf(proType) > -1 && ["VOR", "DIV"].indexOf(proId) == -1){
			this.queryAwsElementStation(isCurrent, queryTime);
			return;
		}
		var currentDataTime = date;
		if(proId && proType){
			$.customMask({
				maskInfo : "正在查询，请稍等..."
			});
			var params = {
				date: date,
				proId: proId,
				proType: proType,
				isCurrent : false
			};
			if(isCurrent === true){
				params.isCurrent = true;
				params.date = queryTime;
			}
			$.ajax({
				url: G_CONTEXT.contextPath + "zhyj/getProductDatas.do?t="+new Date().getTime(),
				datatype:"json",
				type:"post",
				data:params,
				success:function(res){
					if("Lightning" == proType){
						if(res && res.objectData){
							result = res.objectData.lightning;
						}
						if(result != null && result.length != 0){
							ZHYJ_PRO.queryCondition = JSON.stringify(params);
							var jsonData = {
								data : 	result,
								eleType: "distribute",
								queryTime : currentDataTime
							};
							GIS.LayerManage.removeLayer("nGis","rasterlayerLightDistribute");
							GIS.FeatureEdit.showLightingDistribute("nGis",jsonData,function(){});//闪电分布
							$.modal.close("lightninglegend");
							$.modal.show({
								id:"lightninglegend",
								title:"闪电分布图例",
								container: 'nPage', 
								m_left:"580px",
								m_bottom:"80px",
								operateFuc : {"datas":currentDataTime},
								url : G_CONTEXT.contextPath+"zhyj/zhyjlightninglegend.do?t="+ new Date().getTime(),
								width : "150",
								height:"216"				
							});
							$(".product-analysis-title").productAnalysisTitle({
								name : currentDataTime +" " + name + "闪电分布",
								top : "70px",
								type : "name"
							});
						}else{
							$(".product-analysis-title").productAnalysisTitle({
								name : name + "闪电分布 当前查询时间无数据！",
								top : "70px",
								type : "name"
							});
						}
					}else{
						if(res && res.objectData){
							result = res.objectData.data;
						}
						
						if(result != null){
							ZHYJ_PRO.queryCondition = JSON.stringify(params);
							var nodata = "";
							if($.isNumeric(result.invalid)){
								nodata = result.invalid;
							}else{
								if(("TEMP" == proType) || ("RAIN" == proType) || ("WIND" == proType) || ("QPF" == proType)){
									nodata = 999999;
								}
								if(proType == "FY2E" ||  proType == "FY2F"){
									nodata = 9999;
								}
								if(proType == "RADA"){
									nodata = -33;
								}
							}
							var rangeObj;
							if(("RADA" == proType) || (proType == "FY2E" ||  proType == "FY2F")){
								rangeObj = {
										nCols:result.nx,
										nRows:result.ny,
										ymin:(result.startLat < result.endLat) ? result.startLat : result.endLat,
												xmin:result.startLon,
												ymax:(result.startLat > result.endLat) ? result.startLat : result.endLat,
														xmax:result.endLon,
														xCell:result.dx,
														yCell:result.dy,
														noDataValue:nodata,
														isCut: (proType == "FY2E" ||  proType == "FY2F" || "RADA" == proType) ? false : true,
																jsonUrl: "hb_bianjie",
																disInter : true
																
								};
							}else{
								rangeObj = {
										nCols:result.nx,
										nRows:result.ny,
										ymin:(result.startLat < result.endLat) ? result.startLat : result.endLat,
												xmin:result.startLon,
												ymax:(result.startLat > result.endLat) ? result.startLat : result.endLat,
														xmax:result.endLon,
														xCell:result.dx,
														yCell:result.dy,
														noDataValue:nodata,
														isCut: (proType == "FY2E" ||  proType == "FY2F" || "RADA" == proType) ? false : true,
																jsonUrl: "hb_bianjie"
																	
								};
							}
							
							var data = [];
							var data2 = [];
							if(result.data != null){
								for(i=0; i<result.data.length ;i++){
									var temp = result.data[i];
									for(j= 0; j<temp.length; j++){
										data.push(temp[j]);
									}
								}
							}
							
							if(proId.startsWith("WIND")){
								if(result.data2 != null){
									for(i=0; i<result.data2.length ;i++){
										var temp2 = result.data2[i];
										for(j= 0; j<temp2.length; j++){
											data.push(temp2[j]);
										}
									}
								}
								
							}
							if($(".warning-analysis-container div.selectedpro").closest(".analysisPro").attr("data-value") == proId){
								var timeTemp = new Date(result.time);
								var timStr = timeTemp.format("yyyy-MM-dd hh:mm");
								var timeSpace = 10;
								var timeTotle = 130;
								if(proType == "QPF" || proType == "RADA"){
									timeSpace = 6; 
									timeTotle = 78;
								}
								if(proType == "FY2E" || proType == "FY2F"){
									timeSpace = 60; 
									timeTotle = 780;
								}
								if($(".product-analysis-title-container").length == 0){
									$(".product-analysis-title").productAnalysisTitle({
										space : timeSpace,
										timeTotle : timeTotle,
										name : name,
										time : timStr,
										top : "70px"
									});
								}
								var types;
								if(proId.startsWith("WIND")){
									types = ["splash","wind","number"]; 
								}else if(proId.startsWith("PRESS")){
									types = ["isoline"]; 
								}else if(proType == "RADA" || proType == "FY2E" || proType == "FY2F"){
									types = ["splash"]; 
								}else{
									types = ["splash","number"]; 
								}
								var color = LegendsColor[proId];
								if(proId == "TEMP_REAL"){
									color = LegendsColor[proId + "_" + (timeTemp.getMonth() + 1)];
								}
								GIS.GridEdit.showByTypes("nGis",types,data,rangeObj,0,color);
								if("Lightning" != proType && "Monostation-Radar" != proType && "PRESS" != proType){
									_this.initProLegend(proId, proType, timeTemp);
								}
							}
						}else{
							name = name + " " + " 当前查询时间无数据！";
							if($(".product-analysis-title-container").length == 0){
								$(".product-analysis-title").productAnalysisTitle({
									name : name,
									top : "70px",
									type : "name"
								});
							}else{
								artDialog.alertTips("当前查询时间无数据！");
							}
						}
					}
				},
				complete:function(){
					$.customMask();
				},
				error:function(e){
					console.log(e);
				}
			});
		}
	},
	queryAwsElementStation : function(isCurrent, queryTime){
		var that = this;
		var proId = $(".warning-analysis-container div.selectedpro").closest(".analysisPro").attr("data-value");
		var proType = $(".warning-analysis-container div.selectedpro").closest(".analysisPro").attr("channel");
		var date = $("#happenTimeOpr").customDateBlack("getTime");
		var name = $(".warning-analysis-container div.selectedpro").closest(".analysisPro").attr("title");
		var currentDataTime = date;
		
		
		if(proId){
			var params = {
				date : date,
				productId : proId,
				proType : proType,
				isCurrent : false
			};
			if(isCurrent === true){
				params.isCurrent = true;
				params.date = queryTime;
			}
			$.customMask({
				maskInfo : "正在查询，请稍等..."
			});
			$.ajax({
				url: G_CONTEXT.contextPath + "queryAwsElementStat.do?t="+new Date().getTime(),
				datatype :  "json",
				type : "post",
				data: params,
				success : function(res){
					var res = eval('(' + res + ')');
					
					$.customMask();
					if(res.success && res.objectData && !$.isEmptyObject(res.objectData)){
						var timStr = new Date(res.objectData.dateTime).format("yyyy-MM-dd hh:mm");
						var popFun = function(sty){
							var pup = {width : 275, height : 280, url : G_CONTEXT.contextPath +  "/popup/init.do?t=" + new Date().getTime()};
							if(sty == '7' || sty == '8'){
								pup = null;
							}
							return pup;
						};
						GIS.Element.showCanvas("nGis", res.objectData, null, {"min":-66666,"max":99999}, true);
						
						if($(".product-analysis-title-container").length == 0){
							$(".product-analysis-title").productAnalysisTitle({
								space : 5,
								timeTotle : 100,
								name : name + "（单位：" + that.elementUnit[proType] + "）",
								time : timStr,
								top : "70px"
							});
						}
					}else{
						if($(".product-analysis-title-container").length == 0){
							$(".product-analysis-title").productAnalysisTitle({
								name : name + " " + " 当前查询时间无数据！",
								top : "70px",
								type : "name"
							});
						}else{
							artDialog.alertTips("当前查询时间无数据！");
						}
					}
				},error:function(err){
					alert(err);
				}
			});
		}
	},
	querySignalRadar : function(){
		
		var that = this;
		var proType = $(".warning-analysis-container div.selectedpro").closest(".analysisPro").attr("channel");
		var currentDataTime = $("#happenTimeOpr").customDateBlack("getTime");
		var name = $(".warning-analysis-container div.selectedpro").closest(".analysisPro").attr("title");
		var productId = $(".signal-rada-detail-item.selectedpro").parent().attr("data-productId");
		var proSeq = $(".signal-rada-angle-item.signal-rada-angle-item-i.item-click").attr("data-proSeq");
		var proId = $(".signal-rada-detail-item.selectedpro").parent().attr("data-value");
		var stationId = $(".warning-analysis-container div.selectedpro").closest(".analysisPro").attr("data-value");
		//alert(productId);
		var params = {
			date: currentDataTime,
			proSeq : proSeq,
			productId : productId,
			stationId : stationId
		};
		if(proId && proType){
			$.customMask({
				maskInfo : "正在查询，请稍等..."
			});
			$.ajax({
//				url: G_CONTEXT.contextPath + "zhyj/getSignalRadar.do?t="+new Date().getTime(),
				url: G_CONTEXT.contextPath + "queryAwsElementStat.do?t="+new Date().getTime(),
				datatype :  "json",
				type : "post",
				data: params,
				success : function(res){
					var res = eval('(' + res + ')');
					$.customMask();
					if($("#warning-analysis-timeTip").size()>0){
						$("#warning-analysis-timeTip").remove();
					}
					var result;
					var radar;
					if(res && res.objectData){
						result = res.objectData.gridData;
						radar = res.objectData.station;
					}

					if(result && radar){
						ZHYJ_PRO.queryCondition = JSON.stringify(params);
						var rangeObj = {
							nCols:result.nx,
							nRows:result.ny,
							ymin:(result.startLat < result.endLat) ? result.startLat : result.endLat,
							xmin:result.startLon,
							ymax:(result.startLat > result.endLat) ? result.startLat : result.endLat,
							xmax:result.endLon,
							xCell:result.dx,
							yCell:result.dy,
							noDataValue:-33,
							isCut: false,
							jsonUrl: "hb_bianjie",
							disInter : true
						};
						var data = [];
						var types = ["splash"];
						var color = LegendsColor[proId];
						if(result.data != null){
							for(i=0; i<result.data.length ;i++){
								var temp = result.data[i];
								for(j= 0; j<temp.length; j++){
									data.push(temp[j]);
								}
							}
						}
						var timStr = new Date(result.time).format("yyyy-MM-dd hh:mm");
						$(".product-analysis-title").productAnalysisTitle({
							name : timStr + " " + radar.stationName + "站点基本径向速度230KM",
							top : "70px",
							type : "name"
						});
						GIS.GridEdit.showByTypes("nGis",types,data,rangeObj,0,color);
						var date = new Date(timStr).format("yyyy-MM-dd");
						var time = new Date(timStr).format("hh:mm");
						var datas = {
							"站名" : radar.stationName,
							"站号" : radar.stationId,
							"经度" : radar.lon.toFixed(2) + "°",
							"纬度" : radar.lat.toFixed(2) + "°",
							"高度" : (radar.alt/1000).toFixed(2) + "km",
							"日期" : date,
							"时间" : time,
							"测距" : "230km",
							"产品" : "基本径向速度230KM"
						}
						datas = JSON.stringify(datas);
						$.modal.close("monostaticradar");			
						$.modal.show({
							id:"monostaticradar",
							title:"单站雷达",
							container: 'nPage', 
							m_right:"80px",
							m_bottom:"20px",
							operateFuc : {"datas":datas},
							url : G_CONTEXT.contextPath+"zhyjmonostaticradar.do?t="+ new Date().getTime(),
							width : "200",
							height:"220"				
						});
						that.initProLegend(proId, proType);
					}else{
						$(".product-analysis-title").productAnalysisTitle({
							name : $(".rada-item.selectedpro i").text() + "站基本径向速度230KM 当前查询时间无数据!",
							top : "70px",
							type : "name"
						});
					}
				},
				error : function(){
					$.customMask();
				}
			});
		}
	},
	initProLegend: function(proId, proType, time){
		if($("#warningAnalysisLegend").size() > 0){
			$("#warningAnalysisLegend").remove();		
		}
		if(proId != null && proId !=undefined && proId != "" && proId != "null" && proId != "undefined"){
			var $legendDiv = $("<div id='warningAnalysisLegend' class='LegentPicker' data-options='minimum:1, value:10, maximum:5'  >").css({
				right :'261px',//left;
				top : "102px",//top;
				width : "90px",
				height: "638px",
			    position: "absolute"
			});
			$("#nPage").append($legendDiv);
		
		 	if("FY2E" == proType || "FY2F" == proType ){
		 		
		 		var imgurl = G_CONTEXT.contextPath + "hebei/resources/business/zhyj/img/legend/color_fy2e_" 
		 					+ ((proId == "CH1" || proId == "CH4") ? 1 : (proId == "CH3") ? 3 : 5) + ".png";
		 		var unit = (proId == "CH1" || proId == "CH4") ? "K" : (proId == "CH3") ? "K" : "%";
		 		$("#warningAnalysisLegend").html("<img src='"+ imgurl +"' style='position: absolute; top:-2px; height: 580px; left: -1px;'><div class='warningAnalysisLegend-unit'>单位" + unit+ "</div>");
		 	}
//		 	else if("DIV" == proId){
//		 		
//		 		var imgurl = G_CONTEXT.contextPath + "hebei/resources/business/zhyj/img/legend/color_" 
//		 					+ ((proId == "DIV") ? "div" : "vor") + "_000.png";
//		 		$("#warningAnalysisLegend").html("<img src='"+ imgurl +"' style='position: absolute; top:-2px; height: 580px; left: -1px;'><div class='warningAnalysisLegend-unit'>单位1/s</div>");
//		 	}
		 	else if("QPF" == proType ){
		 		
		 		var imgurl = G_CONTEXT.contextPath + "hebei/resources/business/zhyj/img/legend/color_qpf_000.png";
		 		$("#warningAnalysisLegend").html("<img src='"+ imgurl +"' style='position: absolute; top:-2px; height: 580px; left: -1px;'><div class='warningAnalysisLegend-unit'>单位mm</div>");
		 	}
		 	else{
		 		var productId = LegendsColor[proId].type;
		 		// 调用图例组件
		 		if(proId == "TEMP_REAL" && time){
		 			productId = proId + "_" + (time.getMonth() + 1);
				}
				var options = {
						productId : productId,// 产品ID
						warpId:"nPage",
						totalHigh : 580
					};
				this.LegentPicker = $('#warningAnalysisLegend').nLegentPicker(options);
				$("#warningAnalysisLegend #slider-range").css({
					left: "14px"
				});
		 	}
		}
	},
	bindEvent: function(){
		var _this = this;
		$(".analysisPro").off("click").on("click",function(){
			if($(".product-analysis-title-container").length != 0){
				$(".product-analysis-title").productAnalysisTitle();
			}
			var proObj = this;
			if("SIGNAL-RADA-ITEM" == $(this).attr("channel")){
				return;
			}
			$.modal.close("lightninglegend");
			$.modal.close("monostaticradar");
			GIS.GridEdit.clearByTypes("nGis", ["splash","wind","number", "isoline"]);
			GIS.LayerManage.removeLayer("nGis","rasterlayerLightDistribute");
			GIS.Element.clearStation('nGis');
			$("#warning-analysis-timeTip").remove();
			$("#warningAnalysisLegend").remove();
			$(".signal-rada-detail-item i").removeClass("signal-rada-detail-item-i");
			$(".signal-rada-angle .signal-rada-angle-item").removeClass("signal-rada-angle-item-i");
			$(".signal-rada-angle-item.item-click").removeClass("item-click");
			if($(proObj).find("div").hasClass("selectedpro")){
				$("div.selectedpro").removeClass("selectedpro");
			}else{
				$("div.selectedpro").removeClass("selectedpro");
				$(this).find("div").addClass("selectedpro");
				_this.queryGridData();
			}
		});
		
		$(".analysisPro.analysisbox-li1[channel='Monostation-Radar']").unbind("click").bind("click",function(){//站点
			
			if($(".product-analysis-title-container").length != 0){
				$(".product-analysis-title").productAnalysisTitle();
			}
			$.modal.close("lightninglegend");
			$.modal.close("monostaticradar");
			GIS.GridEdit.clearByTypes("nGis", ["splash","wind","number", "isoline"]);
			GIS.LayerManage.removeLayer("nGis","rasterlayerLightDistribute");
			GIS.Element.clearStation('nGis');
			$("#warning-analysis-timeTip").remove();
			$("#warningAnalysisLegend").remove();
			if($(this).find("div").hasClass("selectedpro")){
				$(".signal-rada-detail-item i").removeClass("signal-rada-detail-item-i");
				$(".signal-rada-angle .signal-rada-angle-item").removeClass("signal-rada-angle-item-i");
				$("div.selectedpro").removeClass("selectedpro");
				$(".signal-rada-angle-item.item-click").removeClass("item-click");
				_this.signalRadaUnbindEvent();
			}else{
				
				$(this).closest(".station-container").find(".selectedpro").removeClass("selectedpro");
				$("div.selectedpro").removeClass("selectedpro");
				$(this).find("div").addClass("selectedpro");
				_this.signalRadaBindEvent();
				$(".signal-rada-detail-item i").addClass("signal-rada-detail-item-i");
				$(".signal-rada-angle .signal-rada-angle-item").addClass("signal-rada-angle-item-i");
				$(this).parent().nextAll(".signal-rada").find(".signal-rada-detail-item").removeClass("selectedpro");
				$(this).parent().nextAll(".signal-rada-angle").find(".signal-rada-angle-item").removeClass("item-click");
				$(this).parent().nextAll(".signal-rada").find(".signal-rada-detail-item").first().addClass("selectedpro");
				$(this).parent().nextAll(".signal-rada-angle").find(".signal-rada-angle-item").first().addClass("item-click");
				var station = $(this).attr("data-value");
				_this.querySignalRadar();
			}
		});
	},
	signalRadaBindEvent : function(){
		var _this = this;
		$(".signal-rada-angle .signal-rada-angle-item").unbind("click").bind("click",function(){//雷达度数
			if($(".product-analysis-title-container").length != 0){
				$(".product-analysis-title").productAnalysisTitle();
			}
			$.modal.close("lightninglegend");
			$.modal.close("monostaticradar");
			GIS.GridEdit.clearByTypes("nGis", ["splash","wind","number", "isoline"]);
			GIS.LayerManage.removeLayer("nGis","rasterlayerLightDistribute");
			GIS.Element.clearStation('nGis');
			$("#warning-analysis-timeTip").remove();
			$("#warningAnalysisLegend").remove();
			if($(this).hasClass("item-click")){
				$(".signal-rada-detail-item i").removeClass("signal-rada-detail-item-i");
				$(".signal-rada-angle .signal-rada-angle-item").removeClass("signal-rada-angle-item-i");
				$("div.selectedpro").removeClass("selectedpro");
				$(".signal-rada-angle-item.item-click").removeClass("item-click");
				_this.signalRadaUnbindEvent();
			}else{
				$(".signal-rada-angle-item.item-click").removeClass("item-click");
				$(this).addClass("item-click");
				_this.querySignalRadar();
			}
		});
		
		$(".analysisPro.analysisbox-li1.signal-rada-detail").unbind("click").bind("click",function(){//基本反射率
			
			if($(".product-analysis-title-container").length != 0){
				$(".product-analysis-title").productAnalysisTitle();
			}
			$.modal.close("lightninglegend");
			$.modal.close("monostaticradar");
			GIS.GridEdit.clearByTypes("nGis", ["splash","wind","number", "isoline"]);
			GIS.LayerManage.removeLayer("nGis","rasterlayerLightDistribute");
			GIS.Element.clearStation('nGis');
			$("#warning-analysis-timeTip").remove();
			$("#warningAnalysisLegend").remove();
			if($(this).find("div").hasClass("selectedpro")){
				$(".signal-rada-detail-item i").removeClass("signal-rada-detail-item-i");
				$(".signal-rada-angle .signal-rada-angle-item").removeClass("signal-rada-angle-item-i");
				$("div.selectedpro").removeClass("selectedpro");
				$(".signal-rada-angle-item.item-click").removeClass("item-click");
				_this.signalRadaUnbindEvent();
			}else{
				$(".signal-rada-detail-item.selectedpro").removeClass("selectedpro");
				$(this).find("div").addClass("selectedpro");
				_this.querySignalRadar();
			}
		});
	},
	
	signalRadaUnbindEvent : function(){
		$(".signal-rada-angle .signal-rada-angle-item").unbind("click");
		$(".analysisPro.analysisbox-li1.signal-rada-detail").unbind("click");
	},
};