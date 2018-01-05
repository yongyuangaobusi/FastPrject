var ZHYJ_MAIN = {
		gisMapData : [],					 //保存gis要素、落区图层信息
		showProArr : [],
		autoPro : {
			"S_RAIN05" : ["0","1","2","3"],  //自动站降水 30Min降水
			"S_RAIN1" : ["0","1","2","3"],   //自动站降水  1H降水
			"S_RAIN3" : ["0","1","2","3"],   //自动站降水  3H降水
			"S_RAIN6" : ["0","1","2","3"],   //自动站降水  6H降水
			"S_RAIN12" : ["0","1","2","3"],  //自动站降水  12H降水
			"S_RAIN24" : ["0","1","2","3"],  //自动站降水  24H降水
			"S_GALE_T" : ["0","1","2","3"],  //自动站大风 10Min风
			"S_GALE_E" : ["0","1","2","3"],  //自动站大风  极大风
			"S_V" : ["0","1","2","3"],		 //自动站能见度
			"S_H_T_S" : ["0","1"], 	 //自动站高温
			"S_H_T_MA" : ["0","1"],  //自动站高温   最高温
			"S_H_T_MI" : ["0","1"],  //自动站高温   最低高温
			"S_SP_1HV" : ["0","1","2","3"],  //自动站变压  1H变压
			"S_SP_3HV" : ["0","1","2","3"],  //自动站变压  3H变压
			"S_T_1HV" : ["0","1","2","3"],   //自动站降温  1H变温
			"S_T_24HV" : ["0","1","2","3"],  //自动站降温 24H变温
			"S_T_24MI" : ["0","1","2","3"],  //自动站降温 日最低温度变温
			"S_SNOW" : ["0","1","2","3"],    //自动站雪
			"I_RAIN24" : ["0","1","2","3"],    // 重要天气况暴雨
			"I_GALE_E" : ["0","1","2","3"],    // 重要天气况风
			"I_SNOW" : ["0","1","2","3"],      // 重要天气况积雪
			"I_RAIN1" : ["0","1","2","3"],     // 重要天气况过去1小时降水
			"I_RAIN3" : ["0","1","2","3"],     // 重要天气况过去3小时降水
			"I_RAIN6" : ["0","1","2","3"]      // 重要天气况过去6小时降水
		},
		signalOverDataInfo : [], 			 //预警信号超时数据存放
		timeEventId:null,					 //定时器返回值
		weatherTimeBar : null,
		syncData:null,
		geoType : null,
		drawData : null,
		areaSyncFlag : null,
		underlingArea : {},
		warningProArr : {},
		queryTime : "",
		referenceProduct : {},
		relevantFactor : {},
		initLayer : function(){
//			$.customMask({
//				maskInfo : "地图加载中，请稍后..."
//			});
			
			this.weatherTimeBar = $('.weathertimebar').weatherTimeBar();
			$(".customDateBlack").customDateBlack('init', this.getNewestDate().format("yyyy-MM-dd hh:mm"));
			
			$("#happenTimeOpr .input-dateTime").unbind("click").css("cursor", "default");
			
			this.createGisAndSystemTool();
			this.bindEvents();
			//$.customTips();
		},
		init : function(){
			
			this.linkagePush();
			this.clearUnlessLayer();
			this.initWarnDataPush();
			this.showProArr = ["I_FOG", "I_FROST", "I_HAIL", "I_HAZE", "I_LIGHT", "I_SAND", "I_TORNAD", "S_TORNAD","S_HAIL","S_MESO","S_LIGHT","S_RADA",
			                   "S_STORM","S_TITAN","Z_WAR","Z_WARN","subjective","objectives" ];
//			$(".customDateBlack").customDateBlack('setTime', "2016-06-02 11:00");
			
			this.queryData();
			this.receiveZGWarnPush();
			this.getAttentionRadiiRings();
			this.receiveFeedBackPush();			//预警超时提醒
		},
		getAttentionRadiiRings : function(){	//获取行政区的关注区
			var url=G_CONTEXT.contextPath+"zhyj/getAttentionRadiiRings.do";
			$.ajax({
				type : 'POST',
				url : url,
				dataType : 'json',
				success : function(res) {
					if(res.success && res.params && res.params.rings && res.params.rings){
						window.attentionRadii = JSON.parse(res.params.rings);
						GIS.Warning.addBufferData("nGis", null, window.attentionRadii);
					}else{
						if(window.attentionRadii){
							GIS.Warning.addBufferData("nGis", null, window.attentionRadii);
						}else{
							GIS.Warning.addBufferData("nGis", codeId);
						}
					}
				}
			});
		},
		linkagePush : function(){
			localStorage.removeItem("linkagePushFlag");
			var wsKey = "user" + userId + "_" + new Date().getTime() + Math.random();
			window.linkageWS = new WebSocket("ws://" + webSocketUrl + "/WebSocketScreenLinkService?userId=" + wsKey);
			window.linkageWS.onmessage=function(event){
				var linkagePushFlag = localStorage.getItem("linkagePushFlag");
				if(event.data && linkagePushFlag){
					var result = JSON.parse(event.data);
					if(result.sender == wsKey){
						return;
					}
					var msg = result.content;
					var index = msg.indexOf("&&&");
					if(index > -1){
						var type = msg.substring(0, index);
						var jsonData = JSON.parse(msg.substring(index + 3, msg.length));
						onMessage("nGis", type, jsonData);
					}
				}
			};
		},
		getUnderlingArea : function(){
			$.ajax({
				type:'post',
				url: G_CONTEXT.contextPath + "warn/getDistrictList.do",
				dataType:'json',
				data:{'areaCode':"13"},
				async : false,
				success:function(data){
					if(data){
						var cityData = data.objectData;
						ZHYJ_MAIN.underlingArea = {};
						if(codeId.length == 2){
							for(var areaCode in cityData.city){
								ZHYJ_MAIN.underlingArea[areaCode] = cityData.city[areaCode];
								ZHYJ_MAIN.underlingArea[areaCode].weather = {realtime : {}, forecast : {}};
							}
						}else if(codeId.length == 4){
							for(var i in cityData.city[codeId].subordinatesDistrict){
								var countyArea = cityData.city[codeId].subordinatesDistrict[i];
								ZHYJ_MAIN.underlingArea[countyArea.areaCode] = countyArea;
								ZHYJ_MAIN.underlingArea[countyArea.areaCode].weather = {realtime : {}, forecast : {}};
							}
						}
					}
				 }
			});
		},
		receiveZGWarnPush : function(){
			var that = this;
			var wsKey = userId + "_" + new Date().getTime() + Math.random();
			var ws = new WebSocket("ws://" + webSocketUrl + "/webSocketZGWarnService?userId=" + wsKey);
			ws.onmessage=function(event){
				if(typeof myMap == "undefined" || myMap.group != "zhyj"){
					return;
				}
				if(event.data){
					var socketData = JSON.parse(event.data);
					for(var key in socketData){
						$.each(socketData[key], function(i, gisInfo){
							gisInfo.warnProIdBak = gisInfo.warnProId;
							gisInfo.WarningTime = "real";
							gisInfo.Features = gisInfo.features;
							gisInfo.warnProId = gisInfo.warnType;
							gisInfo.warnType = 3;
							if(key.endsWith("WAR")){//预警信号
								gisInfo.proType = "3";
								gisInfo.id = gisInfo.pid + "_" + gisInfo.id;
								var $layers = $("g[id^='real_3_3_']");
								if(gisInfo.signalType == "1"){//变更
									for(var i = 0; i < $layers.size(); i++){
										var id = $layers.eq(i).attr("id");
										if(id.replace("real_3_3_", "").split("_")[2] == gisInfo.pid){
											GIS.Warning.ReMoveLayerById("nGis", id.replace("_layer", ""));
											break;
										}
									}
									$(".guide_status_warning_wrap").show();
									that.warningVoicePlay();
								}else if(gisInfo.signalType == "2"){//解除
									for(var i = 0; i < $layers.size(); i++){
										var id = $layers.eq(i).attr("id");
										if(id.replace("real_3_3_", "").split("_")[2] == gisInfo.pid){
											GIS.Warning.ReMoveLayerById("nGis", id.replace("_layer", ""));
											if($("#subjectivePopContainer").is(":visible")){
												SUBJECTIVE_POP.closePop("real", gisInfo.warnProId, null, null, null, gisInfo.pid);
											}
											return;
										}
									}
								}else{
									$(".guide_status_warning_wrap").show();
									that.warningVoicePlay();
								}
							}else if(key.endsWith("WARN")){//预警指导
								gisInfo.proType = "2";
								$(".guide_status_warning_wrap").show();
								that.warningVoicePlay();
							}
							that.loadKGAndZGIntoGisMap(gisInfo);
							WARN_LEGEND.filterSubjectiveLayers();
						});
					}
					WARN_STATUS_INFO.init(); //反馈查询
				}
			};
		},
		//预警信息超时推送
		receiveFeedBackPush:function(){
			var that = this;
			var wsKey = userId + "_" + new Date().getTime() + Math.random();
			var ws = new WebSocket("ws://" + webSocketUrl + "/webSocketOverdueSignalService?userId=" + wsKey);
			ws.onmessage=function(event){
				if(typeof myMap == "undefined" || myMap.group != "zhyj"){
					return;
				}
				that.signalOverDataInfo = [];
				if(event.data){
					var socketData = JSON.parse(event.data);
					for(var a=0;a<socketData.length;a++){
						var eachData = {};
							eachData["id"] = socketData[a].id;
						var title = socketData[a].warnType+socketData[a].warnLevel+"预警超时提醒";
							eachData["title"] = title;
							eachData["content"] = socketData[a].warnContent;
							eachData["endTime"] = socketData[a].endTime;
							that.signalOverDataInfo.push(eachData);
					}
//					debugger;
//					var dataInfo = [
//			                {
//			                	'id' : '1',
//			                	'title':"测试1",
//			                	'content':"测试1",
//			                	'endTime' : '2017-03-06 16:06:00.0'
//			                },
//			                {
//			                	'id' : '2',
//			                	'title':"测试2",
//			                	'content':"测试2",
//			                	'endTime': '2017-03-05 16:20:00.0'
//			                },
//			                {
//			                	'id':'3',
//			                	'title':"测试3",
//			                	'content':"测试3测试3测试3测试3测试3测试3测试3测测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3",
//			                	'endTime':'2017-03-06 18:30:00.0'
//			                },
//			                {
//			                	'id' : '4',
//			                	'title':"测试4",
//			                	'content':"测试4",
//			                	'endTime':'2017-03-06 15:20:00.0'
//			                },
//			                {
//			                	'id' : '5',
//			                	'title':"测试5",
//			                	'content':"测试5",
//			                	'endTime':'2017-03-07 15:20:00.0'
//			                }
//		                ];
//					that.signalOverDataInfo = dataInfo;
//					socketData.length = 1;
					
//					if($.isEmptyObject(socketData) && that.signalOverDataInfo.length==0){
//						$("#signalFeedBack #demo1").empty();
//						$("#signalFeedBack #demo2").empty();
//						$("#signalFeedBack #demo1").text("暂无信息!");
//						$("#signalFeedBack #demo1").css({"text-align": "center"});
//						return;
//					}
//					
//					if($.isEmptyObject(socketData) && that.signalOverDataInfo.length>0){
//						var nowDateTime = new Date().getTime();
//						var dataInfo = that.signalOverDataInfo;
//						var newDataInfo = [];
//						for(var i=0;i<dataInfo.length;i++){
//							var endTime = dataInfo[i].endTime;
//								endTime =  Date.parse(endTime);
//							if(endTime>(nowDateTime+(30*60*1000))){
//								newDataInfo.push(dataInfo[i]);
//							}
//						}
//						that.signalOverDataInfo = newDataInfo;
//						that.showSignalOverdue();
//					}
					
					if(socketData.length>0){
//						var dataInfo = [
//				                {
//				                	'id' : '1',
//				                	'title':"测试1",
//				                	'content':"测试1",
//				                	'endTime' : '2017-03-06 16:06:00.0'
//				                },
//				                {
//				                	'id' : '2',
//				                	'title':"测试2",
//				                	'content':"测试2",
//				                	'endTime': '2017-03-05 16:20:00.0'
//				                },
//				                {
//				                	'id':'3',
//				                	'title':"测试3",
//				                	'content':"测试3测试3测试3测试3测试3测试3测试3测试3测试测试3测试3测试3测试3测3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3",
//				                	'endTime':'2017-03-06 18:30:00.0'
//				                },
//				                {
//				                	'id' : '4',
//				                	'title':"测试4",
//				                	'content':"测试4",
//				                	'endTime':'2017-03-06 15:20:00.0'
//				                },
//				                {
//				                	'id' : '5',
//				                	'title':"测试5",
//				                	'content':"测试5",
//				                	'endTime':'2017-03-07 15:20:00.0'
//				                }
//			                ]
//						that.signalOverDataInfo = dataInfo;
						that.showSignalOverdue();
					}else{
						if(that.timeEventId!=null){
							clearInterval(that.timeEventId);
						}
						$("#signalFeedBack #demo1").remove();
						$("#signalFeedBack #demo2").remove();
						$("#signalFeedBack").append($("<div id='demo1'>"));
						$("#signalFeedBack").append($("<div id='demo2'>"));
						$("#signalFeedBack #demo1").text("暂无信息!");
						$("#signalFeedBack #demo1").css({"text-align": "center"});
					}
				}
			};
		},
		showSignalOverdue : function(){
			var that = this;
			var dataInfo = that.signalOverDataInfo;
			$("#signalFeedBack #demo1").remove();
			$("#signalFeedBack #demo2").remove();
			//gis工具条上对应按钮和消息框显示
			$("#signalFeedBack").show();
			$("div[name='feedback']").addClass("buttonclick");
			if(that.timeEventId !=null){
				clearInterval(that.timeEventId);
				that.timeEventId = null;
			}
			$("#signalFeedBack").append($("<div id='demo1'>"));
			$("#signalFeedBack").append($("<div id='demo2'>"));
			for(var i=0;i<dataInfo.length;i++){
				var id = dataInfo[i].id;
				var title = dataInfo[i].title;
				var content = dataInfo[i].content;
				var $pDIV = $("<div class='eachFeedBackDiv' item='feedBackSignal"+dataInfo[i].id+"'>");
				var $titleDiv = $("<div class='eachFeedBackDivTitle'>");
					$titleDiv.append($("<div style='overflow: auto;width: 440px;height: 25px;'>").text(title+":"+content));
					$titleDiv.append($("<div class='eachFeedBackDivTitleClose' style='display:none'>").text("×"));
				var $contentDiv = $("<div class='eachFeedBackDivContent'>").text(content);
				$pDIV.append($titleDiv).append($contentDiv);
				$("#signalFeedBack #demo1").append($pDIV);
			}
			
			var	height = (dataInfo.length)*25+(dataInfo.length-1)*5; //div的高度 + margin-bottom
			var demo = document.getElementById("signalFeedBack");
			var demo1 =  document.getElementById("demo1");
				demo1.style.height = height +"px";
				
			if(dataInfo.length<=3){			//小于等于3  不需要滚动
				that.bingCloseInfo();
				return;
			}
			
			var demo2 =  document.getElementById("demo2");
				demo2.innerHTML = demo1.innerHTML;
				demo2.style.height = height +"px";
				
			var num = dataInfo.length -3;
			var top = -(height+num*(25+5));		//25--div高度  5--margin
			$("#signalFeedBack #demo1").css({"top":top+"px"});		//101为显示框大小
			$("#signalFeedBack #demo2").css({"top":top+"px"});		//101为显示框大小
				
			that.signalInterval(top,num);	//循环滚动事件
		},
		signalInterval : function(oldtop,num){
			var that = this;
			//循环滚动
			var top = oldtop;
			var timeEvent = setInterval(function(){
				height = $("#signalFeedBack>div:first").css("height");
				top += 10;
				var firstId = $("#signalFeedBack>div:first").attr("id");
				$("#signalFeedBack #demo1").css({"top":top+"px"});
				$("#signalFeedBack #demo2").css({"top":top+"px"});
				var demo1H = Number($("#signalFeedBack #demo1").css("height").split("px")[0]);	//demo1 和 demo2 height 相等
				var showHight  = Number($("#signalFeedBack").css("height").split("px")[0]);
				var changeTop = -(demo1H+num*25+(num-1)*5);
				if(firstId=="demo1"){
					var demo2Top = $("#demo2").position().top;
					if(demo2Top>=showHight){
						var obj = $("#demo2>div");
						$("#demo2").remove();
						var $d2 = $("<div id='demo2'></div>");
						$d2.append(obj).css({"height":height+"px"});
						$d2.css({"top":changeTop+"px"});		
						$("#signalFeedBack").prepend($d2);
						$("#signalFeedBack #demo1").css({"top":changeTop+"px"});
						top = changeTop;
					}
				}else if(firstId=="demo2"){
					var demo1Top = $("#demo1").position().top;
					if(demo1Top>=showHight){
						var obj = $("#demo1>div");
						$("#demo1").remove();
						var $d1 = $("<div id='demo1'></div>");
						$d1.append(obj).css({"height":height+"px"});
						$d1.css({"top":changeTop+"px"});		
						$("#signalFeedBack").prepend($d1);
						$("#signalFeedBack #demo2").css({"top":changeTop+"px"});
						top = changeTop;
					}
				}
			},300);
			
			that.timeEventId = timeEvent;
			
			$("#signalFeedBack").unbind("mouseover").bind("mouseover",function(){
				clearInterval(that.timeEventId);
			});
			
			$("#signalFeedBack").unbind("mouseout").bind("mouseout",function(){
				var size = $("#signalFeedBack #demo1>div").length;
				if(size<=3){
					clearInterval(that.timeEventId);
				}else{
					console.log("top---"+top);
					top = Number($("#signalFeedBack #demo1").css("top").split("px")[0]);		//鼠标移开时候的top
					var timeEvent = setInterval(function(){
						height = $("#signalFeedBack>div:first").css("height");
						top += 10;
						var firstId = $("#signalFeedBack>div:first").attr("id");
						$("#signalFeedBack #demo1").css({"top":top+"px"});
						$("#signalFeedBack #demo2").css({"top":top+"px"});
						var demo1H = Number($("#signalFeedBack #demo1").css("height").split("px")[0]);	//demo1 和 demo2 height 相等
						var showHight  = Number($("#signalFeedBack").css("height").split("px")[0]);
						var changeTop = -(demo1H+num*25+(num-1)*5);
						if(firstId=="demo1"){
							var demo2Top = $("#demo2").position().top;
							if(demo2Top>=showHight){
								var obj = $("#demo2>div");
								$("#demo2").remove();
								var $d2 = $("<div id='demo2'></div>");
								$d2.append(obj).css({"height":height+"px"});
								$d2.css({"top":changeTop+"px"});		
								$("#signalFeedBack").prepend($d2);
								$("#signalFeedBack #demo1").css({"top":changeTop+"px"});
								top = changeTop;
							}
						}else if(firstId=="demo2"){
							var demo1Top = $("#demo1").position().top;
							if(demo1Top>=showHight){
								var obj = $("#demo1>div");
								$("#demo1").remove();
								var $d1 = $("<div id='demo1'></div>");
								$d1.append(obj).css({"height":height+"px"});
								$d1.css({"top":changeTop+"px"});		
								$("#signalFeedBack").prepend($d1);
								$("#signalFeedBack #demo2").css({"top":changeTop+"px"});
								top = changeTop;
							}
						}
					},300);
					that.timeEventId = timeEvent;
				}
			});
			//that.bingCloseInfo(that.timeEventId);//x点击事件
		},
		bingCloseInfo : function(timeEvent){
			var that = this;
			//x点击事件
			$("#signalFeedBack").undelegate(".eachFeedBackDivTitleClose","click").delegate(".eachFeedBackDivTitleClose","click",function(){
				var childrenDivsNum = $("#signalFeedBack #demo1>div").length;
				var item = $(this).parent().parent().attr("item");
				var divSize =  childrenDivsNum - 1;
				var	height = divSize*25+(divSize-1)*5; //div的高度 + margin-bottom
				$("#signalFeedBack #demo1>div[item='"+item+"']").remove();
				$("#signalFeedBack #demo2>div[item='"+item+"']").remove();
				$("#signalFeedBack #demo1").css({"height":height+"px"});
				$("#signalFeedBack #demo2").css({"height":height+"px"});
				
				var info = that.signalOverDataInfo;
				for(var a=0;a<info.length;a++){
					if(item == ("feedBackSignal"+info[a].id)){
						that.signalOverDataInfo.splice(a,1);
					}
				}
				if(divSize<=3){
					clearInterval(timeEvent);
					$("#signalFeedBack #demo2").hide();
					$("#signalFeedBack #demo1").css({"top":"0px"});
				}
				if(divSize==0){
					$("#signalFeedBack #demo1").text("暂无信息!");
					$("#signalFeedBack #demo1").css({"text-align": "center"});
				}
			});
		},
		getNextHour : function(preHour){
			var forceHour = [2, 5, 8, 11, 14, 17, 20, 23];
			var index = $.inArray(preHour, forceHour);
			index++;
			if(index >= forceHour.length){
				return forceHour[0];
			}
			return forceHour[index];
		},
		getNearHour : function(hour){
			var hourData = ["02", "05", "08", "11", "14", "17", "20", "23"];
			var nearHour;
			hour = parseInt(hour);
			var diffHour = Number.MAX_VALUE;
			for (var i = 0; i < hourData.length; i++) {
				var tempHour = parseInt(hourData[i]);
				var tempDiff = Math.abs(hour - tempHour);
				if(hour >= tempHour){
					continue;
				}
				if(tempDiff < diffHour){
					nearHour = tempHour;
					diffHour = tempDiff;
				}
			}
			if(!nearHour){
				nearHour = parseInt(hourData[0]);
			}
			return nearHour;
		},
		getNearMinute : function(minute){
			var minuteData = ["00", "10", "20", "30", "40", "50"];
			var nearMinute;
			minute = parseInt(minute);
			var diffMinute = 9999999999;
			for (var i = 0; i < minuteData.length; i++) {
				var tempMinute = parseInt(minuteData[i]);
				var tempDiff = Math.abs(minute - tempMinute);
				if(minute < tempMinute){
					continue;
				}
				if(tempDiff < diffMinute){
					nearMinute = tempMinute;
					diffMinute = tempDiff;
				}
			}
			return nearMinute;
		},
		paddingZero : function(num){
			var numStr = num + "";
			if(numStr.length == 1){
				return "0" + numStr;
			}else{
				return numStr;
			}
		},
		//系统工具 - 设置
		createGisAndSystemTool:function(){
			var _that = this;
			var _that = this;
			$(".gis_tool").gisTools({
				right:"0px",
				top : "2px",
				reCalls:function(obj){
					var key  = obj.attr('name');
					switch (key) {
					case "layer":
						break;
					case "roma":
						GIS.Common.activeNav("nGis","dragging");
						break;
					case "distance":
						GIS.Common.activeMeasure ("nGis","distance");
						break;
					case "big":
						GIS.Common.activeNav("nGis","magnify");
						break;
					case "small":
						GIS.Common.activeNav("nGis","reduce");
						break;
					case "proportion":
						GIS.Common.activeMeasure ("nGis","area");
						break;
					case "latlon":
						if (flg) {
							GIS.Common.showLatLons("nGis",1,1,null,0);	
						}else{
							GIS.Common.hideLatLons("nGis");
						}
						break;
					case "show":
						if(obj.hasClass("buttonclick")){
							GIS.Warning.VisibleLayer("nGis","hebei_buffer","true");
						}else{
							GIS.Warning.VisibleLayer("nGis","hebei_buffer","false");
						}
						// if(window.attentionRadii){
							// GIS.Warning.showAttentionLayer("nGis", window.attentionRadii, function(data){});  
						// }
						break;
					}
				}
			}); 
			
			var sysTools = {
					contents : {
						base_area : {
							pic:"area_icon.png",picClick:"area_icon_click.png",title:"基于落区",name:"chosetype",clickflag:true,callBack:function(){
								_that.geoType="area";//落区
								var $line = $("div.complex_tool[name='broken_line']");
								if($line.attr("clickflag") == "true"){
									$line.trigger("click");
								}
							}
						},
						base_district : {
							pic:"district_icon.png",picClick:"district_icon_click.png",title:"基于行政区",name:"chosetype",clickflag:true,callBack:function(){
								_that.geoType="district";//行政区
								var $line = $("div.complex_tool[name='broken_line']");
								if($line.attr("clickflag") == "true"){
									$line.trigger("click");
								}
							}
						},
						division1 : {
							pic:"picture",title:"",id:""
						},
						
						broken_line : {
							pic:"broken_line_icon.png",picClick:"broken_line_icon_click.png",title:"折线",name:"chosemethod",clickflag:false,callBack:function(){
								GIS.Warning.editDropArea("nGis","mapPan");//设置为漫游状态
								var drawType="BEZIER_CURVE";//折线
								_that.drawMap(drawType);
							}
						},
//						area_line : {
//							pic:"area_line_icon.png",picClick:"area_line_icon_click.png",title:"曲线",name:"chosemethod",clickflag:false,callBack:function(){
//								GIS.Warning.editDropArea("nGis","mapPan");//设置为漫游状态
//								var drawType="BEZIER_POLYGON";//曲线
//								_that.drawMap(drawType);
//								
//							}
//						},
						edit_district : {
							pic:"edit_icon2.png",picClick:"edit_icon2_click.png",title:"基于落区编辑",name:"chosemethod",clickflag:false,callBack:function(){
								var editType="editArea";	
								GIS.Warning.editDropArea("nGis",editType,function(data){
									if(_that.areaSyncFlag){//同步编辑
										ZHYJ_MAIN.syncData = data;
									}else{//绘制编辑
										_that.drawData = data;
										ZHYJ_MAIN.syncData = data;
									}
								});
							}
						},
						edit_area : {
							pic:"edit_icon.png",picClick:"edit_icon_click.png",title:"基于行政区编辑",name:"chosemethod",clickflag:false,callBack:function(){
								var editType="addOnedistrict";				
								 GIS.Warning.editDropArea("nGis",editType,function(data){
									if(_that.areaSyncFlag){
										ZHYJ_MAIN.syncData = data;
									}else{
										_that.drawData = data;
										ZHYJ_MAIN.syncData = data;
									}
								 });
							}
						},
						delete_area : {
							pic:"delete_icon.png",picClick:"delete_icon_click.png",title:"删除单个行政区",name:"chosemethod",clickflag:false,callBack:function(){
								var editType="removeOnedistrict";
								GIS.Warning.editDropArea("nGis",editType,function(data){
									if(_that.areaSyncFlag){
										ZHYJ_MAIN.syncData = data;
									}else{
										_that.drawData = data;
										ZHYJ_MAIN.syncData = data;
										if(data.names.length == 0){
											GIS.Warning.editDropArea("nGis","mapPan");//设置为漫游状态
											ZHYJ_MAIN.syncData = null;
											_that.drawData = null;
											$("div[channel='systool_chosemethod']").removeClass("buttonclick");
											_that.baseDrawChange(_that.geoType,"up")
											_that.changeStatus("edit_area","downPic");
											_that.changeStatus("delete_area","downPic");
										}
									}
								});
							}
						},
						delete_district : {
							pic:"delete_icon2.png",picClick:"delete_icon2_click.png",title:"删除",name:"chosemethod",clickflag:false,callBack:function(){
								var editType;
								if(_that.geoType == "area"){
									editType="removeOne";
								}else{
									editType="removeAll";
								}
								GIS.Warning.editDropArea("nGis",editType,function(data){
									_that.baseDrawChange(_that.geoType,"up")
									_that.syncFlag = false;
									_that.drawData = null;
									ZHYJ_MAIN.syncData = null;
									$("div[channel='systool_chosemethod']").removeClass("buttonclick");
								});
							}
						},
						division2 : {
							pic:"picture",title:"",id:""
						},
						sync_area : {
							pic:"sync_icon.png",picClick:"sync_icon.png",title:"同步",name:"chosemethod",clickflag:false,callBack:function(){
								if(ZHYJ_MAIN.syncData != null) {
									ZHYJ_MAIN.syncData.syncType = 'draw';
									syncData=JSON.stringify(ZHYJ_MAIN.syncData);//将数据转换为json字符串	
									var data = {
										url : "zhyj/zhyj_warn_make.do",//跳转路径
										deMenuId : "5",//菜单的id
										flag : "1",//标识
										syncData : syncData//需要带过去的数据，json格式字符串
									};
									var url = G_CONTEXT.contextPath+"mainframe/init.do";//重新加载初始化界面
									var urlPost = G_CONTEXT.contextPath+"mainframe/getInitParam.do";//ajax请求封装参数
									$.ajax({
										type:'post',
										url:urlPost,
										data:data,
										dataJson:'json',
										async:false,
										success:function(data){
											window.open(url,'newwindow','');
										}
									});
									GIS.Warning.resizeAreaSymbol("nGis");
									if(_that.areaSyncFlag){
										ZHYJ_MAIN.syncData = null;
										_that.defalutToolStatus();
										_that.areaSyncFlag = false;
									}
								}else{
									artDialog.alertTips("请先ctrl+左键选中落区再同步！");
								}
							}
						}
					}
			};
			$(".system_tool").systemTools({
				right:"0px",
				top : "35px",
				sysTools:sysTools
			}); 
			$.each($("div[channel='systool_chosemethod']"),function(i,data){
				var name = $(data).attr("name");
				if(name){
					_that.changeStatus(name,"downPic");
				}
			})
		},
		defalutToolStatus : function(){//初始化工具样式
			var _that = this;
			$(".complex_tool.buttonclick").removeClass("buttonclick");
			$.each($("div[channel='systool_chosemethod']"),function(i,data){
				var name = $(data).attr("name");
				_that.changeStatus(name,"downPic");
			});
			_that.changeStatus("base_district","upPic");
			_that.changeStatus("base_area","upPic");
		},
		changeStatus : function(name,downOrUp){//改变绘画工具条元素的状态
			var picturePath = G_CONTEXT.contextPath + 'HB/n-ui/widgets/nriet/system_tool/img/';
			var path;
			if("downPic" == downOrUp ){
				path = picturePath + $("div[name='"+name+"']").attr("downPic");
				$("div[name='"+name+"']").removeClass("tool_hover"); 
				$("div[name='"+name+"']").find("img").removeClass("mouseHover"); //取消Hover状态
				$("div[name='"+name+"']").css({"cursor":"default"});//鼠标取消点击状态
				$("div[name='"+name+"']>img").attr("src",path);//edit_area置灰
				$("div[name='"+name+"']").attr("clickflag",false);//不可点击
			}else if("upPic" == downOrUp){
				path = picturePath + $("div[name='"+name+"']").attr("upPic");
				$("div[name='"+name+"']").addClass("tool_hover"); 
				$("div[name='"+name+"']").find("img").addClass("mouseHover"); //取消Hover状态
				$("div[name='"+name+"']").css({"cursor":"pointer"});//鼠标取消点击状态
				$("div[name='"+name+"']>img").attr("src",path);//edit_area恢复
				$("div[name='"+name+"']").attr("clickflag",true);//可点击
			}
		},
		
		drawMap : function(drawType){//绘制的方法
			var _that = this;
			var geoType=_that.geoType;
			var param =	{"drawType" : drawType ,"geoType" : geoType};
			if(_that.drawData==null){
				GIS.Warning.searchRegionGraphics(codeId); 
				GIS.Warning.drawArea("nGis",param,function(data){
					if(data.names!=""){
						_that.drawData = data;
						deactivateDrawTool("nGis");//双击结束绘制
						_that.baseDrawChange(_that.geoType,"down");
						$("div[channel='systool_chosemethod']").removeClass("buttonclick");
						ZHYJ_MAIN.syncData = data;//同步落区
					} 
				},function(data){
					ZHYJ_MAIN.syncData = data;//同步落区
				});
			}else{
				artDialog.alertTips("请删除绘制落区再重新绘制！");
				$("div[channel='systool_chosemethod']").removeClass("buttonclick")
			}
		},
		
		baseDrawChange : function(drawType,upOrDown){
			var _that = this;
			if("area" == drawType){
				if("down" == upOrDown){
					$($("div[channel='systool_chosetype'].buttonclick")).attr("clickflag",false);//不允许再次点击
					$($("div[channel='systool_chosetype'].buttonclick")).css({"cursor":"default"})
					_that.changeStatus("base_district","downPic");
					for(var i=0,j=$("div[channel='systool_chosemethod']").length;i<j;i++){
						var name = $($("div[channel='systool_chosemethod']")[i]).attr("name");
						if(name){
							if("edit_district" == name || "delete_district" == name || "sync_area" == name || "colour_area" == name){
								_that.changeStatus(name,"upPic");
							}else{
								_that.changeStatus(name,"downPic");
							}
						}
					}
				}else{
					$($("div[channel='systool_chosetype'].buttonclick")).attr("clickflag",true);
					$($("div[channel='systool_chosetype'].buttonclick")).css({"cursor":"cursor"});
					_that.changeStatus("base_district","upPic");
					for(var i=0,j=$("div[channel='systool_chosemethod']").length;i<j;i++){
						var name = $($("div[channel='systool_chosemethod']")[i]).attr("name");
						if(name){
							if("broken_line" == name || "area_line" == name){
								_that.changeStatus(name,"upPic");
							}else{
								_that.changeStatus(name,"downPic");
							}
						}
					}
					
				}
			}else{
				if("down" == upOrDown){
					$($("div[channel='systool_chosetype'].buttonclick")).attr("clickflag",false);//不允许再次点击
					$($("div[channel='systool_chosetype'].buttonclick")).css({"cursor":"default"});
					_that.changeStatus("base_area","downPic");
					for(var i=0,j=$("div[channel='systool_chosemethod']").length;i<j;i++){
						var name = $($("div[channel='systool_chosemethod']")[i]).attr("name");
						if(name){
							if("delete_district" == name || "sync_area" == name || "edit_area" == name || "delete_area" == name){
								_that.changeStatus(name,"upPic");
							}else{
								_that.changeStatus(name,"downPic");
							}
							if(_that.syncFlag){
								_that.changeStatus("edit_area","upPic");
								_that.changeStatus("delete_area","upPic");
							}
						}
					}
				}else{
					$($("div[channel='systool_chosetype'].buttonclick")).attr("clickflag",true);
					$($("div[channel='systool_chosetype'].buttonclick")).css({"cursor":"cursor"});
					_that.changeStatus("base_area","upPic");
					for(var i=0,j=$("div[channel='systool_chosemethod']").length;i<j;i++){
						var name = $($("div[channel='systool_chosemethod']")[i]).attr("name");
						if(name){
							if("broken_line" == name || "area_line" == name){
								_that.changeStatus(name,"upPic");
							}else{
								_that.changeStatus(name,"downPic");
							}
						}
					}
				}
			}
		},
		resize:function(){
			//计算gis图高度 
			var headH = $(".main-head").height();
			var gisH = window.innerHeight - headH;
			
			$(".gisContainer").height(gisH);
		},
		pushTimer : function(){
			var that = this;
			var timerId = setInterval(function(){
				if($("#zhyjWarningVoice").size() == 0){
					clearInterval(timerId);
					return;
				}
				var now = that.getNewestDate();
				var minute = now.getMinutes();
				console.log(minute);
				var tempT = new Date(Date.parse($(".customDateBlack").customDateBlack('getTime')));
				if(minute % 10 == 0 && minute != tempT.getMinutes()){
					$(".customDateBlack").customDateBlack('init', that.getNewestDate().format("yyyy-MM-dd hh:mm"));
				}
			}, 10000);
			return timerId;
		},
		bindEvents:function(){
			var that = this;
			$(".warningStatus_icon").addClass("warningStatus_click");	//状态灯
			//状态灯点击事件
			$("#warningStatus").on("click",function(){
				if($(".warningStatus_icon").hasClass("warningStatus_click")){
					$(".warningStatus_icon").removeClass("warningStatus_click");
					$(this).css({'bottom': '24px'});
					GIS.Warning.VisibleLayer("nGis","feedbackState",false);
					$("#guideStatus_tail").hide();
				}else{
					$("#guideStatus_tail").show();
					$(".warningStatus_icon").addClass("warningStatus_click");
					$(this).css({'bottom': '34px'});
					GIS.Warning.VisibleLayer("nGis","feedbackState",true);
					WARN_STATUS_INFO.init(); //反馈查询
				}
			});
			
			$("#warningInformation").off("click").on("click",function(){
				if($("#modal_warnAnalyseModal").size() > 0){
					$.modal.close("warnAnalyseModal");
					$(".warning_Info_icon").removeClass("warning_Info_click");
					$(this).css({'bottom': '24px'});
					return;
				}
				$.modal.show({
					id : "warnAnalyseModal",
					title : "过程分析",
					container: 'nPage',
					url : G_CONTEXT.contextPath + "zhyj/warnAnalyseInit.do",
					m_left:'520px',//left;
					m_top:"180px",
					width: "900px",
					backdrop:false,//遮罩
					closeTip:true,//关闭按钮（右上角）,默认为true
					size:"large",//弹出框的大小，如small,middle,large，默认为middle
					footer:false,//底部框 
					closed : function(){
						$(".warning_Info_icon").removeClass("warning_Info_click");
						$("#warningInformation").css({'bottom': '24px'});
					}
				});
				$("#modal_warnAnalyseModal>div").width(900);
				$(".warning_Info_icon").addClass("warning_Info_click");
				$(this).css({'bottom': '34px'});
			});

			//预警设置
			$("#warnSetNavBtn").on("click",function(){
				if($("#modal_warningSet").length==1) {//每次点第二下的时候关闭窗口
					$.modal.close("warningSet");	//报警设置窗口关闭
					$.modal.close("addWarnProduct1");//报警设置-报警产品窗口关闭
					$.modal.close("addWarnProduct2");
					$.modal.close("warningAdvance");//报警设置-高级窗口关闭
					$(".warnSetNavBtn_icon").removeClass("warnSetNavBtn_click");
					$(this).css({'bottom': '24px'});
				} else {
					$.modal.show({
						id:"warningSet",
						title:"预警设置",
						container: 'nPage', 
						m_left:'75%',
						m_top:"20px",
						width:"350",
						height:"",
						url:G_CONTEXT.contextPath+"/zhyj/zhyj_set.do",//加载url，在项目中可以是jsp或者是url链接
						backdrop:false,//遮罩
						closeTip:true,//关闭按钮（右上角）,默认为true
						footer:false,//底部框 
						closed : function(){
							$(".warnSetNavBtn_icon").removeClass("warnSetNavBtn_click");
							$("#warnSetNavBtn").css({'bottom': '24px'});
						}
					});
					$(".warnSetNavBtn_icon").addClass("warnSetNavBtn_click");
					$(this).css({'bottom': '34px'});
				}
			});
			//弹出详细信息
			$("#detailInfo").on("click",function(){
				if($("#modal_detailInfo").size() > 0){
					$(this).css({'bottom': '24px'});
					$.modal.close("detailInfo");
					$(".detailInfo_icon").removeClass("detailInfo_click");
				}else{
					$.modal.show({
						id : "detailInfo",//主键id
						title : "详细信息",//标题
						container: 'nPage', //加载容器
						container : 'nPage', // 加载容器
						m_left : '675px',// left;
						m_top : "305px",
						width : "335",
						height : "280",
						url : G_CONTEXT.contextPath + "/warn/detail_info.do?t=",
						backdrop:false,//遮罩
						closed : function(){
							$(".detailInfo_icon").removeClass("detailInfo_click");
							$("#detailInfo").css({'bottom': '24px'});
							$.modal.close("chartWin");	
						}
					});
					$(".detailInfo_icon").addClass("detailInfo_click");
					$(this).css({'bottom': '34px'});
				}
			}); 
			/*添加预警制作*/
			$("#earlyWarningMake").on("click",function(){
				var data = {
					url : "zhyj/zhyj_warn_make.do",//跳转路径
					deMenuId : "5",//菜单的id
					flag : "1",//标识
				};
				var url = G_CONTEXT.contextPath+"mainframe/init.do";//重新加载初始化界面
				var urlPost = G_CONTEXT.contextPath+"mainframe/getInitParam.do";//ajax请求封装参数
				$.ajax({
					type:'post',
					url:urlPost,
					data:data,
					dataJson:'json',
					async:false,
					success:function(data){
						window.open(url,'newwindow','');
					}
				});
			});
			//预警信号（跳转监视页面）
			$("#weatherMonitorBtn").on("click",function(){
				var data = {
					url : "zhyj/zhyj_warn_monitor.do",//跳转路径
					deMenuId : "5",//菜单的id
					flag : "1",//标识
				};
				var url = G_CONTEXT.contextPath+"mainframe/init.do";//重新加载初始化界面
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
			//弹出日志
			$("#dailyRecord").on("click",function(){
				if($("#modal_logQuary").size()>0){
					$.modal.close("logQuary");	
					$(".dailyRecord_icon").removeClass("dailyRecord_click");
					$(this).css({'bottom': '24px'});
				}else{
					$(".dailyRecord_icon").addClass("dailyRecord_click");
					$(this).css({'bottom': '34px'});
					$.modal.show({
						id : "logQuary", // 主键id
						title : "日志信息", // 标题
						container : 'nPage', // 加载容器
						m_left : "70%", // left;
						m_top : "200px", // top;
						url : G_CONTEXT.contextPath + "/warn/log_info.do",// 加载url，在项目中可以是jsp或者是url链接
						width : "448",
						height : "435",
						closed : function() {
							$("#dailyRecord").trigger("click");
							$(".dailyRecord_icon").removeClass("dailyRecord_click");
							$(this).css({'bottom': '24px'});
						}
					}); 
				}
			});
			
			//弹出指导反馈界面-------吴晔
			$("#guideInfo").on("click",function(){
				if($("#modal_warnGuide").size() > 0){
					$(this).css({'bottom': '24px'});
					GUIDE_INFO.closeBeforeUnload();
					$(".directBack_icon").removeClass("directBack_click");
					$.modal.close("warnGuide");
				}else{
					$.modal.show({
						id : "warnGuide",//主键id
						title : "指导反馈",//标题
						container: 'nPage', //加载容器
						m_left:'520px',//left;
						m_top:"90px",
						width: "900px",
						height : "370px",
						url : G_CONTEXT.contextPath + "/warn/guide_info.do?t="+ new Date().getTime(),
						closed : function(){
							GUIDE_INFO.closeBeforeUnload();
							$(".directBack_icon").removeClass("directBack_click");
							$("#guideInfo").css({'bottom': '24px'});
						}
					});
					$("#modal_warnGuide>div").width(900);
					$(".directBack_icon").addClass("directBack_click");
					$("#guideInfo").css({'bottom': '34px'});
				}
			});
			var clickon = 0;
			var pushTimerId;
			//实时推送开关状态切换
			$("#realTimeOprClick").on("click",function(){
				if(clickon == 1){
					$(".opr_tip .realTimeOpr").addClass("opr_onclick");
					$(".opr_tip .realTimeOpr_icon").addClass("icon_onclick");
					$(".opr_tip .content_offclick").hide();
					$(".opr_tip .content_onclick").show();
					$("#happenTimeOpr .realTimeOpr_query").addClass("realTimeOpr_query_disable");
					$(".customDateBlack").customDateBlack('init', that.getNewestDate().format("yyyy-MM-dd hh:mm"));
					//查询
					$("#opr_query").unbind("click");
					//最新时间
					$('#opr_refresh').unbind("click").css({"opacity" : "0.5", "cursor" : "default"});
					//时间后退十分钟
					$('#opr_left').unbind('click').css({"opacity" : "0.5", "cursor" : "default"});
					//时间前进十分钟
					$('#opr_right').unbind('click').css({"opacity" : "0.5", "cursor" : "default"});
					$("#happenTimeOpr .input-dateTime").unbind("click").css("cursor", "default");
					that.queryData();
					clickon = 0;
					console.log("开启...");
//					pushTimerId = that.pushTimer();
				}else{
					$(".opr_tip .realTimeOpr").removeClass("opr_onclick");
					$(".opr_tip .realTimeOpr_icon").removeClass("icon_onclick");
					$(".opr_tip .content_onclick").hide();
					$(".opr_tip .content_offclick").show();
					$(this).attr("value","realTimeClose");
					$(this).addClass("passive");
					$("#happenTimeOpr .realTimeOpr_query").removeClass("realTimeOpr_query_disable");
					//查询事件
					$("#opr_query").unbind("click").bind("click",function(){
						that.queryData();
					});
					//时间刷新事件
					$('#opr_refresh').unbind('click').bind('click',function(){
						$(".customDateBlack").customDateBlack('init', that.getNewestDate().format("yyyy-MM-dd hh:mm"));
						that.queryData();
					}).css({"opacity" : "1", "cursor" : "pointer"});
					//时间后退五分钟
					$('#opr_left').unbind('click').bind('click',function(){
						var timeStr = $(".customDateBlack").customDateBlack('getTime');
						timeStr = new Date(timeStr).getTime() - (5 * 60 * 1000);
						$(".customDateBlack").customDateBlack('setTime', new Date(timeStr).format("yyyy-MM-dd hh:mm"));
						that.queryData();
					}).css({"opacity" : "1", "cursor" : "pointer"});
						
					//时间前进五分钟
					$('#opr_right').unbind('click').bind('click',function(){
						var timeStr = $(".customDateBlack").customDateBlack('getTime');
						timeStr = new Date(timeStr).getTime() + (5 * 60 * 1000);
						$(".customDateBlack").customDateBlack('setTime', new Date(timeStr).format("yyyy-MM-dd hh:mm"));
						that.queryData();
					}).css({"opacity" : "1", "cursor" : "pointer"});
					$(".customDateBlack").customDateBlack('init', that.getNewestDate().format("yyyy-MM-dd hh:mm"));
					clickon = 1;
					clearInterval(pushTimerId);
				}
			});
			
			$(".guide_status_warning_lighting").off("click").on("click", function(){
				$(".guide_status_warning_wrap").hide();
				$(".customDateBlack").customDateBlack('init', that.getNewestDate().format("yyyy-MM-dd hh:mm"));
				that.queryData();
			});
			
			//多屏联动开关
			$("#screenOprClick").on("click",function(){
				if(!$(this).hasClass("screenOpr_icon_onclick")){
					$("#screenGuide").addClass("screenOpr_onclick");
					$("#screenGuide .screen_onclick").show();
					$("#screenGuide .screen_offclick").hide();
					localStorage.setItem("linkagePushFlag", "true");
					$(this).addClass("screenOpr_icon_onclick");
				}else{
					$("#screenGuide").removeClass("screenOpr_onclick");
					$("#screenGuide .screen_onclick").hide();
					$("#screenGuide .screen_offclick").show();
					localStorage.removeItem("linkagePushFlag");
					$(this).removeClass("screenOpr_icon_onclick");
				}
			});
			
			//图例
			var legendShow = true;
			$(".warn-legend-btn").unbind("click").bind("click", function(){
				if($("#modal_warningLegend").size() > 0){
					if(legendShow){
						$("#modal_warningLegend").hide();
						legendShow = false;
					}else{
						$("#modal_warningLegend").show();
						legendShow = true
					}
				}else{
					var top = document.body.clientHeight - 723;
					$.modal.show({
						id : "warningLegend",//主键id
						title : "图层控制",//标题
						container: 'nPage', //加载容器
						m_left :'10px',//left;
						m_bottom : "10px",//top;
//						width : "595+312",
						width : "907",
						hide : true,
						closed : function(){
							legendShow = false;
						},
						url : G_CONTEXT.contextPath+"zhyj/warningLegendInit.do?t="+ new Date().getTime(),
					});
				}
				$(window).bind("resize", function(){
					var top = document.body.clientHeight - 518;
					$("#modal_warningLegend>div").css({
						top: top + "px"
					});
				});
			});
			$(".warn-legend-btn").trigger("click");
			
			//产品分析
			$(".warn-analysis-btn").unbind("click").bind("click", function(){
				if($("#modal_warningAnalysis").size() > 0){
					if($("#modal_warningAnalysis").is(":visible")){
						$("#modal_warningLegend>div").css({
							left: "10px"
						});
						$("#modal_warningAnalysis").hide();
					}else{
						$("#modal_warningLegend>div").css({
							left: "362px"
						});
						$("#modal_warningAnalysis").show();
					}
				}else{
					$.modal.show({
						id : "warningAnalysis",//主键id
						title : "天气监视",//标题
						container: 'nPage', //加载容器
						m_left :'10px',//left;
						m_bottom : "10px",//top;
						width : "340",
						height : "820",
						url : G_CONTEXT.contextPath+"warningAnalysisInit.do?t="+ new Date().getTime(),
					});
					$("#modal_warningAnalysis button.close").off("click").on("click", function(){
						$("#modal_warningAnalysis").hide();
						$("#modal_warningLegend>div").css({
							left: "11px"
						});
					});
					
					$("#modal_warningLegend>div").css({
						left: "362px"
					});
				}
			});
			
		},
		clearUnlessLayer : function(){
			var times = 0;
			var timer = setInterval(function(){
				times++;
				if($("canvas[id^='nGis_']").is(":visible")){
					GIS.Element.clearStation("nGis");
				}
				if(times == 10){
					clearInterval(timer);
				}
			}, 200);
		},
		//获取系统最新时间
		getNewestDate : function(){
			
			var that = this;
			var date = new Date();
//			$.ajax({
//				type : 'GET',
//				url : G_CONTEXT.contextPath + "warn/getNewestDate.do",
//				async : false,
//				success : function(res){
//					date = new Date(res.params.time);
//				}
//			});
			return date;
		},
};