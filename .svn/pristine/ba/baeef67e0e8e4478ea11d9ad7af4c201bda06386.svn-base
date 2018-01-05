(function($){
	var $date;
	var jqcustomDate;
	var settings;
	$.fn.jqcustomDate = function(options){
		$date = this;
		settings = $date.data("settings");
		if(typeof arguments[0] === 'string' && jqcustomDate[arguments[0]]){
			return jqcustomDate[arguments[0]].apply(this, Array.prototype.slice.call(arguments, 1));
		}else if(typeof arguments[0] === 'object'){
			jqcustomDate.init.apply(this, arguments);
		}else if(arguments.length == 0){
			
		}else{
			$.error('Method ' + options + ' does not exist on jqcustomDate');
		}
		return jqcustomDate;
	}
	
	jqcustomDate = {
		init : function(options){
			settings = options;
			$date.data("settings", settings);
			$date.empty();
			_init($date, options.format, options.date, options.callback);
		},
		setDate : function(date){
			if(date.length == 4){
				$date.find(".zdz-time-date").val(date);
				return;
			}
			date.setMinutes(getNearMinute(date.getMinutes()), 0, 0);
			$date.find(".zdz-time-date").val(date.format("yyyy-MM-dd"));
			$date.find(".zdz-time-hour").val(date.format("hh"));
			$date.find(".zdz-time-min").val(date.format("mm"));
			if(settings.callback){
				settings.callback.call($date, date);
			}
		},
		getDate : function(){
			var dateStr = $date.find(".zdz-time-date").val();
			var hourStr = $date.find(".zdz-time-hour").val();
			var minStr = $date.find(".zdz-time-min").val();
			var time = new Date(Date.parse(dateStr + " 00:00:00"));
			time.setHours(hourStr ? hourStr : 0);
			time.setMinutes(minStr ? minStr : 0, 0, 0);
			return time;
		}
	}
	
	function _init($content, format, date, callback){
		if(!format){
			return;
		}
		
		if(!date){
			date = new Date();
		}
		
		date.setMinutes(getNearMinute(date.getMinutes()), 0, 0);
		
		if(format == "yyyy"){
			$content.append(
				'<div class="zdz-time-date-wrap">' +
					'<input class="zdz-time-date" readonly="readonly" type="text">' +
					'<div class="zdz-time-opera">' +
						'<div class="zdz-time-opera-minus"></div>' +
						'<div class="zdz-time-opera-plus"></div>' +
					'</div>' +
				'</div>'
			);
			var year = date.getFullYear();
			//var firstYear = year - 10;
			var lastYear = year;
			var $operateLayer = $("<div class='zdz-time-year-opera-wrap'>");
			$content.find(".zdz-time-date-wrap").append($operateLayer);
			var $yearSelect = $("<div class='zdz-time-year-select'>");
			$operateLayer.append($yearSelect);
			for(var i = 9; i >= 0; i--){
				if(year - i == lastYear){
					$yearSelect.append($("<div class='zdz-time-year-option zdz-time-year-option-selected'>").text(year - i));
				}else{
					$yearSelect.append($("<div class='zdz-time-year-option'>").text(year - i));
				}	
			}
			$content.find(".zdz-time-date").val(lastYear);
			$yearSelect.find(".zdz-time-year-option").off("click").on("click", function(){
				$(this).addClass("zdz-time-year-option-selected").siblings().removeClass("zdz-time-year-option-selected");
				var dateT = new Date();
				dateT.setFullYear($(this).text(), 0, 1);
				$content.find(".zdz-time-date").val($(this).text());
				if(settings.callback){
					settings.callback(dateT, dateT.format(settings.format));
				}
				$(".zdz-time-year-opera-wrap").hide();
			});
			$content.find(".zdz-time-date").off("click").on("click", function(){
				$(".zdz-time-year-opera-wrap").show();
			});
			
			$operateLayer.append('<div class="zdz-time-year-opera"><div class="fa fa-angle-left"></div><div class="fa fa-angle-right"></div></div>');
			$content.find(".zdz-time-opera-minus").off("click").on("click", function(){
				var date = $content.find(".zdz-time-date").val()-1;
				$content.find(".zdz-time-date").val(date);
				var dateT = new Date();
				dateT.setFullYear(date, 0, 1);
				if(settings.callback){
					settings.callback(dateT, dateT.format(settings.format));
				}
			});
			
			$content.find(".zdz-time-opera-plus").off("click").on("click", function(){
				var date = parseInt($content.find(".zdz-time-date").val()) + 1;
				$content.find(".zdz-time-date").val(date);
				var dateT = new Date();
				dateT.setFullYear(date, 0, 1);
				if(settings.callback){
					settings.callback(dateT, dateT.format(settings.format));
				}
			});
			
			return;
		}
		
		if(format.indexOf("yyyy-MM-dd") > -1){
			$content.append(
				'<div class="zdz-time-date-wrap">' +
					'<div class="zdz-time-date-icon"></div>' +
					'<input class="zdz-time-date" readonly="readonly" format="yyyy-MM-dd" type="text">' +
					'<div class="zdz-time-opera">' +
						'<div class="zdz-time-opera-minus"></div>' +
						'<div class="zdz-time-opera-plus"></div>' +
					'</div>' +
				'</div>'
			);
			$content.find(".zdz-time-date").val(date.format("yyyy-MM-dd")).jqDatePick({
				dateChange : function(dateStr){
					dateChange();
				}
			});
			$content.find(".zdz-time-date-wrap .zdz-time-opera-minus").off("click").on("click", function(){
				var dateStr = $(this).parent().prev().val();
				dateStr = new Date(Date.parse(dateStr + " 00:00:00") - 24 * 60 * 60 * 1000).format("yyyy-MM-dd");
				$(this).parent().prev().val(dateStr);
				dateChange();
			});
			$content.find(".zdz-time-date-wrap .zdz-time-opera-plus").off("click").on("click", function(){
				var dateStr = $(this).parent().prev().val();
				dateStr = new Date(Date.parse(dateStr + " 00:00:00") + 24 * 60 * 60 * 1000).format("yyyy-MM-dd");
				$(this).parent().prev().val(dateStr);
				dateChange();
			});
		}
		
		if(format.indexOf("yyyy-MM-dd hh") > -1){
			$content.append(
				'<div class="zdz-time-hour-wrap">' +
					'<div class="zdz-time-hour-inner jqdp-hm-select-wrap">' +
						'<input class="zdz-time-hour" readonly="readonly" type="text">' +
						'<div class="zdz-time-opera">' +
							'<div class="zdz-time-opera-minus"></div>' +
							'<div class="zdz-time-opera-plus"></div>' +
						'</div>' +
					'</div>' +
					'时' +
				'</div>'
			);
			$content.find(".zdz-time-hour").val(date.format("hh"));
			$content.find(".zdz-time-hour-wrap .zdz-time-opera-minus").off("click").on("click", function(){
				var $hour = $(this).parent().prev();
				var $date = $(this).parents(".zdz-time-hour-wrap").prev().find(".zdz-time-date");
				var time = new Date(Date.parse($date.val() + " 00:00:00"));
				time.setHours($hour.val());
				time = new Date(time.getTime() - 60 * 60 * 1000);
				$date.val(time.format("yyyy-MM-dd"));
				$hour.val(time.format("hh"));
				dateChange();
			});
			$content.find(".zdz-time-hour-wrap .zdz-time-opera-plus").off("click").on("click", function(){
				var $hour = $(this).parent().prev();
				var $date = $(this).parents(".zdz-time-hour-wrap").prev().find(".zdz-time-date");
				var time = new Date(Date.parse($date.val() + " 00:00:00"));
				time.setHours($hour.val());
				time = new Date(time.getTime() + 60 * 60 * 1000);
				$date.val(time.format("yyyy-MM-dd"));
				$hour.val(time.format("hh"));
				dateChange();
			});
			var hourData = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];
			var $hourOptions = $('<div class="jqdp-hm-options">').height(105);
			$content.find(".jqdp-hm-select-wrap").append($hourOptions);
			$hourOptions.append("<div class='jqdp-hm-option-title'>小时选择</div>");
			$(hourData).each(function(i, hour){
				var $hourOption;
				if(parseInt(hour) == parseInt($content.find(".zdz-time-hour").val())){
					$hourOption = $("<div class='jqdp-hm-option jqdp-hm-option-selected'>").text(hour);
				}else{
					$hourOption = $("<div class='jqdp-hm-option'>").text(hour);
				}
				$hourOption.off("click").on("click", function(){
					if($(this).hasClass("jqdp-hm-option-selected")){
						return;
					}
					$content.find(".zdz-time-hour").val($(this).text())
					$(this).addClass("jqdp-hm-option-selected").siblings(".jqdp-hm-option").removeClass("jqdp-hm-option-selected");
					dateChange();
					$hourOptions.hide();
				});
				$hourOptions.append($hourOption);
			});
			$content.find(".zdz-time-hour").off("click").on("click", function(){
				$(".jqdp-hm-options").hide();
				$hourOptions.show();
			});
		}
		
		if(format.indexOf("yyyy-MM-dd hh:mm") > -1){
			$content.append(
				'<div class="zdz-time-min-wrap">' +
					'<div class="zdz-time-min-inner jqdp-hm-select-wrap">' +
						'<input class="zdz-time-min" readonly="readonly" type="text" value="04">' +
						'<div class="zdz-time-opera">' +
							'<div class="zdz-time-opera-minus"></div>' +
							'<div class="zdz-time-opera-plus"></div>' +
						'</div>' +
					'</div>' +
					'分' +
				'</div>'
			);
			$content.find(".zdz-time-min").val(date.format("mm"));
			$content.find(".zdz-time-min-wrap .zdz-time-opera-minus").off("click").on("click", function(){
				var $min = $(this).parent().prev();
				var $hour = $(this).parents(".zdz-time-min-wrap").prev().find(".zdz-time-hour");
				var $date = $(this).parents(".zdz-time-min-wrap").prev().prev().find(".zdz-time-date");
				var time = new Date(Date.parse($date.val() + " 00:00:00"));
				time.setHours($hour.val());
				time.setMinutes($min.val(), 0, 0);
				time = new Date(time.getTime() - 5 * 60 * 1000);
				$date.val(time.format("yyyy-MM-dd"));
				$hour.val(time.format("hh"));
				$min.val(time.format("mm"));
				dateChange();
			});
			$content.find(".zdz-time-min-wrap .zdz-time-opera-plus").off("click").on("click", function(){
				var $min = $(this).parent().prev();
				var $hour = $(this).parents(".zdz-time-min-wrap").prev().find(".zdz-time-hour");
				var $date = $(this).parents(".zdz-time-min-wrap").prev().prev().find(".zdz-time-date");
				var time = new Date(Date.parse($date.val() + " 00:00:00"));
				time.setHours($hour.val());
				time.setMinutes($min.val(), 0, 0);
				time = new Date(time.getTime() + 5 * 60 * 1000);
				$date.val(time.format("yyyy-MM-dd"));
				$hour.val(time.format("hh"));
				$min.val(time.format("mm"));
				dateChange();
			});
			var minuteData = ["00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"];
			var $minOptions = $('<div class="jqdp-hm-options">').height(80);
			$content.find(".jqdp-hm-select-wrap").append($minOptions);
			$minOptions.append("<div class='jqdp-hm-option-title'>分钟选择</div>");
			$(minuteData).each(function(i, min){
				var $minOption = $("<div class='jqdp-hm-option'>").text(min);
				if(parseInt(min) == parseInt($content.find(".zdz-time-min").val())){
					$minOption = $("<div class='jqdp-hm-option jqdp-hm-option-selected'>").text(min);
				}else{
					$minOption = $("<div class='jqdp-hm-option'>").text(min);
				}
				$minOption.off("click").on("click", function(){
					if($(this).hasClass("jqdp-hm-option-selected")){
						return;
					}
					$content.find(".zdz-time-min").val($(this).text());
					$(this).addClass("jqdp-hm-option-selected").siblings(".jqdp-hm-option").removeClass("jqdp-hm-option-selected");
					dateChange();
					$minOptions.hide();
				});
				$minOptions.append($minOption);
			});
			$content.find(".zdz-time-min").off("click").on("click", function(){
				$(".jqdp-hm-options").hide();
				$minOptions.show();
			});
		}
		
	}
	
	function dateChange(){
		var dateStr = $date.find(".zdz-time-date").val();
		var hourStr = $date.find(".zdz-time-hour").val();
		var minStr = $date.find(".zdz-time-min").val();
		var time = new Date(Date.parse(dateStr + " 00:00:00"));
		time.setHours(hourStr ? hourStr : 0);
		time.setMinutes(minStr ? minStr : 0, 0, 0);
		if(settings.callback){
			settings.callback(time, time.format(settings.format));
		}
	}
	
	function getNearMinute(minute){
		var minuteData = ["00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"];
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
		if (nearMinute < 10) {
			nearMinute = "0" + nearMinute;
		}
		return nearMinute;
	}
})(jQuery)
