jQuery.fn.extend({
	weatherTimeBar : function(option){
		
		var utils = {
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
		};
		
		var wbtoption = {
			//动画播放速度
			animatespeed : 400,
			//天气数据类型
			weather : {
				"K_RAIN" : {"width" : 16, "imgUrl" : "icons/rain.png", title : "短临强降水"},
				"K_EDA" : {"width" : 16, "imgUrl" : "icons/wind.png", title : "短期大风"},
				"K_FROST" : {"width" : 16, "imgUrl" : "icons/frost.png", title : "短期霜冻"},
				"K_H_T" : {"width" : 16, "imgUrl" : "icons/h-temp.png",title:"短期高温"},
				"K_SNOW" : {"width" : 16, "imgUrl" : "icons/snow.png",title:"短期暴雪"},
				"K_TP24H" : {"width" : 16, "imgUrl" : "icons/rain.png", title : "短期强降水"},
				"K_T_VAR" : {"width" : 16, "imgUrl" : "icons/l-temp.png", title : "短期变温"},
				"K_VIS" : {"width" : 16, "imgUrl" : "icons/vis.png", title : "短期能见度"},
				
				"S_RAIN05" : {"width" : 16, "imgUrl" : "auto", title : "自动站30Min降水"},
				"S_RAIN1" : {"width" : 16, "imgUrl" : "auto", title : "自动站1H降水"},
				"S_RAIN3" : {"width" : 16, "imgUrl" : "auto", title : "自动站3H降水"},
				"S_RAIN6" : {"width" : 16, "imgUrl" : "auto", title : "自动站6H降水"},
				"S_RAIN12" : {"width" : 16, "imgUrl" : "auto", title : "自动站12H降水"},
				"S_RAIN24" : {"width" : 16, "imgUrl" : "auto", title : "自动站24H降水"},
				"S_GALE_T" : {"width" : 9, "imgUrl" : "auto", title : "自动站10Min风"},
				"S_GALE_E" : {"width" : 9, "imgUrl" : "auto", title : "自动站极大风"},
				"S_V" : {"width" : 16, "imgUrl" : "auto", title : "自动站能见度"},
				"S_H_T_S" : {"width" : 16, "imgUrl" : "auto", title : "自动站高温"},
				"S_H_T_MA" : {"width" : 16, "imgUrl" : "auto", title : "自动站最高温"},
				"S_H_T_MI" : {"width" : 16, "imgUrl" : "auto", title : "自动站最低高温"},
				"S_SP_1HV" : {"width" : 16, "imgUrl" : "auto", title : "自动站1H变压"},
				"S_SP_3HV" : {"width" : 16, "imgUrl" : "auto", title : "自动站3H变压"},
				"S_T_1HV" : {"width" : 16, "imgUrl" : "auto", title : "自动站 1H变温"},
				"S_T_24HV" : {"width" : 16, "imgUrl" : "auto", title : "自动站24H变温"},
				"S_T_24MI" : {"width" : 16, "imgUrl" : "auto", title : "自动站日最低温度变温"},
				"S_SNOW" : {"width" : 16, "imgUrl" : "auto", title : "自动站雪"},
				
				"S_MESO" : {"width" : 16, "imgUrl" : "icons/legend-icon-meso.png", title : "雷达站中气旋"},
				"S_HAIL" : {"width" : 16, "imgUrl" : "icons/icon-hail.png", title : "雷达站冰雹"},
				"S_LIGHT" : {"width" : 10, "imgUrl" : "icons/legend-icon-light.png", title : "雷达站闪电"},
				"S_TITAN" : {"width" : 40, "imgUrl" : "icons/icon-thunderstorm.png", title : "雷达站TITAN"},
				"S_STORM" : {"width" : 50, "imgUrl" : "icons/icon-storm.png", title : "雷达站风暴"},
				"S_TORNAD" : {"width" : 16, "imgUrl" : "icons/legend-icon-tornad.png", title : "雷达站龙卷"},
				"S_RADA" : {"width" : 16, "imgUrl" : "icons/dBz.png", title : "雷达站雷达回波"},
				
				"I_FOG"    : {title : "重要天气报雾", "width" : 16, "imgUrl" : "icons/important/I_FOG.png"},
				"I_FROST"  : {title : "重要天气报霜冻", "width" : 16, "imgUrl" : "icons/important/I_FROST.png"},
				"I_HAIL"   : {title : "重要天气报冰雹", "width" : 16, "imgUrl" : "icons/important/I_HAIL.png"},
				"I_HAZE"   : {title : "重要天气报霾",  "width" : 16, "imgUrl" : "icons/important/I_HAZE.png"},
				"I_LIGHT"  : {title : "重要天气报雷暴", "width" : 16, "imgUrl" : "icons/important/I_LIGHT.png"},
				"I_SAND"   : {title : "重要天气报沙尘", "width" : 16, "imgUrl" : "icons/important/I_SAND.png"},
				"I_TORNAD" : {title : "重要天气报龙卷风", "width" : 16, "imgUrl" : "icons/important/I_TORNAD.png"},
				"I_GALE_E" : {title : "重要天气报风", "width" : 16, "imgUrl" : "auto"},
				"I_RAIN1"  : {title : "重要天气报1小时降水", "width" : 16, "imgUrl" : "auto"},
				"I_RAIN24" : {title : "重要天气报暴雨", "width" : 16, "imgUrl" : "auto"},
				"I_RAIN3"  : {title : "重要天气报3小时降水", "width" : 16, "imgUrl" : "auto"},
				"I_RAIN6"  : {title : "重要天气报6小时降水", "width" : 16, "imgUrl" : "auto"},
				"I_SNOW"   : {title : "重要天气报积雪", "width" : 16, "imgUrl" : "auto"},
				
				"subjective" : {"width" : 16, "imgUrl" : "icons/icon-subjective.png"}
			},
			autoImg :{
				"S_RAIN05" : {"0":"rain_red.png","1":"rain_orange.png","2":"rain_yellow.png","3":"rain_blue.png"},   				//自动站降水  1H降水
				"S_RAIN1" : {"0":"rain1h_red.png","1":"rain1h_orange.png","2":"rain1h_yellow.png","3":"rain1h_blue.png"},   		//自动站降水  1H降水
				"S_RAIN3" : {"0":"rain3h_red.png","1":"rain3h_orange.png","2":"rain3h_yellow.png","3":"rain3h_blue.png"},   		//自动站降水  1H降水
				"S_RAIN6" : {"0":"rain6h_red.png","1":"rain6h_orange.png","2":"rain6h_yellow.png","3":"rain6h_blue.png"},   		//自动站降水  1H降水
				"S_RAIN12" : {"0":"rain12h_red.png","1":"rain12h_orange.png","2":"rain12h_yellow.png","3":"rain12h_blue.png"},   	//自动站降水  1H降水
				"S_RAIN24" : {"0":"rain24h_red.png","1":"rain24h_orange.png","2":"rain24h_yellow.png","3":"rain24h_blue.png"},   	//自动站降水  24H降水
				"S_GALE_E" : {"0":"wind/windbarb_red/windbarb_9.png","1":"wind/windbarb_orange/windbarb_9.png","2":"wind/windbarb_yellow/windbarb_9.png","3":"wind/windbarb_blue/windbarb_9.png"},   //自动站极大风
				"S_GALE_T" : {"0":"wind/windbarb_red/windbarb_9.png","1":"wind/windbarb_orange/windbarb_9.png","2":"wind/windbarb_yellow/windbarb_9.png","3":"wind/windbarb_blue/windbarb_9.png"},   //自动站10Min风
				"S_V" : {"0":"vis-icon-red.png","1":"vis-icon-orange.png","2":"vis-icon-yellow.png","3":"vis-icon-blue.png"}, 			//自动站能见度
				"S_H_T_S" : {"0":"temp-icon-red.png","1":"temp-icon-orange.png","2":"temp-icon-yellow.png","3":"temp-icon-blue.png"},  	//自动站高温
				"S_H_T_MA" : {"0":"gw_high_red.png","1":"gw_high_orange.png","2":"gw_high_yellow.png","3":"gw_high_blue.png"},  	 	//自动站高温   最高温
				"S_H_T_MI" : {"0":"gw_low_red.png","1":"gw_low_orange.png","2":"gw_low_yellow.png","3":"gw_low_blue.png"},  			//自动站高温   最低高温
				"S_SP_1HV" : {"0":"by-1h-red.png","1":"by-1h-orange.png","2":"by-1h-yellow.png","3":"by-1h-blue.png"},   				//自动站变压  1H变压
				"S_SP_3HV" : {"0":"by-3h-red.png","1":"by-3h-orange.png","2":"by-3h-yellow.png","3":"by-3h-blue.png"},   				//自动站变压  3H变压
				"S_T_1HV" : {"0":"hc-red.png","1":"hc-orange.png","2":"hc-yellow.png","3":"hc-blue.png"},   						 	//自动站降温  1H变温
				"S_T_24HV" : {"0":"jw_24h_red.png","1":"jw_24h_orange.png","2":"jw_24h_yellow.png","3":"jw_24h_blue.png"},  			//自动站降温 24H变温
				"S_T_24MI" : {"0":"jw_day_red.png","1":"jw_day_orange.png","2":"jw_day_yellow.png","3":"jw_day_blue.png"},   			//自动站降温 日最低温度变温
				"S_SNOW" : {"0":"snow-red.png","1":"snow-orange.png","2":"snow-yellow.png","3":"snow-blue.png"},     					//自动站雪	
				"I_GALE_E" : {"0":"wind/windbarb_red/windbarb_9.png","1":"wind/windbarb_orange/windbarb_9.png","2":"wind/windbarb_yellow/windbarb_9.png","3":"wind/windbarb_blue/windbarb_9.png"},
				"I_RAIN24" : {"0":"rain24h_red.png","1":"rain24h_orange.png","2":"rain24h_yellow.png","3":"rain24h_blue.png"},
				"I_RAIN1"  : {"0":"rain1h_red.png","1":"rain1h_orange.png","2":"rain1h_yellow.png","3":"rain1h_blue.png"},
				"I_RAIN3"  : {"0":"rain3h_red.png","1":"rain3h_orange.png","2":"rain3h_yellow.png","3":"rain3h_blue.png"},
				"I_RAIN6"  : {"0":"rain6h_red.png","1":"rain6h_orange.png","2":"rain6h_yellow.png","3":"rain6h_blue.png"},
				"I_SNOW"   : {"0":"snow-red.png","1":"snow-orange.png","2":"snow-yellow.png","3":"snow-blue.png"},
			},
			
			//短临时间间隔，默认10分钟
			dlinterval : 30,
			//短临预报时长,单位：分钟
			dllong : 60,
			//短期时间间隔，默认3小时
			dqinterval : 3,
			dqlong : 72,
			//短期时间起始时间
			dqstarttime : '2:00',
			//是否使用实况数据时间作为当前时间
			usecurtime : false,
			getDlDqData : function() {
				return [];
			}
		}
		jQuery.extend(true,wbtoption, option);
		
		var rootctx = this;
		
		var isinitonce = false;
		
		//组件相对路径
		var frpath = '';
		
		//html模板
		var template = '';
		
		var datatemplate = '';
		
		//实况数据
		var skdata = {
			time : '',
			weather : []
		};
		
		//短邻数据
		var dldata = [];
		
		//短期数据
		var dqdata = [];
		
		//短期预报是否从当天开始
		var dqstartastoday = true;
		
		//设置显示的view
		var showview = 'dl';

		//短临
		var dlWarnProObj = {
			"K_RAIN" : true,
		};
		
		//短期
		var dqWarnProObj = {
			"K_EDA" : true,			//短期大风
			"K_TP24H" : true,		//短期强降水
			"K_T_VAR" : true,		//短期变温
			"K_SNOW" : true,		//短期暴雪
			"K_FROST" : true,		//短期霜冻
			"K_H_T" : true,			//短期高温
			"K_VIS" : true,			//短期能见度
		};
		
		var timeEvent = null;		//定时器用
		var radaIndex = 0;			//定时器用
		
		var baseDate = new Date();
		baseDate.setMinutes(utils.getNearMinute(baseDate.getMinutes()), 0, 0);
		
		//获取组件相对路径
		var getFrpath = function(){
			var returnfrpath = '';
			var scripts = jQuery('script');
			jQuery.each( scripts , function(index , value){
				var scriptsrc = jQuery(this).attr('src');
				var thisfilename = 'weathertimebar.js';
				if(scriptsrc != undefined && scriptsrc.indexOf(thisfilename) > 0){
					returnfrpath = scriptsrc.substring(0 , scriptsrc.indexOf(thisfilename));
				}
			});
			return returnfrpath;
		}
		
		//获取组件html模板
		var getTemplate = function(){
			var returndata = '';
			jQuery.ajax({
				url : frpath + 'template.tpl',
				dataType : 'html', 
				async : false, 
				success : function(data){
					returndata = jQuery(data);
				}
			});
			return returndata;
		}
		

		this.setBaseDate = function(date){
			//alert('setBaseDate');
			baseDate = date;
			baseDate.setMinutes(baseDate.getMinutes(), 0, 0);
		}
		
		this.setDlDqDataFn = function(fn){
			if($.isFunction(fn)){
				wbtoption.getDlDqData = fn;
			}
		}
		
		var dateFormate = "yyyy-MM-dd hh:mm:ss";
		
		var lastDlDate;
		//短临
		this.initDlData = function(){

			var startTime = new Date(baseDate.getTime());
			
			startTime.setMinutes(utils.getNearMinute(startTime.getMinutes()), 0, 0);

			var startTime = startTime.getTime();
			var dlData = [];
			var dlInterval = wbtoption.dlinterval * 60 * 1000;
			
			var dlCounts = wbtoption.dllong / wbtoption.dlinterval;
			for(var i = 1; i <= dlCounts; i++){
				var tempDate = new Date(startTime + dlInterval * i);
				
				lastDlDate = tempDate;
				dlData.push({
					time : tempDate.format("hh:mm"),
					weather : wbtoption.getDlDqData(dlWarnProObj, tempDate),
					timeStr : tempDate.format(dateFormate)
				});
			}
			this.setDLData(dlData);
		}
		
		//短期
		this.initDqData = function(){
			var dqData = [];
			var qdInterval = wbtoption.dqinterval * 60 * 60 * 1000;
			var dqDate = new Date(lastDlDate.getTime());
			var forceHour = [8, 11, 14, 17, 20, 23];
			var hour = dqDate.getHours();
			var nearHour = utils.getNearHour(hour);
			if(hour > nearHour){
				dqDate.setDate(dqDate.getDate() + 1);
			}
			dqDate.setHours(nearHour, 0, 0, 0);
			dqData.push({
				date : utils.paddingZero(dqDate.getDate()) + "日",
				data : [{time : dqDate.format("hh:mm"), weather : wbtoption.getDlDqData(dqWarnProObj, dqDate), timeStr : dqDate.format(dateFormate)}]
			});
			var times = 1;
			var date;
			var preHour = nearHour;
			var dqCounts = wbtoption.dqlong / wbtoption.dqinterval;
			while(times < dqCounts){
				var currHour = utils.getNextHour(preHour);
				dqDate.setHours(currHour, 0, 0, 0);
				if(preHour > currHour){
					dqDate.setDate(dqDate.getDate() + 1);
					dqData.push({
						date : utils.paddingZero(dqDate.getDate()) + "日",
						data : [{time : dqDate.format("hh:mm"), weather : wbtoption.getDlDqData(dqWarnProObj, dqDate),timeStr : dqDate.format(dateFormate)}]
					});
				}else{
					dqData[dqData.length - 1].data.push({
						time : dqDate.format("hh:mm"), 
						weather : wbtoption.getDlDqData(dqWarnProObj, dqDate),
						timeStr : dqDate.format(dateFormate)
					});
				}
				preHour = currHour;
				times++;
			}
			//设置短期数据
			this.setDQData(dqData);
		}
		
		//设置实况数据
		this.setSKData = function(data){
			skdata.weather = [];
			jQuery.extend(skdata,data);
			eleReInit();
		}
		
		//设置短临数据
		this.getDLData = function(){
			return dldata;
		}
		
		//设置短临数据
		this.setDLData = function(data){
			dldata = data;
			eleReInit();
		}
		
		//设置短期数据
		this.setDQData = function(data, startastoday){
			dqdata = data;
			dqstartastoday = true;
			if(startastoday == false){
				dqstartastoday = false;
			}
			eleReInit();
			var warningProArr = localStorage.getItem("warningProArr");
			if(warningProArr){
				warningProArr = JSON.parse(warningProArr);
				var queryTime = Date.parse(ZHYJ_MAIN.queryTime);
				var startTime = Date.parse(warningProArr.startTime);
				if(queryTime > startTime){
					$(".kg-feedback-all-know").show();
				}else{
					$(".kg-feedback-all-know").hide();
				}
			}else{
				$(".kg-feedback-all-know").show();
			}
		}
		
		//切换view
		this.toogleView = function(viewname){
			if(viewname == 'dl' || viewname == 'dq'){
				showview = viewname;
			}
			eleReInit();
		}
		
		//内部对象初始化与刷新函数
		var reInit = function(){
			//初始化一次函数
			var initOnce = function(){
				//获取组件相对路径
				frpath = getFrpath();
				
				jQuery.each(wbtoption.weather, function(index, value){
					if(value.imgUrl){
						wbtoption.weather.imgUrl = frpath + value.imgUrl;
					}
				});
				
				//获取组件html模板
				template = getTemplate();
				datatemplate = template.find('.datatemplate');
				datatemplate.removeClass('datatemplate');
				template.find('.datatemplate').remove();
			}
			if(isinitonce == false){
				initOnce();
				isinitonce = true;
			}
			eleReInit();
			var warningProArr = localStorage.getItem("warningProArr");
			if(warningProArr){
				warningProArr = JSON.parse(warningProArr);
				var queryTime = Date.parse(ZHYJ_MAIN.queryTime);
				var startTime = Date.parse(warningProArr.startTime);
				if(queryTime > startTime){
					$(".kg-feedback-all-know").show();
				}else{
					$(".kg-feedback-all-know").hide();
				}
			}else{
				$(".kg-feedback-all-know").show();
			}
		}
		
		var imgPrefix = G_CONTEXT.contextPath + "hebei/ui/weathertimebar/";
		var queryTimeCache = "";
		var weatherBarExpand = function(){
			var freshFlag = false;
			if(queryTimeCache != $("#happenTimeOpr").customDateBlack("getTime")){
				freshFlag = true;
			}
			queryTimeCache = $("#happenTimeOpr").customDateBlack("getTime");
			if($(".weather-bar-expand-wrap").is(":visible") && !freshFlag){
				$(".weather-bar-expand-wrap").hide();
			}else{
				if($(".weather-bar-expand-wrap").size() > 0 && !freshFlag){
					$(".weather-bar-expand-wrap").show();
					if($(".wtbdqcontent .wtbdatecontent").is(":visible")){
						$(".area-dl-weather-body").hide();
						$(".area-dq-weather-time-content-wrap").show();
						$(".weather-bar-expand-wrap").height(751);
					}else{
						$(".area-dl-weather-body").show();
						$(".area-dq-weather-time-content-wrap").hide();
						$(".weather-bar-expand-wrap").height(247);
					}
					return
				}
				$(".weather-bar-expand-wrap").remove();
				var areaArr = [];
				var areaCodeArr = Object.keys(ZHYJ_MAIN.underlingArea).sort();
				for(var i in areaCodeArr){
					areaArr.push(ZHYJ_MAIN.underlingArea[areaCodeArr[i]]);
				}
				var $expandWrap = $("<div class='weather-bar-expand-wrap'>");
				if(!$(".kg-feedback-all-know").is(":visible")){
					$expandWrap.css("top", "33px");
				}
				rootctx.append($expandWrap);
				var $expand = $("<div class='weather-bar-expand'>");
				$expandWrap.append($expand);
				var height = 0;
				$.each(areaArr, function(i, area){
					var $areaWeatherWrap = $("<div class='weather-bar-expand-area-weather-wrap' >");
					$expand.append($areaWeatherWrap);
					var $areaCell = $("<div class='area-weather-header' >");
					$areaWeatherWrap.append($areaCell);
					$areaCell.text(area.areaName);
					$areaCell.attr("areaCode", area.areaCode);
					var $realtimeWeather = buildExpandRealtimeWeahher(area.areaCode);
					$areaWeatherWrap.append($realtimeWeather);
					var $dlWeather = buildExpandDLWeahher(area.areaCode);
					$areaWeatherWrap.append($dlWeather);
					var $dqWeather = buildExpandDQWeahher(area.areaCode);
					$areaWeatherWrap.append($dqWeather);
					height = $areaWeatherWrap.height();
				});
				$expand.width(100 * areaArr.length);
//				$expandWrap.height(height + 2);
				$(".weather-bar-expand-wrap").show();
				if($(".wtbdqcontent .wtbdatecontent").is(":visible")){
					$(".area-dl-weather-body").hide();
					$(".area-dq-weather-time-content-wrap").show();
					$(".weather-bar-expand-wrap").height(751);
				}else{
					$(".area-dl-weather-body").show();
					$(".area-dq-weather-time-content-wrap").hide();
					$(".weather-bar-expand-wrap").height(247);
				}
			}
		}
		
		$.weatherBarExpand = weatherBarExpand;
		
		var buildExpandRealtimeWeahher = function(areaCode){
			var autoImg = wbtoption.autoImg;
			var $realtimeWeather = $("<div class='area-realtime-weather-wrap area-weather-cell' >");
			var realtime = ZHYJ_MAIN.underlingArea[areaCode].weather.realtime;
			var count = 0;
			for(var key in realtime){
				count++;
				var $iconWrap = $("<div class='area-weather-icon'>");
				var imgSrc = wbtoption.weather[key].imgUrl;
				var maxLevel = realtime[key].maxLevel;
				if(imgSrc=="auto"){
					var imgPrefix = G_CONTEXT.contextPath + "hebei/resources/business/zhyj/img/images/";
					var eachTypeLevels = autoImg[key];
					imgSrc = eachTypeLevels[maxLevel];
				}else{
					var imgPrefix = G_CONTEXT.contextPath + "hebei/ui/weathertimebar/";
				}
				
				var $img = $("<img>").attr("src", imgPrefix +imgSrc ).attr("title", wbtoption.weather[key].title);
				if(key == "S_STORM" || key == "S_TITAN"){
					$img.css({
						width : "30px !important",
						height : "auto"
					});
					$iconWrap.css("width", "36px");
				}
				$iconWrap.html($img);
				if(key == "S_TITAN"){
					$img.addClass("area-weather-icon-titan");
				}else if(key == "S_HAIL"){
					$img.addClass("area-weather-icon-hail");
				}
				$realtimeWeather.append($iconWrap);
			}
			if(count > 4){
				$realtimeWeather.unbind("click").bind("click", function(){
					$(".area-weather-wrap-xf").remove();
					var $clone = $(this).clone();
					$clone.addClass("area-weather-wrap-xf");
					var barOffset = $(".weather-bar-expand-wrap").offset();
					var thisOffset = $(this).offset();
					
					$(".weather-bar-expand-wrap").append($clone);
					$clone.css({"width" : "auto"});
					var cloneWidth = $clone.find(".area-weather-icon").size() * 25;
					$clone.width(cloneWidth);
					$clone.offset({top : thisOffset.top + 28, left : thisOffset.left});
					$clone.unbind("click").bind("click", function(){
						$clone.remove();
					});
				});
			}
			return $realtimeWeather;
		}
		
		var buildExpandDLWeahher = function(areaCode){
			var $dlWeatherWrap = $("<div class='area-dl-weather-wrap' >");
			var $dlWeatherHeader = $("<div class='area-dl-weather-header area-weather-cell area-weather-header-cell' >");
			$dlWeatherWrap.append($dlWeatherHeader);
			var $dlWeatherBody = $("<div class='area-dl-weather-body' >");
			$dlWeatherWrap.append($dlWeatherBody);
			var allWeather = {};
			$.each(dldata, function(i, data){
				var $dlWeather = $("<div class='area-dl-weather-content area-weather-cell' >");
				var timeStr = data.timeStr;
				var forecast = ZHYJ_MAIN.underlingArea[areaCode].weather.forecast;
				if(forecast[timeStr]){
					for(var key in forecast[timeStr]){
						var $iconWrap = $("<div class='area-weather-icon'>");
						var $img = $("<img>").attr("src", imgPrefix + wbtoption.weather[key].imgUrl).attr("title", wbtoption.weather[key].title);
						$iconWrap.html($img);
						$dlWeather.append($iconWrap);
						allWeather[key] = true;
					}
				}
				$dlWeatherBody.append($dlWeather);
			});
			for(var key in allWeather){
				var $iconWrap = $("<div class='area-weather-icon'>");
				var $img = $("<img>").attr("src", imgPrefix + wbtoption.weather[key].imgUrl);
				$iconWrap.html($img);
				$dlWeatherHeader.append($iconWrap);
			}
			return $dlWeatherWrap;
		}
		
		var buildExpandDQWeahher = function(areaCode){
			var $dqWeatherWrap = $("<div class='area-dq-weather-wrap' >");
			var $dqWeatherHeader = $("<div class='area-dq-weather-header area-weather-cell area-weather-header-cell' >");
			$dqWeatherWrap.append($dqWeatherHeader);
			var $dqWeatherBody = $("<div class='area-dq-weather-body' >");
			$dqWeatherWrap.append($dqWeatherBody);
			var allWeather = {};
			$.each(dqdata, function(i, dateData){
				var $dqWeatherDateWrap = $("<div class='area-dq-weather-date-wrap' >");
				$dqWeatherBody.append($dqWeatherDateWrap);
				var $dqWeatherDateContent = $("<div class='area-dq-weather-date-content area-weather-cell' >");
				$dqWeatherDateWrap.append($dqWeatherDateContent);
				var $dqWeatherTimeContentWrap = $("<div class='area-dq-weather-time-content-wrap' >");
				$dqWeatherDateWrap.append($dqWeatherTimeContentWrap);
				var dateWeather = {};
				$.each(dateData.data, function(i, timeData){
					var $dqWeatherTimeContent = $("<div class='area-dq-weather-time-content area-weather-cell' >");
					var timeStr = timeData.timeStr;
					var forecast = ZHYJ_MAIN.underlingArea[areaCode].weather.forecast;
					if(forecast[timeStr]){
						for(var key in forecast[timeStr]){
							var $iconWrap = $("<div class='area-weather-icon'>");
							var $img = $("<img>").attr("src", imgPrefix + wbtoption.weather[key].imgUrl).attr("title", wbtoption.weather[key].title);
							$iconWrap.html($img);
							$dqWeatherTimeContent.append($iconWrap);
							dateWeather[key] = true;
						}
					}
					$dqWeatherTimeContentWrap.append($dqWeatherTimeContent);
				});
				allWeather = $.extend(allWeather, dateWeather);
				for(var key in dateWeather){
					var $iconWrap = $("<div class='area-weather-icon'>");
					var $img = $("<img>").attr("src", imgPrefix + wbtoption.weather[key].imgUrl);
					$iconWrap.html($img);
					$dqWeatherDateContent.append($iconWrap);
				}
			});
			for(var key in allWeather){
				var $iconWrap = $("<div class='area-weather-icon'>");
				var $img = $("<img>").attr("src", imgPrefix + wbtoption.weather[key].imgUrl);
				$iconWrap.html($img);
				$dqWeatherHeader.append($iconWrap);
			}
			return $dqWeatherWrap;
		}
		
		//内部元素初始化与刷新函数
		var eleReInit = function(){
			//初始化一次函数
			var eleInitOnce = function(element){
				element.html(template);
				element.find('.dltitle').unbind("click").bind("click", function(){
					showview = 'dl';
					toggleview(element, showview);
				});
				element.find('.dqtitle .wtbfonttitle').unbind("click").bind("click", function(){
					showview = 'dq';
					toggleview(element, showview);
				});
				element.find(".wtbtop-icon").unbind("click").bind("click", function(){
					if($(this).hasClass("wtbtop-icon-off")){
						$(this).removeClass("wtbtop-icon-off").addClass("wtbtop-icon-on");
					}else{
						$(this).removeClass("wtbtop-icon-on").addClass("wtbtop-icon-off");
					}
					if(codeId.length == 6){
						return;
					}
					weatherBarExpand();
				});
				element.find(".wtbtop-icon-close").unbind("click").bind("click", function(){
					$(".warn-timeline-btn").show();
					$(".weathertimebar").hide();
				});
				element.find(".kg-feedback-all-know").unbind("click").bind("click", function(){
					if(ZHYJ_MAIN.warningProArr && ZHYJ_MAIN.warningProArr.proArr.length > 0){
						$(this).hide();
						$(".wtbicon-wrap-warning").removeClass("wtbicon-wrap-warning");
						localStorage.setItem("warningProArr", JSON.stringify(ZHYJ_MAIN.warningProArr));
						localStorage.setItem("zhyjWarningTime", Date.parse(ZHYJ_MAIN.queryTime) + "");
						$(".weather-bar-expand-wrap").css("top", "33px");
						var audio = document.getElementById("zhyjWarningVoice");
						if(audio){
							audio.pause();
							audio.src = "";
						}
						$.ajax({
							type : "POST",
							data : {userId : userId, areaCode : codeId, operType : "4"},
							url : G_CONTEXT.contextPath + "warnmake/save_opeation_log.do",
							success : function(result){
								
							}
						});
					}
				});
				element.undelegate(".wtbtext, .skdata .wtbfonttitle", "click").delegate(".wtbtext, .skdata .wtbfonttitle", "click", function(){
					var $this = $(this);
					if($this.hasClass("wtbdate")){
						return;
					}
					if($this.parent().hasClass("skdata")){
						if($this.attr("act")){
							$this.removeAttr("act");
							$(document).unbind("keydown");
							$this.removeClass("wtbtext-selected");
							highLightWarningData_multi($this.prevAll(".wtbweather").find(".wtbicon-activitied"));
							return;
						}
					}
					if($this.attr("act") && $this.hasClass("wtbtext-selected")){
						$this.removeAttr("act");
						$(document).unbind("keydown");
						$this.removeClass("wtbtext-selected");
						highLightWarningData_multi($this.prevAll(".wtbweather").find(".wtbicon-activitied"));
						return;
					}
					$this.attr("act", "act");
					highLightWarningData_multi($this.prevAll(".wtbweather").find(".wtbicon-wrap").not(".wtbicon-activitied"));
					if($this.hasClass("wtbtext")){
						highLightWarningData_multi($(".wtbtext-selected").removeAttr("act").prevAll(".wtbweather").find(".wtbicon-activitied"));
						$(".wtbtext-selected").removeClass("wtbtext-selected");
						$this.addClass("wtbtext-selected");
						$(document).unbind("keydown").bind("keydown", function(event){
							var keyCode = event.keyCode;
							if(keyCode == 38){//向上
								highLightWarningData_multi($this.prevAll(".wtbweather").find(".wtbicon-activitied"));
								$this.removeAttr("act");
								if($this.parents(".wtbdlcontent").is(":visible")){
									if($this.parent().prev().is(":visible")){
										$this.parent().prev().find(".wtbtext").trigger("click");
									}else{
										$this.parents(".wtbdlcontent").find(".wtbele").last().find(".wtbtext").trigger("click");
									}
								}else{
									if($this.parent().prev().is(":visible")){
										$this.parent().prev().find(".wtbtext").trigger("click");
									}else{
										var $prevAll = $this.parents(".wtbdatecontent").prevAll(".wtbdatecontent");
										if($prevAll.is(":visible")){
											$prevAll.first().find(".wtbele").last().find(".wtbtext").trigger("click");
										}else{
											$(".wtbdatecontent").last().find(".wtbele").last().find(".wtbtext").trigger("click");
										}
									}
								}
							}else if(keyCode == 40){//向下
								highLightWarningData_multi($this.prevAll(".wtbweather").find(".wtbicon-activitied"));
								$this.removeAttr("act");
								if($this.parents(".wtbdlcontent").is(":visible")){
									if($this.parent().next().is(":visible")){
										$this.parent().next().find(".wtbtext").trigger("click");
									}else{
										$this.parents(".wtbdlcontent").find(".wtbele").first().find(".wtbtext").trigger("click");
									}
								}else{
									if($this.parent().next().is(":visible")){
										$this.parent().next().find(".wtbtext").trigger("click");
									}else{
										var $nextAll = $this.parents(".wtbdatecontent").nextAll(".wtbdatecontent");
										if($nextAll.is(":visible")){
											$nextAll.first().find(".wtbele").first().find(".wtbtext").trigger("click");
										}else{
											$(".wtbdatecontent").first().find(".wtbele").first().find(".wtbtext").trigger("click");
										}
									}
								}
							}
						});
					}
				});
			}
			
			function highLightWarningData_multi($elem){
				var JsonDataArr = [];
				$elem.each(function(){
					var $this = $(this);
					var detail = $(this).data("detail");
					var dataParams = {
						warnProId : detail.warnProId,
						WarningTime : detail.WarningTime
					};
					if(detail.warnProId.startsWith("K")){
						dataParams.warnType = "2";
						dataParams.proType = "1";
//						dataParams.id = detail.id;
					}
					
					if(dataParams.warnProId == "S_RADA"){			//回波
						if($(".weather-element-legend-content-wrap>div[item='S_RADA']").hasClass("weather-element-legend-activited")){
							if($($elem.context).attr("act") && ($($elem.context).attr("act")=="act")){
								timeEvent = null;
								timeEvent = setInterval(function(){
									if(radaIndex==0){
										radaIndex=1
										GIS.GridEdit.showControll("nGis","isoline",false);
									}else{
										radaIndex=0;
										GIS.GridEdit.showControll("nGis","isoline",true);
									}
								},600);
							}else{
								clearInterval(timeEvent);
								if(radaIndex == 1){
									radaIndex = 0;
									GIS.GridEdit.showControll("nGis","isoline",true);
									timeEvent = null;
								}
							}
						}
					}else{
						JsonDataArr.push(dataParams);
					}
					
				});
				
				GIS.Warning.highLightWarningData_multi("nGis", JsonDataArr, function(isOk){
					if(isOk){
						$elem.addClass("wtbicon-activitied");
					}else{
						$elem.removeClass("wtbicon-activitied");
					}
				});
			}
			
			jQuery.each(rootctx , function(index , value){
				var thisEle = jQuery(this);
//				thisEle.data("dldata", dldata);
//				thisEle.data("dqdata", dqdata);
				if(thisEle.attr('initOnce') != 'true'){
					eleInitOnce(thisEle);
					thisEle.attr('initOnce' , 'true');
				}
				
				//实况数据
				thisEle.find('.wtbskcontent .wtbtext').text(baseDate.format("hh:mm"));
				var hasweather = addweatherimg(thisEle.find('.wtbskcontent').children('.wtbweather'), skdata.weather);
				if(hasweather == true){
//					thisEle.find('.skdata').children('.wtbfonttitle').addClass('wtbfonttactive');
					thisEle.find('.wtbskcontent').children('.wtbtext').addClass('wtbtextactive');
				}else{
//					thisEle.find('.skdata').children('.wtbfonttitle').removeClass('wtbfonttactive');
					thisEle.find('.wtbskcontent').children('.wtbtext').removeClass('wtbtextactive');
				}
				//短临数据
				thisEle.find('.wtbdlcontent').html('');
				for(var i = 0; i < dldata.length; i++){
//					adddltime(thisEle.find('.wtbdlcontent'), dldata[i].time);
					addtimedata(thisEle.find('.wtbdlcontent'), dldata[i]);
				}
				//短期数据
				thisEle.find('.wtbdqcontent').html('');
				for(var i = 0;i < dqdata.length; i++){
					adddltime(thisEle.find('.wtbdqcontent'), dqdata[i].date, true);
					var dqtimecontent = jQuery('<div>');
					dqtimecontent.addClass('wtbdatecontent');
					for(var j = 0; j < dqdata[i].data.length; j++){
						addtimedata(dqtimecontent,dqdata[i].data[j]);
					}
					
					thisEle.find('.wtbdqcontent').append(dqtimecontent);
					if(dqtimecontent.find(".wtbicon-wrap").size() > 0){
						dqtimecontent.prev().addClass("wtbtextactive");
					}
				}
				toggleview(thisEle, showview, true);
			});
		}
		
		//切换短临数据条与短期数据条的显示
		var toggleview = function(thisEle, view, noanimate){
			var animatespeed = wbtoption.animatespeed;
			if(noanimate == true){
				animatespeed = 0;
			}
			var callonce = false;
			//显示短临或短期
			if(view == 'dl'){
//				thisEle.find('.dltitle').children('.wtbfonttitle').removeClass('wtbfonttactive');
				thisEle.find('.dltitle').children('.wtbtext').removeClass('wtbtextactive');
				thisEle.find('.wtbdlcontent').slideDown(animatespeed);
				$(".area-dl-weather-body").slideDown(animatespeed);
				$(".area-dq-weather-time-content-wrap").slideUp(animatespeed);
				$(".weather-bar-expand-wrap").animate({height: "247px"}, animatespeed);
				thisEle.find('.dlweather').html('');
				thisEle.find('.wtbdateweather').html('');
				thisEle.find('.wtbdatecontent').slideUp(animatespeed);	
				thisEle.find('.wtbdatecontent').each(function(){
					if($(this).find(".wtbicon-wrap").size() > 0){
						$(this).prev().addClass("wtbtextactive");
					}
				});
			}else if(view == 'dq'){
				thisEle.find('.wtbdateweather').html('');
				thisEle.find('.wtbdatecontent').slideDown(animatespeed).each(function(){
					$(this).prev().removeClass("wtbtextactive");
				});
				$(".area-dl-weather-body").slideUp(animatespeed);
				$(".area-dq-weather-time-content-wrap").slideDown(animatespeed);
				$(".weather-bar-expand-wrap").animate({height: "753"}, animatespeed);
				thisEle.find('.wtbdlcontent').slideUp(animatespeed);
			}
			var dqweatherArr = [];
			for(var i = 0;i < dqdata.length; i++){
				var dateweather = {};
				dateweather.weather = [];
				dateweather.time = dqdata[i].date;
				for(var j = 0; j < dqdata[i].data.length; j++){
					dateweather.weather = $.merge(dateweather.weather, dqdata[i].data[j].weather);
				}
				addweatherimg(thisEle.find('.wtbdateweather[date="' + dqdata[i].date + '"]'), dateweather.weather);
				dqweatherArr = $.merge(dqweatherArr, dateweather.weather);
			}
			var dqWStatus = addweatherimg(thisEle.find('.dqweather'), dqweatherArr);
			if(thisEle.find('.dqweather').find(".wtbicon-wrap").length == 1){
				thisEle.find('.dqweather').find(".wtbicon-wrap").css("margin-left", "0px");
			}
			if(dqWStatus){
				thisEle.find('.dqweather').show();
			}else{
				thisEle.find('.dqweather').hide();
			}
			thisEle.find('.dqweather').find(".wtbicon-wrap-warning").removeClass("wtbicon-wrap-warning");
			var dqCount = thisEle.find('.dqweather').find(".wtbicon-wrap").unbind("click").size();
			var dqWidth = thisEle.find('.dqweather').width();
			thisEle.find('.dqweather').width(dqWidth - 12 - (dqCount * 2));
			
			var dateweather = {};
			dateweather.weather = [];
			for(var i = 0; i < dldata.length; i++){
				dateweather.weather = $.merge(dateweather.weather, dldata[i].weather);
			}
			var hweather = addweatherimg(thisEle.find('.dlweather'), dateweather.weather);
			if(thisEle.find('.dlweather').find(".wtbicon-wrap").length == 1){
				thisEle.find('.dlweather').find(".wtbicon-wrap").css("margin-left", "0px");
			}
			thisEle.find('.dlweather').find(".wtbicon-wrap-warning").removeClass("wtbicon-wrap-warning");
			var dlCount = thisEle.find('.dlweather').find(".wtbicon-wrap").unbind("click").size();
			var dlWidth = thisEle.find('.dlweather').width();
			thisEle.find('.dlweather').width(dlWidth - 12 - (dlCount * 2));
			if(hweather == true){
				thisEle.find('.dltitle').children('.wtbtext').addClass('wtbtextactive');
				$(".dlweather").show();
			}else{
				$(".dlweather").hide();
			}
			if($(".wtbdlcontent .wtbicon-wrap-warning").size() > 0){
				thisEle.find('.dlweather').addClass("wtbicon-wrap-warning");
			}else{
				thisEle.find('.dlweather').removeClass("wtbicon-wrap-warning");
			}
			if($(".wtbdqcontent .wtbicon-wrap-warning").size() > 0){
				thisEle.find('.dqweather').addClass("wtbicon-wrap-warning");
			}else{
				thisEle.find('.dqweather').removeClass("wtbicon-wrap-warning");
			}
		}
		
		//添加一个天气状况提醒
		var addweatherimg = function(element, data){
			clearInterval(timeEvent);
			timeEvent = null;
			var $act = $(".wtbskcontent").find("div[act='act']");	//右侧时间轴
			if($act.length){
				$act.removeAttr("act");
				$act.removeClass("wtbtext-selected");
				
			}
			var autoImg = wbtoption.autoImg;
			var hasweather = false;
				element.html('');
			if(data.length == 0){
				return;
			}
			var imgshow ={};
			jQuery.extend(imgshow, wbtoption.weather);
			for(var i = 0; i < data.length; i++){
				var type = data[i].type;
				if(wbtoption.weather[type] != undefined){
					imgshow[type] = {};
					imgshow[type].exist = 'true';
					imgshow[type].detail = data[i].detail;
				}
			}
			var count = 0;
			var width = 0;
			jQuery.each(imgshow, function(index, value){
				if(value.exist){
					count++;
					width += wbtoption.weather[index].width < 22 ? 22 : wbtoption.weather[index].width + 6;
					hasweather = true;
					var weather = wbtoption.weather[index];
					var imgPrefix = G_CONTEXT.contextPath + "hebei/ui/weathertimebar/";
					var $iconWrap = $("<div class='wtbicon-wrap'>");
					var maxLevel = value.detail.maxLevel;
					var imgSrc = weather.imgUrl;
					
					if(imgSrc=="auto"){
						var imgPrefix = G_CONTEXT.contextPath + "hebei/resources/business/zhyj/img/images/";
						var eachTypeLevels = autoImg[index];
						imgSrc = eachTypeLevels[maxLevel];
					}
					$iconWrap.html($("<img>").attr({
						src : imgPrefix + imgSrc,
						title : weather.title
					}).width(weather.width));
//					if(index == "S_TITAN"){
//						$iconWrap.find("img").css("margin-top", "-4px");
//					}
					if(weather.width > 22){
						$iconWrap.width(weather.width + 6);
					}
					$iconWrap.attr("item", index);
					element.append($iconWrap);
					var warningProArr = localStorage.getItem("warningProArr");
					if(warningProArr){
						warningProArr = JSON.parse(warningProArr);
						var queryTime = Date.parse(ZHYJ_MAIN.queryTime);
						var startTime = Date.parse(warningProArr.startTime);
						if(queryTime > startTime){
							$iconWrap.addClass("wtbicon-wrap-warning");
						}
					}else{
						$iconWrap.addClass("wtbicon-wrap-warning");
					}
					$iconWrap.data("detail", value.detail);
					$iconWrap.unbind("click").bind("click", function(){
						var $this = $(this);
						var detail = $(this).data("detail");
						var dataParams = {
							warnProId : detail.warnProId,
							WarningTime : detail.WarningTime
						};
						if(detail.warnProId.startsWith("K")){
							dataParams.warnType = "2";
							dataParams.proType = "1";
							dataParams.id = detail.id;
						}
						if(dataParams.warnProId == "S_RADA"){				//回波
							if($(".weather-element-legend-content-wrap>div[item='S_RADA']").hasClass("weather-element-legend-activited")){
								if($this.hasClass("wtbicon-activitied")){
									$this.removeClass("wtbicon-activitied");
									clearInterval(timeEvent);
									if(radaIndex == 1){
										radaIndex = 0;
										GIS.GridEdit.showControll("nGis","isoline",true);
										timeEvent = null;
									}
								}else{
									$this.addClass("wtbicon-activitied");
									timeEvent = null;
									timeEvent = setInterval(function(){
										if(radaIndex==0){
											radaIndex=1
											GIS.GridEdit.showControll("nGis","isoline",false);
										}else{
											radaIndex=0;
											GIS.GridEdit.showControll("nGis","isoline",true);
										}
									},600);
								}
							}
						}else{
							GIS.Warning.highLightWarningData_common("nGis", dataParams, function(flag){
								if(flag){
									$this.addClass("wtbicon-activitied");
//								if(!$this.parents(".skdata").is(":visible")){
//									if($this.parent().find(".wtbicon-activitied").length == $this.parent().find(".wtbicon-wrap").length){
//										var $timeText = $this.parent().next();
//										if(!$timeText.hasClass("wtbtext-selected")){
//											$timeText.trigger("click");
//										}
//									}
//								}
								}else{
									$this.removeClass("wtbicon-activitied");
									if(!$this.parents(".skdata").is(":visible")){
										if(!$this.parent().find(".wtbicon-activitied").is(":visible")){
											var $timeText = $this.parent().next();
											if($timeText.hasClass("wtbtext-selected")){
												$timeText.removeClass("wtbtext-selected").removeAttr("act");
												$(document).unbind("keydown");
											}
										}
									}
								}
							});
						}
						
						
					});
				}
			});
			element.width(width + (count * 12)).show();
			return hasweather;
		}
		
		var addtimedata = function(element, data, customclass){
			var tmptpl = datatemplate.clone();
			tmptpl.find('.wtbtext').html(data.time);
			var hweather = addweatherimg(tmptpl.children('.wtbweather'), data.weather);
			if(data.weather && data.weather.length > 0){
				if(hweather == true){
					tmptpl.find('.wtbtext').addClass('wtbtextactive');
				}
			}
			if(customclass != undefined){
				tmptpl.find('wtbfonttitle').addClass(customclass);
				tmptpl.find('.wtbtext').addClass(customclass);
			}
			element.append(tmptpl);
		}
		
		//添加一个空的短临数据
		var adddltime = function(element,time,isdate){
			var tmptpl = datatemplate.clone();
//			tmptpl.find('.wtbfonttitle').removeClass('wtbfonttactive');
			tmptpl.find('.wtbtext').removeClass('wtbtextactive');
			tmptpl.find('.wtbtext').html(time);
			tmptpl.children('.wtbweather').html('');
			if(isdate == true){
				tmptpl.children('.wtbweather').attr('date',time);
				tmptpl.children('.wtbweather').addClass('wtbdateweather');
//				tmptpl.find('.wtbfonttitle').addClass('wtbfonttactive');
				tmptpl.find('.wtbtext').addClass('wtbdate');
			}
			element.append(tmptpl);
		}
		
		//解析时间为int
		var parsetime = function (time){
			var returndata = 0;
			var timearr = time.split(':');
			if(timearr.length == 2){
				timearr[0] = Number(timearr[0]);
				timearr[1] = Number(timearr[1]);
				if(timearr[0] >= 0 && timearr[1] >= 0){
					returndata = timearr[0] * 60 + timearr[1];
				}
			}
			return returndata;
		}
		
		//int时间格式化为字符串格式
		var formattime = function (time){
			var hour = Math.round((time - time % 60) / 60);
			var minute = Math.round(time % 60);
			if(hour >= 24){
				hour -= 24;
			}
			if(hour < 10){
				hour = '0' + hour;
			}
			if(minute < 10){
				minute = '0' + minute;
			}
			return hour + ':' + minute
		}
		Date.prototype.format = function (fmt) { //author: meizz 
			
		    var o = {
		        "M+": this.getMonth() + 1, //月份 
		        "d+": this.getDate(), //日 
		        "h+": this.getHours(), //小时 
		        "m+": this.getMinutes(), //分 
		        "s+": this.getSeconds(), //秒 
		        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
		        "S": this.getMilliseconds() //毫秒 
		    };
		    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		    for (var k in o)
		    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		    
		    return fmt;
		}
		//初始化组件
		reInit();		
		return this;
	}
});