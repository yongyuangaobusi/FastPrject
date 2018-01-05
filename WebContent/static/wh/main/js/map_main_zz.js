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
				top : "180px",
				right: "0px",
				height:"80px",
				name : "gridTools",
				title : "预警制作",
				opened : 1,
				tools : [
				         {name : "freeArea", title: "任意区域", iconClass : "icon-renyiquyu-7",type: "button", solo:true},
			        	 {name : "editeArea", title: "区域编辑", iconClass : "icon-shujushua-7",type: "button", solo:true},
			        	 {name : "move_area", title: "移动", iconClass : "icon-move-7", type: "trigger", solo:true},
				         {name : "deleteArea", title: "区域删除", iconClass : "icon-icon-close-4",type: "button", solo:true}
				         ],
		        reCall: toolClicked
		};
		
		//工具条-站点工具
		var stationToolParam = {
				top : "107px",
				right: "0px",
				name : "stationTools",
				title : "地图",
				opened : 0,
				tools : [
				         {name : "layermanage", title: "图层管理", iconClass : "icon-icon-tucengshezhi-4", type: "trigger", solo:true},
				         {name : "pan", title: "漫游", iconClass : "icon-icon-roaming-1",type: "button", solo:true},
				         {name : "chart", title: "图表", iconClass : "icon-icon-roaming-1",type: "button", solo:true}
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
		$(".toolbar_test").gridToolbar(gridToolParam);
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
		
		

		

		
		
		


		
	
		
		
	};
	var drawData = null;
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
			case 'chart':
				openChart();
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
			case 'editeArea':
				var _that = this;
				var editType="editArea";	
				GIS.Warning.editDropArea("nGis",editType,function(data){
					//data.names2 = _that.changeAreaName(data.names);
					_that.drawDatas = data;
					if($(".headSet").hasClass("yjxh")){
						_that._generateDataTransfer();
					}else if($(".headSet").hasClass("yjzd")){
						if($("g[id='*DA*TempDraw_layer']").length>0){
							_that._generateYJZDDataTransfer(1);
						}else{
							_that._generateYJZDDataTransfer();
						}
					}
				});
				break;
			case 'freeArea' : 
				var _that = this;
				
				var param =	{"drawType" : "BEZIER_CURVE" ,"geoType" : "area"};
				
				
					//GIS.Warning.searchRegionGraphics(codeId); 
					GIS.Warning.drawArea("nGis",param,function(data){
						//closed
						
						var tt=$('#yjzzForm').window('open');
						//if(data.names!=""){
							//data.names2 = _that.changeAreaName(data.names);
							_that.drawDatas = data;
							_that.drawDatas.drawTime = new Date().format("yyyyMMddhhmmss");
							
							if($(".hzlq_sccp").css("display") == "none"){//首次隐藏状态
								if(codeId == '13'){//省级用户有预警指导
//									$(".cover-container").show();
									_that.showChoseType();
								}else{
									_that._generateDataTransfer();
									proTypeTemp = "yjxh";
									var jsonData={"proType":proTypeTemp,"warnProId":imgIndex,"warnLevel":yjLevel,"layerID":data.layerID};//默认绘制大风
									GIS.Warning.setdrawAreaType("nGis",jsonData,function(data){
										_that.drawDatas = data;
										_that.drawDatas.drawTime = new Date().format("yyyyMMddhhmmss");
									});
									_that.toolStatusAfterDraw(_that.geoType);
									deactivateDrawTool(mapId);//双击结束绘制
									_that.showPro();
								}
							}else{
								var proTypeTemp;
								if($(".headSet").hasClass("yjxh")){
									_that._generateDataTransfer();
									proTypeTemp = "yjxh";
								}else if($(".headSet").hasClass("yjzd")){
									_that._generateYJZDDataTransfer();
									proTypeTemp = "yjzd";
								}
								var jsonData={"proType":proTypeTemp,"warnProId":imgIndex,"warnLevel":yjLevel,"layerID":data.layerID};//默认绘制大风
								GIS.Warning.setdrawAreaType("nGis",jsonData,function(data){
									_that.drawDatas = data;
									_that.drawDatas.drawType = proTypeTemp;
									_that.drawDatas.drawTime = new Date().format("yyyyMMddhhmmss");
								});
								//_that.toolStatusAfterDraw(_that.geoType);
								//deactivateDrawTool(mapId);//双击结束绘制
							}
						//} 
					},function(){});
				
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
				var _that = this;
				var editType="removeOne";
				GIS.Warning.editDropArea("nGis",editType,function(data){
					//data.names2 = _that.changeAreaName(data.names);
					_that.drawDatas = data;
					if($(".headSet").hasClass("yjxh")){
						_that._generateDataTransfer();
					}else if($(".headSet").hasClass("yjzd")){
						_that._generateYJZDDataTransfer();
					}
					if(data.names.length == 0){
						if($(".headSet").hasClass("yjxh")){
							Zhyj_luoQuSet_produce.clearAllDiv();
						}else if($(".headSet").hasClass("yjzd")){
							LUOQU_SET_YJZD.clearAllDiv();
						}
						_that.defalutToolStatus();
					}
				});
				break;
			case 'copy_area' :
				//closePanel();
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
				//GIS.GridEdit.areaClone(_gisParam.mapId,"cut",_gisParam.eleType);
				//closePanel();
				_gisParam.toolName = details.toolName;
				if(!details.trigger){
					GIS.GridEdit.unBindTool(_gisParam.mapId);
					return;
				}
				
				GIS.GridEdit.areaClone(_gisParam.mapId,"cut",_gisParam.eleType);
//				if(_gisParam.mapLayer == "freeArea"){
//					GIS.GridEdit.areaClone(_gisParam.mapId,"cut",_gisParam.eleType);
//				}else if(_gisParam.mapLayer == "contourLine"){
//					GIS.GridEdit.contourClone(_gisParam.mapId,"cut");
//				}
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
				alert("wuhe");
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
	
	


})(jQuery, window);



Date.prototype.format = function(fmt) { 
    var o = { 
       "M+" : this.getMonth()+1,                 //月份 
       "d+" : this.getDate(),                    //日 
       "h+" : this.getHours(),                   //小时 
       "m+" : this.getMinutes(),                 //分 
       "s+" : this.getSeconds(),                 //秒 
       "q+" : Math.floor((this.getMonth()+3)/3), //季度 
       "S"  : this.getMilliseconds()             //毫秒 
   }; 
   if(/(y+)/.test(fmt)) {
           fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
   }
    for(var k in o) {
       if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
   return fmt; 
} 