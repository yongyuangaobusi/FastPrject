var zhyj_areaSelect = {
	areaData : [],
	selectArea : "",
	newline : "4",// 设定每行显示几组
	cityData : [],
	init : function() {
		if(codeId == "13"){
			$(".area-select-content").text("河北省").attr({code : "13", title : "河北省"});;
		}
		this.selectArea = codeId;
		this.queryData();
		this.bindEvent();
	},
	queryData : function() {
		var that = this;
		$.ajax({
			type:'post',
			url: G_CONTEXT.contextPath + "warn/getDistrictList.do",
			dataType:'json',
			data:{'areaCode':"13"},
			async : false,
			success:function(data){
				if(data){
					that.cityData = data.objectData;
					that.areaData = new Array();
					var flag = false;
					$.each(data.objectData.province[13].subordinatesDistrict,function(i,cityData){
						if(!flag){
							if(codeId.length < 6){
								if(cityData.areaCode == codeId){
									$(".area-select-content").text(cityData.areaName).attr({code : cityData.areaCode, title : cityData.areaName});
									flag = true;
								}
							}else{
								for(var i = 0; i < cityData.subordinatesDistrict.length; i++){
									var county = cityData.subordinatesDistrict[i];
									if(county.areaCode == codeId){
										$(".area-select-content").text(county.areaName).attr({code : county.areaCode, title : county.areaName});
										flag = true;
										break;
									}
								}
							}
						}
						that.areaData.push(cityData);
					});
					that.creatPop();
				}
			 }
		});
	},
	
	//创建弹框
	creatPop : function() {
		var that = this;
		$(".area-select-pop-wrap").remove();
		var $areaSelectPop = $("<div class='area-select-pop-wrap' >");
		$areaSelectPop.append('<div class="area-select-pop-arrows-wrap"><div class="area-select-pop-arrows"></div></div>');
		var $areaSelectContent = $('<div class="area-select-pop-content">');
		var $provinceName = $('<div class="provinceName">河北省</div>');
		$areaSelectContent.append($provinceName);
		$areaSelectPop.append($areaSelectContent);
		var $areaContainer = $('<div class="area-select-item-areaContainer">');
		$areaContainer.append($('<div class="area-select-item" code="13">河北省</div>'));
		$.each(this.areaData, function(i, area){
			var $area = $('<div class="area-select-item">');
			$area.text(area.areaName).attr("code", area.areaCode).data("area", area);
			if(that.selectArea == area.areaCode){
				$area.addClass("area-select-item-selected");
			}
			$areaContainer.append($area);
		});
		$areaSelectContent.append($areaContainer);
		$("#nPage").append($areaSelectPop);
		if(this.areaData.length < 4){
			var left = parseInt($areaSelectPop.css("left").replace("px")) + (70 * (4 - this.areaData.length));
			$areaSelectPop.css("left", left + "px");
			var width = parseInt($areaSelectPop.css("width").replace("px")) - (70 * (4 - this.areaData.length));
			$areaSelectPop.css("width", width + "px");
		}else{
			var rows = Math.ceil(this.areaData.length / 4);
			$areaSelectContent.css("height", rows * 36 + "px");
		}
		that.bindEvent();
	},
	bindEvent : function() {
		var that = this;
		$(".area-select").off("click").on("click", function(){
			if($(".area-select-pop-wrap").is(":visible")){
				$(".area-select-pop-wrap").hide();
			}else{
				if($(".area-select-item-selected").size() == 0){
					if(codeId.length == 2){
						$(".area-select-item[code=" + codeId + "]").addClass("area-select-item-selected");
					}
					if(codeId.length >= 4){
						$(".area-select-item[code=" + codeId.substring(0, 4) + "]").addClass("area-select-item-selected");
					}
					if(codeId.length > 4){
						$('.area-select-item-cityContainer').remove();
						var areaData = $(".area-select-item-selected").data("area");
						var $areaSelectContent = $('.area-select-pop-content');
						var cityName = $(".area-select-item[code='"+ areaData.areaCode +"']").text();
						var $cityName = $('<div class="cityName">'+ areaData.areaName +'</div>');
						$areaSelectContent.append($cityName);
						var $cityContainer = $('<div class="area-select-item-cityContainer">');
						var rows = 0;
						$.each(areaData.subordinatesDistrict, function(i,countryData){
							var $area = $('<div class="area-select-item">');
							$area.text(countryData.areaName).attr("code", countryData.areaCode);
							if(codeId == countryData.areaCode){
								$area.addClass("area-select-item-selected");
							}
							$cityContainer.append($area);
							rows ++ ;
						});
						rows = Math.ceil(rows / 4);
						$cityContainer.css("height", rows * 36 + "px");
						$areaSelectContent.append($cityContainer);
						that.bindEvent();
					}
				}
				$(".area-select-pop-wrap").show();
			}
		});
		
		$(".area-select-item-areaContainer .area-select-item").unbind("click").bind("click",function(){
			$('.cityName').remove();
			$('.area-select-item-cityContainer').remove();
			$(".area-select-item-selected").removeClass("area-select-item-selected");
			$(this).addClass("area-select-item-selected");
			that.selectArea = $(this).attr("code");
			mapTool.tool.zoomToArea("nGis", that.selectArea);
			$(".area-select-content").text($(this).text()).attr({code : that.selectArea, title : $(this).text()});
			if("13" == that.selectArea){
				return;
			}
			var $areaSelectContent = $('.area-select-pop-content');
			var cityName = $(".area-select-item[code='"+ that.selectArea +"']").text();
			var $cityName = $('<div class="cityName">'+ cityName +'</div>');
			$areaSelectContent.append($cityName);
			var $cityContainer = $('<div class="area-select-item-cityContainer">');
			var rows = 0;
			$.each(that.areaData, function(i, areaDataCountry){
				if(that.selectArea == areaDataCountry.areaCode){
					$.each(areaDataCountry.subordinatesDistrict,function(i,countryData){
						var $area = $('<div class="area-select-item">');
						$area.text(countryData.areaName).attr("code", countryData.areaCode);
						$cityContainer.append($area);
						rows ++ ;
					});
				}
			});
			rows = Math.ceil(rows / 4);
			$cityContainer.css("height", rows * 36 + "px");
			$areaSelectContent.append($cityContainer);
			that.bindEvent();
		});
		
		$(".area-select-item-cityContainer .area-select-item").unbind("click").bind("click", function(){
			$(".area-select-item-cityContainer .area-select-item-selected").removeClass("area-select-item-selected");
			$(this).addClass("area-select-item-selected");
			that.selectArea = $(this).attr("code");
			$(".area-select-content").text($(this).text()).attr({code : that.selectArea, title : $(this).text()});
			$(".area-select-pop-wrap").hide();
			mapTool.tool.zoomToArea("nGis", that.selectArea);
		});
		
		// 点击弹框区域以外时--》隐藏弹框
		$(document).click(function(event){
			event = window.event || event;
			event.stopPropagation();
			if($.inArray($(".area-select-pop-wrap").get(0), event.path) == -1 &&
					$.inArray($(".area-select").get(0), event.path) == -1){
				$(".area-select-pop-wrap").hide();
			}
		});
	}
};