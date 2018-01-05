/**
 * dateUtil.js
 * @Author: PanRS
 * @CreateDate：2015年4月27日 下午5:22:51
 * @Version 1.1
 * Copyright (C) 2015 NRIET
 * 
 * TODO  时间工具组件
 */

var dateUtil; // 时间工具对象
if (!window.dateUtil) {
	dateUtil = {};
} else {
	//throw new Error("dateUtil has already existed!");
}

(function(window) {
	// 默认时间格式
	var strFormatDefault = "yyyy-MM-dd hh:mm";

	// 时间转换为字符串
	// strFormat 时间格式，例如：'yyyy-MM-dd hh:mm'
	// sample: var strCurDate = (new Date()).toString("yyyy-MM-dd hh"));
	Date.prototype.toString = function(strFormat) {
		var strDate = "";
		var year, month, day, minute, hour, second;
		year = this.getFullYear();
		day = this.getDate();
		if (parseInt(day,10) < 10) {
			day = "0" + day;
		}
		month = this.getMonth() + 1;
		if (parseInt(month,10) < 10) {
			month = "0" + month;
		}
		hour = this.getHours();
		if (parseInt(hour,10) < 10) {
			hour = "0" + hour;
		}
		minute = this.getMinutes();
		if (parseInt(minute,10) < 10) {
			minute = "0" + minute;
		}
		second = this.getSeconds();
		if (parseInt(second,10) < 10) {
			second = "0" + second;
		}
		if (strFormat === undefined || strFormat === "") {
			strFormat = strFormatDefault;
		}
		strDate = strFormat.replace("yyyy", year).replace("MM", month).replace(
				"dd", day).replace("hh", hour).replace("mm", minute).replace(
				"ss", second);

		return strDate;
	};
	
	/** 
	 * Date的扩展，将 Date 转化为指定格式的String:
	 * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符 ;
	 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) ;
	 */
	Date.prototype.format = function(format) {
		var o = {
			"M+" : this.getMonth() + 1, // 月
			"d+" : this.getDate(), // 日
			"h+" : this.getHours(), // 小时
			"m+" : this.getMinutes(), // 分钟
			"s+" : this.getSeconds(), // 秒
			"q+" : Math.floor((this.getMonth() + 3) / 3), // 季度
			"S" : this.getMilliseconds() //毫秒
		};
		if (/(y+)/.test(format)){
			format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		}
		for ( var k in o){
			if (new RegExp("(" + k + ")").test(format)){
				format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]: ("00" + o[k]).substr(("" + o[k]).length));
			}
		}
		return format;
	};
	
})(window);

/**
 * 将时间转换为字符串(格式：yyyy-MM-dd hh:mm)
 * 
 * @param d
 *            时间
 * @returns {String}
 */
dateUtil.convertDateToString = function(d, strFormat) {
	var dateStr = d.toString(strFormat);
	return dateStr;
};

/**
 * 将字符串转换为日期(格式：yyyy-MM-dd hh:mm)
 * @param dstr  时间字符串
 * @returns {Date}
 */
dateUtil.convertStringToDate = function(dstr, strFormat) {
	var y = dstr.substr(0, 4);
	var m = dstr.substr(5, 2);
	var d = dstr.substr(8, 2);
	var h = dstr.substr(11, 2);
	var mi = dstr.substr(14, 2);
	return new Date(y, m - 1, d, h, mi).format(strFormat);
};

/**
 * 将字符串转换为日期(格式：yyyy-MM-dd)
 * @param dstr  时间字符串
 * @returns {Date}
 */
dateUtil.convertStringToDate2 = function(dstr, strFormat) {
	var y = dstr.substr(0, 4);
	var m = dstr.substr(5, 2);
	var d = dstr.substr(8, 2);
	return new Date(y, m - 1, d).format(strFormat);
};

/**
 * 将字符串转换为日期
 * @param dstr  时间字符串
 * @returns {Date}
 */
dateUtil.convertStringToDate3 = function(dstr) {
	var y = dstr.substr(0, 4);
	var m = dstr.substr(5, 2);
	var d = dstr.substr(8, 2);
	return new Date(y, m - 1, d);
};

/**
 * 将字符串转换为日期
 * @param dstr  时间字符串
 * @returns {Date}
 */
dateUtil.convertStringToDate4 = function(dstr) {
	var y = dstr.substr(0, 4);
	var m = dstr.substr(4, 2);
	var d = dstr.substr(6, 2);
	var h = dstr.substr(8, 2);
	return new Date(y, m - 1, d,h);
};

/**
 * 将字符串转换为日期(格式：yyyy-MM-dd hh:mm)
 * @param dstr  时间字符串
 * @returns {Date}
 */
dateUtil.convertStringToDateFormat = function(dstr, strFormat) {
	var y = dstr.substr(0, 4);
	var m = dstr.substr(5, 2);
	var d = dstr.substr(8, 2);
	var h = dstr.substr(11, 2);
	var mi = dstr.substr(14, 2);
	var ss = dstr.substr(17, 2);
	return new Date(y, m - 1, d, h, mi, ss).format(strFormat);
};

/**
 * 获取当前时间(格式：yyyy-MM-dd hh:mm)
 */
dateUtil.getCurrentDateStr = function() {

	return this.convertDateToString(new Date());

};

/**
 * 将时间转换为字符串<精确到小时>(格式：yyyy-MM-dd hh)
 * 
 * @param d
 *            时间
 * @returns {String}
 */
dateUtil.convertDateForHourToString = function(d) {
	var strFormatForHour = "yyyy-MM-dd hh";
	var dateStr = d.toString(strFormatForHour);
	return dateStr;
};

/**
 * 获取当前时间(格式：yyyy-MM-dd hh)
 */
dateUtil.getCurrentDateForHourStr = function() {

	return this.convertDateForHourToString(new Date());

};

/**
 * 将时间转换为字符串<精确到分钟>(格式：yyyy-MM-dd hh:mm)
 * 
 * @param d
 *            时间
 * @returns {String}
 */
dateUtil.convertDateForMinuteToString = function(d) {
	var strFormatForMinute = "yyyy-MM-dd hh:mm";
	var dateStr = d.toString(strFormatForMinute);
	return dateStr;
};

/**
 * 获取当前时间(格式：yyyy-MM-dd hh:mm)
 */
dateUtil.getCurrentDateForMinuteStr = function() {

	return this.convertDateForMinuteToString(new Date());

};

/**
 * 获取当前时间,分钟取10分钟整数(格式：yyyy-MM-dd hh:mm)
 */
dateUtil.getCurrentDateStrOfTenMinutes = function() {

	var d = new Date();

	var minute = Math.floor(d.getMinutes() / 10) * 10;

	d.setMinutes(minute);

	return this.convertDateToString(d);

};

/**
 * 将日期转换为 足10分钟的 2012-09-16 12:18 2012-09-16 12:10
 * 
 * @param d
 *            日期数据 不能是字符串的格式的日期
 * @returns 日期字符串
 */
dateUtil.getTenMunits = function(d) {
	var minute = Math.floor(d.getMinutes() / 10) * 10;

	d.setMinutes(minute);

	return this.convertDateToString(d);
};

/**
 * 将时间字符串(yyyy-MM-dd hh:mm)转换为时间
 * 
 * @param strDate
 */
dateUtil.convertStringToDate = function(strDate) {

	var d;

	var arr = strDate.split(" ");

	var arr1 = arr[0].split("-");

	var arr2 = arr[1].split(":");

	d = new Date(arr1[0], arr1[1] - 1, arr1[2], arr2[0], arr2[1], "00");

	return d;

};

/**
 * 根据相差的分钟，获取时间
 * 
 * @param strDate
 *            时间字符串(格式：yyyy-MM-dd hh:mm)
 * @param minute
 *            分钟
 * @returns 时间字符串(格式：yyyy-MM-dd hh:mm)
 */
dateUtil.getDateStrBySkipMinute = function(strDate, skipMinute) {

	var dateStr = "";

	var d = this.convertStringToDate(strDate);

	d.setMinutes(d.getMinutes() + skipMinute);

	dateStr = this.convertDateToString(d);

	return dateStr;
};

/**
 * 根据给定的时间和时点，获取最近的这个时点
 * 
 * @param strDate
 *            时间字符串(格式：yyyy-MM-dd hh:mm)
 * @param hour
 *            某个时点,如 05,20
 * @returns 时间字符串(格式：yyyy-MM-dd hh:mm)
 */
dateUtil.getDateStrForLastPoint = function(strDate, hour) {

	var dateStr = "";

	// 当天时间点
	var curDayPoint = strDate.substr(0, 10) + " " + hour + ":00";

	// 如果当天时间点小于当前时间，则取当天时间点,否则取前一天的时间点
	if (this.convertStringToDate(curDayPoint) < this
			.convertStringToDate(strDate)) {

		dateStr = curDayPoint;

	} else {
		dateStr = this.getDateStrBySkipMinute(curDayPoint, -24 * 60);
	}

	return dateStr;
};
/**
 * 根据当前时间返回T-Logp所需的时间格式 如果当前时间为8-20点之间，返回8点; 如果当前时间为20-24点之间，返回20点;
 * 如果当前时间为0-8点之间，返回前一天20点。
 * 
 * @returns {String} yyyy-MM-dd HH:00
 */
dateUtil.getDateStrForTLogp = function() {
	var dateStr = this.convertDateForMinuteToString(new Date());
	var returnDate = "";
	var hour = parseInt(dateStr.substr(11, 2),10);
	if (hour >= 8 && hour < 20) {
		returnDate = dateStr.substr(0, 10) + " 08";
	} else if (hour >= 20) {
		returnDate = dateStr.substr(0, 10) + " 20";
	} else {
		dateStr = this.getDateStrBySkipMinute(dateStr, -24 * 60);
		returnDate = dateStr.substr(0, 10) + " 20";
	}
	returnDate = returnDate + ":00";
	return returnDate;
};

/**
 * 获取当前时间前12小时的时刻 yyyy-MM-dd HH:00
 */
dateUtil.getDateStrSkip12 = function() {
	var dateStr=this.convertDateForMinuteToString(new Date());
	var dateArr = this.demergeTime(this.convertDateForMinuteToString(new Date()));
	var dts=this.btnAfterAndBefore(dateArr[0], dateArr[1], dateArr[2], -12*60+"");
	var hour = parseInt(dts[1],10);
	var returnDate = "";
	if (hour >= 8 && hour < 20) {
		returnDate = dts[0] + " 08";
	} else if (hour >= 20) {
		returnDate = dts[0]  + " 20";
	} else {
		dateStr = this.getDateStrBySkipMinute(dateStr, -24 * 60);
		returnDate = dateStr.substr(0, 10) + " 20";
	}
	return returnDate;
};

/**
 * 合并时间
 * 
 * @param selDate
 *            yyyy-MM-dd
 * @param selHour
 *            hh12
 * @param selMinute
 *            mm
 * @returns {String} yyyy-MM-dd HH:mm
 */
dateUtil.mergeTime = function(selDate, selHour, selMinute, selSec) {
	var strTime = "";
	if (selHour.length < 2) {
		selHour = "0" + selHour;
	}
	strTime = selDate + " " + selHour;
	if (selMinute != undefined) {
		if (selMinute.length< 2) {
			selMinute = "0" + window.parseInt(selMinute,10);
		}
		strTime += ":" + selMinute;
	}
	
	if (selSec != undefined) {
		if (selSec.length < 2) {
			selSec = "0" + window.parseInt(selSec,10);
		}
		strTime += ":" + selSec;
	}
	
	return strTime;
};

/**
 * @param strTime
 *            yyyy-MM-dd HH:mm
 * @returns 时间数组 [yyyy-MM-dd,HH,mm]
 */
dateUtil.demergeTime = function(strTime) {
	if (strTime == undefined) {
		strTime = this.getCurrentDateStr();
	}
	var timeArr = [];
	timeArr[0] = strTime.substr(0, 10);
	timeArr[1] = strTime.substr(11, 2);
	timeArr[2] = strTime.substr(14, 2);
	
	if(strTime.length > 17) {
		timeArr[3] = strTime.substr(17, 2);
	}

	return timeArr;
};

/**
 * 向前向后事件
 * 
 * @param space
 *            字符串：向前10传“-10”，向后10为“10”
 * @returns 数组["yyyy-MM-dd","HH","mm"]
 */
dateUtil.btnAfterAndBefore = function(year, hour, minute, space) {
	if (hour.length < 2) {
		hour = "0" + hour;
	}
	if (hour.length > 2) {
		hour = hour.substring(0, 2);
	}
	if (minute.length < 2) {
		minute = "0" + minute;
	}
	var t = year + " " + hour + ":" + minute;
	var spaces = space * 1;
	t = t.replace(/-/g, "/");
	dt = new Date(t);
	dt.setMinutes(dt.getMinutes() + spaces);
	var dts = [];
	var times = dt.toString().split(" ");
	dts[0] = times[0];
	dts[1] = times[1].split(":")[0];
	dts[2] = times[1].split(":")[1];
	return dts;
};


/**
 * 设置时间
 * @param dts 时间数字dts[0]->yyyy-MM-dd /dts[1]->HH /dts[2]->mm
 * @param timeFormat 时间格式 "yyyy-MM-dd HH"、"yyyy-MM-dd HH:mm"
 * @param hourType 小时类型 数值预报大部分为radio
 */
dateUtil.setTime = function(dts , hourType , hourNm){
	
	hourType = G_APP.isUndefined(hourType)  ? "select" : "radio";
	
	function nodeIsExist(nd){
		return nd.length > 0 ? $(nd) : null;
	}
	
	if(hourType == "radio"){
		$("input[name='" + hourNm + "']").each(function(){
			if($(this).val()==dts[1]){ 
				$(this).attr("checked","checked");
			}
		});
		$("#date").val(dts[0]);
	}
	if(hourType == "select"){
		var $date = nodeIsExist($("input#date")) || nodeIsExist($("input#dateStr")) || nodeIsExist($("input#selDate"));
		var $hour = nodeIsExist($("select#hour")) || nodeIsExist($("select#selHour"));
		var $minute = nodeIsExist($("select#min6")) || nodeIsExist($("select#min10"))
				|| nodeIsExist($("select#min12")) || nodeIsExist($("select#min15"))
				|| nodeIsExist($("select#minute")) || nodeIsExist($("select#selMin"))
				|| nodeIsExist($("select#selMinute"));
		$date.val(dts[0]);
		$hour.val(dts[1]);
		$minute.val(dts[2]);
	}
	var $hourBox = nodeIsExist($("div#hour")) || nodeIsExist($("div#selHour"));
	var $minuteBox = nodeIsExist($("div#min6")) || nodeIsExist($("div#min10"))
				|| nodeIsExist($("div#min12")) || nodeIsExist($("div#min15"))
				|| nodeIsExist($("div#minute")) || nodeIsExist($("div#selMin"))
				|| nodeIsExist($("div#selMinute"));
	
	$hourBox.text(dts[1]);
	$minuteBox.text(dts[2]);
};

/**
 * 将时间字符串封装成标准格式字符串
 * @returns String格式 "yyyy-MM-dd HH:mm"
 */
dateUtil.doDatStrMapper=function(dtStr){
	var dateStr="";
	var dtss=dtStr.split(" ");
	var years=dtss[0].split("-");
	var dts=dtss[1].split(":");
	var month=years[1];
	var day=years[2];
	var hour=dts[0];
	var minute=dts[1];
	if(years[1].length<2){
		month="0"+years[1];
	}
	if(years[2].length<2){
		day="0"+years[2];
	}
	if(dts[0].length<2){
		hour="0"+dts[0];
	}
	if(dts[1].length<2){
		minute="0"+dts[1];
	}
	dateStr=years[0]+"-"+month+"-"+day+" "+hour+":"+minute;
	return dateStr;
};


/**
 * 获取从当前时间开始向前或向后flag时间段中，各个时间点的小时字段组成的数组
 * @param  	flag 需要从当前时间向前多少小时 向前flag为负整数，向后flag为正整数
 * @returns 当前时间向前或向后flag小时，各个时段组成数组["yyyy-MM-dd HH:mm","yyyy-MM-dd HH:mm","yyyy-MM-dd HH:mm",,,,]
 */
dateUtil.getArrForCurrentDate = function(time,flag) {
	var dateStr=time+":00";
	var dateArr=[];
	var fg=Math.abs(flag);
	var fgs;
	if(flag<0){
		fgs=-(fg-1);
	}else{
		fgs=fg-1;
	}
	var flags, spaces=0;
	for(var i=0;i<fg;i++){
		if(flag>0){
			flags=(fgs--)*1;
			spaces =flags*60;
		}
		if(flag<0){
			flags=(fgs++)*1;
			spaces =flags*60;
		}
		dateStr = dateStr.replace(/-/g, "/");
		dt = new Date(dateStr);
		dt.setMinutes(dt.getMinutes()+ spaces);
		dateArr[i]=dt.toString();
	}
	var tim=dateStr.split(" ")[1].split(":")[0]*1+1;
	dateStr=dateStr.split(" ")[0]+" "+tim+":"+dateStr.split(" ")[1].split(":")[1];
	dt = new Date(dateStr);
	dt.setMinutes(dt.getMinutes()+ spaces);
	dateArr.push(dt.toString());
	if(flag>=0){
		dateArr=dateArr.reverse();
	}
	return dateArr;
};


dateUtil.getArrFor10Day=function(curDay,curHour){
	var dateArr=[];
	var dts = [];var d="",h="";
	dateArr.push(curDay+" "+curHour);
	for ( var i = 0; i < 10; i++) {
		if(d!=""&&h!=""){
			dts =this.btnAfterAndBefore(d,h,"00", ""+24*60);
		}else{
			dts = this.btnAfterAndBefore(curDay,curHour,"00", ""+24*60);
		}
		d=dts[0];h=dts[1];
		dateArr.push(dts[0]+" "+dts[1]);
	}
	return dateArr;
};

//方向
dateUtil.directions = {
		forward : "forward",
		backward : "backward"
};

//得到与基准时间最近，且分钟取最近能被inteval整除的数，并返回时间字符串数组
//@param strTime 格式：yyyy-MM-dd hh:mm:ss、yyyy-MM-dd hh:mm
//@param direction  向前或者向后取最近
//@return 数组格式["yyyy-MM-dd","HH","mm"]
dateUtil.getLastTimeByRide = function(strTime, inteval, direction) {

	var dateArr = dateUtil.demergeTime(strTime);
	
	var min = window.parseInt(dateArr[2], 10);

	if(direction == dateUtil.directions.backward) {
		min = Math.ceil(min / inteval) * inteval;
	} else {
		min = Math.floor(min / inteval) * inteval;
	}
	
	
	if(min < 10) {
		min = "0" + min;
	} else {
		min = "" + min;
	}
	
	dateArr[2] = min;
	
	return dateArr;
	
};

/**
 * 获取本地时间“+”预报时效字符串
 * @param  	dateStr 格式'yyyy-MM-dd HH' 图片起报时间，timeEffect 预报时效
 * @returns reDateStr yyyyMMddHH+时效H -> yyyyMMddHH
 */
dateUtil.getDateStrForCST2 = function(dateStr,timeEffect) {
	var reDateStr="CST:";
	var day = dateStr.split(" ")[0];
	var y = day.split("-")[0];
	var m = day.split("-")[1];
	var d = day.split("-")[2];
	var hour = dateStr.split(" ")[1];
	reDateStr += y + m + d + hour + "+" + timeEffect + "H -> ";
	var days = dateStr.split(" ")[0];
	var hours = dateStr.split(" ")[1];
	var timeEff = parseInt(timeEffect,10);
	var m = "00";
	if(hours.length > 2){
		m = hours.split(":")[1];
	}
	var dateArrs = this.btnAfterAndBefore(days, hours, m, timeEff*60);
	var y = dateArrs[0].split("-")[0];
	var m = dateArrs[0].split("-")[1];
	var d = dateArrs[0].split("-")[2];
	dateArrs[2] = dateArrs[2] == "00" ? "" : dateArrs[2];
	reDateStr += y + m + d + dateArrs[1] + dateArrs[2];
	return reDateStr;
};
/**
 * 获取本地时间“+”预报时效字符串
 * @param  	dateStr 格式'yyyy-MM-dd HH' 图片起报时间，timeEffect 预报时效
 * @returns reDateStr yyyyMMddHH+时效H -> yyyyMMddHH
 */
dateUtil.getDateStrForCST = function(dateStr,timeEffect) {
	var reDateStr="CST:";
	var day=dateStr.split(" ")[0];
	var y=day.split("-")[0];
	var m=day.split("-")[1];
	var d=day.split("-")[2];
	var hour=dateStr.split(" ")[1];
	reDateStr+=y+m+d+hour+"+"+timeEffect+"H -> ";
	var days=dateStr.split(" ")[0];
	var hours=dateStr.split(" ")[1];
	var timeEff=parseInt(timeEffect,10);
	var dateArrs=this.btnAfterAndBefore(days, hours, "00", timeEff*60);
	var y=dateArrs[0].split("-")[0];
	var m=dateArrs[0].split("-")[1];
	var d=dateArrs[0].split("-")[2];
	reDateStr+=y+m+d+dateArrs[1];
	return reDateStr;
};

/**
 * 
 * 获取世界时“+”预报时效字符串
 * @param  	dateStr 格式'yyyy-MM-dd HH' 图片起报时间，timeEffect 预报时效
 * @returns reDateStr yyyyMMddHH+时效H -> yyyyMMddHH
 */
dateUtil.getDateStrForUTC = function(dateStr,timeEffect) {
	var reDateStr="UTC:";
	var day=dateStr.split(" ")[0];
	var hour=dateStr.split(" ")[1];
	var dateArr=this.btnAfterAndBefore(day, hour, "00", "-480");
	var y=dateArr[0].split("-")[0];
	var m=dateArr[0].split("-")[1];
	var d=dateArr[0].split("-")[2];
	var h=dateArr[1];
	reDateStr+=y+m+d+h+"+"+timeEffect+"H -> ";
	var timeEff=parseInt(timeEffect,10);
	var dateArrs=this.btnAfterAndBefore(dateArr[0], dateArr[1], "00", timeEff*60);
	var y=dateArrs[0].split("-")[0];
	var m=dateArrs[0].split("-")[1];
	var d=dateArrs[0].split("-")[2];
	reDateStr+=y+m+d+dateArrs[1];
	return reDateStr;
};

/**
 * 比较两个日期大小
 * @param prevDateStr 前一个日期字符串, 支持格式(yyyy-MM-dd,yyyy-MM-dd HH,yyyy-MM-dd HH:mm,yyyy-MM-dd HH:mm:ss);
 * @param afterDateStr 后一个日期字符串, 支持格式(yyyy-MM-dd,yyyy-MM-dd HH,yyyy-MM-dd HH:mm,yyyy-MM-dd HH:mm:ss);
 * @returns -1 : prevDateStr > afterDateStr , 0 :prevDateStr = afterDateStr , 1 : prevDateStr < afterDateStr
 */
dateUtil.isEarlier = function (prevDateStr , afterDateStr) {
	switch (true) {
	case prevDateStr.length < 19:
		var len = 19 - prevDateStr.length;
		switch (len) {
		case 3:
			prevDateStr = prevDateStr + ":00";
			break;
		case 6:
			prevDateStr = prevDateStr + ":00:00";
			break;
		case 9:
			prevDateStr = prevDateStr + " 00:00:00";
			break;
		default:
			break;
		}
		break;
	default:
		break;
	}
	switch (true) {
	case afterDateStr.length < 19:
		var len = 19 - afterDateStr.length;
		switch (len) {
			case 3:
				afterDateStr = afterDateStr + ":00";
				break;
			case 6:
				afterDateStr = afterDateStr + ":00:00";
				break;
			case 9:
				afterDateStr = afterDateStr + " 00:00:00";
				break;
			default:
				break;
		}
		break;
	default:
		break;
	}
	var pd = new Date(prevDateStr.replace(/-/g	,"/"));
	var ad = new Date(afterDateStr.replace(/-/g	,"/"));
	var reBoolean = -1;
	if(pd < ad){
		reBoolean = 1;
	}else if(pd > ad){
		reBoolean = -1;
	}else if(pd = ad){
		reBoolean = 0;
	}
	return reBoolean;
};


dateUtil.isEqualForDate = function(strDate1, strDate2) {
	var isEqual = false;
	if (!G_APP.isUndefined(strDate1) && !G_APP.isUndefined(strDate2)) {
		if (strDate1.length >= 10 && strDate2.length >= 10) {
			var time1 = strDate1.substr(0, 10);
			var time2 = strDate2.substr(0, 10);
			if (time1 == time2) {
				isEqual = true;
			}
		}
	}
	return isEqual;
};

