
(function($, win){
	win.customDateAgentPicker = function(target, fn, param, dateChange, minuteData) {
		var dateFormat = "yyyy-MM-dd hh:mm";
		
		var obj = $("#" + target);
		if (!obj) {
			return;
		}
		switch (fn) {
			case 'init':
				_init();
				break;
			case 'getTime':
				return obj.find('input[name="custom_date_val"]').val();
			case 'getTimeType':
				return obj.find('input[name="custom_date_df"]').val();
			case 'setTime':
				var date = new Date(Date.parse(param));
				date.setMinutes(getNearMinute(date.getMinutes()), 0, 0);
				param = date.format(dateFormat);
				obj.find('.custom-date-ymdhm').val(param);
				obj.find('input[name="custom_date_val"]').val(param);
				break;
		}
		
		function _init(){
			obj.empty();
			var date = new Date();
			date.setMinutes(getNearMinute(date.getMinutes()), 0, 0);
			date = new Date(date.getTime() - (10 * 60 * 1000));
			var currentDate = date.format(dateFormat);
			var ymdB = $('<div class="custom-date-border"></div>');
			var ymdL = $('<div class="custom-date-before-wrap"></div>');
			var ymdR = $('<div class="custom-date-input-wrap"></div>');
			var ymdhmInput = $('<input class="custom-date-ymdhm jq-date-pick" readonly="readonly" >');
			var iDate = $('<i class="fa fa-calendar"></i>');
			ymdL.append(iDate);
			ymdR.append(ymdhmInput);
			ymdhmInput.val(currentDate);
			ymdB.append(ymdL).append(ymdR);
			obj.append(ymdB);
			obj.prepend('<input type="hidden" name="custom_date_val" value="'+currentDate+'">');
			obj.find("input.custom-date-ymdhm").jqDatePick({
				dateChange : function(dateStr, date){
					customDateAgentPicker(target, "setTime", dateStr);
				},
				changeComplete : function(dateStr, date){
					if($.isFunction(dateChange)){
						dateChange(dateStr);
					}
				}
			});
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
			return paddingZero(nearMinute);
		}
		
		function paddingZero(num){
			var numStr = num + "";
			if(numStr.length == 1){
				return "0" + numStr;
			}else{
				return numStr;
			}
		}
	};
})(jQuery, window)
