﻿/**
 * map_panel.js
 * @Author:	JIAOY,XINCHENG
 * @CreateDate：2016年7月8日 下午13:17:51
 * @Version 1.1
 * Copyright (C) 2016 NRIET
 * 
 * TODO  背景场组件
 */
var index=0;
var datetime_now;
var datetime_now1;
var datetime_date;
var datalength=0;
var rowlength=0
var valueOfAll;
var isFirst=true;
var channel="降水";
var functionType="";
var GridPanel_PageParam = {
		interval:[],//定时器id
		data :[],//背景场数据
		stationData:{},
		idwStation:{},
		idwdata:{},
		location:{},
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
			
			var data={};
			var url="";
			if(eleData.channel=="TP"){
				if(eleData.element=="TP24H"){
					url='GmControl/getIdw.action';
				}else{
					url='GmControl/getIdw3.action';
				}
				
			}else{
				url='GmControl/getStationList.action';
			}
			
			
			$.ajax({
				type:'POST',
				url:url,
				dataType:"json",
				
				success:function(tResult){
					
					//设置标题
					
					var _chennel=readCookies12("chennel");
					if(_chennel=="tem"){
						$('#warningDiv1').html(tResult.dateTime+"发布的气温实况");
					}else if(_chennel=="humi"){
						$('#warningDiv1').html(tResult.dateTime+"发布的相对湿度实况");
					}else if(_chennel=="EDA"){
						$('#warningDiv1').html(tResult.dateTime+"发布的风向风速实况");
					}else if(_chennel=="vis"){
						$('#warningDiv1').html(tResult.dateTime+"发布的能见度实况");
					}else if(_chennel=="tp"){
						if(tResult.type1=="IDW24"){
							$('#warningDiv1').html("过去24小时累积降雨量");
						}else{
							$('#warningDiv1').html("过去30分钟累积降雨量");
						}
						
					}
					
					
					if(tResult.type=="IDW"){
						GridPanel_PageParam.idwdata = tResult;
						GIS.Element.gpLayer("nGis",'f',true);
					}
					var result=GridPanel_PageParam.stationData;
					var ttdata=tResult;
					for (var i = 0; i < result.params.statDataList.length; i++) {
						var stationCode=result.params.statDataList[i].stationId;
						result.params.statDataList[i].IsShow="false";
						for (var j = 0; j < ttdata.geometry.length; j++) {
							var tCode=ttdata.geometry[j].stationId;
							if (stationCode==tCode) {
								if(tResult.type=="IDW"){
									result.params.statDataList[i].IsShow="true";
									result.params.statDataList[i].pre_1h=ttdata.geometry[j].pre24h;
								}else{
									result.params.statDataList[i].IsShow="true";
									result.params.statDataList[i].tem=ttdata.geometry[j].tem;
									result.params.statDataList[i].pre_1h=ttdata.geometry[j].pre_1h;
									result.params.statDataList[i].win_d_avg_10mi=ttdata.geometry[j].win_d_avg_10mi;
									result.params.statDataList[i].win_s_avg_10mi=ttdata.geometry[j].win_s_avg_10mi;
									result.params.statDataList[i].humi=ttdata.geometry[j].humi;
									result.params.statDataList[i].vis_hou_10mi=ttdata.geometry[j].vis_hou_10mi;
								}
								
							}
						}
					}
					
					
					GIS.GridEdit.clearByTypes("nGis",["splash","isoline","wind","windanimate","number","splash","isoline","number"]);
					GIS.Element.clearData("nGis");
					var tdate=GridPanel_PageParam.stationData;
					if(result.params.statDataList.length>0){
						
						var  mapHeight=$(window).height()-$(".bottomTable").height()+30;
						$("#mapDiv").height(mapHeight);
						GIS.MapRefresh("nGis");
						that.loadStation(eleData,result.params.statDataList);
						 //bundFunction();
					}else{
						var len = rangeObj.nCols * rangeObj.nRows;
						if(GridPanel_PageParam.Select_Ele.channel == 'EDA')len = len*2;
						gridData = new Array(len);
						for(var i = 0; i < len;i++){gridData[i] = rangeObj.noDataValue;}
						GridPanel_PageParam.resultData.gridData = gridData;
						GIS.GridEdit.showByTypes("nGis", GDZZ_TOOLS.gisDisplayType(eleData.element), gridData, GDZZ_TOOLS.gisDisplayRangeObj(GridPanel_PageParam.resultData.rangeObj),  function(gridData,statData){
							
							GDZZ_TOOLS.writeTemporaryGrid(gridData);//保存格点临时文件
							GridPanel_PageParam.updateStationTable(statData);//修改表格站点值
						}, GDZZ_TOOLS.legendColors[eleData.element], 0);
					}
					
					
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


	//站点加载
	loadStation : function(eleData,list){
		var that = this;
		var jsondata = {};
		
		var channel = that.Select_Ele.channel;
		jsondata.eleList = [];
		list.forEach(function(temp,index){
			if(temp.IsShow=="true"){
				jsondata.eleList.push({
					lat : temp.lat,
					lon : temp.lon,
					stationId : temp.stationId,
					tem : temp.tem,
					pre_1h : temp.pre_1h,
					win_d_avg_10mi : temp.win_d_avg_10mi,
					win_s_avg_10mi : temp.win_s_avg_10mi,
					humi : temp.humi,
					vis_hou_10mi : temp.vis_hou_10mi,
					stationName : temp.Name,
					stationType : "0",
					val : temp.val,
					val2 : temp.val2,
					magnifcation:0,
					channel:channel,
					type:"0",
					tqxx : temp.url,
					weather : temp.weather,
					qy:temp.qy,
					gjzid:temp.gjzid
				});
			}
			
		});
		
		
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
		
		GIS.Element.showCanvas1("nGis", jsondata, null, null,true,true);//站点加载
		GIS.Element.isShowAll("nGis",statFlag);
		
		
	}


	
	
};
//右边要素选择按钮
$(".choseElement input").on("click",function(){
	$(this).css({"background":"#B8D6F2","color":"white"}).siblings("input").css({"background":"white","color":"black"});
	
	$("#grid-legend").show();
	$('#tuli').css("visibility","visible");
	GIS.LayerManage.cleanGpLayer("nGis");
	if($(this).val() == "气温"){
		addCookies12("chennel","tem");
		getMapData("TMP","TMP","gridParam",false,"","pre1h","");
	}else if($(this).val() == "相对湿度"){
		addCookies12("chennel","humi");
		getMapData("humi","humi","gridParam",false,"","pre1h","");
	}else if($(this).val() == "风向风速"){
		addCookies12("chennel","EDA");
		getMapData("EDA","EDA","gridParam",false,"","pre1h","");
	}else if($(this).val() == "能见度"){
		addCookies12("chennel","vis");
		getMapData("vis","vis","gridParam",false,"","pre1h","");
	}else if($(this).val() == "30分钟累计降水量"){
		addCookies12("chennel","tp");
		getMapData("TP","TP3H","gridParam",false,"","pre1h","");
		//GIS.Element.gpLayer("nGis",'f',true);
	}else if($(this).val() == "24小时累计降雨量"){
		addCookies12("chennel","tp");
		getMapData("TP","TP24H","gridParam",false,"","pre1h","");
		//GIS.Element.gpLayer("nGis",'f',true);
	}
	
})

function getMapData(channel,clement,param,gs,date,fild,shixiao){
		var eleData =  {Select_Ele:{}};
		eleData.channel=channel;
		eleData.element=clement;
		eleData.param=param;
		eleData.gs=gs;
		eleData.current=date;
		eleData.fild=fild;
		eleData.shixiao=shixiao;
		GridPanel_PageParam.Select_Ele = eleData;
		GridPanel_PageParam.readMonoPeriodGrid(eleData);
	};
//TODO 分隔
jQuery.fn.gridPanel = function(param,list) {
	iniStationData();
	if(param == "dateChanged"){
		dateChanged();
		return;
	}
	var data=GridPanel_PageParam.data;
	// 初始化参数
	//24:短期岗;4:中期岗
	var USERCLASS = GridPanel_PageParam.USERCLASS;//数值为一天预报的次数
	var USERPOST = GridPanel_PageParam.USERPOST;//
	var FORECASTDAY = GridPanel_PageParam.FORECASTDAY;//预报的天数
	var opt = GridPanel_PageParam.opt;
	
	opt = $.extend(opt, param);
	//iniStationData(opt.type);
	// 区分需求
	switch (opt.flag) {
	case "init":
		//bindFunction();//注册事件
		
		//initBjcPanel(opt.type);
		getMapData("TMP","TMP","gridParam",false,"","pre1h","");
		break;

	}
	
	//获取背景场数据源，状态
	function iniStationData(){
		var url="static/wh/test/js/readMonoPeriodGrid_TP.json";
		
		$.ajax({
			type:'POST',
			url:url,
			dataType:"json",
			success:function(result){
				var data=result;
				GridPanel_PageParam.stationData = result;
			}
		});
		
//		$.ajax({
//			type:'POST',
//			url:'GmControl/getIdw.action',
//			dataType:"json",
//			success:function(result){
//				
//				GridPanel_PageParam.idwdata = result;
//			}
//		});
		
	}
};

function addCookies12(name,value){
	var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()+" ;path=/"; 
}
function readCookies12(name){
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	 
    if(arr=document.cookie.match(reg))
 
        return unescape(arr[2]);
    else
        return null; 
}
function showDif(val,mythis){
	var gsIsShow=false;
	var tlIsShow=false;
	//1:铁路站,2:色斑图,3:报警信息,4:预警信息
	if(val == 1){
		var myval = mythis.prev().html()
		if(mythis.is(':checked')){
			GIS.GridEdit.layervisble("highway_road",true);
			addCookies12("highway",true);
		}else{
			GIS.GridEdit.layervisble("highway_road",false);
			addCookies12("highway",false);
		}
	}else if(val == 2){
		var myval = mythis.prev().html()
		if(mythis.is(':checked')){
			GIS.GridEdit.layervisble("xzqh",true);
			addCookies12("xzqh",true);
		}else{
			GIS.GridEdit.layervisble("xzqh",false);
			addCookies12("xzqh",false);
		}
	}
	else if(val == 3){
		var myval = mythis.prev().html()
		if(mythis.is(':checked')){
			GIS.GridEdit.layervisble("railway",true);
			addCookies12("railway",true);
		}else{
			GIS.GridEdit.layervisble("railway",false);
			addCookies12("railway",false);
		}
	}
	GIS.LayerManage.refreshByLayerId("nGis","RAIN_0_0");
	//GIS.Element.showCanvas1("nGis", jsondata, stationTool.stationSel, range,true,true);//站点加载
	//GIS.GridEdit.showJtPt(gsIsShow,tlIsShow);
}
//日期格式化函数
Date.prototype.Format = function (fmt) { //author: meizz 
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