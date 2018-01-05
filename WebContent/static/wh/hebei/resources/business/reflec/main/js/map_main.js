/*  
- * map_main.js
 * @Author :      lj
 * @CreateDate :  2016年7月5日
 * Copyright (c) 2016, NRIET.　
 * 		
 */
var GDZZ_TOOLS = {};

;(function($, win, undefined) {
	var _gridParam = {element:"TMAX"};//背景场表格中被选中格子的属性
	var _rangeObj = null; //在地图上显示格点时的参数,包括经纬度范围、行列数等
	var _primaryGridStr = null;
	var _gisParam = {mapId:"nGis", eleType:"Rain", lockArea:false};
	var _legendValues = null;//默认的等值线值列表
	var _valueLimit = {"TP24H":[0, 999],"TP1H":[0, 999],"TP3H":[0,999],"TMP":[-999, 999],"TMAX":[-999, 999],"TMIN":[-999, 999],"RH":[0, 100],"RHMIN":[0, 100],"RHMAX":[0, 100],"EDA":[0, 100],"TCC":[0,100],"VIS":[0,9999]};//各要素取值范围
	GDZZ_TOOLS.valueLimit = _valueLimit;
	var _eleListArr = {index:-1, list:[]};//被批量修改了数据的列表
	var _layerManage = [
		                    {type:"grid",grid:"number",flag:true},
		                    {type:"grid",grid:"splash",flag:true},
		                    {type:"grid",grid:"wind",flag:true},
		                    {type:"station",station:"0",flag:true},
		                    {type:"cut",cut:'isCut',flag:false},
		                    {type:"buffer",buffer:'gs',flag:false},
		                    {type:"gp",buffer:'gs',flag:false}
	                    ];
	
	GDZZ_TOOLS.gisDisplayType=function(ele){//各要素在地图上显示的样式
		var types = {"TP24H" : ["splash","number"],"TP" : ["splash","number"],"TP1H" : ["splash","number"],"TP3H" : ["splash","number"],
					"TMP" : ["splash","number"],"TMAX" : ["splash","number"],"TMIN" : ["splash","number"],
					"RH" : ["splash","number"],"RHMIN" : ["splash","number"],"RHMAX" : ["splash","number"],
					"EDA" : ["wind","splash"],"TCC" : ["splash","number"],"VIS":["splash","number"],"WEA":["splash","number"],"DIS":["splash","number"],"Reflec":["splash"]}
		var result=[];
		types[ele].forEach(function(e,i){
			_layerManage.forEach(function(el,indext){
				if(el.grid==e){
					var g = {};
					g[e] = el.flag;
					result.push(g);
				}
			});
		});
		return result;
	};
	//站点是否显示
	GDZZ_TOOLS.stationCon=function(){
		var f = false;
		_layerManage.forEach(function(el,indext){
			if(el.flag&&el.station==='0')
				f = true;
		});
		return f;
	};
	//掩膜是否显示
	GDZZ_TOOLS.gisDisplayRangeObj=function(obj){
		_layerManage.forEach(function(el,indext){
			if(el.flag&&el.cut=='isCut')
				obj.isCut = true;
		});
		return obj;
	};
	
	
	/**
	 * 初始化页面-添加工具条-设置任意区域、等值线、数据刷面板-绑定点击事件
	 */
	GDZZ_TOOLS.initPage = function(){
		//获取图例的配置数据
		GDZZ_TOOLS.readLagend();
	};
	





			
	/**
	 * 更新格点制作的一系列参数，重新激活GIS工具
	 */
	GDZZ_TOOLS.updateParam = function(type){
		
		if(type == "gridParam"){
			if(!GridPanel_PageParam.Select_Ele.element) return;
			if(!_gridParam || _gridParam.channel != GridPanel_PageParam.Select_Ele.channel){
				if(_gridParam && (_gridParam.channel == 'EDA' || _gridParam.channel == 'WEA' || _gridParam.channel == 'DIS')){//原来是风场,现在不是-去除自由区域判断
					$.fn.gridToolbar('recover', 'freeArea');
					_gisParam.toolName = "";
					_gisParam.timeConti = false;//去掉时间连续
					GIS.GridEdit.drag(_gisParam.mapId);
					/*var $panel = $('.freeAreaPanel[ele=EDA]');
					if($panel.is(':visible')){
						$panel.hide();
						showfreeAreaPanel($('.specific_tool[name=freeArea]'));
					}*/
				}
				//隐藏地图订正
				if(_gridParam && (_gridParam.channel == 'EDA' || GridPanel_PageParam.Select_Ele.channel == 'EDA') && $(".specific_tool[name=mapAdjust]").is(".trigger-on")){
					$(".specific_tool[name=pan]").click();
				}
				_gridParam = GridPanel_PageParam.Select_Ele;
				if(_gridParam.channel == 'DIS' || _gridParam.channel == 'WEA'){
					$(".specific_tool[name=contourLine]").addClass("disactive");
					$(".specific_tool[name=brush]").addClass("disactive");
				}else{
					$(".specific_tool[name=contourLine]").removeClass("disactive");
					$(".specific_tool[name=brush]").removeClass("disactive");
				}
				var $tool = $('.gridTools .specific_tool[name=consistent]');// xx协同
				var $title = $tool.find(".tool_title span");
				if(GDZZ_TOOLS.legendColors[_gridParam.element]){
					
					_legendValues = JSON.parse(JSON.stringify(GDZZ_TOOLS.legendColors[_gridParam.element].levels));
				}else{
					
				}
				$tool.removeClass("disactive");
				$('.droplist_item[name=turnWind]').hide();
				
				$tool.addClass("disactive");
				//setLegendValue(_legendValues);
				//更改工具面板输入数值的上下限
				if(_valueLimit[_gridParam.element] && _valueLimit[_gridParam.element][0] != null){
					$('.toolPanel div[type=input-number][limitType=eleValue]').each(function(){
						$(this).attr('min', _valueLimit[_gridParam.element][0]);
						if(Number($(this).attr('value')) < _valueLimit[_gridParam.element][0]){
							$(this).attr('value',_valueLimit[_gridParam.element][0]);
							$(this).find('input').val(_valueLimit[_gridParam.element][0]);
						}
					});
				}else{
					$('.toolPanel div[type=input-number][limitType=eleValue]').removeAttr('min');
				}
				if(_valueLimit[_gridParam.element] && _valueLimit[_gridParam.element][1] != null){
					$('.toolPanel div[type=input-number][limitType=eleValue]').each(function(){
						$(this).attr('max', _valueLimit[_gridParam.element][1]);
						if(Number($(this).attr('value')) > _valueLimit[_gridParam.element][1]){
							$(this).attr('value',_valueLimit[_gridParam.element][1]);
							$(this).find('input').val(_valueLimit[_gridParam.element][1]);
						}
					});
				}else{
					$('.toolPanel div[type=input-number][limitType=eleValue]').removeAttr('max');
				}
				if(_gisParam.toolName == "brush"){//针对此时是数据刷的情况
					var $brushCenter = $('.brushPanel div[type=input-number][name=center]');
					var $brushBorder = $('.brushPanel div[type=input-number][name=border]');
					var center = $brushCenter.attr('value');
					var border = $brushBorder.attr('value');
					if(_gisParam.drawMethod == "hollow"){//凹槽
						$brushCenter.attr('max', border);
						$brushBorder.attr('min', center);
					}else if(_gisParam.drawMethod == "bulge"){
						$brushCenter.attr('min', center);//因为中心和边界的值要进行交换-上面设置的默认值中心点小于边界点
						$brushBorder.attr('max', border);
						$brushCenter.attr('value', border);
						$brushBorder.attr('value', center);
						$brushCenter.find('input').val(border);
						$brushBorder.find('input').val(center);
					}
				}
			}else{
				_gridParam = GridPanel_PageParam.Select_Ele;
			}
			
			showLegend(_gridParam.element);//显示图例
			//GDZZ_TOOLS.checkDoable();
		}else if(type == "gridData"){
			_rangeObj = GridPanel_PageParam.resultData.rangeObj;
			if(GridPanel_PageParam.resultData.gridData){
				var gridData = GridPanel_PageParam.resultData.gridData;
				for(var i = 0, len = gridData.length; i < len; i++){
					if(gridData[i] == null){
						gridData[i] = GridPanel_PageParam.resultData.rangeObj.noDataValue;
					}
				}
				_primaryGridStr = gridData.toString();
			}
			$('.specific_tool.trigger-on[name=copy_area],.specific_tool.trigger-on[name=move_area]').each(function(){
				$(this).removeClass('trigger-on');
				$(this).addClass('trigger');
			});//复制和移动的样式要改成未选中
			if(_gisParam.toolName != 'freeArea' || _gisParam.timeConti == false){
				//除时间连续之外,需要清空区域
				GIS.GridEdit.drag(_gisParam.mapId);
				if(_gisParam.lineValue || _gisParam.lineValue == 0){
					_gisParam.lineValue = Number($('.contourLinePanel .input-param[name=lineValue] input').val());
				}
				if(_gisParam.toolName == "brush"){
					_gisParam.center = Number($('.brushPanel .input-param[name=center] input').val());
					_gisParam.border = Number($('.brushPanel .input-param[name=border] input').val());
				}
				gisTool();
			}
			//GDZZ_TOOLS.areaLock();//区域锁定
		}
	};


	
	/**
	 * 显示图例
	 */
	function showLegend(element){
		if(element){
			var name;
			if(element == "TMP" || element == "TMAX" || element == "TMIN"){
				name = "TMP";//温度和湿度现在没有区分24小时和1小时等
			}else if(element == "RH" || element == "RHMAX" || element == "RHMIN"){
				name = "RH";
			}else{
				name = element;
			}
			$('#grid-legend .gdzz-legend:visible').hide();
			if(name != "WEA" && name != "DIS")$('#grid-legend .gdzz-legend[name='+name+']').show();
		}
	}



	
	/**
	 * hex色值转rgba
	 * #fff, 处理成 255,255,255,0
	 */
	function hexToRgba(hexColor){
		hexColor = hexColor.toLowerCase();//先都转成小写
		var colorStr;
		if(hexColor == "#fff"){
			return [255, 255, 255, 0];
		}else if(hexColor.length == 4){
			colorStr = [hexColor[1]+hexColor[1], hexColor[2]+hexColor[2], hexColor[3]+hexColor[3]];
		}else if(hexColor.length == 7){
			colorStr = [hexColor[1]+hexColor[2], hexColor[3]+hexColor[4], hexColor[5]+hexColor[6]];
		}else{
			console.log("色值有误");
			return;
		}
		var rgba = [];
		for(var i = 0; i < 3; i++){
			var value = parseInt(colorStr[i], 16);
			rgba.push(value);
		}
		rgba.push(255);
		return rgba;
	}
	
	


	
	
	//获取图例的配置数据
	GDZZ_TOOLS.readLagend = function(){
		$.ajax({
			type:'POST',
			url:'/shplatform/static/wh/hebei/resources/business/reflec/main/js/readLagendData.json',
			dataType:"json",
			async:false,
			data: {elements:'TP24H,TP3H,TMP,EDA,GUST,RH,TCC,WEA,DIS,VIS',date:new Date($("#date").val()+':00')},
			success:function(result){
				var legendParam = result.params;
				$('#grid-legend').empty();
				for(var ele in legendParam){
					var legends = legendParam[ele];
					var num = legends.length;
					var imageData = new Uint8Array(num*4);
					var levels = [];
					var width = num < 23?34:25;//设置图例每一格的宽度,所有的图例单元加起来总长度不超过800
					var $legendColors = $('<div class="gdzz-legend"style="display:none;margin-left:'+width/2+'px;"name='+ele+'></div>').appendTo($('#grid-legend'));//放置图例色块
					var	$legendLabels = $('<div class="gdzz-legend"style="display:none;"name='+ele+'>').appendTo($('#grid-legend'));//放置图例标注的数字
					for(var i = 0; i < num; i++){
						var label = legends[i].val_min <= -999?"":legends[i].val_min;
						var color = !legends[i].colour?'#fff':legends[i].colour;
						var rgba = hexToRgba(color);
						imageData[i*4] = rgba[0];
						imageData[i*4+1] = rgba[1];
						imageData[i*4+2] = rgba[2];
						imageData[i*4+3] = rgba[3];
						$legendBlock = $('<div class="legend-block"style="background:'+color+';width:'+width+'px;"value='+label+'></div>').appendTo($legendColors);//图例色块
						$legendLabel = $('<span class="legend-label"style="width:'+width+'px;">'+label+'<span>').appendTo($legendLabels);//地图上显示的刻度
						if(ele == "WEA")$(".freeAreaPanel[ele=WEA] .containter .item-weather[code="+legends[i].val_min+"] .item-show")
						.css("background",color);
						levels.push(label);
					}
					if(legends[0])$('<span class="legend-label"style="width:'+width+'px;">('+legends[0].unit+')<span>').appendTo($legendLabels);
					var legendColor = {};
					legendColor[ele]= {imageData : imageData, levels: levels, selectImage: function(value){
						var levels = GDZZ_TOOLS.legendColors[_gridParam.element].levels;
						for(var i = 0; i < levels.length; i++){
							if(levels[i] != "" && value < levels[i]){
								return i - 1;
							}
						}
						return levels.length - 1;
					}};
					if(ele == "TP1H" || ele == "TP24H" || ele == "TP6H"){
						legendColor[ele].type = "RAIN";
					}else if(ele=="TP"){
						legendColor[ele].type = "YJDJ";
					}else if (ele == "EDA"){
						legendColor[ele].type = "WIND";
					}else if(ele == "TMP"){
						legendColor[ele].type = "TEMP";
						GDZZ_TOOLS.legendColors = $.extend(GDZZ_TOOLS.legendColors, {"TMAX" : legendColor[ele]});
						GDZZ_TOOLS.legendColors = $.extend(GDZZ_TOOLS.legendColors, {"TMIN" : legendColor[ele]});
					}else if(ele == "RH"){
						legendColor[ele].type = "HUMI";
						GDZZ_TOOLS.legendColors = $.extend(GDZZ_TOOLS.legendColors, {"RHMAX" : legendColor[ele]});
						GDZZ_TOOLS.legendColors = $.extend(GDZZ_TOOLS.legendColors, {"RHMIN" : legendColor[ele]});
					}else if(ele == "TCC"){
						legendColor[ele].type = "TCC";
					}else if(ele == "WEA"){
						legendColor[ele].type = "WEATHER";
						legendColor[ele].names=["暴雨","大暴雨","特大暴雨","阵雪","小雪","中雪","大雪","暴雪","雾","冻雨","沙尘暴","小到中雨","中到大雨","大到暴雨","暴雨到大暴雨","大暴雨到特大暴雨","小到中雪","中到大雪","大到暴雪","浮尘","扬沙","强沙尘暴","霾","冰雹","龙卷","雷电","晴","多云","阴","阵雨","雷阵雨","雷阵雨并伴有冰雹","雨夹雪","小雨","中雨","大雨"];
						legendColor[ele].ltrWidth=80;
						legendColor[ele].utdHeight=80;
					}else if(ele == "DIS"){
						legendColor[ele].type = "DIS";
						legendColor[ele].names=["短时强降水","暴雨","高温","高温","大雾","浓雾","强浓雾","特强浓雾"];
						legendColor[ele].ltrWidth=80;
						legendColor[ele].utdHeight=80;
					}else if(ele == "VIS"){
						legendColor[ele].type = "VIS";
					}
					GDZZ_TOOLS.legendColors = $.extend(GDZZ_TOOLS.legendColors, legendColor);
				}
				
				//绑定事件,点击图例上的色块,修改等值线面板上参数设置的值
				$('.gdzz-legend .legend-block').bind('click',function(){
					
					var value=$(this).attr('value');
					if(value != "" && _gisParam.toolName == 'contourLine'){
						var $lineValue = $('.contourLinePanel .input-param[name=lineValue]');
						$lineValue.attr('value',Number(value));
						$lineValue.find('input').val(Number(value));
						_gisParam['lineValue'] = Number(value);
						gisTool();
						
					}
				});
			}
		});
	};
	
})(jQuery, window);