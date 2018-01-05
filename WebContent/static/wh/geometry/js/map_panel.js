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
		
		readMonoPeriodGrid:function(eleData,flag){
			var qy=readCookies12("qy");//$.cookie('qy');

			var stationData=GridPanel_PageParam.stationData;
			var that = this;
			var url="";
			var data={};
			url = "GmControl/getGeoStr.action",
			data.userId=eleData.userid;
			
			$.ajax({
				type:'POST',
				url:url,
				dataType:"json",
				data:data,
				success:function(result){
					
					GIS.GridEdit.graphic_clean("nGis");
					if(result.state=="true"){
						var geoStr=result.geometry[0].geometry;
						GIS.GridEdit.drawGraphicByJson("nGis",geoStr);
						GIS.MapRefresh("nGis");
					}
				},
				error:function(message){
					
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
			var tname="";
			if(eleData.channel=="TQXX"||eleData.channel=="YJXX"){
				tname=temp.name;
			}else{
				tname=temp.name;
			}
			
			jsondata.eleList.push({
				lat : temp.lat,
				lon : temp.lon,
				stationId : temp.code,
				stationName : tname,
				stationName1 : tname,
				stationType : "0",
				val : temp.val,
				val2 : temp.val2,
				alt : null,
				areaCode : null,
				city : null,
				county : null,
				magnifcation:0,
				channel:channel,
				province : null,
				glb:temp.glb,
				time : null,
				tqxx : temp.url,
				weather : temp.weather,
				type:temp.type,
				qy:temp.qy,
				gjzid:temp.gjzid
			});
		});
		var limit = GDZZ_TOOLS.valueLimit[eleData.element];
		var range = null;
		if(limit)
			range = {min:limit[0],max:limit[1]};
		that.updateStationTable(jsondata.eleList);
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
		
		GIS.Element.showCanvas1("nGis", jsondata, stationTool.stationSel, range,true,true);//站点加载
		GIS.Element.isShowAll("nGis",statFlag);
	}


	
	
};

//TODO 分隔
jQuery.fn.gridPanel = function(param,list) {
	
	var opt = GridPanel_PageParam.opt;
	var userId=readCookies12("userid");
	opt = $.extend(opt, param);
	// 区分需求
	switch (opt.flag) {
	case "init":
		
		if(opt.type=="GE"){
			getMapData("GE",userId);
		}
		break;

	}
	
	// 初始化
	function initBjcPanel(type) {
		GridPanel_PageParam.opt.ysdw = opt.ysdw = opt.ysdw_1;
		if(USERPOST != 3)GridPanel_PageParam.opt.ysdw = opt.ysdw = opt.ysdw_2;
		//updateRqdw();
		queryMakingStatus(type);
		//GridPanel_PageParam.initTablehead(opt.ysdw.length);
		initYSDW();
		//setLayout();
		//bindFunction();//注册事件
	}
	function getMapData(channel,userid){
		var eleData =  {Select_Ele:{}};
		eleData.userid=userid;
		GridPanel_PageParam.Select_Ele = eleData;
		GridPanel_PageParam.readMonoPeriodGrid(eleData);
	};
};
function readCookies12(name){
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	 
    if(arr=document.cookie.match(reg))
 
        return unescape(arr[2]);
    else
        return null; 
}
function addCookies12(name,value){
	var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()+" ;path=/"; 
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