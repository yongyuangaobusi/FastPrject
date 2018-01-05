/**
 * 预警识别
 */

var ZHYJ_MAIN_IDENTIFICATION = {
	/**
	 * 主动推送的key
	 */
	wsKey : (userId + "_" + Math.random()).replace("0.", ""),
	/**
	 * 数据类型
	 */
	warnDataType : ["aws", "rada", "important", "objective", "subjective"],
	/**
	 * 有哪些要素需要预警
	 */
	warnProTypeObj : {
		aws : ["S_RAIN30","S_RAIN1","S_RAIN3","S_RAIN6","S_RAIN12","S_RAIN24","S_GALE_T","S_GALE_E","S_H_T_S","S_H_T_MA","S_H_T_MI", "S_SP_1HV","S_SP_3HV","S_T_1HV","S_T_24HV","S_T_24MI","S_V","S_SNOW"],
		rada : ["S_TORNAD","S_HAIL","S_MESO","S_LIGHT","S_RADA","S_STORM","S_TITAN"],
		important : ["I_FOG", "I_FROST", "I_GALE_E", "I_HAIL", "I_HAZE", "I_LIGHT", "I_RAIN1", "I_RAIN24","I_RAIN3", "I_RAIN6", "I_SAND", "I_SNOW", "I_TORNAD"],
		objective : ["K_RAIN","K_TP24H","K_EDA","K_T_VAR","K_SNOW","K_FROST","K_H_T","K_VIS"],
		subjective : ["Z_X_WAR", "Z_C_WAR", "Z_WAR", "Z_C_WARN", "Z_WARN"],
	},
	/**
	 * 已经预警的要素--用于时间轴
	 */
	alreadyWarningElement : {
		aws : [],
		rada : [],
		important : [],
		objective : {},
	},
	/**
	 * 请求的次数
	 */
	requestCounts : 0,
	/**
	 * 查询预警数据
	 */
	queryData : function(){
		var that = this;
		that.requestCounts = 0
		$.customMask();
		//清理图层
		that.clearAllLayer();
		$.customMask({
			maskInfo : "正在获取数据，请稍后..."
		});
		var queryTime = $("#happenTimeOpr").customDateBlack("getTime");
		
		//循环查询各类型预警数据
		that.warnDataType.forEach(function(type){
			that.queryWarnDataByType(type, queryTime);
		});
	},
	/**
	 * 根据类型获取对应的预警数据
	 * @param type:请求的数据类型：aws-自动站，rada-雷达站，important-重要天气报，objective-客观，subjective-主观
	 */
	queryWarnDataByType : function(type, queryTime){
		var that = this;
		var urlObj = {
			aws : "warn/getAwsData.do",
			rada : "warn/getRadaData.do",
			important : "warn/getImportantData.do",
			objective : "warn/getObjectiveData.do",
			subjective : "warn/getSubjectiveData.do",
		};
		$.ajax({
			type : 'POST',
			url : G_CONTEXT.contextPath + urlObj[type],
			data : {queryTime : queryTime},
			success : function(res){
				that.requestCounts++;
				if(that.requestCounts == 5){
					$.customMask();
				}
				if(res.success && res.objectData && res.objectData){
					that.handleWarnDataByType(type, res.objectData.data, queryTime);
				}
			},
			error : function(){
				that.requestCounts++;
				if(that.requestCounts == 5){
					$.customMask();
				}
			}
		});
	},
	/**
	 * 定时主动推送
	 */
	initWarnDataPush : function() {
		var that = this;
		var dataType = {
			"1" : "aws",
			"2" : "objective",
			"3" : "subjective",
			"4" : "rada",
			"5" : "important",
		}
		var ws = new WebSocket("ws://" + webSocketUrl + "/webSocketWarnService?userId=" + that.wsKey + "&areaCode=" + codeId);
		ws.onmessage=function(data){
			if(typeof myMap == "undefined" || myMap.group != "zhyj"){
				return;
			}
			if ($(".realTimeOpr").hasClass("opr_onclick")) {
				var data = JSON.parse(event.data);
				var startTime = new Date(data.startTime).format("yyyy-MM-dd hh:mm");
				var warnType = dataType[data.warnType];
				var warnData = data.warnData;
				if(Date.parse(that.queryTime) <= Date.parse(startTime)){
					$(".customDateBlack").customDateBlack('setTime', startTime);
					that.handleWarnDataByType(warnType, warnData, startTime);
				}
			}
		};
	},
	/**
	 * 根据类型处理返回的数据
	 * @param type:请求的数据类型：aws-自动站，rada-雷达站，important-重要天气报，objective-客观，subjective-主观
	 */
	handleWarnDataByType : function(type, data, queryTime){
		var that = this;
		if(typeof myMap == "undefined" || myMap.group != "zhyj"){
			return;
		}
		if(that.queryTime != queryTime){
			that.queryTime = queryTime;
			//清理图层
			that.clearAllLayer();
			if($("#modal_warningAnalysis").size() > 0 && typeof ZHYJ_PRO != "undefined"){
				ZHYJ_PRO.refreshData();
			}
			if(typeof WARN_LEGEND != 'undefined'){
				WARN_LEGEND.getLevelInfo();	//图例改变等级值
			}
		}
		//数据处理器集合
		var dataHandel = {
			aws : this.handelAwsData,//自动站
			rada : this.handelRadaData,//雷达
			important : this.handelImportantData,//重要天气报
			objective : this.handelObjectiveData,//客观
			subjective : this.handelSubjectiveData,//主观
		};
		try{
			//数据不为空时才执行
			if(!$.isEmptyObject(data)){
				//执行数据处理器
				dataHandel[type].call(this, data);
			}
		}catch(e){
			console.error(e);
		}
		if(!$.isEmptyObject(that.alreadyWarningElement[type])){
			that.initWeatherTimeBar();
		}
		if($(".weather-bar-expand-wrap").is(":visible")){
			$.weatherBarExpand();
		}
	},
	/**
	 * 自动站数据处理器
	 */
	handelAwsData : function(data){
		var that = this;
		for(var warnProId in data){
			var warnInfo = data[warnProId];
			if($.isEmptyObject(warnInfo) || $.isEmptyObject(warnInfo.features)){
				continue;
			}
			ZHYJ_MAIN.warningProArr.proArr.push(warnProId);
			var exist = that.alreadyWarningElement.aws.some(function(item){
				return item.type == warnProId;
			});
			if(!exist){
				that.alreadyWarningElement.aws.push({type : warnProId, detail : warnInfo});
			}
			warnInfo.WarningTime = "real";
			warnInfo.Features = warnInfo.features;
			warnInfo.features = null;
			that.handleAutoStationData(warnInfo);
			that.gisMapData.push(warnInfo);
		}
		if($("#modal_detailInfo").size() > 0){
			DETAIL_INFO.loadDetailData();
		}
	},
	/**
	 * 雷达站数据处理器
	 */
	handelRadaData : function(data){
		var that = this;
		for(var warnProId in data){
			var warnInfo = data[warnProId];
			if($.isEmptyObject(warnInfo) || $.isEmptyObject(warnInfo.features)){
				continue;
			}
			ZHYJ_MAIN.warningProArr.proArr.push(warnProId);
			var exist = that.alreadyWarningElement.rada.some(function(item){
				return item.type == warnProId;
			});
			if(!exist){
				that.alreadyWarningElement.rada.push({type : warnProId, detail : warnInfo});
			}
			if(!warnInfo.flickTime){
				warnInfo.flickTime = 3;
			}
			warnInfo.WarningTime = "real";
			warnInfo.Features = warnInfo.features;
			warnInfo.features = null;
			if(warnInfo.warnProId == "S_STORM"){//风暴单独处理
				that.handleStormData(warnInfo);
			}else if(warnInfo.warnProId == "S_TITAN"){//TITAN单独处理
				that.handleTitanData(warnInfo);
			}else if(warnInfo.warnProId == "S_RADA"){//雷达回波单独处理
				try{
					that.handleEchoData(warnInfo);
				}catch (e) {
					console.error(e);
				}
			}else{//普通雷达数据gis地图加载
				try{
					GIS.Warning.showWarningData("nGis", warnInfo, that.gisPopFunction, function(callData){
						if($.inArray(warnInfo.warnProId, that.showProArr) == -1){
							WARN_LEGEND.visibleOneTypeLayers("false", warnInfo.warnProId);
						}
						var areaArrStr = Object.keys(callData.area).join(",");
						var warnProId = callData.warnProId;
						for(var areaCodeT in that.underlingArea){
							if(areaArrStr.indexOf(areaCodeT) > -1){
								that.underlingArea[areaCodeT].weather.realtime[warnProId] = true;
							}
						}
					});
				}catch (e) {
					console.error(e);
				}
			}
			if(that.showProArr.indexOf(warnProId) == -1){
				WARN_LEGEND.visibleOneTypeLayers("false", warnProId);
			}
		}
	},
	/**
	 * 重要天气报数据处理器
	 */
	handelImportantData : function(data){
		var that = this
		for(var warnProId in data){
			var warnInfo = data[warnProId];
			if($.isEmptyObject(warnInfo) || $.isEmptyObject(warnInfo.features)){
				continue;
			}
			ZHYJ_MAIN.warningProArr.proArr.push(warnProId);
			var exist = that.alreadyWarningElement.important.some(function(item){
				return item.type == warnProId;
			});
			if(!exist){
				that.alreadyWarningElement.important.push({type : warnProId, detail : warnInfo});
			}
			warnInfo.WarningTime = "real";
			warnInfo.Features = warnInfo.features;
			warnInfo.features = null;
			if(["I_GALE_E", "I_RAIN1", "I_RAIN24","I_RAIN3", "I_RAIN6", "I_SNOW"].indexOf(warnProId) > -1){
				that.handleImportantHasLevelData(warnInfo);
			}else{
				that.handleImportantNoLevelData(warnInfo);
			}
		}
	},
	/**
	 * 客观天气落区数据处理器
	 */
	handelObjectiveData : function(data){
		var that = this;
		for(var time in data){
			if($.isEmptyObject(data[time])){
				continue;
			}
			var warnObj = {};
			if(!that.alreadyWarningElement.objective[time]){
				that.alreadyWarningElement.objective[time] = warnObj;
			}else{
				warnObj = that.alreadyWarningElement.objective[time];
			}
			for(var warnProId in data[time]){
				var warnInfo = data[time][warnProId];
				if($.isEmptyObject(warnInfo) || $.isEmptyObject(warnInfo.features)){
					continue;
				}
				ZHYJ_MAIN.warningProArr.proArr.push(warnProId);
				if(!warnObj[warnProId]){
					warnObj[warnProId] = warnInfo;
				}
				if(!warnInfo.flickTime){
					warnInfo.flickTime = 3;
				}
				warnInfo.proType = "1";
				warnInfo.WarningTime = "real";
				warnInfo.Features = warnInfo.features;
				//记录要素、落区图层信息
				warnInfo.warnType = "2";
				warnInfo.geoType = "area";
				that.loadKGAndZGIntoGisMap(warnInfo, function(callData){
					var areaArrStr = Object.keys(callData.area).join(",");
					var warnProId = callData.warnProId;
					for(var areaCodeT in that.underlingArea){
						if(areaArrStr.indexOf(areaCodeT) > -1){
							if(!that.underlingArea[areaCodeT].weather.forecast[time]){
								that.underlingArea[areaCodeT].weather.forecast[time] = {};
							}
							that.underlingArea[areaCodeT].weather.forecast[time][warnProId] = true;
						}
					}
				});
				WARN_LEGEND.filterDisasterLayers();
			};
		}
	},
	/**
	 * 主观预警数据处理器
	 */
	handelSubjectiveData : function(data){
		var that = this;
		for(var warnProId in data){
			var warnInfos = data[warnProId];
			if(!Array.isArray(warnInfos)){
				continue;
			}
			warnInfos.forEach(function(warnInfo){
				if($.isEmptyObject(warnInfo) || $.isEmptyObject(warnInfo.features)){
					return;
				}
				var gisInfo = warnInfo;
				gisInfo.WarningTime = "real";
				gisInfo.Features = gisInfo.features;
				gisInfo.warnProId = gisInfo.warnType;
				gisInfo.warnType = 3;
				gisInfo.proType = 3;
				if(warnProId.endsWith("WARN")){
					gisInfo.proType = 2;
				}
				gisInfo.id = gisInfo.pid + "_" + gisInfo.id;
				that.gisMapData.push(gisInfo);
				that.loadKGAndZGIntoGisMap(gisInfo);
				WARN_LEGEND.filterSubjectiveLayers();
			});
		}
	},
	/**
	 * 自动站数据处理
	 */
	handleAutoStationData : function(warnInfo){
		var that = this;
		var features = warnInfo.Features;
		var warnProId = warnInfo.warnProId;
		var levelData = {};//分等级的预警信息对象
		//循环预警详情数据，然后加入对应的等级预警对象中
		$.each(features, function(i, feature){
			//判断该等级的预警信息是否存在，不存在创建
			if(!levelData[feature.warnLevel]){
				levelData[feature.warnLevel] = $.extend({}, warnInfo);
				levelData[feature.warnLevel].warnLevel = feature.warnLevel;
				levelData[feature.warnLevel].features = null;
				levelData[feature.warnLevel].Features = [];
			}
			if(warnProId == "S_GALE_E"){
				feature.windDirection = feature.windExtDir;
			}
			levelData[feature.warnLevel].Features.push(feature);//加入对应等级的预警信息
			for(var areaCodeT in that.underlingArea){//解析该预警数据影响的区域
				if(feature.countryCode && feature.countryCode.indexOf(areaCodeT) > -1){
					//解析同产品同区域最大等级和最大值
					var realPro = that.underlingArea[areaCodeT].weather.realtime[warnProId];
					if(!realPro){
						//不存在创建新的一条
						that.underlingArea[areaCodeT].weather.realtime[warnProId] = {maxLevel : feature.warnLevel, maxVal : feature.val};
					}else{
						//最大等级
						if(parseFloat(realPro.maxLevel) > parseFloat(feature.warnLevel)){
							realPro.maxLevel = feature.warnLevel;
						}
						//最大值
						if(parseFloat(feature.val) < parseFloat(feature.val)){
							realPro.maxVal = feature.val;
						}
					}
				}
			}
		});
		
		for(var level in levelData){
			that.loadAwsDataIntoGisMap(levelData[level]);//预警信息展示在地图上
			//根据图例判断该条预警信息是否在地图上展示
			if($.inArray(level, that.autoPro[warnProId]) == -1){
				WARN_LEGEND.visibleOneTypeLayers("false", warnProId, null, null, level);
			}
		}
	},
	/**
	 * 加载自动站数据到gis地图
	 * @param {Object} gisInfo
	 */
	loadAwsDataIntoGisMap : function(gisInfo){
		//统一处理gis所需的数据
		this.resolveGisInfo(gisInfo);
		//展示站点名称
		gisInfo.IsShowName = true;
		//加载数据到gis地图
		try{
			GIS.Warning.showWarningData("nGis", gisInfo, this.gisPopFunction);
		}catch(e){
			console.error(e);
		}
	},
	/**
	 * 风暴数据处理器
	 * @param {Object} data
	 */
	handleStormData : function(data){
		var that = this;
		//统一处理gis所需的数据
		that.resolveGisInfo(data);
		//加载风暴数据到gis地图
		try{
			GIS.Warning.showWindstormData("nGis", data, that.gisPopFunction, function(callData){
				//判断图例是否隐藏风暴
				if($.inArray(data.warnProId, that.showProArr) == -1){
					WARN_LEGEND.visibleOneTypeLayers("false", data.warnProId);
				}
				//计算风暴影响的行政区域
				var areaArrStr = Object.keys(callData.area).join(",");//风暴所影响的区域
				var warnProId = callData.warnProId;
				for(var areaCodeT in that.underlingArea){//循环判断各个区域是否有风暴
					if(areaArrStr.indexOf(areaCodeT) > -1){
						that.underlingArea[areaCodeT].weather.realtime[warnProId] = true;
					}
				}
			});
		}catch(e){
			console.error(e);
		}
	},
	/**
	 * 雷达回波数据处理器
	 * @param {Object} data
	 */
	handleEchoData : function(dataParams){
		/**
		 * 格点数据显示
		 * @Author:huangfei
		 * @param mapId 地图id
		 * @param typeArr [] 显示类型:色斑splash、等值线isoline、凤羽图wind、风流线windanimate、格点数值number、闪电分布（正负号）、闪电密度["splash","isoline","number"]
		 * @param dataArr 格点数据
		 * @param rangeObj 格点数据行列数和范围及裁剪边界、裁剪标记isCut
		 * @param gridSave 回调保存函数
		 * @param colorObj 配色方案 
		 * @param changeProFlag 是否等经纬转兰伯特 
		 * @returns 
		*/
		var result = dataParams.Features;
		var levelValue = dataParams.levelValue;
		var data = dataParams.isoLine;
		var color_isoline={
			"type":"S_RADA",
			"unit":"dBz",
			"imageData":new Uint8Array([]),
			"levels":function(){
				var arr=[];
				arr.push(levelValue);
				return arr;
			}(),
			"selectImage":function(im){
				return 0;
			},
			"strokeStyle":"red",
			"lineWidth":1,
			"fontColor":"red"
		};
		
		var dataArr = null;
		var newDataArr = null;
		if(result){
			dataArr = result.data;
			newDataArr = [];
			for(var i=0;i<dataArr.length;i++){
				for(var j=0;j<dataArr[i].length;j++){
					var eachData = dataArr[i][j];
					newDataArr.push(eachData);
				}
			}
		} 
		var nodata = "";
		if(result!=null && result.invalid != null){
			nodata = result.invalid;
		}
		var rangeObj = {
			nCols:result.nx,
			nRows:result.ny,
			ymin:(result.startLat < result.endLat) ? result.startLat : result.endLat,
			xmin:result.startLon,
			ymax:(result.startLat > result.endLat) ? result.startLat : result.endLat,
			xmax:result.endLon,
			xCell:result.dx,
			yCell:result.dy,
			noDataValue:nodata,
			isShowZero : true,
			isCut: false,
			jsonUrl: "hb_bianjie",
		};
		var color = LegendsColor["MCR"];
		GIS.GridEdit.showContour("nGis",data,color_isoline,rangeObj,false,true)
		GIS.GridEdit.showByTypes("nGis",["splash"],newDataArr,rangeObj,null,color,0);
		if(this.showProArr.indexOf(dataParams.warnProId) == -1){
			GIS.GridEdit.showControll("nGis","splash",false);
			GIS.GridEdit.showControll("nGis","isoline",false);
		}
	},
	/**
	 * TITAN数据处理器
	 * @param {Object} data
	 */
	handleTitanData : function(data){
		var that = this;
		//gis数据统一处理
		that.resolveGisInfo(data);
		GIS.Warning.addTitanData("nGis", data, that.gisPopFunction, function(callData){
			//判断图例是否隐藏TITAN
			if($.inArray("S_TITAN", that.showProArr) == -1){
				WARN_LEGEND.visibleOneTypeLayers("false", "S_TITAN");
			}
			//计算TITAN影响的行政区域
			var areaArrStr = Object.keys(callData.area).join(",");
			for(var areaCodeT in that.underlingArea){
				if(areaArrStr.indexOf(areaCodeT) > -1){
					that.underlingArea[areaCodeT].weather.realtime["S_TITAN"] = true;
				}
			}
		});
	},
	/**
	 * 有等级的重要天气报
	 */
	handleImportantHasLevelData : function(warnInfo){
		var that = this;
		var features = warnInfo.Features;
		var warnProId = warnInfo.warnProId;
		var levelData = {};//分等级的预警信息对象
		//循环预警详情数据，然后加入对应的等级预警对象中
		$.each(features, function(i, feature){
			//判断该等级的预警信息是否存在，不存在创建
			if(!levelData[feature.warnLevel]){
				levelData[feature.warnLevel] = $.extend({}, warnInfo);
				levelData[feature.warnLevel].warnLevel = feature.warnLevel;
				levelData[feature.warnLevel].features = null;
				levelData[feature.warnLevel].Features = [];
			}
			if(warnProId == "I_GALE_E"){
				feature.windDirection = feature.iWindExtDir;
			}
			levelData[feature.warnLevel].Features.push(feature);//加入对应等级的预警信息
			for(var areaCodeT in that.underlingArea){//解析该预警数据影响的区域
				if(feature.countryCode && feature.countryCode.indexOf(areaCodeT) > -1){
					//解析同产品同区域最大等级和最大值
					var realPro = that.underlingArea[areaCodeT].weather.realtime[warnProId];
					if(!realPro){
						//不存在创建新的一条
						that.underlingArea[areaCodeT].weather.realtime[warnProId] = {maxLevel : feature.warnLevel, maxVal : feature.val};
					}else{
						//最大等级
						if(parseFloat(realPro.maxLevel) > parseFloat(feature.warnLevel)){
							realPro.maxLevel = feature.warnLevel;
						}
						//最大值
						if(parseFloat(feature.val) < parseFloat(feature.val)){
							realPro.maxVal = feature.val;
						}
					}
				}
			}
		});
		
		for(var level in levelData){
			that.loadImportantDataIntoGisMap(levelData[level]);//预警信息展示在地图上
			//根据图例判断该条预警信息是否在地图上展示
			if($.inArray(level, that.autoPro[warnProId]) == -1){
				WARN_LEGEND.visibleOneTypeLayers("false", warnProId, null, null, level);
			}
		}
	},
	/**
	 * 无等级的重要天气报
	 */
	handleImportantNoLevelData : function(data){
		this.loadImportantDataIntoGisMap(data);
		if($.inArray(data.warnProId, this.showProArr) == -1){
			WARN_LEGEND.visibleOneTypeLayers("false", data.warnProId);
		}
	},
	/**
	 * 加载重要天气报数据到gis地图
	 * @param {Object} gisInfo
	 */
	loadImportantDataIntoGisMap : function(gisInfo){
		//统一处理gis所需的数据
		this.resolveGisInfo(gisInfo);
		//展示站点名称
		gisInfo.IsShowName = true;
		//加载数据到gis地图
		try{
			GIS.Warning.showWarningData("nGis", gisInfo, this.gisPopFunction);
		}catch (e) {
			console.error(e);
		}
	},
	/**
	 * gis所需的数据统一处理
	 * @param {Object} gisInfo
	 */
	resolveGisInfo : function(gisInfo){
		//判断是否有闪烁时长，没有默认闪烁3秒
		if(!$.isNumeric(gisInfo.flickTime)){
			gisInfo.flickTime = 3;
		}
		//转换成时间戳
		if(typeof gisInfo.startTime == "string"){
			gisInfo.startTime = Date.parse(gisInfo.startTime);
		}
		//是否闪烁
		if(gisInfo.isFlick == "1"){
			gisInfo.isFlick = true;
		}else{
			gisInfo.isFlick = false;
		}
	},
	/**
	 * 加载客观或者主观数据到gis地图
	 * @param {Object} dataParams
	 * @param {Object} warnType
	 * @param {Object} areaCallback
	 */
	loadKGAndZGIntoGisMap:function(dataParams, areaCallback){
		var that = this;
		if(!$.isNumeric(dataParams.flickTime)){
			dataParams.flickTime = 3;
		}
		if(typeof dataParams.startTime == "string"){
			dataParams.startTime = Date.parse(dataParams.startTime);
		}
		if(dataParams.isFlick == "1"){
			dataParams.isFlick = true;
		}else{
			dataParams.isFlick = false;
		}
		try{
			GIS.Warning.searchRegionGraphics(codeId);
			GIS.Warning.showAreaWarningData ("nGis", dataParams, this.gisPopFunction, function(data){
				//TODO:落区高亮同步
				$(".complex_tool").each(function(i,data){
					var name = $(data).attr("name");
					that.changeStatus(name,"downPic");
				});
				that.changeStatus("sync_area","upPic");
				ZHYJ_MAIN.syncData = data;
				that.areaSyncFlag = true;
				if("area" == data.geoType){
					that.changeStatus("edit_district","upPic");
				}else if("district" == data.geoType){
					that.changeStatus("edit_area","upPic");
					that.changeStatus("delete_area","upPic");
				}
			}, areaCallback);
		}catch (e) {
			console.error(e);
		}
	},
	gisPopFunction : function(data){
		ZHYJ_MAIN.syncData=data;
		var warnProId = data.warnProId;
		var returnJson = {width: 990, height: 810};
		var url = G_CONTEXT.contextPath+"warn/elementPop.do?t="+ new Date().getTime();
		if($.isNumeric(warnProId)){
			returnJson.width = 360;
			returnJson.height = 390;
			url = G_CONTEXT.contextPath+"zhyj/subjectiveElementPopInit.do?t="+ new Date().getTime();
		}
		returnJson.content = $.ajax({type : "GET", async : false, url : url}).responseText;
		var $wrap = $("<div>").append(returnJson.content);
		if(data.warnProId=="S_LIGHT"||"S_SP_1HV"==data.warnProId||data.warnProId=='S_SP_3HV'||data.warnProId=='S_SNOW'||data.warnProId=='S_T_1HV'||data.warnProId=='S_T_24HV'||data.warnProId=='S_T_24MI'){
			if(data.warnProId=="S_LIGHT"){
				$wrap.find("#elementPopContainer").css({"min-height":"140px","width":"700px"});
			}else{
				$wrap.find("#elementPopContainer").css({"min-height":"140px"});
			}
			$wrap.find("#elementPopContainer .element-xgyp-wrap").hide();
		}
//		if(data.warnProId.startsWith("I_")){
//			$wrap.find("#elementPopContainer").css({"min-height":"130px"});
//			$wrap.find("#elementPopContainer .element-xgyp-wrap").remove();
//			returnJson.height = 170;
//		}
		returnJson.content = $wrap.html();
		var timer = setInterval(function(){
			clearInterval(timer);
			if($("#subjectivePopContainer").size() > 0){
				SUBJECTIVE_POP.init(data);
			}else if($("#elementPopContainer").size() > 0){
				ELEMENT_POP.init(data);
			}
		}, 100);
		return returnJson;
	},
	/**
	 * 清理所有数据图层
	 */
	clearAllLayer : function(){
		
		var that = this;
		//清空gis地图上非历史的要素、落区图层
		$("g[id^='real_']").each(function(){
			GIS.Warning.ReMoveLayerById("nGis", this.id.replace("_layer", ""));
		});
		//清除已绘制落区
		GIS.Warning.ClearLayerById("nGis","*DA*TempDraw");
		that.defalutToolStatus();
		that.drawData = null;
		that.gisMapData = [];
		this.initWeatherTimeBar();
		if($("#subjectivePopContainer").is(":visible")){
			SUBJECTIVE_POP.closePop("real");
		}
		if($("#elementPopContainer").is(":visible")){
			ELEMENT_POP.closePop("real");
		}
		if($(".guide_status_warning_wrap").is(":visible")){
			$(".guide_status_warning_wrap").hide();
			this.warningVoicePause();
		}
		//详细信息弹框数据重新加载
		if($("#modal_detailInfo").size() > 0){
			DETAIL_INFO.loadDetailData();
		}
		
		GIS.GridEdit.clearByTypes("nGis",["isoline","splash"]); //清除回波的图层
		if(!$.isEmptyObject(ZHYJ_MAIN.relevantFactor)){		//叠加分析的图层
			$(".close-button").trigger("click");
			//GIS.LayerManage.removeLayer("nGis", "relevant_factor_" + ZHYJ_MAIN.relevantFactor.name + "_" + ZHYJ_MAIN.relevantFactor.time);
		}
		that.getUnderlingArea();
		that.warningProArr = {startTime : that.queryTime, proArr : []};
		//初始化上次已经预警的要素--用于时间轴
		that.alreadyWarningElement = {aws : [], rada : [], important : [], objective : {},};
		that.initWeatherTimeBar();
		//刷新状态条和地图上的状态数据
		WARN_STATUS_INFO.init(); //加载反馈信息显示
	},
	/**
	 * 初始化时间轴
	 */
	initWeatherTimeBar : function(){
		
		$(".wtbweather").hide();
		var that = this;
		var wtb = that.weatherTimeBar;
		var startTime = that.queryTime;
		var date = new Date(Date.parse(startTime));
		wtb.setBaseDate(date);
		var sk = {time : "", weather : []};
		sk.weather = $.merge(sk.weather, that.alreadyWarningElement.aws)
		sk.weather = $.merge(sk.weather, that.alreadyWarningElement.rada);
		sk.weather = $.merge(sk.weather, that.alreadyWarningElement.important);
		//设置实况数据
		wtb.setSKData(sk);
		/**
		 * 设置时间轴短临短期天气预警回调方法
		 */
		wtb.setDlDqDataFn(function(warnProObj, tempDate){
			var weather = [];
			var dlDqData = that.alreadyWarningElement.objective[tempDate.format("yyyy-MM-dd hh:mm:ss")];
			if($.isEmptyObject(dlDqData)){
				return weather;
			}
			for(var warnProId in warnProObj){
				if(dlDqData[warnProId]){
					weather.push({type : warnProId, detail : warnProObj[warnProId]});
				}
			}				
			return weather;
		});
		//短临短期
		wtb.initDlData();
		wtb.initDqData();
		that.warningVoice();
	},
	warningVoice : function(){
		var that = this;
		try{
			//报警声音
			if($(".wtbicon-wrap-warning").is(":visible")){
				var nowTime = that.getNewestDate();
				var hisTime = localStorage.getItem("zhyjWarningTime");
				var playFlag = false;
				if(!hisTime){
					playFlag = true;
				}else{
					hisTime = parseInt(hisTime);
					if(nowTime - hisTime > 30*60*1000){
						playFlag = true;
					}
				}
				that.warningVoicePlay();
			}else{
				that.warningVoicePause();
			}
		}catch(e){
			console.error(e);
		}
	},
	warningVoicePlay : function(){
		var audio = document.getElementById("zhyjWarningVoice");
		if(audio){
			if(!audio.src || !audio.src.endsWith("mp3")){
				audio.src = G_CONTEXT.contextPath + "resources/common/warning.mp3";
			}
			audio.loop = true;
			audio.play();
		}
	},
	warningVoicePause : function(){
		var audio = document.getElementById("zhyjWarningVoice");
		if(audio){
			audio.pause();
			audio.src = "";
		}
	},
	getNewstQueryTime : function(){
		var newestTime = this.getNewestDate().getTime() - (5 * 60 * 1000);
		var newstDate = new Date(newestTime);
		newstDate.setMinutes(this.getNearMinute(newstDate.getMinutes()));
		return newstDate.getTime();
	}
};


$(function(){
	$.extend(ZHYJ_MAIN, ZHYJ_MAIN_IDENTIFICATION);
});