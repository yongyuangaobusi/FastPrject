/**
 * map_panel.js
 * @Author:	JIAOY,XINCHENG
 * @CreateDate：2016年7月8日 下午13:17:51
 * @Version 1.1
 * Copyright (C) 2016 NRIET
 * 
 * TODO  背景场组件
 */
var GridPanel_PageParam = {
		ReDatas:{},
		interval:[],//定时器id
		data :[],//背景场数据
		location:{},
		stationData:{},
		resultData : {},//查询返回数据
		Select_Ele : null,//当前选中的背景场
		Copy_Eles : null,//复制列的背景场
		USERCLASS : 8,//一天有多少个时段
		USERPOST : $("#userInfo_post").val(),
		FORECASTDAY : $("#userInfo_post").val()==3?4:8,//预报未来几天
		opt : {
			  tableHead : [],
			  //短期岗
			  ysdw_1 : [ {id : 'TP',name : '降水',type:'24,1',dataname:["TP24H","TP3H"]},
			           {id : 'TMP',name : '气温',type:'min,max,1',dataname:["TMIN","TMAX","TMP"]},
			           {id : 'EDA',name : '风场',type:'1',dataname:["EDA"]},
					   {id : 'RH',name : '湿度',type:'min,max,1',dataname:["RHMIN","RHMAX","RH"]},
					   {id : 'VIS',name : '能见度',type:'1',dataname:["VIS"]},
					   {id : 'TCC',name : '云量',type:'1',dataname:["TCC"]},
					   {id : 'WEA',name : '天气现象',type:'1',dataname:["WEA"]},
					   {id : 'DIS',name : '灾害落区',type:'1',dataname:["DIS"]}
					  ],
			  //中期岗
			  ysdw_2 : [{id : 'TP',name : '降水',type:'24,1',dataname:["TP24H","TP3H"]},
			           {id : 'TMP',name : '气温',type:'min,max,1',dataname:["TMIN","TMAX","TMP"]},
			           {id : 'EDA',name : '风场',type:'1',dataname:["EDA"]},
					   {id : 'RH',name : '湿度',type:'min,max,1',dataname:["RHMIN","RHMAX","RH"]},
					   {id : 'VIS',name : '能见度',type:'1',dataname:["VIS"]},
					   {id : 'TCC',name : '云量',type:'1',dataname:["TCC"]},
					   {id : 'WEA',name : '天气现象',type:'1',dataname:["WEA"]},
					   {id : 'DIS',name : '灾害落区',type:'1',dataname:["DIS"]}
					  ],
			 //状态class; 0:未修改,1:已修改,2:已保存,3:已发布,4:无数据,5:不一致,6:实况
			 status2Class:["bjc-unmodify","bjc-modified","bjc-saved","bjc-published","bjc-nodata","bjc-inconformity","bjc-live"],
			 mode: '',
			 flag: 'init',// 初始化为init
			 first:true,//初始化标识
			 selMods:[]//右击背景场可以选择的模式
		},




		readMonoPeriodGrid:function(eleData,flag){
			
			var that = this;
			var url="";
			if (eleData.channel=="RE") {//降雨
				url='ReControl/getReData.action';
				switch (eleData.index) {
				case 0:
					if(that.ReDatas.d0!=null){
						GridPanel_PageParam.drawImg(that.ReDatas.d0,eleData);
						return;
					}
					
					break;
				case 1:
					if(that.ReDatas.d1!=null){
						GridPanel_PageParam.drawImg(that.ReDatas.d1,eleData);
						return;
					}
					//url=jsonUrl+'ceshi1.txt';
					break;
				case 2:
					if(that.ReDatas.d2!=null){
						GridPanel_PageParam.drawImg(that.ReDatas.d2,eleData);
						return;
					}
					//url=jsonUrl+'ceshi2.txt';
					break;
				case 3:
					if(that.ReDatas.d3!=null){
						GridPanel_PageParam.drawImg(that.ReDatas.d3,eleData);
						return;
					}
					//url=jsonUrl+'ceshi3.json';
					break;
				case 4:
					if(that.ReDatas.d4!=null){
						GridPanel_PageParam.drawImg(that.ReDatas.d4,eleData);
						return;
					}
					//url=jsonUrl+'ceshi4.json';
					break;
				case 5:
					if(that.ReDatas.d5!=null){
						GridPanel_PageParam.drawImg(that.ReDatas.d5,eleData);
						return;
					}
					//url=jsonUrl+'ceshi5.json';
					break;
				case 6:
					if(that.ReDatas.d6!=null){
						GridPanel_PageParam.drawImg(that.ReDatas.d6,eleData);
						return;
					}
					//url=jsonUrl+'ceshi6.json';
					break;
				case 7:
					if(that.ReDatas.d7!=null){
						GridPanel_PageParam.drawImg(that.ReDatas.d7,eleData);
						return;
					}
					//url=jsonUrl+'ceshi7.json';
					break;
				case 8:
					if(that.ReDatas.d8!=null){
						GridPanel_PageParam.drawImg(that.ReDatas.d8,eleData);
						return;
					}
					//url=jsonUrl+'ceshi8.json';
					break;
				case 9:
					if(that.ReDatas.d9!=null){
						GridPanel_PageParam.drawImg(that.ReDatas.d9,eleData);
						return;
					}
					//url=jsonUrl+'ceshi9.json';
					break;
				case 10:
					if(that.ReDatas.d10!=null){
						GridPanel_PageParam.drawImg(that.ReDatas.d10,eleData);
						return;
					}
					//url=jsonUrl+'ceshi10.json';
					break;
				case 11:
					if(that.ReDatas.d11!=null){
						GridPanel_PageParam.drawImg(that.ReDatas.d11,eleData);
						return;
					}
					//url=jsonUrl+'ceshi11.json';
					break;
				case 12:
					if(that.ReDatas.d12!=null){
						GridPanel_PageParam.drawImg(that.ReDatas.d12,eleData);
						return;
					}
					//url=jsonUrl+'ceshi12.json';
					break;
				case 13:
					if(that.ReDatas.d13!=null){
						GridPanel_PageParam.drawImg(that.ReDatas.d13,eleData);
						return;
					}
					//url=jsonUrl+'ceshi13.json';
					break;
				case 14:
					if(that.ReDatas.d14!=null){
						GridPanel_PageParam.drawImg(that.ReDatas.d14,eleData);
						return;
					}
					//url=jsonUrl+'ceshi14.json';
					break;
				case 15:
					if(that.ReDatas.d15!=null){
						GridPanel_PageParam.drawImg(that.ReDatas.d15,eleData);
						return;
					}
					//url=jsonUrl+'ceshi15.json';
					break;
				case 16:
					if(that.ReDatas.d16!=null){
						GridPanel_PageParam.drawImg(that.ReDatas.d16,eleData);
						return;
					}
					//url=jsonUrl+'ceshi16.json';
					break;
				case 17:
					if(that.ReDatas.d17!=null){
						GridPanel_PageParam.drawImg(that.ReDatas.d17,eleData);
						return;
					}
					//url=jsonUrl+'ceshi17.json';
					break;
				case 18:
					if(that.ReDatas.d18!=null){
						GridPanel_PageParam.drawImg(that.ReDatas.d18,eleData);
						return;
					}
					//url=jsonUrl+'ceshi18.json';
					break;
				case 19:
					if(that.ReDatas.d19!=null){
						GridPanel_PageParam.drawImg(that.ReDatas.d19,eleData);
						return;
					}
					//url=jsonUrl+'ceshi19.json';
					break;
				case 20:
					if(that.ReDatas.d20!=null){
						GridPanel_PageParam.drawImg(that.ReDatas.d20,eleData);
						return;
					}
					//url=jsonUrl+'ceshi20.json';
					break;
				case 21:
					if(that.ReDatas.d21!=null){
						GridPanel_PageParam.drawImg(that.ReDatas.d21,eleData);
						return;
					}
					//url=jsonUrl+'ceshi21.json';
					break;
				case 22:
					if(that.ReDatas.d22!=null){
						GridPanel_PageParam.drawImg(that.ReDatas.d22,eleData);
						return;
					}
					//url=jsonUrl+'ceshi22.json';
					break;
				case 23:
					if(that.ReDatas.d23!=null){
						GridPanel_PageParam.drawImg(that.ReDatas.d23,eleData);
						return;
					}
					//url=jsonUrl+'ceshi23.json';
					break;
				}
			}else if (eleData.channel=="TP") {//降水
				
				url='/shplatform/static/wh/hebei/resources/business/gdzz/main/js/readMonoPeriodGrid_TP.json';
				

			}else if (eleData.channel=="TMP") {//气温
				url='/shplatform/static/wh/hebei/resources/business/gdzz/main/js/readMonoPeriodGrid_TMP.json';
			}else if (eleData.channel=="EDA") {//风场
				alert("1222");
				url='/Web/HB/hebei/resources/business/gdzz/main/js/readMonoPeriodGrid_EDA.json';
			}else if (eleData.channel=="RH") {//湿度
				url='/Web/HB/hebei/resources/business/gdzz/main/js/readMonoPeriodGrid_RH.json';
			}else if (eleData.channel=="VIS") {//能见度
				url='/Web/HB/hebei/resources/business/gdzz/main/js/readMonoPeriodGrid_VIS.json';
			}else if (eleData.channel=="TCC") {//云量
				url='/Web/HB/hebei/resources/business/gdzz/main/js/readMonoPeriodGrid_TCC.json';
			}else if (eleData.channel=="WEA") {//天气现象
				url='/Web/HB/hebei/resources/business/gdzz/main/js/readMonoPeriodGrid_WEA.json';
			}else if (eleData.channel=="DIS") {//灾害落区
				url='/Web/HB/hebei/resources/business/gdzz/main/js/readMonoPeriodGrid_DIS.json';
			}
			$.ajax({
				type:'POST',
				url:url,
				dataType:"text",
				data:eleData,
				success:function(result){
					
					result= eval('('+result+')');
					result.params.statDataList=GridPanel_PageParam.stationData.params.statDataList;
					if(result.indexValue=="0"){
						if(timeIndex==0){
							_date=result.datetime;
							var　 str　 =　_date.substring(0,4)+"-"+_date.substring(4,6)+"-"+_date.substring(6,8)+" "+(_date.substring(9,11)/10)*10+":"+_date.substring(11,13)+":00"; // "2010-03-22 21:00:05";　
							
							var val = Date.parse(str);
							getT(val);
							
							
						}
						that.ReDatas.d0=result;
					}else if(result.indexValue=="1"){
						that.ReDatas.d1=result;
					}else if(result.indexValue=="2"){
						that.ReDatas.d2=result;
					}else if(result.indexValue=="3"){
						that.ReDatas.d3=result;
					}else if(result.indexValue=="4"){
						that.ReDatas.d4=result;
					}else if(result.indexValue=="5"){
						that.ReDatas.d5=result;
					}else if(result.indexValue=="6"){
						that.ReDatas.d6=result;
					}else if(result.indexValue=="7"){
						that.ReDatas.d7=result;
					}else if(result.indexValue=="8"){
						that.ReDatas.d8=result;
					}else if(result.indexValue=="9"){
						that.ReDatas.d9=result;
					}else if(result.indexValue=="10"){
						that.ReDatas.d10=result;
					}else if(result.indexValue=="11"){
						that.ReDatas.d11=result;
					}else if(result.indexValue=="12"){
						that.ReDatas.d12=result;
					}else if(result.indexValue=="13"){
						that.ReDatas.d13=result;
					}else if(result.indexValue=="14"){
						that.ReDatas.d14=result;
					}else if(result.indexValue=="15"){
						that.ReDatas.d15=result;
					}else if(result.indexValue=="16"){
						that.ReDatas.d16=result;
					}else if(result.indexValue=="17"){
						that.ReDatas.d17=result;
					}else if(result.indexValue=="18"){
						that.ReDatas.d18=result;
					}else if(result.indexValue=="19"){
						that.ReDatas.d19=result;
					}else if(result.indexValue=="20"){
						that.ReDatas.d20=result;
					}else if(result.indexValue=="21"){
						that.ReDatas.d21=result;
					}else if(result.indexValue=="22"){
						that.ReDatas.d22=result;
					}else if(result.indexValue=="23"){
						that.ReDatas.d23=result;
					}
					GridPanel_PageParam.drawImg(result,eleData);
				},
				error:function(message){
					var rangeObj = GridPanel_PageParam.resultData.rangeObj;
					var len = rangeObj.nCols * rangeObj.nRows;
					if(GridPanel_PageParam.Select_Ele.channel == 'EDA')len = len*2;
					gridData = new Array(len);
					for(var i = 0; i < len;i++){gridData[i] = rangeObj.noDataValue;}
					GridPanel_PageParam.resultData.gridData = gridData;
					GIS.GridEdit.showByTypes("nGis", GDZZ_TOOLS.gisDisplayType(eleData.element), [], GridPanel_PageParam.resultData.rangeObj, "", GDZZ_TOOLS.legendColors[eleData.element], 0);
				}
				
				
			});
		},
		drawImg:function(result,eleData){
			var that=GridPanel_PageParam;
			GridPanel_PageParam.location = result.params.data;
			var rst = result.params.data;
			var gridData = result.params.gridData;
			var rangeObj = {
					disInter: false,
					isCut: false,
					gs:true,
					jsonUrl: "hb_bianjie",
					roadJson:"road",
					nCols: that.USERPOST == 3? 179: 37,
					nRows: that.USERPOST == 3? 218: 45,
					noDataValue: typeof(rst.invalid) == "undefined" ? 9999 : rst.invalid,
					valmax: null,
					valmin: null,
					xCell: that.USERPOST == 3? 0.01: 0.05,
					xmax: 118.202,
					xmin: 116.6,
					yCell: that.USERPOST == 3? 0.01: 0.05,
					ymax: 40.353,
					ymin: 38.4
			};
			result.params.gridSetting.forEach(function(grid){
				if(grid.post == (that.USERPOST == 3?0:1)){
					rangeObj.xmax = grid.endLon;
					rangeObj.ymax = grid.endLat;
					rangeObj.xCell = grid.dlon;
					rangeObj.yCell = grid.dlat;
					rangeObj.nCols = grid.nlat;
					rangeObj.nRows = grid.nlon;
					rangeObj.xmin = grid.startLon;
					rangeObj.ymin = grid.startLat;
				}
			});
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
					gs:eleData.gs,
					disInter : false		//是否不插值
				};
			if(eleData.channel == "WEA"||eleData.channel == "DIS")rangeObj.disInter=true;
			GridPanel_PageParam.resultData.rangeObj = rangeObj;
			GIS.GridEdit.clearByTypes("nGis",["splash","isoline","wind","windanimate","number","splash","isoline","number"]);
			//GIS.Element.clearData("nGis");
			if(gridData.length>0){
				
				for(var i = 0, len = gridData.length; i < len; i++){
					if(gridData[i] == null || gridData[i] == "NaN"){
						gridData[i] = rangeObj.noDataValue;
					}
				}
				//if(flag=="redo")GDZZ_TOOLS.writeTemporaryGrid(gridData);
				GridPanel_PageParam.resultData.gridData = gridData;
				GIS.GridEdit.showByTypes("nGis", GDZZ_TOOLS.gisDisplayType(eleData.element), gridData, GDZZ_TOOLS.gisDisplayRangeObj(rangeObj),  function(gridData,statData){
					//GDZZ_TOOLS.writeTemporaryGrid(gridData);//保存格点临时文件
					//GridPanel_PageParam.updateStationTable(statData);//修改表格站点值
				}, GDZZ_TOOLS.legendColors[eleData.element], 0);
				if(timeIndex==0){
					that.loadStation(eleData,result.params.statDataList);
				}
				
			}else{
				var len = rangeObj.nCols * rangeObj.nRows;
				if(GridPanel_PageParam.Select_Ele.channel == 'EDA')len = len*2;
				gridData = new Array(len);
				for(var i = 0; i < len;i++){gridData[i] = rangeObj.noDataValue;}
				GridPanel_PageParam.resultData.gridData = gridData;
				GIS.GridEdit.showByTypes("nGis", GDZZ_TOOLS.gisDisplayType(eleData.element), gridData, GDZZ_TOOLS.gisDisplayRangeObj(GridPanel_PageParam.resultData.rangeObj),  function(gridData,statData){
					
					//GDZZ_TOOLS.writeTemporaryGrid(gridData);//保存格点临时文件
					//GridPanel_PageParam.updateStationTable(statData);//修改表格站点值
				}, GDZZ_TOOLS.legendColors[eleData.element], 0);
			}
			GDZZ_TOOLS.updateParam("gridParam");//gridData");
		},
		/**
		 * 遮罩
		 */
		addCover:function(flag,classname){
			if(!classname)classname = "loading-backdrop";
			if(!flag || $('div[name=synergy]').is(":visible")){
				if(flag)return;
				$('div[name=synergy]').remove();// 移除遮罩
			}else{
				$('#nPage').append("<div name=synergy><div class=modal-backdrop></div><div class=back-image></div></div>");//<div class="+classname+"></div>
				var panel = $('#nPage>div[name=synergy] .back-image');
				panel.css({"top":($('#nPage').height()/2-150),"left":($('#nPage').width()/2-150)});
				panel.css("background","url(/Web/HB/hebei/resources/business/gdzz/main/img/"+classname+".gif)");
			}
		},
		//选中背景场右下角添加拖动按钮
		bjcAddButton : function(obj){
//			
		
	},
	
	//站点加载
	loadStation : function(eleData,list){
		timeIndex=1;
		var that = this;
		var jsondata = {};
		
		var channel = that.Select_Ele.channel;
		jsondata.eleList = [];
		list.forEach(function(temp,index){
			jsondata.eleList.push({
				lat : temp.lat,
				lon : temp.lon,
				stationId : temp.code,
				stationName : temp.name,
				stationType : temp.type,
				val : temp.val,
				val2 : temp.val2,
				alt : null,
				areaCode : null,
				city : null,
				county : null,
				magnifcation:0,
				province : null,
				time : null
			});
		});
		var limit = GDZZ_TOOLS.valueLimit[eleData.element];
		var range = null;
		if(limit)
			range = {min:limit[0],max:limit[1]};
		//that.updateStationTable(jsondata.eleList);
		if(channel == "DIS" || channel == "WEA")return;//灾害落区/天气现象不绘制站点
		jsondata.eleKey = "";
		var eleType = that.Select_Ele.channel
			.replace("TP","RAIN")
			.replace("TMP","TEMP")
			.replace("EDA","WIND")
			.replace("RH","HUMI")
			.replace("VIS","VISI");
		that.Select_Ele.stationType = eleType;
		jsondata.eleType = eleType;
		jsondata.statType = "0";
		
		var statFlag = true;
		if(GDZZ_TOOLS)
			statFlag = GDZZ_TOOLS.stationCon();
		/**
		 * 单要素显示
		 * @param mapId:地图id
		 * @param jsonData:数据elekey eleList eleType statType levels isUnLevel-true不分级
		 * @param pop 回调函数
		 * @param range 阈值范围，对象：min、max
		 * @param visibleFlag 是否显示
		 * @returns
		 */
		
		GIS.Element.showReflecCanvas("nGis", jsondata, stationTool.stationSel, range,true,true);//站点加载
		GIS.Element.isShowAll("nGis",statFlag);
	}

	
	
};
function getMapData(channel,clement,param,gs,index){
	var eleData =  {Select_Ele:{}};
	eleData.channel=channel;
	eleData.element=clement;
	eleData.param=param;
	eleData.gs=gs;
	eleData.index=index;
	GridPanel_PageParam.Select_Ele = eleData;
	GridPanel_PageParam.readMonoPeriodGrid(eleData);
};
//TODO 分隔
jQuery.fn.gridPanel = function(param,list) {

	
	
	var data=GridPanel_PageParam.data;
	// 初始化参数
	//24:短期岗;4:中期岗
	var USERCLASS = GridPanel_PageParam.USERCLASS;//数值为一天预报的次数
	var USERPOST = GridPanel_PageParam.USERPOST;//
	var FORECASTDAY = GridPanel_PageParam.FORECASTDAY;//预报的天数
	var opt = GridPanel_PageParam.opt;
	
	
	iniStationData(opt.type);
	//GridPanel_PageParam.opt = opt;
	opt = $.extend(opt, param);
	// 区分需求
	switch (opt.flag) {
	case "init":
		//bindFunction();//注册事件
		initBjcPanel();
		GDZZ_TOOLS.initPage();
		
		getMapData("RE","Reflec","gridParam",false,opt.index);
		break;
	
	}
	
	// 初始化
	function initBjcPanel() {
		GridPanel_PageParam.opt.ysdw = opt.ysdw = opt.ysdw_1;
		if(USERPOST != 3)GridPanel_PageParam.opt.ysdw = opt.ysdw = opt.ysdw_2;
		queryMakingStatus();
	}
	//获取背景场数据源，状态
	function queryMakingStatus(){
		GridPanel_PageParam.addCover(true);
		$.ajax({
			type:'POST',
			url:'/shplatform/static/wh/hebei/resources/business/gdzz/main/js/queryMakingStatus.json',
			dataType:"json",
			success:function(result){
				data = result.params.data;
				GridPanel_PageParam.data = data;
			}
		});
	}
	//获取背景场数据源，状态
	function iniStationData(type){
		var url="";
		if(type=="TQXX"||type=="YJXX"){
			url="/shplatform/static/wh/hebei/resources/business/gdzz/main/js/qtyb.json";
		}else{	
			url="/shplatform/static/wh/hebei/resources/business/gdzz/main/js/readMonoPeriodGrid_TP.json";
		}
		$.ajax({
			type:'POST',
			url:url,
			dataType:"json",
			success:function(result){
				var data=result;
				GridPanel_PageParam.stationData = result;
				//getMapData("TP","TP24H","gridParam",false);
			}
		});
		
	}
};