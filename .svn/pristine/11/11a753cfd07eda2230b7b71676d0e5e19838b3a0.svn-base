var WARN_STATUS_INFO = {
	areaData : [],			//传给Gis数据，显示地图
	provinceData : {},		//省
	cityData : {},			//所有城市
	countryData : {},		//所有县
	codeForName : {},		//code 对应 名称
	statusLightObj : {
		"0" : G_CONTEXT.contextPath + "hebei/resources/business/zhyj/img/zgstatus/warn_status_on.png",
		"1" : G_CONTEXT.contextPath + "hebei/resources/business/zhyj/img/zgstatus/warn_status_off.png",
		"STATUS_DOWN" : G_CONTEXT.contextPath + "hebei/resources/business/zhyj/img/zgstatus/warn_status_down.png"
	},
	init : function() {
		this.fillName();
		this.getWarnStatusInfo();
		this.bindEvent();
	},
	fillName : function(){
		var that = this;
		this.provinceData = zhyj_areaSelect.cityData.province;
		this.cityData = zhyj_areaSelect.cityData.city;
		this.countryData = zhyj_areaSelect.cityData.country;
		var codeObj = $.extend("",this.provinceData,this.cityData,this.countryData);
		$.each(codeObj,function(i){
			that.codeForName[i]=codeObj[i].areaName;
		});		
		if(codeId.length == 2){
			var data = this.cityData;
			$(".guide_status_operate").show();
		}else if(codeId.length == 4){
			var data = this.countryData;
			$(".guide_status_operate").hide();
			$(".guide_status_opr_next_wrap .guide_status_opr_next").addClass("no_right_info_operate");
		}else if(codeId.length == 6){
			$("#guideStatus_tail").hide();
			return;
		}
		var dataInfo = [];
		$.each(data,function(i){
			dataInfo.push(data[i]);
		})
		this.initNames(dataInfo);
	},
	initNames: function(dataInfo) {
		var that = this;
		var countrys = [];
		var $statusList = $(".guide-status-list").empty();
		if(dataInfo.length > 15){
			var maxCounts = Math.ceil(dataInfo.length / 15);
			var emptyCounts = maxCounts * 15 - dataInfo.length;
			for(var i = 0; i < emptyCounts; i++){
				dataInfo.push({areaCode: "", areaName: ""});
			}
		}
		$statusList.width(dataInfo.length * 60);
		$(".guide-status-list-wrap").width(dataInfo.length * 60);
		
		$.each(dataInfo, function(i, area){
			var $statusOpe = $("<div class='guide_status_opr'></div>");
				$statusOpe.attr("areaCode", area.areaCode);
				$statusList.append($statusOpe);
			
			var $forecastList = $("<div class='guide_status_forecast_list'></div>");
				$statusOpe.append($forecastList);
				$statusOpe.append($("<div class='guide_status_opr_content'>").text(area.areaName));
			var $guidetList = $("<div class='guide_status_guide_list' style='display:none'></div>");
				$statusOpe.append($guidetList);
				if(codeId.length==2){			//省级用户
					countrys.push(dataInfo[i].subordinatesDistrict);
				}
		});
		if(codeId.length==2){				//省级用户
			that.fillTableInfo(countrys);
		}
		
		if(dataInfo.length > 15){
			$(".guide-status-list-wrap").width(900);
			this.nextEvent();
		}
	},
	getWarnStatusInfo : function(){
		var that = this;
		WARN_STATUS_INFO.areaData = [];
		$.ajax({
			type : 'POST',
			url : G_CONTEXT.contextPath + "warn/getWarnStatusInfo.do",
			data : {areaCode : codeId, endTime : $("#happenTimeOpr").customDateBlack("getTime") + ":00"},
			async : false,
			success : function(res){
				var result = res.objectData.resultObject;
				for(var key in result){
					result[key].areaCode = key;
					WARN_STATUS_INFO.areaData.push(result[key]);
				}
				that.showStatuInMap();
			//	that.fillStatus();
				that.fillStatusNew();
			}
		})
	},
	fillTableInfo : function(countrys){
		var maxLength = 0;
		var maxCityCode = "" ;
		for(var a=0;a<countrys.length;a++){
			if(countrys[a].length>maxLength){
				maxLength = countrys[a].length;
				maxCityCode = countrys[a][0].pareaCode;
			}
		}
		var $table = $(".guide_status_list_table").empty();
		for(var i=0;i<countrys.length;i++){
			var eachLength = countrys[i].length;
			var eachCountrys = countrys[i];
			var $eachCitydiv = $("<div class='eachCityDiv' item='"+eachCountrys[0].pareaCode+"' >");
			if(maxLength>eachLength){							//maxLength 要么大于  要么等于
				for(var x=0;x<maxLength;x++){
					if(x>=eachLength){
						var $eachCountryLightDiv = $("<div class='eachCountryLightDiv'>");
						var $eachCountryDiv = $("<div class='eachCountryDiv'>");
					}else{
						var $eachCountryLightDiv = $("<div class='eachCountryLightDiv' item='"+eachCountrys[x].areaCode+"'>");
						var $eachCountryDiv = $("<div class='eachCountryDiv' item='"+eachCountrys[x].areaCode+"'>").text(eachCountrys[x].areaName);
					}
						$eachCitydiv.append($eachCountryLightDiv).append($eachCountryDiv);
				}
			}else{
				for(var y=0;y<eachLength;y++){
					var $eachCountryLightDiv = $("<div class='eachCountryLightDiv' item='"+eachCountrys[y].areaCode+"'>");
					//	var $eachCountryDiv = $("<div class='eachCountryDiv' item='"+eachCountrys[y].areaCode+"'>").text(that.codeForName[eachCountrys[y].areaCode]);
					var $eachCountryDiv = $("<div class='eachCountryDiv' item='"+eachCountrys[y].areaCode+"'>").text(eachCountrys[y].areaName);
						$eachCitydiv.append($eachCountryLightDiv).append($eachCountryDiv);
				}
			}
			$table.append($eachCitydiv);
		}
		var height = $(".guide_status_list_table .eachCityDiv[item='"+maxCityCode+"'] ").css("height");
		//改变样式
		if(maxLength>15){
			$(".guide_status_list_table").css({"height":"677px"});
			$(".guide_status_list_table .eachCityDiv:last").css({"width":"74px"});
		}
	},
	fillStatusNew : function(){							//省级用户登入
		var that = this;
		var jsonData = that.areaData;
		if(codeId.length==2){
			$(".guide-status-list .guide_status_forecast_list").empty();
			$(".guide_status_list_table .eachCountryLightDiv").empty();
			for(var i=0;i<jsonData.length;i++){
				var eachCode = jsonData[i].areaCode;
				var state = jsonData[i].state;
				if(eachCode.length == 4){
					var $city = $(".guide-status-list>div[areacode='"+eachCode+"']").find(".guide_status_forecast_list");
					var $statusLight = $("<img class='guide_status_forecast_light' />");
					$statusLight.attr("status", state).attr("src", that.statusLightObj[state]);
					$city.append($statusLight);
				}else if(eachCode.length == 6){
					$(".eachCountryLightDiv").each(function(){
						if($(this).attr("item") == eachCode ){
							var $statusLight = $("<img class='guide_status_forecast_light' />");
							$statusLight.attr("status", state).attr("src", that.statusLightObj[state]);
							$(this).append($statusLight);
						}
					})
				}
			}
		}else if(codeId.length==4){					  //市级用户登入
			$(".guide-status-list .guide_status_forecast_list").empty();
			for(var i=0;i<jsonData.length;i++){
				var eachCode = jsonData[i].areaCode;
				var state = jsonData[i].state;
				if(eachCode.length == 6){
					var $city = $(".guide-status-list>div[areacode='"+eachCode+"']").find(".guide_status_forecast_list");
					var $statusLight = $("<img class='guide_status_forecast_light' />");
					$statusLight.attr("status", state).attr("src", that.statusLightObj[state]);
					$city.append($statusLight);
				}
			}
		}
	},
	fillStatus : function(){
		//数据
		var that = this;
		var jsonData = that.areaData;
		var $table = $(".guide_status_list_table");
		var maxSize = 0;							//存放某个City中涉及到的县最多（多少个）  为了 创建多少行
		var cityData = $.extend("",that.cityData);
		$.each(cityData,function(i){
			var datas = [];
			for(var a=0;a<jsonData.length;a++){
				var eachAreaCode = jsonData[a].areaCode;
				if(i==eachAreaCode){
					if(jsonData[a].numAll>maxSize){
						maxSize = jsonData[a].numAll+1;
					}
				}
				if(eachAreaCode.startsWith(i)){
					datas.push(jsonData[a]);
				}
			}
			cityData[i] = datas;
		});
		$(".guide_status_list_table").empty();
		//创建
		$.each(cityData,function(i){
			var $eachCitydiv = $("<div class='eachCityDiv' item='"+i+"'>");
			var eachCityData = cityData[i];
			if(eachCityData.length == 0){		//不是 0的 时候减去一次循环
				var size = maxSize - 1;
			}else{
				var size = maxSize;
			}
			for(var c=0;c<size;c++){
				if(eachCityData[c]){
					if(i==eachCityData[c].areaCode){
						var $city = $(".guide-status-list>div[areacode='"+i+"']").find(".guide_status_forecast_list").empty();
						var $statusLight = $("<img class='guide_status_forecast_light' />");
							$statusLight.attr("status", eachCityData[c].state).attr("src", that.statusLightObj[eachCityData[c].state]);
							$city.append($statusLight);
					}else{
						var $eachCountryLightDiv = $("<div class='eachCountryLightDiv' item='"+eachCityData[c].areaCode+"'>");
						var $statusLight = $("<img class='guide_status_forecast_light' />");
							$statusLight.attr("status", eachCityData[c].state).attr("src", that.statusLightObj[eachCityData[c].state]);
							$eachCountryLightDiv.append($statusLight);
						var $eachCountryDiv = $("<div class='eachCountryDiv' item='"+eachCityData[c].areaCode+"'>").text(that.codeForName[eachCityData[c].areaCode]);
						$eachCitydiv.append($eachCountryLightDiv).append($eachCountryDiv);
					}
				}else{
					var $eachCountryLightDiv = $("<div class='eachCountryLightDiv' item=''>");
					var $eachCountryDiv = $("<div class='eachCountryDiv' item=''>").text("");
					$eachCitydiv.append($eachCountryLightDiv).append($eachCountryDiv);
				}
			}
			$table.append($eachCitydiv);
		});
		//改变样式
		if(maxSize>15){
			$(".guide_status_list_table").css({"height":"677px"});
			$(".guide_status_list_table .eachCityDiv:last").css({"width":"74px"});
		}
	},
	showStatuInMap : function(){
		var that = this;
		//jsonData=[{"areaCode":"1303","state":1,"numAll":5,"num0":5},{"areaCode":"130301","state":0},{"areaCode":"130321","state":0},{"areaCode":"130322","state":0},{"areaCode":"130323","state":0},{"areaCode":"130324","state":0}];
		var jsonData = that.areaData;
		GIS.Warning.addFeedbackState("nGis",codeId,jsonData,function(data){
			var dataParam = {
				"paramArr": data.ids,
				"status":"1"
			}
			that.feedback(dataParam);
		});
	},
	feedback:function(dataParam){
		var that = this;
		$.ajax({
			type:"post",
			url:G_CONTEXT.contextPath+"warn/modifyWarnInfo.do",
			dataType:"json",
			data:{'dataParam':JSON.stringify(dataParam)},
			async:false,
			beforeSend : function(){
			},
			complete : function(){
			},
			success:function(data){
				artDialog.alertTips("反馈成功！");
				that.getWarnStatusInfo();
			},
			error : function(){
			}
		});
	},
	bindEvent : function() {
		$(".guide_status_operate").unbind("click").bind("click",function(){
			var iflag = $(this).attr("iflag");
			if("0"==iflag){
				$(this).attr("iflag","1");
				$(this).addClass("showInfoForFeedback");
				$(".guide_status_list_table").show();
			}else if("1"==iflag){
				$(this).attr("iflag","0");
				$(".guide_status_list_table").hide();
				$(this).removeClass("showInfoForFeedback");
			}
		});
	},
	prevEvent : function(){
		var that = this;
		var wrapWidth = $(".guide-status-list-wrap").width();
		$(".guide_status_opr_prev").addClass("fa fa-angle-left guide_status_opera_act").css("cursor", "pointer").unbind("click").bind("click", function(){
			var left = $(".guide-status-list").position().left;
			if(left == 0){
				$(".guide_status_opr_prev").removeClass("fa fa-angle-left guide_status_opera_act").css("cursor", "default").unbind("click");
				return;
			}else if(left < 0){
				$(".guide_status_opr_prev").unbind("click");
				left += wrapWidth;
				$(".guide-status-list").animate({left : left + "px"}, function(){
					if($(".guide-status-list").position().left == 0){
						$(".guide_status_opr_prev").removeClass("fa fa-angle-left guide_status_opera_act").css("cursor", "default").unbind("click");
					}
					that.prevEvent();
				});
				that.nextEvent();
			}
		});
	},
	nextEvent : function(){
		var that = this;
		var wrapWidth = $(".guide-status-list-wrap").width();
		var wholeWidth = WARN_STATUS_INFO.areaData.length * 70;
		var count = wholeWidth / wrapWidth;
		if(wholeWidth % wrapWidth == 0){
			count--;
		}
		var maxLeft = count * wrapWidth;
		$(".guide_status_opr_next").addClass("fa fa-angle-right guide_status_opera_act").css("cursor", "pointer").unbind("click").bind("click", function(){
			var left = $(".guide-status-list").position().left;
			that.prevEvent();
			$(".guide_status_opr_next").unbind("click");
			if(left >= 0){
				left -= wrapWidth;
				$(".guide-status-list").animate({left : left + "px"}, function(){
					if($(".guide-status-list").position().left == -maxLeft){
						$(".guide_status_opr_next").removeClass("fa fa-angle-right guide_status_opera_act").css("cursor", "default").unbind("click");
					}
					that.nextEvent();
				});
			}else if(left > -maxLeft){
				left -= wrapWidth;
				$(".guide-status-list").animate({left : left + "px"}, function(){
					if($(".guide-status-list").position().left == -maxLeft){
						$(".guide_status_opr_next").removeClass("fa fa-angle-right guide_status_opera_act").css("cursor", "default").unbind("click");
					}
					that.nextEvent();
				});
			}else{
				$(".guide_status_opr_next").removeClass("fa fa-angle-right guide_status_opera_act").css("cursor", "default").unbind("click")
				return;
			}
		});
	},
	
	
	
	
	
	
//	feedBackEvent : function(areaCode){
//		var that = this;
//		if(codeId.length == 2){
//			return;
//		}
//		var statusLightObj = {
//			"STATUS_ON" : G_CONTEXT.contextPath + "hebei/resources/business/zhyj/img/zgstatus/warn_status_on.png",
//			"STATUS_OFF" : G_CONTEXT.contextPath + "hebei/resources/business/zhyj/img/zgstatus/warn_status_off.png",
//			"STATUS_DOWN" : G_CONTEXT.contextPath + "hebei/resources/business/zhyj/img/zgstatus/warn_status_down.png",
//		};
//		$(".guide_status_opr[areacode='" + areaCode + "'] .guide_status_forecast_light[status='0']").css("cursor", "pointer").unbind("click").bind("click", function(){
//			var $this = $(this);
//			var paramArr = [];
//			var superiorList = $this.data("superiorList");
//			if(!superiorList){
//				return;
//			}
//			for(var i in superiorList){
//				var superior = superiorList[i];
//				var warnId = Object.keys(superior)[0];
//				if(superior[warnId] == "0"){
//					paramArr.push(warnId);
//				}
//			}
//			var pObj = {};
//			pObj.status = "1";
//			pObj.paramArr = paramArr;
//			var dataParam = JSON.stringify(pObj);
//			that.dealWarnInfo(dataParam, function(){
//				$this.attr("src", statusLightObj["STATUS_OFF"]).attr("status", 1).css("cursor", "default").unbind("click");
//				if($(".guide_status_forecast_light[status='0']").size() == 0){
//					$(".guide_status_opr").first().find(".guide_status_forecast_light").attr("src", statusLightObj["STATUS_OFF"]);
//				}
//			});
//		});
//	},
//	getAreaData : function(){
//		var areaCode = codeId.substring(0, 2);
//		$.ajax({
//			type : 'POST',
//			url : G_CONTEXT.contextPath + "warn/getDistrictList.do",
//			data : {areaCode : areaCode},
//			async : false,
//			success : function(res){
////				codeId = "130101";
//				var result = res.objectData;
//				if(codeId.length == 2 || codeId.length == 4){
//					$(".guide_status_title_up").text("省级指导");
//					$(".guide_status_title_down").text("市级预报");
//					var province = result.province[areaCode];
//					var subordinatesDistrict = province.subordinatesDistrict;
//					province.subordinatesDistrict = null;
//					WARN_STATUS_INFO.areaData.push(province);
//					for(var code in result.city){
//						WARN_STATUS_INFO.areaData.push(result.city[code]);
//					}
//				}else if(codeId.length == 6){
//					$(".guide_status_title_up").text("市级指导");
//					$(".guide_status_title_down").text("县级预报");
//					var cityCode = codeId.substring(0, 4);
//					WARN_STATUS_INFO.areaData.push(result.city[cityCode]);
//					for(var code in result.country){
//						if(code.indexOf(cityCode) > -1){
//							WARN_STATUS_INFO.areaData.push(result.country[code]);
//						}
//					}
//				}
//			}
//		});
//	},
//	dealWarnInfo : function(dataParam, callback){
//		var that = this;
//		var modifyWarnStatusUrl = G_CONTEXT.contextPath+"warn/modifyWarnInfo.do";
//		$.ajax({
//			type:"post",
//			url:modifyWarnStatusUrl,
//			dataType:"json",
//			data:{'dataParam':dataParam},
//			beforeSend : function(){
//				$(".guide_status_opr_prev").removeClass("fa fa-angle-left guide_status_opera_act").css("cursor", "default").unbind("click");
//			},
//			complete : function(){
//				that.feedBackEvent(codeId);
//				if(codeId.length == 4){
//					that.feedBackEvent(codeId.substring(0, 2));
//				}
//			},
//			success:function(data){
//				if(data == true){
//					if($.isFunction(callback)){
//						callback();
//					}
//				}
//			},
//			error : function(){
//
//			}
//		});
//	}
	
}