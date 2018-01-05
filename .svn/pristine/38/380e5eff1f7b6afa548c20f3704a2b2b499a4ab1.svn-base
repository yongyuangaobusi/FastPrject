/**
 * 时间控件
 */
$.fn.jqDatePick = function(options){
	
	Date.prototype.format = function(format) {
		var o = {
			"M+" : this.getMonth() + 1, 							// 月
			"d+" : this.getDate(), 									// 日
			"h+" : this.getHours(), 								// 小时
			"m+" : this.getMinutes(), 								// 分钟
			"s+" : this.getSeconds(), 								// 秒
			"q+" : Math.floor((this.getMonth() + 3) / 3), 			// 季度
			"S" : this.getMilliseconds() 							// 毫秒
		};
		if (/(y+)/.test(format)) {
			format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		}
		for ( var k in o) {
			if (new RegExp("(" + k + ")").test(format)) {
				format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? 
						o[k] : ("00" + o[k]).substr(("" + o[k]).length));
			}
		}
		return format;
	};
	
	var $jqDate = this;
	var defaultDateFormat = "yyyy-MM-dd hh:mm";
	var dateFormat = "yyyy-MM-dd";
	var opts, $wrap;
	var date, dateStr;
	var _year, _month, _date, _hour, _minute, maxDate;
	var weekStrArr = ["日", "一", "二", "三", "四", "五", "六"];
	var hourData, minuteData, dateLeftPad, dateRightPad;
	
	var settings = {
		init : function(){
			dateStr = $jqDate.val();
			_init();
			_bindInputEvents();
		},
		create : function(){
			if($.isFunction(options.openBefore)){
				options.openBefore.call($jqDate);
			}
			this.destroy();
			this.setVal($jqDate.val().replace("  ", ""));
			buildJqDateLayer();
			this.bindEvents();
		},
		destroy : function(){
			$(".jq-date-pick-wrap").remove();
		},
		getVal : function(){
			date = new Date(_year, _month, _date, _hour, _minute);
			return date.format(dateFormat);
		},
		getDate : function(){
			date = new Date(_year, _month, _date, _hour, _minute);
			return date;
		},
		setVal : function(str){
			this.destroy();
			if(checkDateTime(str)){
				dateStr = str;
				initDate();
				this.dateChange();
			}else{
				alert("时间格式错误！");
			}
		},
		bindEvents : function(){
			_bindEvents();
			_bindGlobalEvent();
		},
		dateChange : function(){
			date = new Date(_year, _month, _date, _hour, _minute);
			dateStr = date.format(dateFormat);
			$jqDate.val(this.getVal());
			if($.isFunction(options.dateChange)){
				options.dateChange.call($jqDate, dateStr, date);
			}
		},
		changeComplete : function(){
			if($.isFunction(options.changeComplete)){
				options.changeComplete.call($jqDate, dateStr, date);
			}
		}
	}
	
	function _init(){
		$jqDate.addClass("jq-date-pick");
		var format = $jqDate.attr("format");
		if(format){
			dateFormat = format;
		}else{
			dateFormat = defaultDateFormat;
		}
		initDate();
	}
	
	function buildJqDateLayer(){
		$(".jq-date-pick-wrap").remove();
		$wrap = $("<div class='jq-date-pick-wrap'>").hide();
		$("body").append($wrap);
		var offset = $jqDate.offset();
		$wrap.css({
			top : offset.top + $jqDate.height() + "px",
			left : offset.left - 4
		});
		var $operateLayer = $("<div class='jqdp-month-year-opera'>");
		$wrap.append($operateLayer);
		buildTimeOperateLayer($operateLayer);
		var $jqdpDateMain = $("<div class='jqdp-date-main'>");
		$wrap.append($jqdpDateMain);
		var $jqdpDateWrap = $("<div class='jqdp-date-wrap'>");
		$jqdpDateMain.append($jqdpDateWrap);
		buildJqDateContent($jqdpDateWrap);
		if(dateFormat == defaultDateFormat){
			var $jqdpHmWrap = $("<div class='jqdp-hm-wrap'>");
			$jqdpDateMain.append($jqdpHmWrap);
			buildJqHmLayer($jqdpHmWrap);
			var $jqdpBtnWrap = $("<div class='jqdp-btn-wrap'>");
			$jqdpDateMain.append($jqdpBtnWrap);
			buildJqBtnLayer($jqdpBtnWrap);
		}else{
			$wrap.height(250);
			$wrap.find(".jqdp-date-main").height(210);
		}
		if($.isFunction(options.beforeOpen)){
			options.beforeOpen.call($wrap);
		}
		$wrap.show();
	}
	
	function buildTimeOperateLayer($operateLayer){
		$operateLayer.append('<div class="jqdp-year-prev fa fa-angle-double-left"></div>');
		$operateLayer.append('<div class="jqdp-month-prev fa fa-angle-left"></div>');
		//$operateLayer.append($('<div class="jqdp-month-year-content"></div>').text(date.format("yyyy-MM")));
		var $dateDiv = $('<div class="jqdp-month-year-content"></div>');
		$dateDiv.append($('<div class="jqdp-month-year-content-year"></div>').text(date.format("yyyy"))).append($('<div class="jqdp-month-year-content-with"></div>').text("-")).append($('<div class="jqdp-month-year-content-month"></div>').text(date.format("MM")));
		$operateLayer.append($dateDiv);
		$operateLayer.append('<div class="jqdp-month-next fa fa-angle-right"></div>');
		$operateLayer.append('<div class="jqdp-year-next fa fa-angle-double-right"></div>');
		var yearDiv = buildTimeYearDivHtml(date.format("yyyy"));
		$operateLayer.append($('<div class="jqdp-year-select"></div>').append(yearDiv).append("<div class='year-area-control'><div class='year-area-controlleft'><i class='jqdp-btn-icon fa fa-angle-left'></i></div><div class='year-area-controlright'><i class='jqdp-btn-icon fa fa-angle-right'></i></div></div>"));
		$operateLayer.append('<div class="jqdp-month-select"><div>1</div><div>7</div><div>2</div><div>8</div><div>3</div><div>9</div><div>4</div><div>10</div><div>5</div><div>11</div><div>6</div><div>12</div></div>');
		
	}
	
	function buildTimeYearDivHtml(year){
		year = new Number(year);
		var content = $("<div class='year-area'>");
		content.append($("<div></div>").text(year));
		content.append($("<div></div>").text(year+5));
		content.append($("<div></div>").text(year+1));
		content.append($("<div></div>").text(year+6));
		content.append($("<div></div>").text(year+2));
		content.append($("<div></div>").text(year+7));
		content.append($("<div></div>").text(year+3));
		content.append($("<div></div>").text(year+8));
		content.append($("<div></div>").text(year+4));
		content.append($("<div></div>").text(year+9));
		return content;
	}
	
	function buildJqDateContent($jqdpDateWrap){
		maxDate = getMonthMaxDate();
		$jqdpDateWrap.empty();
		var $dateTable = $("<table class='jqdp-date-table'>");
		$jqdpDateWrap.append($dateTable);
		var tableHeader = $("<tr class='jqdp-date-table-header'>");
		$dateTable.append(tableHeader);
		$(weekStrArr).each(function(i, weekStr){
			tableHeader.append($("<th class='jqdp-header-cell'>").text(weekStr));
		});
		getDateLeftRightPad();
		var tdArr = [];
		for(var i = dateLeftPad; i > 0; i--){
			var _dateT = new Date(new Date(_year, _month, 1).getTime() - (i * 24 * 60 * 60 * 1000));
			var yearStr = _dateT.getFullYear() + "";
			var monthStr = _dateT.getMonth() + 1 + "";
			var dateStr = _dateT.getDate();
			tdArr.push("<td class='jqdp-date-cell jddp-other-month-date' year='" + yearStr + "' month='" + monthStr + "' date='" + dateStr + "'>" + dateStr + "</td>");
		}
		if(_date > maxDate){
			_date = maxDate;
		}
		for(var i = 1; i <= maxDate; i++){
			var clazz = "jqdp-date-cell jqdp-date-cell-valid";
			var date = new Date(_year, _month, i);
			if(i == _date){
				clazz += " jqdp-date-select";
			}
			tdArr.push("<td class='" + clazz + "' year='" + _year + "' month='" + _month + "' date='" + i + "'>" + i + "</td>");
		}
		
		for(var i = 1; i <= dateRightPad; i++){
			var _dateT = new Date(new Date(_year, _month, maxDate).getTime() + (i * 24 * 60 * 60 * 1000));
			var yearStr = _dateT.getFullYear() + "";
			var monthStr = _dateT.getMonth() + 1 + "";
			var dateStr = _dateT.getDate();
			tdArr.push("<td class='jqdp-date-cell jddp-other-month-date' year='" + yearStr + "' month='" + monthStr + "' date='" + dateStr + "'>" + dateStr + "</td>")
		}
		var maxPad = dateRightPad + (42 - tdArr.length);
		for(var i = dateRightPad + 1; i <= maxPad; i++){
			var _dateT = new Date(new Date(_year, _month, maxDate).getTime() + (i * 24 * 60 * 60 * 1000));
			var yearStr = _dateT.getFullYear() + "";
			var monthStr = _dateT.getMonth() + 1 + "";
			var dateStr = _dateT.getDate();
			tdArr.push("<td class='jqdp-date-cell jddp-other-month-date' year='" + yearStr + "' month='" + monthStr + "' date='" + dateStr + "'>" + dateStr + "</td>")
		}
		
		for(var i = 0; i < tdArr.length; i += 7){
			$dateTable.append("<tr>" + tdArr.slice(i, i + 7).join("") + "</tr>");
		}
	}
	
	function buildJqHmLayer($jqdpHmWrap){
		var $hourLayerWrap = $("<div class='jqdp-hm-select-wrap'>");
		$jqdpHmWrap.append($hourLayerWrap);
		var $hourLayer = $("<div id='jqDateHour' class='jqdp-hm-select'>");
		$hourLayerWrap.append($hourLayer);
		$hourLayerWrap.append("时");
		var curHour = timePadZero(_hour);
		$hourLayer.append($('<div class="jqdp-hm-content">').text(curHour));
		$hourLayer.append('<div class="jqdp-hm-icon">');
		var $minuteLayerWrap = $("<div class='jqdp-hm-select-wrap'>");
		$jqdpHmWrap.append($minuteLayerWrap);
		var $minuteLayer = $("<div id='jqDateMinute' class='jqdp-hm-select'>");
		$minuteLayerWrap.append($minuteLayer);
		$minuteLayerWrap.append("分");
		var curMinute = timePadZero(_minute);
		$minuteLayer.append($('<div class="jqdp-hm-content">').text(curMinute));
		$minuteLayer.append('<div class="jqdp-hm-icon">');
	}
	
	function buildHourOptions($hourLayerWrap){
		var $hourOptions = $('<div class="jqdp-hm-options">');
		$hourLayerWrap.append($hourOptions);
		$hourOptions.show();
		$hourOptions.append("<div class='jqdp-hm-option-title'>小时选择</div>");
		$(hourData).each(function(i, hour){
			hour = timePadZero(hour);
			var $hourOption 
			if(hour == _hour){
				$hourOption = $("<div class='jqdp-hm-option jqdp-hm-option-selected'>").text(hour);
			}else{
				$hourOption = $("<div class='jqdp-hm-option'>").text(hour);
			}
			$hourOption.unbind("click").bind("click", function(){
				if($(this).hasClass("jqdp-hm-option-selected")){
					return;
				}
				$(this).addClass("jqdp-hm-option-selected").siblings(".jqdp-hm-option").removeClass("jqdp-hm-option-selected");
				_hour = parseInt($(this).text(), 10);
				$(this).parent().hide().parent().find(".jqdp-hm-content").text($(this).text());
				settings.dateChange();
			});
			$hourOptions.append($hourOption);
		});
	}
	
	function buildMinuteOptions($minuteLayerWrap){
		var $minuteOptions = $('<div class="jqdp-hm-options">');
		$minuteLayerWrap.append($minuteOptions);
		$minuteOptions.show();
		$minuteOptions.height(78);
		$minuteOptions.append("<div class='jqdp-hm-option-title'>分钟选择</div>");
		$(minuteData).each(function(i, minute){
			minute = timePadZero(minute);
			var $minuteOption 
			if(minute == _minute){
				$minuteOption = $("<div class='jqdp-hm-option jqdp-hm-option-selected'>").text(minute);
			}else{
				$minuteOption = $("<div class='jqdp-hm-option'>").text(minute);
			}
			$minuteOption.unbind("click").bind("click", function(){
				if($(this).hasClass("jqdp-hm-option-selected")){
					return;
				}
				$(this).addClass("jqdp-hm-option-selected").siblings(".jqdp-hm-option").removeClass("jqdp-hm-option-selected");
				_minute = parseInt($(this).text(), 10);
				$(this).parent().hide().parent().find(".jqdp-hm-content").text($(this).text());
				settings.dateChange();
			});
			$minuteOptions.append($minuteOption);
		});
	}
	
	function buildJqBtnLayer($jqdpBtnWrap){
		var $yearBtnPrev = $('<div class="jqdp-btn jqdp-btn-hour-prev" title="向前一个小时">');
		$jqdpBtnWrap.append($yearBtnPrev);
		$yearBtnPrev.append('<i class="jqdp-btn-icon fa fa-angle-double-left"></i><i class="jqdp-btn-text jqdp-mg-ten">1</i>')
		var $monthBtnPrev = $('<div class="jqdp-btn jqdp-btn-minute-prev" title="向前五分钟">');
		$jqdpBtnWrap.append($monthBtnPrev);
		$monthBtnPrev.append('<i class="jqdp-btn-icon fa fa-angle-left"></i><i class="jqdp-btn-text jqdp-mg-ten">5</i>')
		var $monthBtnNext = $('<div class="jqdp-btn jqdp-btn-minute-next" title="向后五分钟">');
		$jqdpBtnWrap.append($monthBtnNext);
		$monthBtnNext.append('<i class="jqdp-btn-text">5</i><i class="jqdp-btn-icon fa fa-angle-right jqdp-mg-ten"></i>')
		var $yearBtnNext = $('<div class="jqdp-btn jqdp-btn-hour-next" title="向后一个小时">');
		$jqdpBtnWrap.append($yearBtnNext);
		$yearBtnNext.append('<i class="jqdp-btn-text">1</i><i class="jqdp-btn-icon fa fa-angle-double-right jqdp-mg-ten"></i>')
	}
	
	function _bindInputEvents(){
		$jqDate.unbind("click").bind("click", function(){
			settings.create();
		});
	}
	
	function _bindGlobalEvent(){
		document.onclick = top.document.onclick = function(event){
			if(isEmpty(event) || isEmpty(event.path)){
				return;
			}
			if(!checkElemArrHasClass(event.path, "jq-date-pick") &&
					!checkElemArrHasClass(event.path, "jq-date-pick-wrap")){
				if($(".jq-date-pick-wrap").size() > 0){
					settings.changeComplete();
					settings.destroy();
				}
			}
			if(!checkElemArrHasClass(event.path, "jqdp-hm-options") && 
					!checkElemArrHasClass(event.path, "jqdp-hm-select-wrap")){
				if($(".jqdp-hm-options").size() > 0){
					$(".jqdp-hm-options").hide();
				}
			}
			if(!checkElemArrHasClass(event.path, "jqdp-select") && 
					!checkElemArrHasClass(event.path, "jqdp-year-select")){
				if($(".jqdp-year-select").size() > 0){
					$(".jqdp-year-select").hide();
					$(".jqdp-select").removeClass("jqdp-select");
				}
			}
			if(!checkElemArrHasClass(event.path, "jqdp-select") && 
					!checkElemArrHasClass(event.path, "jqdp-month-select")){
				if($(".jqdp-month-select").size() > 0){
					$(".jqdp-month-select").hide();
					$(".jqdp-select").removeClass("jqdp-select");
				}
			}
		}
	}
	
	function _bindEvents(){
		$wrap.find(".jqdp-month-year-content-year").unbind().bind("click",function(){
			if($(this).hasClass('jqdp-select')){
				$(this).removeClass('jqdp-select');
				$(".jqdp-year-select").css({"display":"none"});
			}else{
				$(this).addClass('jqdp-select');
				var primevalYear = $('.year-area div:first').text();
				var year = $(this).text();
				if(primevalYear!=year){
					var val = year-primevalYear;  
					$('.year-area div').each(function(){
						var year = $(this).text();
						year = new Number(year)+val;
						$(this).text(year);
					})
				}
				$(".jqdp-year-select").css({"display":"block"});
			}
			//去除月样式
			$wrap.find(".jqdp-month-year-content-month").removeClass('jqdp-select');
			$(".jqdp-month-select").css({"display":"none"});
		});
		$wrap.find(".jqdp-month-year-content-month").unbind().bind("click",function(){
			if($(this).hasClass('jqdp-select')){
				$(this).removeClass('jqdp-select');
				$(".jqdp-month-select").css({"display":"none"});
			}else{
				$(this).addClass('jqdp-select');
				$(".jqdp-month-select").css({"display":"block"});
			}
			$wrap.find(".jqdp-month-year-content-year").removeClass('jqdp-select');
			$(".jqdp-year-select").css({"display":"none"});
			
		});
		
		$wrap.find(".jqdp-year-select .year-area>div").unbind().bind({
			click:function(){
				_year = $(this).text();
				dateStr = settings.getVal();
				initDate();
				$wrap.find(".jqdp-month-year-content-year").text(date.format("yyyy"));
				buildJqDateContent($wrap.find(".jqdp-date-wrap"));
				settings.dateChange();
				$('.jqdp-year-select').css({"display":"none"});
				$(".jqdp-month-year-content-year").removeClass('jqdp-select');
			},
			mouseover:function(){$(this).css({"background":"#D8E8F9"});},  
		    mouseout:function(){$(this).css({"background":"#FFF"});},  
		});
		
		$wrap.find(".year-area-control .year-area-controlleft i").unbind().bind({
			click:function(){
				$('.year-area div').each(function(){
					var year = $(this).text();
					year = new Number(year)-10;
					$(this).text(year);
				})
			}
		});
		$wrap.find(".year-area-control .year-area-controlright i").unbind().bind({
			click:function(){
				$('.year-area div').each(function(){
					var year = $(this).text();
					year = new Number(year)+10;
					$(this).text(year);
				})
			}
		});
		
		$wrap.find(".jqdp-month-select>div").unbind().bind({
			click:function(){
				_month = parseInt($(this).text(), 10) - 1;
				if(_date > getMonthMaxDate()){
					_date = getMonthMaxDate();
				}
				dateStr = settings.getVal();
				initDate();
				$wrap.find(".jqdp-month-year-content-month").text(date.format("MM"));
				buildJqDateContent($wrap.find(".jqdp-date-wrap"));
				settings.dateChange();
				$('.jqdp-month-select').css({"display":"none"});
				$(".jqdp-month-year-content-month").removeClass('jqdp-select');
			},
			mouseover:function(){$(this).css({"background":"#D8E8F9"});},  
		    mouseout:function(){$(this).css({"background":"#FFF"});},  
		})
		
		$wrap.undelegate(".jqdp-date-cell-valid", "click").delegate(".jqdp-date-cell-valid", "click", function(){
			var $this = $(this);
			if($this.hasClass("jqdp-date-select")){
				return;
			}
			$(".jqdp-date-select").removeClass("jqdp-date-select");
			$this.addClass("jqdp-date-select");
			_date = parseInt($this.attr("date"), 10);
			settings.dateChange();
		});
		
		$wrap.find("#jqDateHour").unbind("click").bind("click", function(){
			$(".jqdp-hm-options").remove();
			buildHourOptions($(this).parents(".jqdp-hm-select-wrap"));
		});
		
		$wrap.find("#jqDateMinute").unbind("click").bind("click", function(){
			$(".jqdp-hm-options").remove();
			buildMinuteOptions($(this).parents(".jqdp-hm-select-wrap"));
		});
		
		$wrap.find(".jqdp-year-prev").unbind("click").bind("click", function(){
			_year--;
			dateStr = settings.getVal();
			initDate();
			$wrap.find(".jqdp-month-year-content-year").text(date.format("yyyy"));
			buildJqDateContent($wrap.find(".jqdp-date-wrap"));
			settings.dateChange();
		});
		
		$wrap.find(".jqdp-year-next").unbind("click").bind("click", function(){
			_year++;
			dateStr = settings.getVal();
			initDate();
			$wrap.find(".jqdp-month-year-content-year").text(date.format("yyyy"));
			buildJqDateContent($wrap.find(".jqdp-date-wrap"));
			settings.dateChange();
		});
		
		$wrap.find(".jqdp-month-prev").unbind("click").bind("click", function(){
			_month--;
			if(_month == -1){
				_month = 11;
				$wrap.find(".jqdp-year-prev").trigger("click");
			}
			if(_date > getMonthMaxDate()){
				_date = getMonthMaxDate();
			}
			dateStr = settings.getVal();
			initDate();
			$wrap.find(".jqdp-month-year-content-month").text(date.format("MM"));
			buildJqDateContent($wrap.find(".jqdp-date-wrap"));
			settings.dateChange();
		});
		
		$wrap.find(".jqdp-month-next").unbind("click").bind("click", function(){
			_month++;
			if(_month == 12){
				_month = 0;
				$wrap.find(".jqdp-year-next").trigger("click");
			}
			if(_date > getMonthMaxDate()){
				_date = getMonthMaxDate();
			}
			dateStr = settings.getVal();
			initDate();
			$wrap.find(".jqdp-month-year-content-month").text(date.format("MM"));
			buildJqDateContent($wrap.find(".jqdp-date-wrap"));
			settings.dateChange();
		});
		
		$wrap.find(".jqdp-btn-hour-prev").unbind("click").bind("click", function(){
			_hour--;
			if(_hour == -1){
				_hour = 23;
				_date--;
				if(_date == 0){
					$wrap.find(".jqdp-month-prev").trigger("click");
					_date = getMonthMaxDate();
					$wrap.find(".jqdp-date-cell-valid[date='" + _date + "']").trigger("click");
				}
			}
			$wrap.find("#jqDateHour").find(".jqdp-hm-content").text(timePadZero(_hour));
			dateStr = settings.getVal();
			initDate();
			buildJqDateContent($(".jqdp-date-wrap"));
			settings.dateChange();
		});
		
		$wrap.find(".jqdp-btn-hour-next").unbind("click").bind("click", function(){
			_hour++;
			if(_hour == 24){
				_hour = 0;
				_date++;
				if(_date > getMonthMaxDate()){
					_date = 1;
					$wrap.find(".jqdp-month-next").trigger("click");
					$wrap.find(".jqdp-date-cell-valid[date='1']").trigger("click");
				}
			}
			$wrap.find("#jqDateHour").find(".jqdp-hm-content").text(timePadZero(_hour));
			dateStr = settings.getVal();
			initDate();
			buildJqDateContent($(".jqdp-date-wrap"));
			settings.dateChange();
		});
		
		$wrap.find(".jqdp-btn-minute-prev").unbind("click").bind("click", function(){
			_minute -= 5;
			if(_minute == -5){
				_minute = 55;
				$wrap.find(".jqdp-btn-hour-prev").trigger("click");
			}
			$wrap.find("#jqDateMinute").find(".jqdp-hm-content").text(timePadZero(_minute));
			dateStr = settings.getVal();
			initDate();
			buildJqDateContent($(".jqdp-date-wrap"));
			settings.dateChange();
		});
		
		$wrap.find(".jqdp-btn-minute-next").unbind("click").bind("click", function(){
			_minute += 5;
			if(_minute == 60){
				_minute = 0;
				$wrap.find(".jqdp-btn-hour-next").trigger("click");
			}
			$wrap.find("#jqDateMinute").find(".jqdp-hm-content").text(timePadZero(_minute));
			dateStr = settings.getVal();
			initDate();
			buildJqDateContent($(".jqdp-date-wrap"));
			settings.dateChange();
		});
	}
	
	function checkDateTime(str){
		if(isEmpty(str)){
			return false;
		}
		if(dateFormat == defaultDateFormat){
			var reg = /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})$/;
			if(str.length > 16){
				str = str.substring(0, 16);
			}
			var r = str.match(reg);
			if(r == null){
				return false;
			}
			r[2] = r[2] - 1;
			var date = new Date(r[1], r[2], r[3], r[4], r[5]);
			if(date.getFullYear() != r[1]){
				return false;
			}
			if(date.getMonth() != r[2]){
				return false;
			}
			if(date.getDate() != r[3]){
				return false;
			}
			if(date.getHours() != r[4]){
				return false;
			}
			if(date.getMinutes() != r[5]){
				return false;
			}
		}else{
			var reg = /^(\d{4})-(\d{2})-(\d{2})$/;
			if(str.length > 10){
				str = str.substring(0, 10);
			}
			var r = str.match(reg);
			if(r == null){
				return false;
			}
			r[2] = r[2] - 1;
			var date = new Date(r[1], r[2], r[3]);
			if(date.getFullYear() != r[1]){
				return false;
			}
			if(date.getMonth() != r[2]){
				return false;
			}
			if(date.getDate() != r[3]){
				return false;
			}
		}
		return true;
	}
	
	function timePadZero(time){
		return (time + "").length == 1 ? "0" + time : time + "";
	}
	
	function getWholeMinute(minute){
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
		return nearMinute;
	}
	
	/**
	 * 获取当月开始左边和结束右边空了多少
	 */
	function getDateLeftRightPad(){
		maxDate = getMonthMaxDate();
		var start = new Date(_year, _month, 1);
		dateLeftPad = start.getDay();
		var end = new Date(_year, _month, maxDate);
		dateRightPad = 6 - end.getDay();
	}
	
	/**
	 * 获取小时和分钟的时间数组
	 */
	function getHourAndMiuteData(){
		if(!isEmpty(settings.hourData)){
			hourData = settings.hourData;
		}else{
			hourData = [];
			for(var i = 0; i < 24; i += 1){
				hourData.push(timePadZero(i));
			}
		}
		if(!isEmpty(settings.minuteData)){
			minuteData = settings.minuteData;
		}else{
			minuteData = [];
			for(var i = 0; i < 60; i += 5){
				minuteData.push(timePadZero(i));
			}
		}
	}
	
	/**
	 * 初始化时间
	 */
	function initDate(){
		getHourAndMiuteData();
		if(!checkDateTime(dateStr)){
			date = new Date();
			dateStr = date.format(dateFormat);
		}else{
			if(!checkDateTime(dateStr)){
				return;
			}
			var strDate = dateStr.substring(0, dateFormat.length);
			date = new Date(Date.parse(strDate));
		}
		_year = date.getFullYear();
		_month = date.getMonth();
		_date = date.getDate();
		_hour = getNearHour(date.getHours());
		_minute = getNearMinute(date.getMinutes());
		maxDate = getMonthMaxDate();
		currYear = _year;
		currMonth = _month + 1;
		currDate = _date;
		currHour = _hour;
		currMiute = _minute;
		date = new Date(_year, _month, _date, _hour, _minute);
		dateStr = date.format(dateFormat);
	}
	
	/**
	 * 从小时集合中获取最相近的时间点
	 */
	function getNearHour(hour){
		var nearHour;
		hour = parseInt(hour);
		var diffHour = 9999999999;
		for (var i = 0; i < hourData.length; i++) {
			var tempHour = parseInt(hourData[i], 10);
			var tempDiff = Math.abs(hour - tempHour);
			if(hour < tempHour){
				continue;
			}
			if(tempDiff < diffHour){
				nearHour = tempHour;
				diffHour = tempDiff;
			}
		}
		return nearHour;
	}
	
	/**
	 * 从分钟集合中获取最相近的时间点
	 */
	function getNearMinute(minute){
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
		return nearMinute;
	}
	
	/**
	 * 获取月份最大日期
	 */
	function getMonthMaxDate(){
		var month = _month + 1;
		var date = new Date(_year, month, 1);
		return new Date(date.getTime() - (1000 * 60 * 60 * 24)).getDate();
	}
	
	function isEmpty(param){
		if(param == undefined || param == null || param === "" || param.length == 0){
			return true;
		}
		return false;
	}
	
	function checkElemArrHasClass(elemArr, cls){
		if(isEmpty(elemArr) || isEmpty(cls)){
			return false;
		}
		for(var i = 0; i < elemArr.length; i++){
			var elem = elemArr[i];
			if(isEmpty(elem) || isEmpty(elem.className)){
				continue;
			}
			if($(elem).hasClass(cls)){
				return true;
			}
		}
		return false;
	}
	
	function checkElemArrHasElem(elemArr, elem){
		if(isEmpty(elemArr) || isEmpty(elem)){
			return false;
		}
		for(var i = 0; i < elemArr.length; i++){
			var _elem = elemArr[i];
			if(isEmpty(_elem)){
				continue;
			}
			if(_elem == elem){
				return true;
			}
		}
		return false;
	}
	
	settings.init();
	
	return settings;
}