/**
 * customerDateBlack.js
 * 
 * @Author: lij
 * @CreateDate：2016年5月12日18:31:48
 * @Version 1.1 Copyright (C) 2016 NRIET
 * 
 */

/**
 * 自定义时间空间 dateFormat:yyyy-MM-dd hh:mm,yyyy-MM-dd hh,yyyy-MM-dd,yyyy-MM,yyyy
 */
jQuery.fn.customDateBlack = function(fn,param) {
	var obj = $(this);
	if (!obj) {
		return;
	}
	switch (fn) {
	case 'init':
		
		obj.empty();
		var dateFormat = obj.attr("format")||"yyyy-MM-dd hh:mm";
		var f = "yyyy";
		var date = param ? new Date(param) : new Date();
		var currentDate= date.getFullYear();
		var df = "year";
		if (dateFormat.indexOf("MM") != -1) {
			f+="-MM";
			var m=date.getMonth()+1;
			if (m<10) {
				m="0"+m;
			}
			currentDate+="-"+m;
			df = "mon";
		}
		if (dateFormat.indexOf("dd") != -1) {
			f+="-dd";
			var d = date.getDate();
			if (d<10) {
				d="0"+d;
			}
			currentDate+="-"+d;
			df = "day";
		}
		var ts = [];
		if (obj.val().length>0) {
			ts = obj.val().split(" ");
		} 
		var ymdV = ts[0]||currentDate;
		var ymdB = $('<div class="div-date-bor4"></div>');
		var tVl = ymdV;
		var dataStr = ymdV;
		var hm = ts[1]&&ts[1].split(":")||[date.getHours(),date.getMinutes()];
		if (dateFormat.indexOf("hh") != -1) {
			if (hm[0]<10) {
				hm[0]="0"+hm[0];
			}
			dataStr+= "   "+hm[0];
			tVl+=" "+hm[0];
			df = "hour";
		};
		if (dateFormat.indexOf("mm") != -1) {
			var min = getNearMinute(hm[1]);
			dataStr += ":"+min;
			dataStr = new Date(Date.parse(dataStr)).format("yyyy-MM-dd hh:mm");
			var time = $('<input class="input-dateTime jq-date-pick" value="'+dataStr+'" readonly="readonly">');
			ymdB.append(time);
			tVl+=":"+hm[1];
			df = "min";
		}
		obj.append(ymdB);
		var _time = new Date(Date.parse(tVl)).format("yyyy-MM-dd hh:mm");
		obj.prepend('<input type="hidden" name="custom_date_val" value="'+_time+'">');
		obj.prepend('<input type="hidden" name="custom_date_df" value="'+df+'">');
		var imgPrefix = G_CONTEXT.contextPath + "hebei/ui/customDateBlack/css/images/";
		obj.find("input[class^='input-']").jqDatePick({
			dateChange : function(dateStr, date){
				obj.customDateBlack("setTime", dateStr);
			},
			changeComplete : function(){
				this.css("background-image", "none");
			},
			openBefore : function(){
				this.css("background-image", "url('" + imgPrefix + "bg_blue.png')");
			}
		});
		break;

	case 'getTime':
		var param =  obj.find('input[name="custom_date_val"]').val();
		var vs = param.split(' ');
		var ymd = vs[0];
		var ts = vs[1].split(":");
		var dateTime = ymd + " "+ ts[0] + ":"+getNearMinute(ts[1]);
		return dateTime;
		break;
	case 'getTimeType':
		return obj.find('input[name="custom_date_df"]').val();
		break;
	case 'setTime':
		var vs = param.split(' ');
		var ymd = vs[0];
		var ts = vs[1].split(":");
		var dateTime = ymd + " "+ ts[0] + ":"+getNearMinute(ts[1]);
		obj.find('.input-dateTime').val(dateTime);
		var dateTime_ = ymd + " "+ ts[0] + ":"+getNearMinute(ts[1]);
		obj.find('input[name="custom_date_val"]').val(dateTime_);
		break;
	}
	
	function paddingZero(num){
		var numStr = num + "";
		if(numStr.length == 1){
			return "0" + numStr;
		}else{
			return numStr;
		}
	}
	
	/**
	 * 从分钟集合中获取最相近的时间点
	 */
	function getNearMinute(minute){
		var minuteData = ["00","05","10","15","20","25","30","35","40","45","50","55"];
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
		if (nearMinute<10) {
			nearMinute="0"+nearMinute;
		}
		return nearMinute;
	}
};