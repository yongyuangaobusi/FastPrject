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
	var _valueLimit = {"TP24H":[0, 99999],"TP1H":[0, 999],"TP3H":[0,999],"TMP":[-99999, 99999],"TMAX":[-999, 999],"TMIN":[-999, 999],"RH":[0, 100],"RHMIN":[0, 100],"RHMAX":[0, 100],"EDA":[0, 100],"TCC":[0,100],"VIS":[0,999]};//各要素取值范围
	GDZZ_TOOLS.valueLimit = _valueLimit;
	var _eleListArr = {index:-1, list:[]};//被批量修改了数据的列表
	var _layerManage = [
		 					
		 					{type:"cut",cut:'isCut',flag:false},
		                    {type:"station",station:"0",flag:true}
	                    ];
	
	GDZZ_TOOLS.gisDisplayType=function(ele){//各要素在地图上显示的样式
		var types = {"TP24H" : ["splash","number"],"TP" : ["splash","number"],"TP1H" : ["splash","number"],"TP3H" : ["splash","number"],
					"TMP" : ["splash","number"],"TMAX" : ["splash","number"],"TMIN" : ["splash","number"],"YJXX":["splash"],
					"RH" : ["splash","number"],"RHMIN" : ["splash","number"],"RHMAX" : ["splash","number"],
					"EDA" : ["wind","splash"],"TCC" : ["splash","number"],"VIS":["splash","number"],"WEA":["splash","number"],"DIS":["splash","number"]}
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
	var _eleName = {"TMP": "气温", "RH":"湿度", "TCC":"云量"};
	//检查的要素列表, element: 要素名 ;statue:状态 0 检查, 1 已协同, 2 已忽略 ,"RHMAX":0,"RHMIN":0,"TPTMP":0,"TPRH":0,"TPTCC":0
	var _checkElements = {"TP24H":0,"TMAX":0,"TMIN":0,"RHMAX":0,"RHMIN":0,"TPTMP":0,"TPRH":0,"TPTCC":0};
	
	/**
	 * 初始化页面-添加工具条-设置任意区域、等值线、数据刷面板-绑定点击事件
	 */
	GDZZ_TOOLS.initPage = function(){
		//工具条-基本工具 TODO 工具条
		/**
		 * tools:[{name : "工具名", title: "在工具条上显示的文字", iconClass : "svg图标", type: "类型是按钮还是开关", solo:是否与其他工具互斥, droplist: [name: "名字", title: "显示的文字"],define:默认选择的下拉项},...]
		 */
		var basicToolParam = {
			top : "27px",//位置
			right: "0px",
			name : "basicTools",
			title : "基本",//工具条头上显示的字
			opened : 1,//工具条是否展开 1 展开 0缩起
			tools : [
			         {name : "changePost", title: "岗位", iconClass : "icon-icon-newest-4", type: "button", solo:true},
//			         {name : "assistAnalyse", title: "辅助分析", iconClass : "icon-fuzhufenxi-7", type: "button", solo:false},
			         {name : "focusArea", title: "区域锁定", iconClass : "icon-qingchuquanbusuoding-7",type: "trigger", solo:true},
//			        	 droplist : [{name: "12", title : "天津市"},{name : "120101", title : "市区"}, {name : "120110", title : "东丽"}, {name : "120111", title : "西青"}, {name : "120112", title : "津南"}, 
//			        	             {name : "120113", title : "北辰"}, {name : "120114", title : "武清"}, {name : "120115", title : "宝坻"}, {name : "120116", title : "滨海新区"}, {name : "120221", title : "宁河"},
//			        	             {name : "120223", title : "静海"}, {name : "120125", title : "蓟州"}],define: "12"},
		             {name : "clearArea", title: "区域清空", iconClass : "icon-xiangpica-7",type: "button", solo:false},
		             {name : "pan", title: "漫游", iconClass : "icon-icon-roaming-1",type: "button", solo:true},
			         {name : "initalExtent", title: "初始位置", iconClass : "icon-chushiweizhi-7",type: "button", solo:false},
			         {name : "undo", title: "撤销", iconClass : "icon-icon-revoke-4",type: "button", solo:false,active: false},//可以加 active : true 表示该工具可用
			         {name : "redo", title: "恢复", iconClass : "icon-icon-return-4",type: "button", solo:false, active: false}
			         ],
	        reCall: toolClicked//回调
		};
		
		//工具条-格点工具
		var gridToolParam = {
				top : "100px",
				right: "0px",
				name : "gridTools",
				title : "格点",
				opened : 0,
				tools : [
				         {name : "freeArea", title: "任意区域", iconClass : "icon-renyiquyu-7",type: "trigger", solo:true},
				         //{name : "contourLine", title: "等值线", iconClass : "icon-dengzhixian-7",type: "trigger", solo:true,
				        	 //droplist : [{name : "clickDraw", title : "单击绘制"}, {name : "freeHand", title : "自由绘制"}, {name : "centerPoint", title : "中心点绘制"}],define: "clickDraw"},
			        	 //{name : "toGrid", title: "区域网格化", iconClass : "icon-quyuwanggehua-7", type: "button", solo:false, active: false},
			        	 {name : "brush", title: "数据刷", iconClass : "icon-shujushua-7",type: "trigger", solo:true}
			        	 //{name : "consistent", title: "降水协同", iconClass : "icon-jiangshuixietong-7", type: "button", solo:false},
				         //{name : "deleteArea", title: "区域删除", iconClass : "icon-icon-close-4",type: "trigger", solo:true},
				         //{name : "copy_area", title: "复制", iconClass : "icon-copy-7", type: "trigger", solo:true},
				         //{name : "move_area", title: "移动", iconClass : "icon-move-7", type: "trigger", solo:true}
				         ],
		        reCall: toolClicked
		};
		
		//工具条-站点工具
		var stationToolParam = {
				top : "107px",
				right: "0px",
				name : "stationTools",
				title : "地图",
				opened : 1,
				tools : [
				         {name : "layermanage", title: "图层管理", iconClass : "icon-icon-tucengshezhi-4", type: "trigger", solo:true}
//				         {name : "pan", title: "漫游", iconClass : "icon-icon-roaming-1",type: "button", solo:true}
				         ],
		        reCall: toolClicked
		};
		
		//工具条-一致性检查
		var synergyToolParam = {
				top : "173px",
				right: "0px",
				name : "synergyTools",
				title : "预警",
				opened : 0,
				tools : [
				         {name : "yjdz", title: "预警订正", iconClass : "icon-icon-collaborative-tool-1", type: "button", solo:true},
				         {name : "yjzz", title: "预警制作", iconClass : "icon-icon-descentarea-5", type: "button", solo:true}
				         ],
		        reCall: toolClicked
		};

		//$(".toolbar_test").gridToolbar(synergyToolParam);
		$(".toolbar_test").gridToolbar(stationToolParam);
		//$(".toolbar_test").gridToolbar(gridToolParam);
		//$(".toolbar_test").gridToolbar(basicToolParam);
		
		var tqxxArr = [{name:'qing',title:'晴',id:90},{name:'duoyun',title:'多云',id:91},{name:'yin',title:'阴',id:92},{name:'zhenyu',title:'阵雨',id:93},
		               {name:'leizhenyu',title:'雷阵雨',id:94},{name:'lzybbybb',title:'雷阵雨并伴有冰雹',id:95},{name:'yujiaxue',title:'雨夹雪',id:96},
		               {name:'xiaoyu',title:'小雨',id:97},{name:'zhongyu',title:'中雨',id:98},{name:'dayu',title:'大雨',id:99},{name:'baoyu',title:'暴雨',id:10},
		               {name:'dabaoyu',title:'大暴雨',id:11},{name:'tedabaoyu',title:'特大暴雨',id:12},{name:'zhenxue',title:'阵雪',id:13},{name:'xiaoxue',title:'小雪',id:14},
			           {name:'zhongxue',title:'中雪',id:15},{name:'daxue',title:'大雪',id:16},{name:'baoxue',title:'暴雪',id:17},{name:'wu',title:'雾',id:18},
			           {name:'dongyu',title:'冻雨',id:19},{name:'shachenbao',title:'沙尘暴',id:20},{name:'xiaodaozhongyu',title:'小到中雨',id:21},{name:'zhongdaodayu',title:'中到大雨',id:22},
			           {name:'dadaobaoyu',title:'大到暴雨',id:23},{name:'baoyudaodabaoyu',title:'暴雨到大暴雨',id:24},{name:'dbydtdby',title:'大暴雨到特大暴雨',id:25},
			           {name:'xiaodaozhongxue',title:'小到中雪',id:26},{name:'zhongdaodaxue',title:'中到大雪',id:27},{name:'dadaobaoxue',title:'大到暴雪',id:28},
			           {name:'fuchen',title:'浮尘',id:29},{name:'yangchen',title:'扬沙',id:30},
			           {name:'qiangshachenbao',title:'强沙尘暴',id:31},{name:'mai',title:'霾',id:53},{name:'bingbao',title:'冰雹',id:54},
			           {name:'longjuan',title:'龙卷',id:55},{name:'leidian',title:'雷电',id:56}];
		var weatherRule = {
				"90":[29,30,31,53,18],
				"91":[29,30,31,53,18],
				"92":[29,30,31,53,18],
				"93":[54,55,56],
				"94":[54,55,56],
				"95":[54,55,56],
				"96":[54,55,56],
				"97":[54,55,56],
				"98":[54,55,56],
				"99":[54,55,56],
				"10":[54,55,56],
				"11":[54,55,56],
				"12":[54,55,56],
				"13":[54,55,56],
				"14":[54,55,56],
				"15":[54,55,56],
				"16":[54,55,56],
				"17":[54,55,56],
				"18":[90,91,92,29,30,31,53],
				"19":[54,55,56],
				"20":[90,91,92,18],
				"21":[54,55,56],
				"22":[54,55,56],
				"23":[54,55,56],
				"23":[54,55,56],
				"24":[54,55,56],
				"25":[54,55,56],
				"29":[90,91,92,18],//[90,91,92,30,31,53,18],
				"30":[90,91,92,18],
				"31":[90,91,92,18],
				"53":[90,91,92,18],
				"54":[55,56,93,94,95,96,97,98,99,10,11,12,13,14,15,16,17,18,19,21,22,23,24,25,26,27,28],
				"55":[54,56,93,94,95,96,97,98,99,10,11,12,13,14,15,16,17,18,19,21,22,23,24,25,26,27,28],//[54,56,93,94,95,96,97,98,99,10,11,12,19,21,22,23,24,25],
				"56":[54,55,93,94,95,96,97,98,99,10,11,12,13,14,15,16,17,18,19,21,22,23,24,25,26,27,28]
		};
		
		var zhlqArr = [{name:"dsqjs", title:"短时强降水≥20mm",code:11,level:0},
		               {name:"dsqjs", title:"&emsp;暴雨&emsp;≥50mm",code:12,level:0},
		               {name:"wu", title:"大雾500m~1000m",code:31,level:1},
		               {name:"wu", title:"浓雾200m~500m",code:32,level:1},
		               {name:"wu", title:"强浓雾50m~200m",code:33,level:1},
		               {name:"wu", title:"&emsp;特强浓雾&emsp;≤50m",code:34,level:1},
		               {name:"gaowen", title:"&emsp;高温&emsp;≥37°C",code:21,level:2},
		               {name:"gaowen", title:"&emsp;高温&emsp;≥40°C",code:22,level:2},
		               {name:"none", title:"无灾害落区",code:9999,level:9}];
		//TODO岗位切换按钮样式
		if($(".tools_content .specific_tool[name=changePost] .tool_icon .droplist_name").length==0)
		$(".tools_content .specific_tool[name=changePost] .tool_icon").append('<span class="droplist_name">岗位切换</span>');
		var span_title = $("#userInfo_post").val()==3?"短期岗":"中期岗";
		$(".tools_content .specific_tool[name=changePost] .tool_title .span_title").text(span_title);
		bindinput();
		
		//滚轮
		$('div[type=input-number] input').bind('mousewheel',function(e, delta){
			//debugger;
		});
		
		//任意区域面板-降水-切换快速/精调
		$('.altertype .btn-radio, .altertype .btn-radio-clk').bind('click',function(){
			//点击的是已经选中的按钮，直接跳过
			if($(this).attr('class') == "btn-radio-clk"){
				return;
			}
			//点击的按钮类别
			var altertype = $(this).attr("value");
			$(this).parent().find('.btn-radio-clk').removeClass('btn-radio-clk').addClass('btn-radio');
			$(this).removeClass('btn-radio').addClass('btn-radio-clk');
			$(this).parent().parent().find('.draw-methods .method-kuaisu').toggle();
			$(this).parent().parent().find('.draw-methods .method-jingtiao').toggle();
			$('.alterGroup-kuaisu').toggle();
			$('.alterGroup-jingtiao').toggle();
			
			_gisParam.altertype = altertype;
			$(this).parent().parent().find('.method-' + altertype + '.draw-method-clk').click();
		});
		
		//任意区域面板-降水-时间连续按钮
		$('.freeAreaPanel .time-continue').bind('click', function(){
			$(this).toggleClass('time-continue-clk');
			$(this).children('.item').toggleClass('time-continue-clk');
			var value = $(this).attr('value');
			$(this).attr('value', -1*value+1);
			_gisParam.timeConti = !_gisParam.timeConti;
		});
		
		//任意区域面板-降水-赋值、渐变等切换
		$('.freeAreaPanel .draw-method').bind('click', function(){
			/*if($(this).hasClass('draw-method-clk')){
				return;//点击已经选择的，没有变化
			}*/
			alert(_gisParam.altertype);
//			if(_gisParam.altertype == "kuaisu"){
//				$('.freeAreaPanel .method-kuaisu.draw-method-clk').removeClass('draw-method-clk');
//			}else if(_gisParam.altertype == "jingtiao"){
//				$('.freeAreaPanel .method-jingtiao.draw-method-clk').removeClass('draw-method-clk');
//				$('.freeAreaPanel .method-jingtiao .draw-method-clk').removeClass('draw-method-clk');
//			}
			if($(this).attr('value') == 'voluation'){
				//赋值没有中心和边界的区别
				$('.freeAreaPanel').find('[name="border"]').hide();
				$('.freeAreaPanel [name="center"]').prev('.panel_label').text('参数设置');
			}else{
				$('.freeAreaPanel').find('[name="border"]').show();
				$('.freeAreaPanel [name="center"]').prev('.panel_label').text('中心值');
			}
			$(this).addClass('draw-method-clk');
			var drawtype = $(this).attr('value');
			_gisParam.drawtype = drawtype;
			gisTool();
		});
		
		//任意区域面板-降水-精调-更多
		$(".draw-methods .btn-method-more").bind('click',function(){
			$(this).toggleClass("btn-method-more-clk");
			$(this).nextAll('.draw-method-more').toggle();
		});
				
		//任意区域面板-降水-快速-点击 + - = 对应的radio
		$('.freeAreaPanel .alterGroup input:radio').bind('click', function(e){
			_gisParam.alterMethod = $(this).val();
			gisTool();
		});
		
		//任意区域面板-点击 + - =
		$('.freeAreaPanel .radio-alterMethod, .freeAreaPanel .btn-alterMethod').bind('click', function(e){
			$('.freeAreaPanel .input-param:visible').each(function(){
				var name = $(this).attr('name');
				_gisParam[name] = Number($(this).attr('value'));
			});
			var alterMethod = $(this).attr('value');
			var station = 0;
			if(alterMethod == "plus"){
				station = 1;
			}else if(alterMethod == "minus"){
				station = -1;
			}else if(alterMethod == "equal"){
				station = 0;
			}
			if(_gridParam.channel != 'EDA'){
				if($('.freeAreaPanel .tpParam #select-All-TP').prop('checked')){
					var type = "Rain";
					if(_gridParam.channel=="TMP") {
						type ="temp";
					} else if(_gridParam.channel=="RH" || _gridParam.channel=="TCC") {
						type = "RH";
					} else {
						type = "Rain";
					}
					GIS.GridEdit.areaAllSameValue(_gisParam.mapId,station,_gisParam.center,type);

				}else
					GIS.GridEdit.areaSetValue(_gisParam.mapId,_gisParam.drawtype,_gisParam.bufferSize,station,_gisParam.center,_gisParam.border, _gisParam.eleType);
			}else{
				//var angle = $('.freeAreaPanel .windParam #windDirection').prop('checked') ? Number($('.freeAreaPanel .input-wind[name=windDir]').attr('angle')) : null;
				var angle = null;
				//var speed = $('.freeAreaPanel .windParam #windSpeed').prop('checked') ? Number($('.freeAreaPanel .input-wind[name=windSpeed]').attr('value')) : null;
				var speed = Number($('.freeAreaPanel .input-wind[name=windSpeed]').attr('value'));
				if($('.freeAreaPanel .windParam #select-All').prop('checked') && _gisParam.drawMethod != "turnWind"){
					GIS.GridEdit.areaAllSameValue(_gisParam.mapId,station,speed,"Rain");
				}else if(_gisParam.drawMethod == "turnWind"){//转向风面板加减操作
					GIS.GridEdit.selectAll(_gisParam.mapId,false,function(){
						$('.freeAreaPanel .windParam #select-All').prop('checked', false);
					});
					GIS.GridEdit.areaSetValue(_gisParam.mapId,"wind",0,station,speed,null, "Rain");
				}else{
					GIS.GridEdit.areaSetValue(_gisParam.mapId,"wind",_gisParam.bufferSize,station,speed,angle, "Rain");
				}
			}
		});
		//地图订正面板-点击 + - =
		$('.mapAdjustPanel .radio-alterMethod, .mapAdjustPanel .btn-alterMethod').bind('click', function(e){
			$('.mapAdjustPanel .input-param:visible').each(function(){
				var name = $(this).attr('name');
				_gisParam[name] = Number($(this).attr('value'));
			});
			var alterMethod = $(this).attr('value');
			var station = 0;
			if(alterMethod == "plus"){
				station = 1;
			}else if(alterMethod == "minus"){
				station = -1;
			}else if(alterMethod == "equal"){
				station = 0;
			}
			var range = {min:_valueLimit[_gridParam.element][0],max:_valueLimit[_gridParam.element][1]};
			GIS.Element.modify(_gisParam.mapId,station,_gisParam.statVal,null,range,range,null,function(grid,data){
				GDZZ_TOOLS.writeTemporaryGrid(grid);
				GridPanel_PageParam.updateStationTable(data);
			});
		});
		//风场图例展开按钮
		$("table td[name=windSym_showAll] span").bind('click', function(){
			var table = $(this).parents("table");
			var hideTr = table.find("tr:hidden");
			if(hideTr.length>0){
				hideTr.attr("flag","hide").show();
				$(this).html("隐藏");
			}else {
				table.find("tr[flag=hide]").hide();
				$(this).html("展开");
			}
		});
		//任意区域面板-降水-点击 + - = 鼠标按下/松开效果
		$('.freeAreaPanel .btn-alterMethod, .freeAreaPanel .radio-alterMethod').bind('mousedown',function(){
			$(this).addClass('alterMethod-msd');
		});
		$('.freeAreaPanel .btn-alterMethod, .freeAreaPanel .radio-alterMethod').bind('mouseup mouseout',function(){
			$(this).removeClass('alterMethod-msd');
		});
		$(".stationInfoPanel .title-head .icon-close-button").bind('click', function(){
			$(this).parents(".stationInfoPanel").hide();
		});
		
		
		//任意区域-天气现象-配置面板
		var $containter = $('.freeAreaPanel[ele=WEA]').find('.containter');
		for(var i = 0; i < tqxxArr.length; i++){
			var tqxx = tqxxArr[i];
			var width = "";
			if(tqxx.title.length>4){
				width = "style='width:180px;'";
			}
//			var $item = $('<span class="item-weather" code='+tqxx.id+' name='+tqxx.name+' '+width+'><span class="item-show"></span>'+tqxx.title+'</span>');
			var $item = $('<span class="item-weather" code='+tqxx.id+' name='+tqxx.name+' '+width+'>'+tqxx.title+'</span>');
			$containter.append($item);
		}
		//任意区域-灾害落区-配置面板
		for(var i = 0; i < zhlqArr.length; i++){
			var zhlq = zhlqArr[i];
			var $levelContainter =$('.freeAreaPanel[ele=DIS] .containter div[name=disaster-level'+zhlq.level+']');
			var className = "item-wu";
//			if(zhlq.level == 0 || zhlq.level == 1)className = "item-wu";
//			else if(zhlq.level == 2)className = "item-temp";
			if(zhlq.level == 9)className = "item-none";
			var $levelItem = $('<span class="item-disaster '+ className +'" code='+zhlq.code+' name='+zhlq.name+'>'+zhlq.title+'</span>');
			$levelContainter.append($levelItem);
		}
		//灾害等级点击
		$('.freeAreaPanel[ele=DIS] .containter .item-disaster').bind('mouseup',function(e){
			var $this = $(this);
			_gisParam.weather = $this.attr("code");
			var type = true;
			if($(".freeAreaPanel #dis-dj:checked").length>0)
				type = "damage";
			
			if(e.ctrlKey && _gisParam.weather != '9999'){//叠加 或 无灾害点击
				$this.addClass('item-disaster-clk').siblings().removeClass('item-disaster-clk');
				var code = "";
				$('.freeAreaPanel[ele=DIS] .containter .item-disaster-clk').each(function(){
					code += $(this).attr("code");
				});
				GIS.GridEdit.weatherValue(_gisParam.mapId,type,code);//天气现象赋值
			}else{
				$('.freeAreaPanel[ele=DIS] .containter .item-disaster-clk').removeClass('item-disaster-clk');
				$this.addClass('item-disaster-clk');
				GIS.GridEdit.weatherValue(_gisParam.mapId,type,Number($this.attr("code")));//天气现象赋值
			}
		});
		//TODO 天气现象
		$('.freeAreaPanel[ele=WEA]').attr('tabindex',1);
		$('.freeAreaPanel[ele=WEA]').bind('keydown',function(e){
			if(e.ctrlKey && $('.freeAreaPanel .item-weather-clk').length>0){
				$('.freeAreaPanel .item-weather:not(.item-weather-clk)').removeClass("item-weather-unable").addClass("item-weather-unable");
				var rule = _gisParam.weatherRule;
				if(rule)rule.forEach(function(id,index){
					$('.freeAreaPanel .item-weather[code='+id+']').removeClass("item-weather-unable");
				});
			}
		});
		$('.freeAreaPanel[ele=WEA]').bind('keyup',function(e){
			if(e.keyCode==17){
				$('.freeAreaPanel .item-weather').removeClass("item-weather-unable");
			}
		});
		//任意区域-天气现象点击
		$('.freeAreaPanel .item-weather').bind('mouseup',function(e){
			var type = false;
			if($(".freeAreaPanel #wea-over:checked").length>0)
				type = true;
			if(e.ctrlKey){
				if($('.freeAreaPanel .item-weather-clk').length==4)return;
				if($(this).is(".item-weather-unable")|| $(this).is(".item-weather-clk"))return;
				weatherCodes = "";
				var tempArray = [];
				var rule = _gisParam.weatherRule||[];
				if(rule.length==0){//初次点击
					$(this).addClass("item-weather-clk");
					tempArray = _gisParam.weatherRule = weatherRule[$(this).attr("code")];
				}else if(rule.indexOf(Number($(this).attr("code")))==-1){//上个不包含当前的code
					tempArray = _gisParam.weatherRule;
				}else{//点击多个
					$(this).addClass("item-weather-clk");
					weatherRule[$(this).attr("code")].forEach(function(id,index){
						if(rule.indexOf(id)!=-1){
							tempArray.push(id); 
						}
					});
				}
				$('.freeAreaPanel .item-weather:not(.item-weather-clk)').removeClass("item-weather-unable").addClass("item-weather-unable");
				_gisParam.weatherRule = tempArray;
				tempArray.forEach(function(id,index){
					$('.freeAreaPanel .item-weather[code='+id+']').removeClass("item-weather-unable");
				});
				
				
				$('.freeAreaPanel .item-weather-clk').each(function(){
					var code = $(this).attr('code');
					weatherCodes = code+weatherCodes;
				});
				_gisParam.weather = weatherCodes;
				
			}else{
				$('.freeAreaPanel .item-weather').removeClass("item-weather-unable");
				_gisParam.weatherRule = weatherRule[$(this).attr("code")];
				$('.freeAreaPanel .item-weather-clk').removeClass('item-weather-clk');
				$(this).addClass("item-weather-clk");
				var code = $(this).attr('code');
				_gisParam.weather = code;
				
			}
//			console.log(_gisParam.weather);
			GIS.GridEdit.weatherValue(_gisParam.mapId,type,Number(_gisParam.weather));//天气现象赋值
			//GIS.GridEdit.weatherDraw(_gisParam.mapId,_gisParam.drawMethod,type,_gisParam.weather);
		});
		
		
		//任意区域-风速风向面板-显示/隐藏风向的选择面板
		$('.freeAreaPanel #btn-showDir').bind('click',function(){
			if($(this).hasClass('icon-icon-forward-arrow1-2')){
				$(this).removeClass('icon-icon-forward-arrow1-2');
				$(this).addClass('icon-icon-forward-arrow3-4');
				$('.freeAreaPanel div.directions').show();
			}else if($(this).hasClass('icon-icon-forward-arrow3-4')){
				$(this).removeClass('icon-icon-forward-arrow3-4');
				$(this).addClass('icon-icon-forward-arrow1-2');
				$('.freeAreaPanel div.directions').hide();
			}
		});
		//任意区域-风速风向面板-显示/隐藏风向的选择面板-
		$('.mapAdjustPanel span[name=btn-showDir]').bind('click',function(){
			if($(this).hasClass('icon-icon-forward-arrow1-2')){
				$(this).removeClass('icon-icon-forward-arrow1-2');
				$(this).addClass('icon-icon-forward-arrow3-4');
				$('.mapAdjustPanel div.directions').show();
			}else if($(this).hasClass('icon-icon-forward-arrow3-4')){
				$(this).removeClass('icon-icon-forward-arrow3-4');
				$(this).addClass('icon-icon-forward-arrow1-2');
				$('.mapAdjustPanel div.directions').hide();
			}
		});
		$('.freeAreaPanel .directions').bind('mouseleave',function(e){
			$('.freeAreaPanel #btn-showDir').click();
		});
		$('.mapAdjustPanel .directions').bind('mouseleave',function(e){
			$('.mapAdjustPanel span[name=btn-showDir]').click();
		});
		
		//点击风速风向面板上选择风向的面板
		$('.freeAreaPanel .wind-direction').bind('click',function(){
			$('.freeAreaPanel .wind-direction-clk').removeClass('wind-direction-clk');
			$(this).addClass('wind-direction-clk');
			var index = $(this).index();
			var $input = $('.freeAreaPanel .input-wind[name=windDir]');
			var angle = 22.5 * index;
			$input.attr('angle', angle);
			$input.val($(this).text());
//			if($('.freeAreaPanel .windParam #windDirection').prop('checked'))
			if($('.freeAreaPanel .windParam #select-All').prop('checked')){
				GIS.GridEdit.areaSetValue(_gisParam.mapId,"direction",_gisParam.bufferSize,0,null,angle,_gisParam.eleType);
			}else
				GIS.GridEdit.areaSetValue(_gisParam.mapId,"wind",_gisParam.bufferSize,0, null ,angle, _gisParam.eleType);
		});
		//点击风速风向面板上选择风向的面板-地图订正
		$('.mapAdjustPanel .wind-direction').bind('click',function(){
			$('.mapAdjustPanel .wind-direction-clk').removeClass('wind-direction-clk');
			$(this).addClass('wind-direction-clk');
			var index = $(this).index();
			var $input = $('.mapAdjustPanel .input-wind[name=windDir]');
			var angle = 22.5 * index;
			$input.attr('angle', angle);
			$input.val($(this).text());
			GIS.Element.modify(_gisParam.mapId,0,null,angle,null,null,null,function(grid,data){
				GDZZ_TOOLS.writeTemporaryGrid(grid);
				GridPanel_PageParam.updateStationTable(data);
			});
		});
		$('.freeAreaPanel .input-wind[name=windDir]').bind('input propertychange', function(){
			//if($('.freeAreaPanel .windParam #windDirection').prop('checked')){
				var angle = Number($(this).attr('angle'));
				GIS.GridEdit.areaSetValue(_gisParam.mapId,"wind",_gisParam.bufferSize,0, null ,angle, _gisParam.eleType);
			//}
		});
		
		//点击风速风向面板上的风力等级
		$('.freeAreaPanel .windSymbol').bind('click',function(){
			$('.freeAreaPanel .windSymbol-clk').removeClass('windSymbol-clk');
			$(this).addClass('windSymbol-clk');
			var index = Number($(this).attr('level'));//当前风力等级的索引
			var speed = windLevelToSpeed(index);
			var $windSpeed = $('.freeAreaPanel .input-wind[name=windSpeed]');
			$windSpeed.attr('value', speed);
			$windSpeed.find('input').val(speed);
			if(_gisParam.toolName == "freeArea" &&_gisParam.drawMethod == "turnWind"){//转向风时,实时改值
				//if($('.freeAreaPanel .windParam #windSpeed').prop('checked'))
					GIS.GridEdit.addToMapWind(_gisParam.mapId,null, Number($('.freeAreaPanel .input-buffer').attr('value')));
			}
			var speed = Number($('.freeAreaPanel .input-wind[name=windSpeed]').attr('value'));
			if($('.freeAreaPanel .windParam #select-All').prop('checked') && _gisParam.drawMethod != "turnWind"){
				GIS.GridEdit.areaAllSameValue(_gisParam.mapId,0,speed,"Rain");
			}else if(_gisParam.drawMethod == "turnWind"){//转向风面板加减操作
				GIS.GridEdit.selectAll(_gisParam.mapId,false,function(){
					$('.freeAreaPanel .windParam #select-All').prop('checked', false);
				});
				GIS.GridEdit.areaSetValue(_gisParam.mapId,"wind",0,0,speed,null, "Rain");
			}else{
				GIS.GridEdit.areaSetValue(_gisParam.mapId,"wind",_gisParam.bufferSize,0,speed,null, "Rain");
			}
		});
		//点击风速风向面板上的风力等级-地图订正
		$('.mapAdjustPanel .windSymbol').bind('click',function(){
			$('.mapAdjustPanel .windSymbol-clk').removeClass('windSymbol-clk');
			$(this).addClass('windSymbol-clk');
			var index = Number($(this).attr('level'));//当前风力等级的索引
			var speed = windLevelToSpeed(index);
			var range = {min:_valueLimit[_gridParam.element][0],max:_valueLimit[_gridParam.element][1]};
			var $windSpeed = $('.mapAdjustPanel .input-param[name=statVal]');
			$windSpeed.attr('value', speed);
			$windSpeed.find('input').val(speed);
			GIS.Element.modify(_gisParam.mapId,0,speed,null,range,range,null,function(grid,data){
				GDZZ_TOOLS.writeTemporaryGrid(grid);
				GridPanel_PageParam.updateStationTable(data);
			});
		});
		//任意区域面板 -风场-缓冲区
//		$('.freeAreaPanel .input-buffer input').bind('input propertychange', function(){
//			var bufferSize = Number($(this).val());
//			if(bufferSize < 0.1){
//				bufferSize = 0.1;
//				$(this).val(0.1);
//			}
//			if(_gisParam.toolName == "freeArea" &&_gisParam.drawMethod == "turnWind"){//转向风时,实时改值
////				var changeSpeed = $('.freeAreaPanel .windParam #windSpeed').prop('checked') ? Number($('.freeAreaPanel .input-wind[name=windSpeed]').attr('value')):null;
//				GIS.GridEdit.addToMapWind(_gisParam.mapId,null, bufferSize);
//			}
//		});
		
		//任意区域面板-风场-风速风向
		$('.freeAreaPanel .windParam').bind('click',function(){
			if(_gisParam.drawMethod == "turnWind"){//是转向风的时候重新激活转向风工具
				if($(this).find('#windSpeed').prop('checked')){//不改风速
					GIS.GridEdit.addToMapWind(_gisParam.mapId,null, Number($('.freeAreaPanel .input-buffer').attr('value')));
				}else{
					GIS.GridEdit.addToMapWind(_gisParam.mapId,null, Number($('.freeAreaPanel .input-buffer').attr('value')));
				}
			}
		});
		
		//任意区域面板-全选地图
		$('.freeAreaPanel .windParam #select-All,.freeAreaPanel .tpParam #select-All-TP').bind('change',function(){
			var $this = $(this);
			if($this.prop('checked')){
				//GIS.GridEdit.clearByTypes(_gisParam.mapId);
				GIS.GridEdit.selectAll(_gisParam.mapId,true,function(){
					$this.prop('checked', false);
				});
			}else{
				gisTool();
				GIS.GridEdit.selectAll(_gisParam.mapId,false,function(){
					$this.prop('checked', false);
				});
			}
		});
		//区域选择多选
		$(".focusAreaPanel :checkbox").bind('change',function(event){
			var $this = $(this);
			var cs = $(".focusAreaPanel :checkbox:gt(0)");
			if($this.parent(".checkbox").index()==0){//全选
				if($this.is(":checked")){
					cs.prop('checked',true);
				}else{
					cs.prop('checked',false);
				}
			}
			GDZZ_TOOLS.areaLock();//区域锁定
		});
		//等值线-文本框输入-检查上下限、修改GIS参数
		$('.contourLinePanel .input-param input').bind('input propertychange', function(){
			var valueStr = $(this).val();
			//先检验是否超过上下限
			var value = Number(valueStr);
			var name = $(this).parent().attr("name");
			_gisParam[name] = value;
			gisTool();
		});
		
		//等值线-点击 + 添加提取等值线的值
		$('.contourLinePanel .addValue_button').unbind('click').click(function(){
			var value = Number($('.contourLinePanel .addValue_input').attr('value'));
			if(_legendValues.indexOf(value) >= 0 || (!value && value != 0)){
				return;
			}
			var max = 15;
			if(_legendValues.length >= max){
				alert("提取的等值线值最多为"+max+"个");
				return;
			}
			_legendValues.push(Number(value));
			setLegendValue(_legendValues);
		});
		
		//逆时针旋转
		$(".adjust-wind .anticlockwise").unbind("click").click(function(){
			if($(this).parents(".toolPanel").is(".mapAdjustPanel")){
				GIS.Element.modify(_gisParam.mapId,-1,null,22.5,null,null,null,function(grid,data){
					GDZZ_TOOLS.writeTemporaryGrid(grid);
					GridPanel_PageParam.updateStationTable(data);
				});
			}else{
				var bufferSize = $('.freeAreaPanel .input-wind[name=bufferSize] input').val();
				GIS.GridEdit.areaSetValue(_gisParam.mapId,"direction",bufferSize,-1,null,null,null);
			}
		});
		
		//顺时针旋转
		$(".adjust-wind .clockwise").unbind("click").click(function(){
			if($(this).parents(".toolPanel").is(".mapAdjustPanel")){
				GIS.Element.modify(_gisParam.mapId,1,null,22.5,null,null,null,function(grid,data){
					GDZZ_TOOLS.writeTemporaryGrid(grid);
					GridPanel_PageParam.updateStationTable(data);
				});
			}else{
				var bufferSize = $('.freeAreaPanel .input-wind[name=bufferSize] input').val();
				GIS.GridEdit.areaSetValue(_gisParam.mapId,"direction",bufferSize,1,null,null,null);
			}
		});
		
		//等值线-增加提取的等值线值按钮-鼠标按下松开效果
		$('.contourLinePanel .addValue_button').bind('mousedown',function(){
			$(this).addClass('addValue_button-msd');
		});
		$('.contourLinePanel .addValue_button').bind('mouseup mouseout',function(){
			$(this).removeClass('addValue_button-msd');
		});
		//等值线-提取等值线-鼠标按下松开效果
		$('.contourLinePanel .countLine_refresh').bind('mousedown',function(){
			$(this).addClass('countLine_refresh-msd');
		});
		$('.contourLinePanel .countLine_refresh').bind('mouseup mouseout',function(){
			$(this).removeClass('countLine_refresh-msd');
		});
		$(".consistencyPanel").find('.consis-button,.synergy-btn').bind('mousedown', function(){
			$(this).addClass('btn-msd');
		});
		$(".consistencyPanel").find('.consis-button,.synergy-btn').bind('mouseup mouseout',function(){
			$(this).removeClass('btn-msd');
		});
		
		//等值线-提取等值线-点击事件
		$('.contourLinePanel .countLine_refresh').bind('click',function(){
			var lineValues = [];//面板上列出来的等值线值,用于提取等值线
			$('.contourLinePanel .contourLineValue').each(function(i){
				var lineValue = $(this).attr('value');
				lineValues.push(Number(lineValue));
			});
			if(lineValues.length > 0){
				GIS.GridEdit.getContourLine(_gisParam.mapId,lineValues,gisTool);
			}else{
				GIS.GridEdit.drag(_gisParam.mapId);//清空页面上的等值线,重新激活等值线工具
				gisTool();
			}
		});
		
		//等值线-增加提取的等值线值-按下回车
		$('.contourLinePanel .addValue_input input').bind('keypress', function(e){
			if(e.keyCode == 13){
				$('.contourLinePanel .addValue_button').click();
				$(this).select();
			}
		});
		//数据刷-点击  + - =
		$(".brushPanel .alterMethod").bind('click', function(){
			$(this).parent().find('.alterMethod-clk').removeClass('alterMethod-clk');
			$(this).addClass('alterMethod-clk');
			_gisParam.alterMethod = $(this).attr("value");
			gisTool();
		});
		//数据刷面板-框中的值改变
		$(".brushPanel .input-param input").bind('input propertychange', function(){
			var valueStr = $(this).val().replace(/\s+/, "");
			var value = Number(valueStr);
			if(valueStr == '' || valueStr == "-"){
				return;
			}
			var $div = $(this).parent();
			var borderV = Number($div.parent().find('.input-param[name=border]').attr('value'));
			var centerV = Number($div.parent().find('.input-param[name=center]').attr('value'));
			var name = $div.attr('name');
			if(_gisParam.drawMethod == "hollow"){
				//凹槽,中心值不能超过边界值
				if(name == "center"){
					//$(this).val(value);
					$div.parent().find('.input-param[name=border]').attr('min', value);//修改的是中心值，要将边界值的下界设置为中心值
				}else if(name == "border"){
					$div.parent().find('.input-param[name=center]').attr('max', value);//修改的是边界值，要将中心值的上限设置为边界值
				}
			}else if(_gisParam.drawMethod == "bulge"){
				//凸脊,边界值不超过中心值
				if(name == "center"){
					$div.parent().find('.input-param[name=border]').attr('max', value);//修改的是中心值，要将边界值的上限设置为中心值
				}else if(name == "border"){
					$div.parent().find('.input-param[name=center]').attr('min', value);//修改的是边界值，要将中心值的下界设置为边界值
				}
			}
			_gisParam[name] = value;
			gisTool();
		});
		
		$(".consistencyPanel .switch-icon").bind('click', function(){
			if($(this).hasClass('icon-xiangxia')){//点击的是向下的按钮,将按钮的样式改为向上,展开内容区域
				$(this).removeClass('icon-xiangxia');
				$(this).addClass('icon-xiangshang');
				$(this).parent().attr('station', 'opened');
				$(this).parent().next().show();
			}else if($(this).hasClass('icon-xiangshang')){//点击的是向上的按钮,将按钮的样式改为向下,收起内容区域
				$(this).removeClass('icon-xiangshang');
				$(this).addClass('icon-xiangxia');
				$(this).parent().attr('station', 'closed');
				$(this).parent().next().hide();
			}
		});
		//一键协同
		$(".consistencyPanel .consis-button").bind('click', function(){
			var name = $(this).attr('name');
			if(name == 'check'){
				consisCheck();
			}else if(name == 'synergy'){
				for(var ele in _checkElements){
					if(_checkElements[ele] == 0){
						var element = null;
						if(ele == 'TP') element = 'TP1H';
						else if(ele == 'TMAX' || ele == 'TMIN') element = 'TMP';
						else if(ele == 'RHMAX' || ele == 'RHMIN') element = 'RH';
						synergy1HTo24H(GridPanel_PageParam.Select_Ele.fcstDate, element);
					}
				}
				GDZZ_TOOLS.showConsisResult();
			}
		});
		$(".consistencyPanel .synergy-btn").bind('click', function(){//TODO 事件
			var element = $(this).attr('element');//以哪个要素进行协同
			if(element == "ignore"){
				var $content = $(this).parents('.content');
				var ele =$content.attr('name');//忽略的是哪个要素
				_checkElements[ele] = 2;
				$content.attr('ignore', true);
				GDZZ_TOOLS.resetDiffNumber(ele);
			}else{
				startSynergy(element);
			}
		});
		//获取图例的配置数据
		GDZZ_TOOLS.readLagend();
	};
	
	var _hasCover = false;
	//TODO 工具点击事件的回调函数
	var toolClicked = function(details){
//		if(_gridParam == null){
//			return;//背景场还没有加载好,点击工具无效。
//		}
		var toolName = details.toolName;//工具名
		switch(toolName){
			case 'changePost' : 
				var post = GridPanel_PageParam.USERPOST == 3 ? 4:3;
				$.fn.gridPanel({flag : "upset",post:post});
				break;
			case 'assistAnalyse' :
				var data = {
					url : "elementCompare/query.do?startTime=" + $("#date").attr("value"),
					deMenuId : "6",
					flag : "1",
				};
				var url = G_CONTEXT.contextPath+"mainframe/init.do";//重新加载初始化界面
				var urlPost = G_CONTEXT.contextPath+"mainframe/getInitParam.do";//ajax请求封装参数
				$.ajax({
					type:'post',
					url:urlPost,
					data:data,//1标志打开综合预警-预警制作页面
					dataJson:'json',
					async:false,
					success:function(data){
						window.open(url,'newwindow','');
					}
				});
//				window.open(window.contextPath+"elementCompare/query.do");
				//alert( JSON.parse(JSON.stringify(_gridParam)) );
				//alert( _gridParam.element );
				//startSynergy(_gridParam.element);
				break;
			case 'focusArea' :
				var panel = $(".toolPanel.focusAreaPanel");
				$(".basicTools.tools_content").append(panel);
					panel.css({
						'top': 55,
						'right': 20,
						'width': 380
					});
					if(_gisParam.lockArea && _gisParam.areaCode && _gisParam.areaCode.length>0)
						GIS.GridEdit.areaLock(_gisParam.mapId,_gisParam.areaCode);
					if(details.trigger == true){
						$(".specific_tool[name=focusArea]").addClass("list_dropped");
						panel.show();
					}
					else{
						$(".specific_tool[name=focusArea]").removeClass("list_dropped");
						panel.hide();
					}
				break;
			case 'yjdz':
				
				GIS.GridEdit.clearByTypes("nGis",["splash","isoline","wind","windanimate","number","splash","isoline","number"]);
				GIS.Element.clearData("nGis");
				_gridParam.element="TP";
				GDZZ_TOOLS.readLagend();
				
				getMapData("TP","TP","gridData",false);
				//alert("yjdz");
				break;
			case 'yjzz':
				alert("yjzz");
				break;
			case 'clearArea' :
				GIS.GridEdit.drag(_gisParam.mapId);
				gisTool();
				break;
			case 'pan':
				_gisParam.toolName = details.toolName;
				mapPan(details);
				break;
			case 'initalExtent' : 
				//GridPanel_PageParam.clickNext();
				GIS.Common.initExtent(_gisParam.mapId);
				break;
			case 'undo' :
				undo();
				break;
			case 'redo':
				redo();
				break;
			case 'freeArea' : 
				
//				if(_gisParam.toolName == details.toolName && _gisParam.drawMethod == details.dropItem){
//					showfreeAreaPanel(details.clickedItem);
//					alert("return");
//					return;
//				}
				if(_gisParam.toolName != details.toolName  && _gisParam.mapLayer != "freeArea"){
					GIS.GridEdit.drag(_gisParam.mapId);
				}
				_gisParam.toolName = details.toolName;
				_gisParam.drawMethod = details.dropItem;
				//_gisParam.drawtype = "voluation";
				if(details.trigger){
					//打开格点制作windows
					$('#w').window('open');
//					$('.gridTools').find('[name=toGrid]').filter('.specific_tool').addClass('disactive');
//					$('.gridTools .specific_tool[name=copy_area]').removeClass('disactive');
//					$('.gridTools .specific_tool[name=move_area]').removeClass('disactive');
					freeAreaTool(details);
					_gisParam.mapLayer = "freeArea";//地图上显示的是任意区域的图层
					
				}else{
					_gisParam.toolName = "pan";
					mapPan(details);
					$('#w').window('close');
					closePanel();
				}

				break;
			case 'contourLine' :
				if(_gisParam.toolName != details.toolName && _gisParam.mapLayer != "contourLine"){
					GIS.GridEdit.drag(_gisParam.mapId);
				}
				_gisParam.toolName = details.toolName;
				_gisParam.mapLayer = toolName;//地图上显示的是等值线的图层
				_gisParam.drawMethod = details.dropItem;
				$('.gridTools .specific_tool[name=toGrid]').removeClass('disactive');
				$('.gridTools .specific_tool[name=copy_area]').removeClass('disactive');
				$('.gridTools .specific_tool[name=move_area]').removeClass('disactive');
				contourLineTool(details);
				break;
			case 'toGrid':
				_hasCover = true;
				GridPanel_PageParam.addCover(true,'loading');
				//GIS.GridEdit.calContourToGrid(_gisParam.mapId,["splash","isoline","number"],_rangeObj,null)
				if(!GIS.GridEdit.calContourToGrid(_gisParam.mapId,["splash","isoline","number"],_rangeObj,null)){
					GridPanel_PageParam.addCover(false);
				}
				break;
			case 'brush' :
				_gisParam.toolName = details.toolName;
				_gisParam.drawMethod = details.dropItem;
				_gisParam.mapLayer = toolName;//地图上显示的是数据刷的图层
				GIS.GridEdit.drag(_gisParam.mapId);
				$('.gridTools .specific_tool[name=toGrid]').addClass('disactive');
				$('.gridTools .specific_tool[name=copy_area]').addClass('disactive');
				$('.gridTools .specific_tool[name=move_area]').addClass('disactive');
				brushTool(details);
				break;
			case 'consistent' :
				/*_gisParam.toolName = "";
				GIS.GridEdit.drag(_gisParam.mapId);*/
				startSynergy(_gridParam.element);
				break;
			case 'deleteArea' :
				_gisParam.toolName = details.toolName;
				GIS.GridEdit.contourDelete(_gisParam.mapId);
				closePanel();
				break;
			case 'copy_area' :
				closePanel();
				_gisParam.toolName = details.toolName;
				if(!details.trigger){
					GIS.GridEdit.unBindTool(_gisParam.mapId);
					return;
				}
				if(_gisParam.mapLayer == "freeArea"){
					GIS.GridEdit.areaClone(_gisParam.mapId,"clone",_gisParam.eleType);
				}else if(_gisParam.mapLayer == "contourLine"){
					GIS.GridEdit.contourClone(_gisParam.mapId,"clone");
				}
				break;
			case 'move_area' :
				closePanel();
				_gisParam.toolName = details.toolName;
				if(!details.trigger){
					GIS.GridEdit.unBindTool(_gisParam.mapId);
					return;
				}
				if(_gisParam.mapLayer == "freeArea"){
					GIS.GridEdit.areaClone(_gisParam.mapId,"cut",_gisParam.eleType);
				}else if(_gisParam.mapLayer == "contourLine"){
					GIS.GridEdit.contourClone(_gisParam.mapId,"cut");
				}
				break;
			case 'loadStation':
				if($(".stationInfoPanel[name=stationInfo]:visible").length>0){
					$(".stationInfoPanel[name=stationInfo]").hide();
				}else
					$(".stationInfoPanel[name=stationInfo]").show();
				break;
			case 'layermanage'://图层管理
				var panel = $(".layerManagePanel[name=layermanage]");
				//$(".stationTools.tools_content").append(panel);
				panel.css({"right":"30px","top":"167px","height":"150px","position":"absolute","z-index":"1000"});
				$(".ctoolbar").css({"overflow-x": "hidden", "height":"100%","overflow-y": "auto" });
				if(details.trigger == true){
					//$(".specific_tool[name=layermanage]").addClass("list_dropped");
					panel.show();
				}
				else{
					$(".specific_tool[name=layermanage]").removeClass("list_dropped");
					panel.hide();
				}
				break;
			case 'chartsAdjust':
				showChartCorrect();
				break;
			case 'consistency':
				if($('.consistencyPanel').is(':visible')){
					closePanel();
				}else{
					consisCheck();// TODO 点击要素一致性按钮
				}
				break;
			case 'createwea':
				createwea();
				break;
			case 'createdis':
				createdis();
				break;
			case 'mapAdjust'://地图订正
				_gisParam.toolName = details.toolName;
				_gisParam.drawMethod = details.dropItem;
				var ele = GridPanel_PageParam.Select_Ele.channel!=null? GridPanel_PageParam.Select_Ele.channel : 'TP';
				var $freeAreaPanel;
				if(ele == "WEA"){
					$freeAreaPanel = $(".mapAdjustPanel[ele=mapAdjust]");
				}else{
					$freeAreaPanel = $(".mapAdjustPanel[ele=mapAdjust]");
					
				}
				var $freeAreaTool = details.clickedItem;
				$freeAreaTool.addClass("list_dropped");
				$freeAreaTool.children(".tool_icon").css({'margin-top':'0px'});
				$freeAreaTool.removeClass('trigger');
				$freeAreaTool.addClass('trigger-on');
				$freeAreaTool.parent().append($freeAreaPanel);
				var position = $freeAreaTool.position();
				if(ele == "EDA"){
					$(".mapAdjustPanel [flag=wind]").show();
					$(".mapAdjustPanel .icon-icon-close-4").css("margin-left","517px");
					$(".mapAdjustPanel .mapPanel-div").css("height","0px");
					$freeAreaPanel.css({
						'top': position.top + $freeAreaTool.height()+5,
						'left': -246,
						'width': 537,
						'z-index': $freeAreaTool.css("zIndex")-1
					});
				}else{
					$(".mapAdjustPanel [flag=wind]").hide();
					$(".mapAdjustPanel .icon-icon-close-4").css("margin-left","280px");
					$(".mapAdjustPanel .mapPanel-div").css("height","17px");
					$freeAreaPanel.css({
						'top': position.top + $freeAreaTool.height()+5,
						'left': 0,
						'width': 300,
						'z-index': $freeAreaTool.css("zIndex")-1
					});
				}

				GIS.GridEdit.weatherDraw(_gisParam.mapId,_gisParam.drawMethod,"station",null,function(grid,data){
					GDZZ_TOOLS.writeTemporaryGrid(grid);
					GridPanel_PageParam.updateStationTable(data);
				});
				
				$freeAreaPanel.show();
				break;
		}
	};
	
	/**
	 * 任意区域点击之后
	 * @param details 从工具中传过来的参数
	 */
	function freeAreaTool(details){
		//打开面板
		showfreeAreaPanel(details.clickedItem);
		//获取面板上的选中值,设置调用GIS接口的参数,激活GIS工具
		var $freeAreaPanel = $(".freeAreaPanel:visible");
		var ele = $freeAreaPanel.attr('ele');
		_gisParam.ele = ele;
		if(ele == 'TP'){
			var altertype = $freeAreaPanel.find('.altertype .btn-radio-clk').attr('value');//类型： kuaisu jingtiao
			var timeConti = $freeAreaPanel.find('.time-continue').hasClass('time-continue-clk');//是否事件连续, false不连续
			var drawtype = $freeAreaPanel.find('.method-' + altertype + '.draw-method-clk').attr('value');//方式是赋值、渐变...
			if(!drawtype){
				drawtype = $freeAreaPanel.find('.method-' + altertype + ' .draw-method-clk').attr('value');
			}
			//alert(altertype+"_"+timeConti+"_"+drawtype);
			_gisParam.altertype = altertype;
			_gisParam.timeConti = timeConti;
			_gisParam.drawtype = drawtype;
			_gisParam.alterMethod = $freeAreaPanel.find('.alterGroup input:radio:checked').val();
		}else if(ele == 'WEA'){
			var weatherCode = $freeAreaPanel.find('.item-weather-clk').attr('code');
			weatherCode = weatherCode<10?"0"+weatherCode:weatherCode;
			_gisParam.weather = weatherCode;
		}else if(ele == 'EDA'){
			_gisParam.alterMethod = $freeAreaPanel.find('.alterGroup input:radio:checked').val();
			//alert(_gisParam.alterMethod );
		}
		gisTool();
	}
	
	/**
	 * 等值线工具被点击之后
	 * @param details 从工具中传过来的参数
	 */
	function contourLineTool(details){
		showContourLinePanel(details.clickedItem);
		_gisParam.lineValue = panelValue();//等值线的值
		gisTool();
	}
	
	/**
	 * 数据刷工具被点击之后
	 * @param details 从工具中传过来的参数
	 */
	function brushTool(details){
		//点击的是下拉列表,打开面板
		showBrushPanel(details.clickedItem);
		
		//设置调GIS的参数
		$('.brushPanel .input-param').each(function(){
			var name = $(this).attr('name');
			_gisParam[name] = Number($(this).attr('value'));
		});
		_gisParam.alterMethod = $('.brushPanel .alterMethod-clk').attr('value');
		gisTool();
	}
	/**
	 * 文本框绑定事件
	 */
	function bindinput(){
		//数值输入框的值
		$('div[type=input-number]').each(function(){
			var value = $(this).attr('value');
			$(this).find('input').val(value);
		});
		
		$('div[type=input-number] input').bind('input propertychange', function(){
			var valueStr = $(this).val().replace(/\s+/, "");
			var value = Number(valueStr);
			var defaultN = $(this).parent().attr('value');
			if(valueStr == '-'){//负号特殊处理
				return;
			}else if(!value && value != 0){//非数字的字符
				$(this).val(defaultN);
			}else if(valueStr != ""){
				//保留一位小数
				var index = valueStr.indexOf('.');
				if(index >= 0 && valueStr.length - index > 2){
					valueStr = valueStr.slice(0, index+2);
					value = Number(valueStr);
					$(this).val(value);
				}else{
					//$(this).val(value);
				}
				$(this).parent().attr('value', value);
			}else if(valueStr == ""){
				$(this).val("");
			}
			//转向风的缓冲区
			if(_gisParam.toolName == "freeArea" &&_gisParam.drawMethod == "turnWind"){//转向风时,实时改值
				var bufferSize = Number($(this).val());
				if(bufferSize < 0.1){
					bufferSize = 0.1;
					$(this).val(0.1);
				}
				GIS.GridEdit.addToMapWind(_gisParam.mapId,null, bufferSize);
			}
		});
		//风速改变之后面板联动
		$('.freeAreaPanel .input-wind[name=windSpeed] input').bind('input propertychange', function(){
			var speed = Number($(this).val());
			if(speed < 0){
				speed = 0;
				$(this).val(0);
			}
			var level = windSpeedToLevel(speed);
			$('.freeAreaPanel .windSymbol-clk').removeClass('windSymbol-clk');
			$('.freeAreaPanel .windSymbol[level='+level+']').addClass('windSymbol-clk');
			if(_gisParam.toolName == "freeArea" &&_gisParam.drawMethod == "turnWind"){//转向风时,实时改值
//			//	if($('.freeAreaPanel .windParam #windSpeed').prop('checked'))
					GIS.GridEdit.addToMapWind(_gisParam.mapId,null, Number($('.freeAreaPanel .input-buffer').attr('value')));
			}
		});
		//风速改变之后面板联动-地图订正
		$('.mapAdjustPanel .input-param[name=statVal] input').bind('input propertychange', function(){
			var speed = Number($(this).val());
			if(speed < 0){
				speed = 0;
				$(this).val(0);
			}
			var level = windSpeedToLevel(speed);
			$('.mapAdjustPanel .windSymbol-clk').removeClass('windSymbol-clk');
			$('.mapAdjustPanel .windSymbol[level='+level+']').addClass('windSymbol-clk');
			var range = {min:_valueLimit[_gridParam.element][0],max:_valueLimit[_gridParam.element][1]};
			var $windSpeed = $('.mapAdjustPanel .input-param[name=statVal]');
			$windSpeed.attr('value', speed);
			$windSpeed.find('input').val(speed);
			GIS.Element.modify(_gisParam.mapId,0,speed,null,range,range,null,function(grid,data){
				GDZZ_TOOLS.writeTemporaryGrid(grid);
				GridPanel_PageParam.updateStationTable(data);
			});
		});
		$('div[type=input-number] input').unbind('focusout').bind('focusout', function(){
			var changed = false;
			var valueStr = $(this).val().replace(/\s+/	, "");
			var value = Number(valueStr);
			if(valueStr == ""){
				value = $(this).parent().attr('value');
				changed = true;
			}
			//先检验是否超过上下限
			var $div = $(this).parent();
			var max = Number($div.attr('max'));
			var min = Number($div.attr('min'));
			if(max != null && value > max){
				value = max;
				changed = true;
			}else if(min != null && value < min){
				value = min;
				changed = true;
			}
			if(changed == true){
				$(this).val(value);
				$div.attr('value', value);
				$(this).trigger('propertychange');
			}
		});
		//输入框-效果
		$('div[type=input-number] .input-container').unbind('mouseenter').bind('mouseenter',function(){
			$(this).find('.input-content').css({"visibility":"visible"});
		});
		$('div[type=input-number] .input-container').unbind('mouseleave').bind('mouseleave',function(){
			$(this).find('.input-content').css({"visibility":"hidden"});
		});
		$("div[type=input-number] .input-content").unbind('mousedown').bind('mousedown',function(){
			$(this).addClass('input-content-msd');
		});
		$("div[type=input-number] .input-content").unbind('mouseup').bind('mouseup',function(){
			$(this).removeClass('input-content-msd');
		});
		
		//输入框-键盘上下键
		$('div[type=input-number] input').unbind('keydown').bind('keydown', function(e){
			if(e.keyCode == 38){//上
				e.preventDefault();
				$(this).parent().find('.input-content').eq(0).click();
			}else if(e.keyCode == 40){//下
				e.preventDefault();
				$(this).parent().find('.input-content').eq(1).click();
			}
		});
		
		//点击向上-向下的按钮
		$('div[type=input-number] .input-content').unbind('click').bind('click',function(){
			var $span = $(this).find('span');
			var $div = $(this).parents('div[type=input-number]');
			var step = Number($div.attr('step'));
			step = !step || step == 0? 1:step;
			var param = $span.attr('type') == 'up' ? 1 : -1;
			var value = (Number($div.attr('value')) + param*step) * 10 / 10;
			
			var max = Number($div.attr('max'));
			if(param == 1 && max != null && value > max){//值增加了,检查上限
				value = max;
			}
			var min = Number($div.attr('min'));
			if(param == -1 && min != null && value < min){//值减少了,检查下限
				value = min;
			}
			
			$div.attr('value', value);
			$div.find('input').val(value);
			$div.find('input').trigger('propertychange');
		});
		//工具箱点击
		$(".tool-menu-list-expand-btn").unbind("click").bind("click", function(){
			var $this = $(this);
			if($this.hasClass("tool-menu-expand-on")){
				$(".tool-menu-list").animate({width : "0px"}, function(){
					$this.removeClass("tool-menu-expand-on");
				});
			}else{
				$(".tool-menu-list").animate({width : "200px"}, function(){
					$this.addClass("tool-menu-expand-on");
				});
			}
		});
		//管理工具条点击
		$(".tool-menu").unbind("click").bind("click", function(){
			var $this = $(this);
			if($this.hasClass("tool-menu-act")){
				$this.removeClass("tool-menu-act");
				utilPanelShowDialog($this.attr("name"),false);
			}else{
				$this.addClass("tool-menu-act");
				utilPanelShowDialog($this.attr("name"),true);
			}
		});
		//站点管理-新增
		$(".stationInfoPanel[name=stationEdit] .edit-div span[name=add]").bind("click", function(){
			var panel = $(".stationInfoPanel[name=stationEdit] .stationEditTable");
			var saveBut = $(".stationInfoPanel[name=stationEdit] .edit-tr-hide span[name=save]");
			if(panel.find(".edit-tr-hide:visible").length>0 && !saveBut.attr("code")){
				panel.find(".edit-tr-hide").hide();
			}else{
				$(".stationInfoPanel[name=stationEdit] .stationEditTable tr:gt(1):hidden").show();
				saveBut.attr("code","");
				$(".stationInfoPanel[name=stationEdit] .edit-tr-hide input").val("");
				panel.find(".edit-tr-hide").show();
				$(".stationEditTable tr:odd").css("background","#D2EBF5");
				$(".stationEditTable tr:even").css("background","#FFF");
				$(".stationEditTable tr:eq(0)").css("background","#CCC");
			}
		});
		//站点管理-保存\更改
		$(".stationInfoPanel[name=stationEdit] .edit-tr-hide span[name=save]").bind("click", function(){
			var panel = $(".stationInfoPanel[name=stationEdit] .edit-tr-hide");
			var station = {};
			var url = "gdzz/saveStat.do";
			if($(this).attr("code")){
				url = "gdzz/updateStat.do";
				station.statCode = $(this).attr("code");
			}
			panel.find("input").each(function(index,ele){
				station[ele.name] = ele.value;
			});
			$.post(window.contextPath + url,station,
				function(result){
					if(result.success){
						$(".stationInfoPanel[name=stationEdit] .stationEditTable tr:gt(1):hidden").remove();
						panel.hide();
						var sType = station.type == '0'?"国家": station.type == '1'?"区域":"";
						var edit = "";
						if(station.type!=0 || station.type != 1){
							edit = "<a name=edit href='#'>编辑</a><a name=del href='#'>删除</a>";
						}
						var html = "<tr><td>"+(station.code||'')+"</td><td>"+(station.name||'')+"</td><td>"
							+(sType||'')+"</td><td>"+(station.lon||'')+"</td><td>"+(station.lat||'')
							+"</td><td class='edit-td' code="+(station.code)+">"+edit+"</td></tr>";
						panel.after(html);
						$(".stationEditTable tr:odd").css("background","#D2EBF5");
						$(".stationEditTable tr:even").css("background","#FFF");
						$(".stationEditTable tr:eq(0)").css("background","#CCC");
						stationEditBind();
					}
			 }, "json");
		});
		//图层管理-按钮
		$(".ctoolbar .but-inner .slider").unbind("click").bind("click",function(){
			var $this = $(this);
			var type = $this.attr("type");
			var pType = $this.parents(".but-inner").attr("type");
			if($this.prev().is(":hidden")){
				$this.prev().show();
				$this.next().hide();
				$this.find("div").css("margin-left",-12);
				$this.prev().animate({width:48},100);
				_layerManage.forEach(function(ele,index){
					if(ele.type == type && ele[type]==pType)
						ele.flag = true;
				});
			}else{
				$this.prev().animate({width:12},100,function(){
					$this.find("div").css("margin-left",0);$this.prev().hide();$this.next().show();
				});
				_layerManage.forEach(function(ele,index){
					if(ele.type == type && ele[type]==pType)
						ele.flag = false;
				});
			}
			layerManage();
		});
	}
	//图层管理
	function layerManage(){
		_layerManage.forEach(function(ele,index){
			var type = ele.type;
			var pType = ele[type];
			switch(type){
			case "station":
				GIS.Element.isShowAll(_gisParam.mapId,ele.flag);
				break;
			case "grid":
				GIS.GridEdit.showControll(_gisParam.mapId,pType,ele.flag);
				break;
			case "cut":
				GIS.Element.gpLayer(_gisParam.mapId,'f',ele.flag);
				break;
			case "buffer":
				//GIS.GridEdit.changeStyles(_gisParam.mapId,'splash',[pType],[ele.flag]);
				//GIS.GridEdit.changeStyles(_gisParam.mapId,'number',[pType],[ele.flag]);
				break;
			case "gp":
				GIS.Element.gpLayer(_gisParam.mapId,'f',ele.flag);
				//GIS.GridEdit.changeStyles(_gisParam.mapId,'number',[pType],[ele.flag]);
				break;
			}
			
		
		});
	
	};
	function stationEditBind(){
		//编辑
		$(".stationInfoPanel[name=stationEdit] a[name=edit]").unbind("click").bind("click", function(){
			var $this = $(this).parents("tr");
			var panel = $(".stationInfoPanel[name=stationEdit] .edit-tr-hide");
			panel.find("input").each(function(index,ele){
				ele.value = $this.find("td").eq(index).text();
			});
			$(".stationInfoPanel[name=stationEdit] .edit-tr-hide span[name=save]").attr("code",$(this).parent("td").attr("code"));
			$this.hide();
			panel.show();
			$(".stationEditTable tr:visible:odd").css("background","#D2EBF5");
			$(".stationEditTable tr:visible:even").css("background","#FFF");
			$(".stationEditTable tr:visible:eq(0)").css("background","#CCC");
		});
		//删除
		$(".stationInfoPanel[name=stationEdit] a[name=del]").unbind("click").bind("click", function(){
			var $this = $(this).parents("tr");
			var code = $(this).parent("td").attr("code");
			var panel = $(".stationInfoPanel[name=stationEdit] .edit-tr-hide");
			var station = {};
			station.statCode = code;
			station.status = 1;
			panel.find("input").each(function(index,ele){
				station[ele.name] = $this.find("td").eq(index).text();
			});
			$.post(window.contextPath + "gdzz/updateStat.do",station,
					function(result){
						if(result.success){
							$this.remove();
						}
					});
		});
		
	}
	/**
	 * 工具条对应面板显示
	 */
	function utilPanelShowDialog(panelName,isShow){
		var panel = undefined;
		switch(panelName){
			case 'referenceDis' : //参考落区
				break;
			case 'DataMonitoring' : //数据监控
				var url = G_CONTEXT.contextPath + "toolMenu/warningSignal.do";
				if(isShow)
				{
					showDataMonitoring("dataMonitoring", "数据监控", url, 1280, 550);
				}
				return;
			case 'setGrid' : //格点设置
				var url = G_CONTEXT.contextPath + "toolMenu/villagesAndTowns.do";
				if(isShow)
				{
					showDataMonitoring("villagesAndTowns", "乡镇预报", url, 1040, 550);
				}
				return;
			case 'setBackground' : //底板设置
				break;
			case 'sationEdit' : //站点管理
				panel = $(".stationInfoPanel[name=stationEdit]");
				if(isShow){
					$.post(window.contextPath + "gdzz/queryStatList.do", 
						function(result){
							if(result.success){
								panel.find("table.stationEditTable tr:gt(1)").remove();
								
								result.params.dataList.forEach(function($ele,index){
									var sType = $ele.type == '0'?"国家": $ele.type == '1'?"县级":"";
									var edit = "";
									if($ele.type>1){
										edit = "<a name=edit href='#'>编辑</a>&emsp;<a name=del href='#'>删除</a>";
									}
									var html = "<tr><td>"+($ele.code||'')+"</td><td>"+($ele.name||'')+"</td><td>"
										+(sType||'')+"</td><td>"+($ele.lon||'')+"</td><td>"+($ele.lat||'')+
										"</td><td class='edit-td' width=70px code="+($ele.code)+">"+edit+"</td></tr>";
									panel.find("table.stationEditTable").append(html);
								});
								$(".stationEditTable tr:odd").css("background","#D2EBF5");
								$(".stationEditTable tr:even").css("background","#FFF");
								$(".stationEditTable tr:eq(0)").css("background","#CCC");
							}
							stationEditBind();
					 }, "json");
				}
				break;
			case 'productForecast' : //产品预报
				var data = {
					url : "fwzz/fwzz_main.do",//跳转路径
					deMenuId : "7"//菜单的id
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
				break;
		}
		if(panelName != "DataMonitoring")
		{
			if(isShow && panel){
				panel.show();
			}else{
				panel.hide();
			}
		}
	}
	
	/**
	 * 获取面板上的参数设置
	 */
	function panelValue(){
		var inputValue = $('.contourLinePanel .input-param').attr('value');
		return Number(inputValue);
	}
	
	// 获取任意区域面板上缓冲区、参数设置的值
	var getFreeAreaParam = function(a){
		var param = {};
		if(_gridParam.channel != 'EDA'){
			$('.freeAreaPanel[ele=TP] .input-param').each(function(){
				var name = $(this).attr('name');
				param[name] = Number($(this).attr('value'));
			});
		}else if(_gridParam.channel == 'EDA'){
			//if(a){
				if(a==1)param.center = Number($('.freeAreaPanel .input-wind[name=windSpeed]').attr('value'));
				
				if(a==2){
					param.center = null;
					param.border = null;
				}
//				$('.freeAreaPanel .input-wind').each(function(){
//					var name = $(this).attr('name');
//					if(name == "windSpeed"){
//						//param.center = Number($(this).attr('value'));
//						param.center = null;
//					}else if(name == "bufferSize"){
//						
//					}else if(name == "windDir"){
//						var angle = Number($(this).attr('angle'));
//						angle += 22.5*a;
//						angle = angle >= 360 ? 0 : angle;
//						angle = angle < 0 ? 337.5 : angle;
//						$(this).attr('angle', angle);
//						var index = Math.floor(angle / 22.5);
//						var desc = $('.freeAreaPanel .wind-direction').eq(index).text();
//						$(this).val(desc);
//						param.border = angle;
//					}
//				});
////				if(!$('.freeAreaPanel .windParam #windSpeed').prop('checked')){
////					param.center = null;
////				}
////				if(!$('.freeAreaPanel .windParam #windDirection').prop('checked')){
////					param.border = null;
////				}
//				
//			}else{
//				
////				$('.freeAreaPanel .windParam #select-All').prop('checked', false);
//				
//			}
			param.bufferSize = Number($('.freeAreaPanel .input-wind[name=bufferSize]').attr('value'));
		}
		return param;
	};
	
	/**
	 * 显示等值线面板
	 */
	function showContourLinePanel($contourLineTool){
		closePanel();//先将其他的面板隐藏
		$contourLineTool.addClass("list_dropped");
		$contourLineTool.children(".tool_icon").css({'margin-top':'0px'});
		$contourLineTool.removeClass('trigger');
		$contourLineTool.addClass('trigger-on');
		if($('.contourLinePanel .contourLineValues').length == 0){
			setLegendValue(_legendValues);
		}
		var $contourLinePanel = $(".contourLinePanel");
		$contourLinePanel.show();
		$contourLineTool.parent().append($contourLinePanel);
		
		var position = $contourLineTool.position();
		$contourLinePanel.css({
			'top': position.top + $contourLineTool.height()+5,
			'left': 0,
			'z-index': $contourLineTool.css("zIndex")-1
		});
	}
	
	/**
	 * 设置面板上列出的等值线值
	 */
	function setLegendValue(_legendValues){
		if(!_legendValues)return;
		_legendValues.sort(function(a, b){
			return a - b;
		});
		//console.log(_legendValues);
		var contourLinePart1 = $(".contourLinePanel .contourLinePart1");
		var contourLinePart2 = $(".contourLinePanel .contourLinePart2");
		$('.contourLinePanel .contourLineValues').remove();
		for(var i=0; i < _legendValues.length; i++){
			if(_legendValues[i] === "")continue;
			var $value = $('<div class="contourLineValues"><div class="contourLineValue" value='+_legendValues[i]+'>'+_legendValues[i]+'</div><span class="remove_countLine icon-icon-close-4"></span></div>');
			if(i <= 2){
				contourLinePart1.append($value);
			}else{
				contourLinePart2.append($value);
			}
		}
		//绑定删除等值线的 x
		$('.contourLinePanel .remove_countLine').click(function(){
			var value = $(this).prev().text();
			var index = _legendValues.indexOf(Number(value));
			_legendValues.splice(index, 1);
			setLegendValue(_legendValues);
		});
	}
	
	/**
	 * 显示数据刷面板
	 */
	function showBrushPanel($brushTool){
		closePanel();
		$brushTool.addClass("list_dropped");
		$brushTool.children(".tool_icon").css({'margin-top':'0px'});
		var $brushPanel = $(".brushPanel");
		$brushTool.removeClass('trigger');
		$brushTool.addClass('trigger-on');
		var drawMethod = $brushTool.find('.span_title').attr('name');
		var $center = $('.brushPanel .input-param[name=center]');
		var $border = $('.brushPanel .input-param[name=border]');
		var centerV = Number($center.attr('value'));
		var borderV = Number($border.attr('value'));
		if(drawMethod == "stamp"){
			//盖章没有中心和边界的区别
			$border.hide();
			$border.prev('.panel_label[name=border]').hide();
			$center.prev('.panel_label').text('参数设置');
			if(_valueLimit[_gridParam.element][0] != null){
				$center.attr('min', _valueLimit[_gridParam.element][0]);
			}else{
				$center.removeAttr('min');
			}
			if(_valueLimit[_gridParam.element][1] != null){
				$center.attr('max', _valueLimit[_gridParam.element][1]);
			}else{
				$center.removeAttr('max');
			}
		}else if(drawMethod == "hollow"){
			$border.show();
			$border.prev('.panel_label[name=border]').show();
			$center.prev('.panel_label').text('中心值');
			if(centerV > borderV){
				//点凹槽的时候面板上中心点的值大于边界点的值，所以需要设置面板上中心点和边界点的上下限及输入的值。
				if(_valueLimit[_gridParam.element][0] != null){
					$center.attr('min', _valueLimit[_gridParam.element][0]);
				}else{
					$center.removeAttr('min');
				}
				$center.attr('value',borderV);
				$center.find('input').val(borderV);
				$center.attr("max", centerV);
				if(_valueLimit[_gridParam.element][1] != null){
					$border.attr('max', _valueLimit[_gridParam.element][1]);
				}else{
					$border.removeAttr('max');
				}
				$border.attr('value',centerV);
				$border.find('input').val(centerV);
				$border.attr("min", borderV);
			}else{
				$center.attr("max", borderV);
				$border.attr("min", centerV);
			}
		}else if(drawMethod == "bulge"){
			$border.show();
			$border.prev('.panel_label[name=border]').show();
			$center.prev('.panel_label').text('中心值');
			if(centerV < borderV){
				//点凸脊的时候面板上中心点的值小于边界点的值，说明上次打开的不是凸脊的面板，所以需要设置面板上中心点和边界点的上下限及输入的值。
				if(_valueLimit[_gridParam.element][1] != null){
					$center.attr('max', _valueLimit[_gridParam.element][1]);
				}else{
					$center.removeAttr('max');
				}
				$center.attr('value',borderV);
				$center.find('input').val(borderV);
				$center.attr("min", centerV);
				if(_valueLimit[_gridParam.element][0] != null){
					$border.attr('min', _valueLimit[_gridParam.element][0]);
				}else{
					$border.removeAttr('min');
				}
				$border.attr('value',centerV);
				$border.find('input').val(centerV);
				$border.attr("max", borderV);
			}else{
				$center.attr("min", borderV);
				$border.attr("max", centerV);
			}
		}
		$brushPanel.show();
		$brushTool.parent().append($brushPanel);
		var position = $brushTool.position();
		$brushPanel.css({
			'top': position.top + $brushTool.height()+5,
			'left': 0,
			'z-index': $brushTool.css("zIndex")-1
		});
	}
	
	/**
	 * 显示任意区域面板
	 */
	function showfreeAreaPanel($freeAreaTool){
		closePanel();
		$freeAreaTool.addClass("list_dropped");
		$freeAreaTool.children(".tool_icon").css({'margin-top':'0px'});
		var ele = 'TP';
		var $freeAreaPanel;
		if(ele == "WEA"){
			$freeAreaPanel = $(".freeAreaPanel[ele=WEA]");
		}else if(ele == "DIS"){
			$freeAreaPanel = $(".freeAreaPanel[ele=DIS]");
		}else if(ele == "EDA"){
			alert("EDA");
			$freeAreaPanel = $(".freeAreaPanel[ele=EDA]");
			GIS.GridEdit.selectAll(_gisParam.mapId,false,function(){
				$this.prop('checked', false);
			});
			if(_gisParam.drawMethod == "turnWind"){//显示转向风面板
				$('.freeAreaPanel .not-turn').hide();
				$("#wind_selectAll").hide();
				$freeAreaPanel.find('.alterGroup').css({"margin-left":"-30px","width": "180px","display": "inline-block"});
				$('.freeAreaPanel .windParam #select-All').prop('checked', false);
				$('.freeAreaPanel .turn').show();
				$(".adjust-wind").hide();
				var windspeed = $("#wind-panel2 div[name=wind-speed]").remove();
				$("#wind-panel3").prepend(windspeed);
				bindinput();
			}else{
				$('.freeAreaPanel .not-turn').show();
				$("#wind_selectAll").show();
				$freeAreaPanel.find('.alterGroup').css({"margin-left":"30px","width": "128px","display":"inline-block","line-height":"0px"});
				$('.freeAreaPanel .turn').hide();
				$("#select-All").attr("checked",false);
				$(".adjust-wind").show();
				var windspeed = $("#wind-panel3 div[name=wind-speed]").remove();
				$("#wind-panel2").prepend(windspeed);
				bindinput();
			}
		}else{
			$freeAreaPanel = $(".freeAreaPanel[ele=TP]");
		}
		$freeAreaTool.removeClass('trigger');
		$freeAreaTool.addClass('trigger-on');
		
		
		
		$freeAreaPanel.show();
		
		//$freeAreaTool.parent().append($freeAreaPanel);
		var position = $freeAreaTool.position();
		var bodyWidth=$(window).width();
		$freeAreaPanel.css({
			'top': position.top + $freeAreaTool.height()+105,
			'left': bodyWidth-300-40,
			'width':300,
			'height':150,
			'z-index': $freeAreaTool.css("zIndex")-1
		});
	}
	
	/**
	 * 关闭面板
	 */
	function closePanel(){
		_checkElements = {"TP24H":0,"TMAX":0,"TMIN":0,"RHMAX":0,"RHMIN":0,"TPTMP":0,"TPRH":0,"TPTCC":0};
		$('.toolPanel:not(".focusAreaPanel")').hide();
		$(".list_dropped").children(".tool_icon").css({'margin-top':'5px'});
		$(".list_dropped").removeClass("list_dropped");
	}
	
	/**
	 * 用于GIS回调,根据传过来的值设置数据刷面板上半径的值
	 */
	function paramCall(value){
		value = Number(value).toFixed(1);
		if(_gisParam.toolName == "brush"){
			var $radiusInput = $('.brushPanel .input-param[name=radius]');
			$radiusInput.find('input').val(value);
			$radiusInput.attr('value', value);
			_gisParam.radius = value;
		}else if(_gisParam.toolName == "contourLine"){
			/*var $valueInput = $('.contourLinePanel').find('[name="lineValue"]').filter('.panel_input');
			$valueInput.val(value);
			_gisParam.lineValue = value;*/
		}
	}

	/**
	 * 开关地图漫游
	 */
	function mapPan(details){
		GIS.GridEdit.unBindTool(_gisParam.mapId);//打开漫游工具
		closePanel();//隐藏工具面板
	}
	
	/**
	 * TODO 激活GIS工具
	 */
	function gisTool(){
		var drawMethod = _gisParam.drawMethod;
		if(_gisParam.toolName == "freeArea"){
			if(_gisParam.ele == 'TP'){//降水面板
				var isImm = true;//快速/精调
				if(_gisParam.altertype == 'kuaisu'){
					isImm = true;
				}else if(_gisParam.altertype == 'jingtiao'){
					isImm = false;
				}
				var opType = _gisParam.drawtype;//赋值/渐变/中心点/中心线...
				var station = 0;
				if(_gisParam.alterMethod == "plus"){
					station = 1;
				}else if(_gisParam.alterMethod == "minus"){
					station = -1;
				}else if(_gisParam.alterMethod == "equal"){
					station = 0;
				}
				
				GIS.GridEdit.areaDraw(_gisParam.mapId, drawMethod,isImm,opType,getFreeAreaParam,station, _gisParam.eleType);
			}else if(_gisParam.ele == 'WEA' || _gisParam.ele == "DIS"){
//				alert('任意区域-天气现象-'+_gisParam.weather);
				var type = true;
				if(_gisParam.ele == 'WEA' && $(".freeAreaPanel #wea-dj:checked").length>0)
					type = false;
				GIS.GridEdit.weatherDraw(_gisParam.mapId,drawMethod,type,null,null,function(){
					GIS.GridEdit.weatherValue(_gisParam.mapId,$(".freeAreaPanel #wea-over").is(":checked"),Number(_gisParam.weather));//天气现象赋值
				});//天气现象绘制
			}else if(_gisParam.ele == 'EDA'){
				if(_gisParam.drawMethod == "turnWind"){
					//var speed = $('.freeAreaPanel .windParam #windSpeed').prop('checked') ? Number($('.freeAreaPanel .input-wind[name=windSpeed]').attr('value')) : null;
					var buffer = Number($('.freeAreaPanel .input-buffer').attr('value'));
					GIS.GridEdit.addToMapWind(_gisParam.mapId, null, buffer);
				}else{
					var station = 0;
					if(_gisParam.alterMethod == "plus"){
						station = 1;
					}else if(_gisParam.alterMethod == "minus"){
						station = -1;
					}else if(_gisParam.alterMethod == "equal"){
						station = 0;
					}
					GIS.GridEdit.areaDraw(_gisParam.mapId, drawMethod,true,'wind',getFreeAreaParam,station, _gisParam.eleType);
				}
			}
		}else if(_gisParam.toolName == "contourLine"){
			//等值线绘制
			if(drawMethod == "clickDraw"){
				GIS.GridEdit.contourEdit(_gisParam.mapId, _gisParam.lineValue, _gisParam.eleType, panelValue, paramCall);
			}else if(drawMethod == "freeHand"){
				GIS.GridEdit.contourFreeEdit(_gisParam.mapId, _gisParam.lineValue, _gisParam.eleType,panelValue, paramCall);
			}else if(drawMethod == "centerPoint"){
				GIS.GridEdit.contourPointEdit(_gisParam.mapId, _gisParam.lineValue, _gisParam.eleType,panelValue, paramCall);
			}
		}else if(_gisParam.toolName == "brush"){
			//数据刷
			var stampType = 'g';
			if(drawMethod == "stamp"){
				stampType = 'g';//盖章
				_gisParam.border = _gisParam.center;
			}else if(drawMethod == "hollow"){
				stampType = 'a';//凹槽
			}else if(drawMethod == "bulge"){
				stampType = 't';//凸脊
			}
			var alterMethod  = 0;
			if(_gisParam.alterMethod == "plus"){
				alterMethod = 1;
			}else if(_gisParam.alterMethod == "minus"){
				alterMethod = -1;
			}else if(_gisParam.alterMethod == "equal"){
				alterMethod = 0;
			}
			var radius = _gisParam.radius;
			var value1 = _gisParam.center;
			var value2 = _gisParam.border;
			GIS.GridEdit.stamp(_gisParam.mapId, stampType, alterMethod, radius, value1, value2, paramCall, _gisParam.eleType);
		}else if(_gisParam.toolName == "mapAdjust"){
			GIS.GridEdit.weatherDraw(_gisParam.mapId,_gisParam.drawMethod,"station",null,function(grid,data){
				GDZZ_TOOLS.writeTemporaryGrid(grid);
				GridPanel_PageParam.updateStationTable(data);
			});
		}else if(_gisParam.toolName == ""){
			GIS.GridEdit.drag(_gisParam.mapId);
		}
	}
			
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
				if(_gridParam.channel == "TP"){//降水
					$title.text('降水协同');
					_gisParam.eleType = 'Rain';
					$('div[type=input-number][name=center]').attr('value', 7);
					$('div[type=input-number][name=center] input').val(7);
					$('div[type=input-number][name=border]').attr('value', 15);
					$('div[type=input-number][name=border] input').val(15);
					$('div[type=input-number][name=lineValue]').attr('value', 7);
					$('div[type=input-number][name=lineValue] input').val(7);
					$('.mapAdjustPanel .input-param:visible').attr('value', 7);
					$('.mapAdjustPanel .input-param:visible :input').val(7);
				}else if(_gridParam.channel == "TMP"){	
					$title.text('气温协同');
					_gisParam.eleType = 'temp';
					_legendValues = _legendValues.splice(0, 15);
					$('div[type=input-number][name=lineValue]').attr('value', 20);
					$('div[type=input-number][name=lineValue] input').val(20);
					$('div[type=input-number][name=center]').attr('value', 20);
					$('div[type=input-number][name=center] input').val(20);
					$('div[type=input-number][name=border]').attr('value', 24);
					$('div[type=input-number][name=border] input').val(24);
					$('.mapAdjustPanel .input-param:visible').attr('value', 20);
					$('.mapAdjustPanel .input-param:visible :input').val(20);
				}else if(_gridParam.channel == "RH"){
					$title.text('湿度协同');
					_gisParam.eleType = 'RH';
					$('div[type=input-number][name=lineValue]').attr('value', 60);
					$('div[type=input-number][name=lineValue] input').val(60);
					$('div[type=input-number][name=center]').attr('value', 60);
					$('div[type=input-number][name=center] input').val(60);
					$('div[type=input-number][name=border]').attr('value', 70);
					$('div[type=input-number][name=border] input').val(70);
					$('.mapAdjustPanel .input-param:visible').attr('value', 60);
					$('.mapAdjustPanel .input-param:visible :input').val(60);
				}else if(_gridParam.channel == "TCC"){
					$tool.addClass("disactive");
					_gisParam.eleType = 'RH';
					$('div[type=input-number][name=lineValue]').attr('value', 60);
					$('div[type=input-number][name=lineValue] input').val(60);
					$('div[type=input-number][name=center]').attr('value', 60);
					$('div[type=input-number][name=center] input').val(60);
					$('div[type=input-number][name=border]').attr('value', 70);
					$('div[type=input-number][name=border] input').val(70);
					$('.mapAdjustPanel .input-param:visible').attr('value', 60);
					$('.mapAdjustPanel .input-param:visible :input').val(60);
				}else if(_gridParam.channel == "EDA"){
					$title.text('风场协同');
					_gisParam.eleType = 'EDA';
					if(_gisParam && _gisParam.toolName == "freeArea"){
						$.fn.gridToolbar('recover', 'freeArea');
						GIS.GridEdit.drag(_gisParam.mapId);
						_gisParam.toolName = "";
					}
					$('.droplist_item[name=turnWind]').show();
					$('div[type=input-number][name=lineValue]').attr('value', 5);
					$('div[type=input-number][name=lineValue] input').val(5);
					$('div[type=input-number][name=windSpeed]').attr('value', 1);
					$('div[type=input-number][name=windSpeed] input').val(1);
					$('div[type=input-number][name=center]').attr('value', 3);
					$('div[type=input-number][name=center] input').val(3);
					$('div[type=input-number][name=border]').attr('value', 4);
					$('div[type=input-number][name=border] input').val(4);
					$('.mapAdjustPanel .input-param:visible').attr('value', 5);
					$('.mapAdjustPanel .input-param:visible :input').val(5);
				}else if(_gridParam.channel == "WEA" || _gridParam.channel == "DIS"){
					$tool.addClass("disactive");
					if(_gisParam && _gisParam.toolName == "freeArea"){
						$.fn.gridToolbar('recover', 'freeArea');
						GIS.GridEdit.drag(_gisParam.mapId);
						_gisParam.toolName = "";
					}
				}else if(_gridParam.channel == "VIS"){	
					$tool.addClass("disactive");
					_gisParam.eleType = 'VIS';
					$('div[type=input-number][name=lineValue]').attr('value', 10);
					$('div[type=input-number][name=lineValue] input').val(10);
					$('div[type=input-number][name=center]').attr('value', 10);
					$('div[type=input-number][name=center] input').val(10);
					$('div[type=input-number][name=border]').attr('value', 5);
					$('div[type=input-number][name=border] input').val(5);
					$('.mapAdjustPanel .input-param:visible').attr('value', 10);
					$('.mapAdjustPanel .input-param:visible :input').val(10);
				}else{
					$tool.addClass("disactive");
				}
				setLegendValue(_legendValues);
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
			GDZZ_TOOLS.checkDoable();
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
	 * 根据索引判断设置是否可以进行撤销和恢复
	 */
	GDZZ_TOOLS.checkDoable = function(){
		var index = Number(GridPanel_PageParam.Select_Ele.index);
		var max = Number(GridPanel_PageParam.Select_Ele.maxIndex);
		if(index > 0 || (_eleListArr.index >= 0)){
			//当前索引值大于0或者批量修改索引没有撤销到头，可以进行撤销
			$('.basicTools').find('[name=undo]').filter('.specific_tool').removeClass('disactive');
		}else{
			$('.basicTools').find('[name=undo]').filter('.specific_tool').addClass('disactive');
		}
		if(index < max || _eleListArr.index < _eleListArr.list.length - 1){
			//当前索引值小于最大索引值，或者批量修改的索引没有恢复到头，可以进行恢复
			$('.basicTools').find('[name=redo]').filter('.specific_tool').removeClass('disactive');
		}else{
			$('.basicTools').find('[name=redo]').filter('.specific_tool').addClass('disactive');
		}
	};
	/**
	 * 撤销
	 */
	function undo(){
		//var index = _eleListArr.index;
		//if(index <= -1){//被批量修改了的数据索引减到-1了，再撤销是对操作面板上单个格子的撤销
			_eleListArr.list = [];//清空批量修改要素列表
			_gridParam.index--;
			_gridParam.status = 1;
			reReadGridData(_gridParam);
			changeCell(_gridParam);
		/*}else{
			GDZZ_TOOLS.indexMultiChange(_eleListArr.list[index].eleList, _eleListArr.list[index].dateRange, -1);
			if(_eleListArr.list[index].eleList.includes(_gridParam.element)){
				var eleData = JSON.parse(JSON.stringify(_gridParam));
				eleData.index--;
				eleData.status = 1;
				reReadGridData(_gridParam);//在进行过批量修改的面板表格上进行撤销恢复,批量改了之后需要重新改
			}
		}*/
		GDZZ_TOOLS.checkDoable();
	}
	
	/**
	 * 恢复
	 */
	function redo(){
		//if(_eleListArr.list.length == 0){
			_gridParam.index++;
			_gridParam.status = 1;
			reReadGridData(_gridParam);
			changeCell(_gridParam);
		/*}else{
			var index = _eleListArr.index+1;
			GDZZ_TOOLS.indexMultiChange(_eleListArr.list[index].eleList, _eleListArr.list[index].dateRange, 1);
			if(_eleListArr.list[index].eleList.includes(_gridParam.element)){
				var eleData = JSON.parse(JSON.stringify(_gridParam));
				eleData.index++;
				eleData.status = 1;
				reReadGridData(_gridParam);//在进行过批量修改的面板表格上进行撤销恢复,批量改了之后需要重新改
			}
		}*/
		GDZZ_TOOLS.checkDoable();
	}
	
	/**
	 * TODO 写临时文件 
	 * @param gridData 一维数组,格点数据
	 */
	GDZZ_TOOLS.writeTemporaryGrid = function(gridData,staData){
		if(_gridParam.index < 0){
			_gridParam.index = 0;
			_gridParam.status = 0;
			writeGrid(_primaryGridStr);
			GDZZ_TOOLS.writeTemporaryGrid(gridData.toString());
		}else{
			_gridParam.index++;
			_gridParam.status = 1;
			for(var i = 0, len = gridData.length; i < len; i++){
				if(gridData[i] == null){
					gridData[i] = GridPanel_PageParam.resultData.rangeObj.noDataValue;
				}
			}
			writeGrid(gridData.toString());
		}
		function writeGrid(dataStr){
			var str_1 = dataStr.substr(0,dataStr.length/2);
			var str_2 = dataStr.substr(dataStr.length/2);
			_gridParam.maxIndex = _gridParam.index;
			var writeData = $.extend(_gridParam, {nx: _rangeObj.nRows, ny: _rangeObj.nCols});
			writeData.gridString_1 = str_1;//字符串格式的格点数据,传至后台转换成数组
			writeData.gridString_2 = str_2;
			$.ajax({
				type:'POST',
				url:window.contextPath + 'gdzz/writeTemporaryGrid.do',
				dataType:"json",
				async:false,
				data: writeData,
				success:function(result){
					_eleListArr={index:-1, list:[]};
					changeCell(_gridParam);
					GDZZ_TOOLS.checkDoable();
					for(var ele in _checkElements){
						if((_gridParam.channel == "TP" && ele != "TMAX" && ele != "TMIN" && ele != "RHMAX" && ele != "RHMIN")//改降水,除温度和湿度内部外,其余都要重新设置检验
							||(_gridParam.channel == "TMP" && ele != "TP24H" && ele != "RHMAX" && ele != "RHMIN")
							||(_gridParam.channel == "RH" && ele != "TP24H" && ele != "TMAX" && ele != "TMIN")){
							if(_checkElements[ele] != 2){
								_checkElements[ele] = 0;
							};
						}
					}
					if(_hasCover){
						GridPanel_PageParam.addCover(false);
					}
				},
				error:function(){
					if(_hasCover){
						GridPanel_PageParam.addCover(false);
					}
				}
			});
			writeData.gridString_1=null;
			writeData.gridString_2=null;
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
	 * TODO 显示要素一致性面板
	 */
	function showConsistencyPanel($tool){
		//alert("先调后台,检查要素一致性,将结果显示在面板中,暂无数据");
		var $panel = $('.toolPanel.consistencyPanel');
		$tool.addClass("list_dropped");
		$tool.children(".tool_icon").css({'margin-top':'0px'});
		$tool.parent().append($panel);
		$panel.show();
		var position = $tool.position();
		$panel.css({
			'top': position.top + $tool.height()+5,
			'right': 0,
			'z-index': $tool.css("zIndex")-1
		});
	}
	
	/**
	 * 协同至24H
	 * @param fcstTime : 起报时间
	 * @param element : 要素
	 */
	function synergy1HTo24H(fcstTime, element){
		if(confirm('协同到24H?')){
			var data = {fcstTime: fcstTime, element: element, post:GridPanel_PageParam.USERPOST == 3 ? 0:1};
			GridPanel_PageParam.addCover(true,"sysnergying-backdrop");
			GridPanel_PageParam.change_param.resultFlag = true;//是否继续改变状态标识
			if(element == "TP1H" || element == "TP3H"){
				GridPanel_PageParam.change_param.$tDataList = $(".grid-table-body .table-body-row .body-cells[channel=TP24H] div.body-cell:not(.bjc-live)");
			}else if(element == "TMP"){
				GridPanel_PageParam.change_param.$tDataList = 
					$(".grid-table-body .table-body-row .body-cells[channel=TMAX] div.body-cell:not(.bjc-live),.grid-table-body .table-body-row .body-cells[channel=TMIN] div.body-cell:not(.bjc-live)");
			}else if(element == "RH"){
				GridPanel_PageParam.change_param.$tDataList = 
					$(".grid-table-body .table-body-row .body-cells[channel=RHMAX] div.body-cell:not(.bjc-live),.grid-table-body .table-body-row .body-cells[channel=RHMIN] div.body-cell:not(.bjc-live)");
			}
			
			GridPanel_PageParam.change_param.tDataList_ = new Array;//数据更改前的属性值集合
			GridPanel_PageParam.changeBjcEles({"addClass":"bjc-modified","operate":true,"outTime":10});
			$.ajax({
				type:'POST',
				url:window.contextPath + 'gdzz/write1HTo24H.do',
				dataType:"json",
				data: data,
				success:function(result){
					GridPanel_PageParam.addCover(false);
					//alert("协同成功");
					//var eleList = [];
					if(element == "TP1H" || element == "TP3H"){
						//eleList = ['TP24H'];
						element = 'TP';
						//去除同级不一致
						$(".grid-table-body .table-body-row .body-cells[channel*=TP] div.body-cell:not(.bjc-live)").removeClass("bjc-inconformity");
					}else if(element == "TMP"){
						//eleList = ['TMAX', 'TMIN'];
						//去除同级不一致
						$(".grid-table-body .table-body-row .body-cells[channel*=TM] div.body-cell:not(.bjc-live)").removeClass("bjc-inconformity");
					}else if(element == "RH"){
						//eleList = ['RHMAX', 'RHMIN'];
						//去除同级不一致
						$(".grid-table-body .table-body-row .body-cells[channel*=RH] div.body-cell:not(.bjc-live)").removeClass("bjc-inconformity");
					}
//					$.fn.gridPanel("setBackground", eleList);
					GridPanel_PageParam.clickedSelect();
					$('.content[name='+element+']').hide();
					GDZZ_TOOLS.resetDiffNumber();
				},
				error:function(message){
					GridPanel_PageParam.change_param.resultFlag = false;
					alert("协同失败");
					GridPanel_PageParam.tDataList_restore();
					GridPanel_PageParam.addCover(false);
				}
			});
		}
	}
	
	
	/**
	 * 撤销、恢复、保存临时文件时修改背景场表格上被选中格子的样式
	 */
	function changeCell(param){
		var $editItem = $('.table-body-row .body-cell.cSelected');//当前选中的背景场表格
		if(param.status != null){
			var statue = GridPanel_PageParam.opt.status2Class[param.status];
			$editItem.attr('class','body-cell ' + statue + ' cSelected');
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
	
	/**
	 * 批量修改索引
	 * @param eleList 需要批量修改的要素列表
	 * @param dateRange 要批量修改的时间范围 dateRange[0]开始时间 dateRange[1]结束时间
	 * @param param 修改索引的参数 1 索引+1 -1 索引-1 不传, 索引+1且最大索引等于+1后的索引
	 */
	GDZZ_TOOLS.indexMultiChange = function(eleList, dateRange, param){
		var begin =null;
		var end = null;
		if(dateRange){	
			begin = new Date(dateRange[0]);
			end = new Date(dateRange[1]);
		}
		for(var i = 0, lenL = eleList.length; i < lenL; i++){
			var ele = eleList[i];
			var eleDatas = GridPanel_PageParam.data[ele];
			for(var j = 0, lenD = eleDatas.length; j < lenD; j++){
				var eleData = eleDatas[j];
				var periodDate = new Date(eleData.periodDate);
				if(eleData.status == 6 || (begin && begin > periodDate) || (end && end < periodDate)){
					continue;//实况、不在设置的时间范围内的数据 不进行修改
				}
				if(param == null){
					eleData.index += eleData.index == -1 ? 2: 1;//针对索引为-1的情况,因为要存两个临时文件,所以索引要+2
					eleData.maxIndex = eleData.index;
					eleData.status = 1;
				}else if(param == 1 || param == -1){
					eleData.index += param;
				}
			}
		}
		if(param == null){
			_eleListArr.index += 1;
			_eleListArr.list.push({eleList: eleList, dateRange: dateRange, param: param});
			var element = null;
			if(eleList[0] == "TP1H" || eleList[0] == "TP3H")element="TP";
			else if(eleList[0] == "TMP" || eleList[0] == "TMAX" || eleList[0] == "TMIN")element="TMP";
			else if(eleList[0] == "RH" || eleList[0] == "RHMAX" || eleList[0] == "RHMIN")element="RH";
			$('.content[name='+element+']').hide();
			GDZZ_TOOLS.resetDiffNumber();
		}else{
			_eleListArr.index += param;
		}
	};
	
	/**
	 * 重新读取格点临时文件-撤销恢复之后调用
	 */
	function reReadGridData(eleData){
		$.ajax({
			type:'POST',
			url:window.contextPath + 'gdzz/readTemporaryGrid.do',
			dataType:"json",
			data:eleData,
			success:function(result){
				var rst = result.params.data;
				var gridData = result.params.gridData;
				var rangeObj = {};
				if(rst)rangeObj = {
						jsonUrl : 'hb_bianjie',
						roadJson:"road",
						nCols : rst.ny,
						nRows : rst.nx,
						xCell : rst.dy,
						yCell : rst.dx,
						xmax : rst.endLon,
						xmin : rst.startLon,
						ymax : rst.endLat,
						ymin : rst.startLat,
						noDataValue : typeof(rst.invalid) == "undefined" ? 9999 : rst.invalid,
						valmin: null,
						valmax: null,
						isCut : false,
						disInter : false		//是否不插值
					};
				if(gridData && gridData.length>0){
					GridPanel_PageParam.resultData.rangeObj = rangeObj;
					for(var i = 0, len = gridData.length; i < len; i++){
						if(gridData[i] == null || gridData[i] == "NaN"){
							gridData[i] = rangeObj.noDataValue;
						}
					}
					
					GIS.GridEdit.showByTypes("nGis", GDZZ_TOOLS.gisDisplayType(eleData.element), gridData, GDZZ_TOOLS.gisDisplayRangeObj(rangeObj), GDZZ_TOOLS.writeTemporaryGrid, GDZZ_TOOLS.legendColors[eleData.element], 0);
					GridPanel_PageParam.loadStation(eleData,result.params.statDataList);
				}else{
					rangeObj = GridPanel_PageParam.resultData.rangeObj;
					var len = rangeObj.nCols * rangeObj.nRows;
					if(GridPanel_PageParam.Select_Ele.channel == 'EDA')len = len*2;
					gridData = new Array(len);
					for(var i = 0; i < len;i++){gridData[i] = GridPanel_PageParam.resultData.rangeObj.noDataValue;}
					GIS.GridEdit.showByTypes("nGis", GDZZ_TOOLS.gisDisplayType(eleData.element), gridData, GDZZ_TOOLS.gisDisplayRangeObj(rangeObj), GDZZ_TOOLS.writeTemporaryGrid, GDZZ_TOOLS.legendColors[eleData.element], 0);
				}
				GDZZ_TOOLS.updateParam("gridData");
			},
			error:function(message){
				var rangeObj = GridPanel_PageParam.resultData.rangeObj;
				var len = rangeObj.nCols * rangeObj.nRows;
				if(GridPanel_PageParam.Select_Ele.channel == 'EDA')len = len*2;
				gridData = new Array(len);
				for(var i = 0; i < len;i++){gridData[i] = GridPanel_PageParam.resultData.rangeObj.noDataValue;}
				GIS.GridEdit.showByTypes("nGis", GDZZ_TOOLS.gisDisplayType(eleData.element), gridData, GDZZ_TOOLS.gisDisplayRangeObj(GridPanel_PageParam.resultData.rangeObj), GDZZ_TOOLS.writeTemporaryGrid, GDZZ_TOOLS.legendColors[eleData.element], 0);
			}
		});
	}
	/**
	 * 判断高低温或高低湿度是否正确
	 */
	function checkValueLegal(element,fn){
		var post = GridPanel_PageParam.USERPOST-3;
		var data = {fcstTime:$("#date").val()+":00",element:element,userId:GridPanel_PageParam.Select_Ele.userId,post:post};
		GridPanel_PageParam.addCover(1);
		$.ajax({
			type:'POST',
			async:true,
			url:window.contextPath + 'gdzz/isValueLegal.do',
			dataType:"json",
			data:data,
			success:function(result){
				if(result.success){
				var eleList = result.params.fcstList;
				var ele_str = "";
				eleList.forEach(function(eleIndex,index){
					if(element == "TMP"){
						ele_str += ",.grid-table-body .table-body-row:eq("+eleIndex+") .body-cells[channel=TMIN] .body-cell,.grid-table-body .table-body-row:eq("+eleIndex+") .body-cells[channel=TMAX] .body-cell";
					}else{
						ele_str += ",.grid-table-body .table-body-row:eq("+eleIndex+") .body-cells[channel*=RHM] .body-cell";
					}
				});
				var $eles = $(ele_str.substring(1));
				$eles.addClass(GridPanel_PageParam.opt.status2Class[5]);
				if(result.success){
					var eleName = element== "TMP"?"高低温":"高低湿度";
					if(confirm(eleName+'冲突,是否互换?')){
						GridPanel_PageParam.change_param.resultFlag = true;//是否继续改变状态标识
						GridPanel_PageParam.change_param.$tDataList = $eles; //要更改的背景场
						GridPanel_PageParam.change_param.tDataList_ = new Array;//数据更改前的属性值集合
						GridPanel_PageParam.changeBjcEles({"addClass":GridPanel_PageParam.opt.status2Class[1],"operate":true,"outTime":10});
						data.type = 0;//0:高低温互换,1:高温变低温,2:低温变高温
						$.ajax({
							type:'POST',
							async:true,
							url:window.contextPath + 'gdzz/writeLegalValue.do',
							dataType:"json",
							data:data,
							success:function(result){
								$eles.removeClass(GridPanel_PageParam.opt.status2Class[1]).addClass(GridPanel_PageParam.opt.status2Class[1]);
								$eles.removeClass(GridPanel_PageParam.opt.status2Class[5]);
								GridPanel_PageParam.clickedSelect();
								GridPanel_PageParam.addCover();
								fn();
							},
							error:function(){
								GridPanel_PageParam.change_param.resultFlag = false;
								alert("互换失败!");
								GridPanel_PageParam.tDataList_restore();
								GridPanel_PageParam.addCover();
							}
						});
					}else
						GridPanel_PageParam.addCover();
				}
				}else{
					GridPanel_PageParam.addCover();
					fn();
				}
			}
		});
	}
	function startSynergy(element){
		var url = G_CONTEXT.contextPath + 'sysnergy/';
		if(element == "TP24H"){
			url += GridPanel_PageParam.USERPOST == 3? 'tp.do': 'tp8.do';
			showSynergyPanel("tpSynergy", "降水协同", url);
		}else if(element == "TP1H" || element == "TP3H" || element == "TMP" || element == "RH"){
			synergy1HTo24H(_gridParam.fcstDate, element);
		}else if(element == "TMAX" || element == "TMIN"){
			url += GridPanel_PageParam.USERPOST == 3? 'tmp.do': 'tmp8.do';
			checkValueLegal("TMP",function(){showSynergyPanel("tmpSynergy", "气温协同", url);});
		}else if(element == "RHMAX" || element == "RHMIN"){
			url += GridPanel_PageParam.USERPOST == 3? 'rh.do': 'rh8.do';
			checkValueLegal("RH",function(){showSynergyPanel("rhSynergy", "湿度协同", url);});
		}else if(element == "EDA"){
			url += GridPanel_PageParam.USERPOST == 3? 'eda.do': 'eda8.do';
			showSynergyPanel("edaSynergy", "风场协同", url);
		}else if(element == "TPRH" || element == "TPTMP" || element == "TPTCC"){
			var _ele = GridPanel_PageParam.Select_Ele;
			GridPanel_PageParam.addCover(true,"sysnergying-backdrop");
			$.post(window.contextPath + "gdzz/writeRain1HTo1H.do", 
				{fcstTime:_ele.fcstDate ,tpElement:element,element:element.substr(2).replace("TCC",""),userId:_ele.userId,post:_ele.post},
				function(data){
					if(data.params.data.tpSuccess){//协同要素成功
						
						GridPanel_PageParam.change_param.$tDataList = $(".table-body-row .body-cells[channel="+element.substr(2)+"] .body-cell:not(.bjc-live)"); //要更改的背景场
						GridPanel_PageParam.changeBjcEles({"addClass":GridPanel_PageParam.opt.status2Class[1],operate:true});
						GDZZ_TOOLS.resetDiffNumber(element);
					}
					if(data.params.data.success){//协同要素的24H成功
						if(element.substr(2) == "RH"){
							
							GridPanel_PageParam.change_param.$tDataList = $(".table-body-row .body-cells[channel*=RHM] .body-cell:not(.bjc-live)"); //要更改的背景场
							GridPanel_PageParam.changeBjcEles({"addClass":GridPanel_PageParam.opt.status2Class[1],operate:true});
						}else if(element.substr(2) == "TMP"){
							
							GridPanel_PageParam.change_param.$tDataList = $(".table-body-row .body-cells[channel=TMAX] .body-cell:not(.bjc-live)," +
									".table-body-row .body-cells[channel=TMIN] .body-cell:not(.bjc-live)"); //要更改的背景场
							GridPanel_PageParam.changeBjcEles({"addClass":GridPanel_PageParam.opt.status2Class[1],operate:true});
						}
					}
					GridPanel_PageParam.addCover();
			    }, "json");
		}else{
			console.log("协同" + " || " + element);
		}
//		if(GDZZ_TOOLS.consisData){
//			
//			GDZZ_TOOLS.consisData.forEach(function(eles,index){
//				if(eles.ref.refele == element){
//					GDZZ_TOOLS.consisData[index] = null;
//				}
//			});
//			GridPanel_PageParam.checkBjcByz(GDZZ_TOOLS.consisData);
//		}
	}
	
	/**
	 * TODO 调后台接口,检查要素一致性
	 */
	function consisCheck(){
		var fcstDate = new Date(GridPanel_PageParam.Select_Ele.fcstDate);
		var post = GridPanel_PageParam.USERPOST == 3 ? 0 : 1;
		var elements = GDZZ_TOOLS.checkElements();
		//console.log(elements);
		var data = {fcstTime : fcstDate, elements : elements,userId:GridPanel_PageParam.Select_Ele.userId, post : post};
		GridPanel_PageParam.addCover(true,"checking-backdrop");
		
		GridPanel_PageParam.change_param.resultFlag = true;//是否继续改变状态标识
		//GridPanel_PageParam.change_param.$tDataList = $(".table-body-row .body-cell.bjc-modified"); //当前要素当前时段
		//GridPanel_PageParam.change_param.tDataList_ = new Array;//数据更改前的属性值集合
		//GridPanel_PageParam.changeBjcEles({addClass:GridPanel_PageParam.opt.status2Class[2],outTime:1});
		
		$.ajax({
			type:'POST',
			url:window.contextPath + 'gdzz/consisCheck.do',
			dataType:"json",
			data: data,
			success:function(result){
				//保存中出现空值
				if(result.success){
					var errorElement = "",errorValEle = "";
					var notChangeChannel = "";
					var nullPeriods = result.params.nullPeriods;
					if(nullPeriods && nullPeriods.length > 0) {
						for(var i=0;i<nullPeriods.length;i++) {
							var element = nullPeriods[i].element;
							var periodList = nullPeriods[i].list;
							var valList = nullPeriods[i].valList;
							if(valList && valList.length > 0){
								for(var j=0;j<valList.length;j++) {
									$(".grid-table-body .table-body-row .body-cells[channel="+element+"] div.body-cell[period='"+valList[j]+"']").addClass("bjc-inconformity");
								}
								errorValEle += element+",";
							}
							if(periodList && periodList.length > 0){
								for(var j=0;j<periodList.length;j++) {
									$(".grid-table-body .table-body-row .body-cells[channel="+element+"] div.body-cell[period='"+periodList[j]+"']").addClass("bjc-inconformity");
								}
								errorElement += element+",";
								notChangeChannel += "[channel="+element+"],";
							}
						}
						errorElement = errorElement.substr(0,errorElement.length-1);
						notChangeChannel = notChangeChannel.substr(0,notChangeChannel.length-1);
					}
					
					GridPanel_PageParam.change_param.$tDataList = $(".table-body-row .body-cells:not("+notChangeChannel+") .body-cell.bjc-modified:not(.bjc-inconformity)"); //要更改的背景场
					GridPanel_PageParam.change_param.tDataList_ = new Array;//数据更改前的属性值集合
					GridPanel_PageParam.changeBjcEles({"addClass":GridPanel_PageParam.opt.status2Class[2],"outTime":0});
					if((errorElement && errorElement.length > 0) || (errorValEle && errorValEle.length > 0)) {
						var tit = "";
						if(errorElement.length > 0){
							tit += errorElement+ "存在空值,";
						}
						if(errorValEle.length > 0){
							tit += errorValEle.substr(0,errorValEle.length-1)+"超出阈值范围,";
						}
						alert(tit+"检查失败！");
					} else {
						//GridPanel_PageParam.change_param.resultFlag = false;
						//GridPanel_PageParam.change_param.$tDataList.removeClass("bjc-unmodify bjc-modified bjc-saved bjc-published bjc-nodata bjc-inconformity")
						//.addClass(GridPanel_PageParam.opt.status2Class[2]); //当前要素当前时段
						GDZZ_TOOLS.consisData = result.params.data;
						GridPanel_PageParam.checkBjcByz(result.params.data);
						GDZZ_TOOLS.showConsisResult(result);
					}
				} else {
					alert("要素一致性检查失败！！");
				}
				GridPanel_PageParam.addCover(false);
			},
			error:function(){
				//GridPanel_PageParam.change_param.resultFlag = false;
				//GridPanel_PageParam.tDataList_restore();
				GridPanel_PageParam.addCover(false);
			}
		});
	}
		
	/**
	 * 获取需要被检查的要素
	 */
	GDZZ_TOOLS.checkElements = function(){
		var elements = [];
		var flag = $(".consistencyPanel .con-other-cbox").is(":checked");
		//   "TP24H":0,"TMAX":0,"TMIN":0,"RHMAX":0,"RHMIN":0,"TPTMP":0,"TPRH":0,"TPTCC":0};
		for(var ele in _checkElements){
			if(_checkElements[ele] == 0 && (!flag || 'TPTMP,TPRH,TPTCC'.indexOf(ele)<0)){
				elements.push(ele);
			}
		}
		return elements.toString();
	};
	
	/**
	 * TODO 在面板中展示要素一致性检查的结果
	 */
	GDZZ_TOOLS.showConsisResult = function(result){
		//填充要素一致性面板
		closePanel();
		_gisParam.toolName = "";
		GIS.GridEdit.drag(_gisParam.mapId);
		$('.tool_dropIcon-up').click();
		//console.log(result);
		$('.consistencyPanel .mark-number').text(0);
		$(".consistencyPanel .content").hide();
		if(!result)return;
		var results = result.params.data;
		var fcstTime = new Date(GridPanel_PageParam.Select_Ele.fcstDate);
		var user = 24/GridPanel_PageParam.USERCLASS;
		//TODO 要素一致检查面板
		var plusTime = GridPanel_PageParam.USERPOST == 3? 0:3;//中期岗比短期岗+3天
		var number = 0;
		$(".consistencyPanel .content ul").empty();
		for(var i = 0, len = results.length; i < len; i++){
			var record = results[i];
			var ref = record.ref;
			switch(record.element){
			case "TP1H":case "TP3H":
				if(ref.refele == "TP24H"){
					var $content = $(".consistencyPanel .content[name=TP]");
					var lenP = ref.period.length;
					number += lenP;
					for(var j = 0; j < lenP; j++){
						var index = ref.period[j] - 1 + plusTime;
						var startD = new Date(+fcstTime + 86400000 * index);
						var endD = new Date(+startD + 86400000);
						var startStr = dateUtil.convertDateToString(startD, "yyyy-MM-dd hh");
						var endStr = dateUtil.convertDateToString(endD, "yyyy-MM-dd hh");
						var startH = (Number(startStr.slice(11, 13)) + user).toString();
						startH.length == 1 ? startH = "0"+startH : startH;
						var itemStr = '<li>'+startStr.slice(8, 10)+'日'+startH+'时 ~ '+ 
									''+endStr.slice(8, 10)+'日'+endStr.slice(11, 13)+'时 <span>24h降水</span> 与 <span>'+user+'h降水  </span>不一致</li>';
						var $item = $(itemStr);
						$content.find("ul").append($item);
						$content.show();
					}
					$content.attr("count",lenP);
					var $btn = $content.find(".synergy-btn[element=TP]");
					$btn.text('以'+user+'h降水协同');
					$btn.attr('element','TP'+user+'H');
				}else if(ref.refele == "TMP" || ref.refele == "RH" || ref.refele == "TCC"){
					var $content = $('.consistencyPanel .content[name=TP'+ref.refele+']');
					var lenP = ref.period.length;
					number += lenP;
					var sDate_ = GridPanel_PageParam.data[ref.refele][ref.period[0]].periodDate;
					var eDate_ = sDate_;
					var period_ = ref.period[0]-1;
					for(var j = 0; j < lenP; j++){
						var period = ref.period[j];
						var sDate = GridPanel_PageParam.data[ref.refele][period].periodDate;
						
						if(period != (period_+1) || j == (lenP-1)){//不连续 或最后一个
							if(j == (lenP-1))eDate_ = sDate;
							var itemStr = "";
							if(sDate_==eDate_ &&period != period_-1){//单个
								var startD = new Date(sDate_);
								var startStr = dateUtil.convertDateToString(startD, "yyyy-MM-dd hh");
								var startH = startD.getHours();
								startH = startH < 10 ? "0"+startH:startH+"";
								itemStr = '<li>'+startStr.slice(8, 10)+'日'+startH+'时  存在  <span>降水</span> 与 <span>'+_eleName[ref.refele]+'</span> 不一致</li>';
							}else{
								if(j == (lenP-1) && period != period_-1){
									var startD = new Date(sDate_);
									var startStr = dateUtil.convertDateToString(startD, "yyyy-MM-dd hh");
									var startH = startD.getHours();
									startH = startH < 10 ? "0"+startH:startH+"";
									itemStr = '<li>'+startStr.slice(8, 10)+'日'+startH+'时  存在  <span>降水</span> 与 <span>'+_eleName[ref.refele]+'</span> 不一致</li>';
									var endD = new Date(eDate_);
									var endStr = dateUtil.convertDateToString(endD, "yyyy-MM-dd hh");
									var endH = endD.getHours();
									startH = startH < 10 ? "0"+endH:endH+"";
									itemStr = '<li>'+endStr.slice(8, 10)+'日'+endH+'时  存在  <span>降水</span> 与 <span>'+_eleName[ref.refele]+'</span> 不一致</li>';
								}
								var startD = new Date(sDate_);
								var endD = new Date(eDate_);
								var startStr = dateUtil.convertDateToString(startD, "yyyy-MM-dd hh");
								var endStr = dateUtil.convertDateToString(endD, "yyyy-MM-dd hh");
								var startH = startD.getHours();
								startH = startH < 10 ? "0"+startH:startH+"";
								var endH = endD.getHours();
								endH = endH < 10 ? "0"+endH:endH+"";
								itemStr = '<li>'+startStr.slice(8, 10)+'日'+startH+'时  ~ '+ 
								''+endStr.slice(8, 10)+'日'+endH+'时  存在  <span>降水</span> 与 <span>'+_eleName[ref.refele]+'</span> 不一致</li>';
							}
							sDate_ = eDate_ = sDate;
							$content.attr("count",lenP);
							$content.find("ul").append($(itemStr));
						}else{
							eDate_ = sDate;
						}
						period_ = period;
						$content.show();
					}
				}
				break;
			case "TMP" :
				if(ref.refele == "TMAX" || ref.refele == "TMIN"){
					var $content = $(".consistencyPanel .content[name=TMP]");
					var ele = ref.refele == "TMAX" ? "最高温" : "最低温";
					var lenP = ref.period.length;
					number += lenP;
					for(var j = 0; j < lenP; j++){
						var index = ref.period[j] - 1 + plusTime;
						var startD = new Date(+fcstTime + 86400000 * index);
						var endD = new Date(+startD + 86400000);
						var startStr = dateUtil.convertDateToString(startD, "yyyy-MM-dd hh");
						var endStr = dateUtil.convertDateToString(endD, "yyyy-MM-dd hh");
						var startH = (Number(startStr.slice(11, 13)) + user).toString();
						startH.length == 1 ? startH = "0"+startH : startH;
						var itemStr = '<li>'+startStr.slice(8, 10)+'日'+startH+'时 ~ '+ 
									''+endStr.slice(8, 10)+'日'+endStr.slice(11, 13)+'时 <span>24h'+ele+'</span> 与 <span>'+user+'h气温 </span>不一致</li>';
						var $item = $(itemStr);
						$content.attr("count",lenP);
						$content.find("ul").append($item);
						$content.show();
					}
					$content.find(".synergy-btn[element=TMP]").text('以'+user+'h气温协同');
				}
				break;
			case "RH" :
				if(ref.refele == "RHMAX" || ref.refele == "RHMIN"){
					var $content = $(".consistencyPanel .content[name=RH]");
					var ele = ref.refele == "RHMAX" ? "最高湿" : "最低湿";
					var lenP = ref.period.length;
					number += lenP;
					for(var j = 0; j < lenP; j++){
						var index = ref.period[j] - 1 + plusTime;
						var startD = new Date(+fcstTime + 86400000 * index);
						var endD = new Date(+startD + 86400000);
						var startStr = dateUtil.convertDateToString(startD, "yyyy-MM-dd hh");
						var endStr = dateUtil.convertDateToString(endD, "yyyy-MM-dd hh");
						var startH = (Number(startStr.slice(11, 13)) + user).toString();
						startH.length == 1 ? startH = "0"+startH : startH;
						var itemStr = '<li>'+startStr.slice(8, 10)+'日'+startH+'时 ~ '+ 
									''+endStr.slice(8, 10)+'日'+endStr.slice(11, 13)+'时<span> 24h'+ele+'</span> 与 <span>'+user+'h湿度</span>  不一致</li>';
						var $item = $(itemStr);
						$content.attr("count",lenP);
						$content.find("ul").append($item);
						$content.show();
					}
					$content.find(".synergy-btn[element=RH1H]").text('以'+user+'h湿度协同');
				}
				break;
			}
		}
		$('.consistencyPanel .mark-number').text(number);
		showConsistencyPanel($('.specific_tool[name=consistency]'));
	};
	
	/**
	 * 禁用所有工具
	 */
	GDZZ_TOOLS.disable = function(){
		var $barHead = $(".bar_head");
		$barHead.css({'cursor':'not-allowed'});
		$barHead.each(function(){
			if($(this).attr('opened') == 1 ){//&& $(this).attr("name")!="synergyTools"){
				$(this).attr('toOpen', true);
				$(this).click();
			}
		});
		$(".toolPanel.focusAreaPanel").hide();
		$(".specific_tool.trigger-on[name=focusArea]").removeClass("trigger-on").addClass("trigger-off");
		$barHead.attr('dis',true);
		_gisParam.toolName = "";
	};
	
	/**
	 * 启用所有工具
	 */
	GDZZ_TOOLS.enable = function(){
		var $barHead = $(".bar_head");
		if($barHead.attr('dis') == "true"){
			$barHead.css({'cursor':'pointer'});
			$barHead.removeAttr('dis');
			$barHead.each(function(){
				if($(this).attr('toOpen') == "true"){
					$(this).removeAttr('toOpen');
					$(this).click();
				}
			});
			_gisParam.toolName = _gisParam.mapLayer;
		}else{
			return;
		}
	};
	
	/**
	 * 重新设置不一致的数量
	 */
	GDZZ_TOOLS.resetDiffNumber = function(element){
		if(element == "TP1H" || element == "TP3H")element="TP";
			else if(element == "TMP" || element == "TMAX" || element == "TMIN")element="TMP";
			else if(element == "RH" || element == "RHMAX" ||element == "RHMIN")element="RH";
			$('.content[name='+element+']').hide();
//		var $content = $('.consistencyPanel .content:visible[ignore!=true] li');
		var length = 0;
		$('.consistencyPanel .content:visible[ignore!=true]').each(function(){
			length += Number($(this).attr("count"))<0?0:Number($(this).attr("count"));
		});
		$('.consistencyPanel .mark-number').text(length);
	};
	
	/**
	 * 风速转风的等级
	 * @param speed 风速
	 */
	var _windSpeed = [0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30];
	function windSpeedToLevel(speed){
		var level = 0;
		var len = _windSpeed.length - 1;
		for(var i = 0; i < len; i++){
			if(speed > _windSpeed[i] && speed <= _windSpeed[i+1]){
				level = i;
				return i;
			}
		}
		if(speed > _windSpeed[len]){
			level = len;
		}
		return level;
	}
	
	/**
	 * 风的等级转风速
	 * @param level 风等级
	 */
	function windLevelToSpeed(level){
		var speed = 0;
		if(_windSpeed[level + 1]){
			speed = _windSpeed[level + 1];
		}else{
			speed = _windSpeed[level] + 1;
		}
		return speed;
	}
	
	/**
	 * 生成天气现象
	 */
	function createwea() {
		GridPanel_PageParam.addCover(1);
		var data = {
				"fcstTime":GridPanel_PageParam.Select_Ele.fcstDate,
				"userId":GridPanel_PageParam.Select_Ele.userId,
				"post":GridPanel_PageParam.Select_Ele.post
				};
		GridPanel_PageParam.change_param.resultFlag = true;//是否继续改变状态标识
		GridPanel_PageParam.change_param.$tDataList = $(".grid-table-body .table-body-row .body-cells[channel=WEA] div.body-cell:not(.bjc-live)");; //要更改的背景场
		GridPanel_PageParam.change_param.tDataList_ = new Array;//数据更改前的属性值集合
		GridPanel_PageParam.changeBjcEles({"addClass":GridPanel_PageParam.opt.status2Class[1],"operate":true,"outTime":10});
		$.ajax({
			type:'POST',
			url:window.contextPath + 'gdzz/writeWeaGrid.do',
			dataType:"json",
			data:data,
			success:function(result){
				if(result.success) {
					GridPanel_PageParam.clickedSelect();
					alert("天气现象生成成功！！");
				} else {
					GridPanel_PageParam.change_param.resultFlag = false;
					alert("天气现象生成失败！！");
					GridPanel_PageParam.tDataList_restore();
				}
				GridPanel_PageParam.addCover(false);
			},
			error:function(){
				GridPanel_PageParam.change_param.resultFlag = false;
				alert("天气现象生成失败！！");
				GridPanel_PageParam.tDataList_restore();
				GridPanel_PageParam.addCover(false);
			}
		});
	}
	/**
	 * 生成灾害落区
	 */
	function createdis() {
		GridPanel_PageParam.addCover(1);
		var data = {
				"fcstTime":GridPanel_PageParam.Select_Ele.fcstDate,
				"userId":GridPanel_PageParam.Select_Ele.userId,
				"post":GridPanel_PageParam.Select_Ele.post
		};
		GridPanel_PageParam.change_param.resultFlag = true;//是否继续改变状态标识
		GridPanel_PageParam.change_param.$tDataList = $(".grid-table-body .table-body-row .body-cells[channel=DIS] div.body-cell:not(.bjc-live)");; //要更改的背景场
		GridPanel_PageParam.change_param.tDataList_ = new Array;//数据更改前的属性值集合
		GridPanel_PageParam.changeBjcEles({"addClass":GridPanel_PageParam.opt.status2Class[1],"operate":true,"outTime":10});
		$.ajax({
			type:'POST',
			url:window.contextPath + 'gdzz/writeDisGrid.do',
			dataType:"json",
			data:data,
			success:function(result){
				if(result.success) {
					GridPanel_PageParam.clickedSelect();
					alert("灾害落区生成成功！！");
				} else {
					GridPanel_PageParam.change_param.resultFlag = false;
					alert("灾害落区生成失败！！");
					GridPanel_PageParam.tDataList_restore();
				}
				GridPanel_PageParam.addCover(false);
			},
			error:function(){
				GridPanel_PageParam.change_param.resultFlag = false;
				alert("灾害落区生成失败！！");
				GridPanel_PageParam.tDataList_restore();
				GridPanel_PageParam.addCover(false);
			}
		});
	}
	//获取图例的配置数据
	GDZZ_TOOLS.readLagend = function(){
		$.ajax({
			type:'POST',
			url:'static/wh/hebei/resources/business/gdzz/main/js/readLagendData.json',
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
					if(num==3){
						width=80;
					}
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
	GDZZ_TOOLS.areaLock = function(){
		alert("11");
		var areaCode = [];
		$(".focusAreaPanel :checkbox:eq(0)").prop('checked',$(".focusAreaPanel :checkbox:gt(0):not(:checked)").length == 0);
		$(".focusAreaPanel :checkbox:gt(0)").each(function(index,ele){
			var $ele = $(ele);
			if($ele.is(":checked"))
				areaCode.push($ele.attr("code"));
		});
		if($(".focusAreaPanel :checkbox:eq(0)").is(":checked")){//全选
			areaCode = [$(".focusAreaPanel :checkbox:eq(0)").attr("code")];
		}
		if(areaCode.length>0){
			GIS.GridEdit.areaLock(_gisParam.mapId,areaCode);
			_gisParam.lockArea = true;
		}else{
			setTimeout(function(){
				GIS.GridEdit.areaunLock(_gisParam.mapId);
			},1000);
			_gisParam.lockArea = false;
		}
	};
})(jQuery, window);