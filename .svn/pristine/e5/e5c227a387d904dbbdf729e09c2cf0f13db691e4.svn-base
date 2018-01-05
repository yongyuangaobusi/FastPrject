/**
 * 电子时钟控件
 */

;(function(window, document){
	
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
	
	function CustomDatePick(option){
		var digitalClockAgent = {
			el : option.el,
			dateStr : option.dateStr,
			readonly : true,
			hourData : null,
			minuteData : option.minuteData,
			elem : option.elem,
			init : function(){
				_init();
				this.create();
			},
			create : function(){
				buildBaseDateAgent();
				bindDateEvent();
			},
			destroy : function(){
				wrap = document.getElementById("baseDateAgentWrap");
				if(!isEmpty(wrap)){
					wrap.parentNode.removeChild(wrap);
				}
				wrap = null;
			},
			getVal : function(){
				date = new Date(_year, _month, _date, currHour, currMiute);
				return date.format(dateFormat);
			},
			setVal : function(str){
				this.destroy();
				if(checkDateTime(str)){
					dateStr = str;
					initDate();
					this.dateChange(dateStr, date);
				}else{
					alert("时间格式错误！");
				}
			},
			getDate : function(){
				return new Date(_year, _month, _date, _hour, _minute, 0);
			},
			dateChange : function(dateStr, date){
				if(option.dateChange instanceof Function){
					option.dateChange(dateStr, date);
				}
			}
		}
		
		var dateFormat = "yyyy-MM-dd hh:mm";
		
		var hourInterval = 1;
		var minuteInterval = 1;
		
		var hourData;
		var minuteData;
		
		var dateInput;
		
		var clockAgent;
		
		var weekStr = ["日", "一", "二", "三", "四", "五", "六"];
		var monthStr = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"];
		var wrap;
		var date;
		var dateStr;
		var _year, _month, _date, _hour, _minute;
		var beginYear, currYear, endYear, beginMonth, currMonth, endMonth,
			beginDate, currDate, endDate, maxDate, beginHour, currHour, endHour, 
			beginMiute, currMiute, endMinute;
		var dateLeftPad;
		var dateRightPad;
		
		/**
		 * 初始化
		 */
		function _init(){
			dateStr = digitalClockAgent.dateStr;
			if(!digitalClockAgent.elem){
				digitalClockAgent.elem = document.getElementById(digitalClockAgent.el);
			}
			initDate();
		}
		
		function getWholeMinute(minute){
			var minuteData = ["00", "10", "20", "30", "40", "50"];
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
			var start = new Date(currYear, currMonth - 1, 1);
			dateLeftPad = start.getDay();
			var end = new Date(currYear, currMonth - 1, maxDate);
			dateRightPad = 6 - end.getDay();
		}
		
		/**
		 * 获取小时和分钟的时间数组
		 */
		function getHourAndMiuteData(){
			if(!isEmpty(digitalClockAgent.hourData)){
				hourData = digitalClockAgent.hourData;
			}else{
				hourData = [];
				for(var i = 0; i < 24; i += hourInterval){
					hourData.push(i);
				}
			}
			if(!isEmpty(digitalClockAgent.minuteData)){
				minuteData = digitalClockAgent.minuteData;
			}else{
				minuteData = [];
				for(var i = 0; i < 60; i += minuteInterval){
					minuteData.push(i);
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
				date = new Date((strDate + ":").replace(/-/g, "/"));
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
		 * 获取开始和结束年份
		 */
		function getBeginAndEndYear(currYear){
			var group = Math.ceil(currYear / 8);
			beginYear = (group - 1) * 8 + 1;
			endYear = group * 8;
		}
		
		/**
		 * 获取月的开始和结束日期
		 */
		function getBeginAndEndDate(){
			var group = Math.ceil(currDate / 14);
			benginDate = (group - 1) * 14 + 1;
			endDate = group * 14;
			if(endDate > maxDate){
				endDate = maxDate;
			}
		}
		
		/**
		 * 获取月份最大日期
		 */
		function getMonthMaxDate(){
			var month = _month + 1;
			var date = new Date(_year, month, 1);
			return new Date(date.getTime() - (1000 * 60 * 60 * 24)).getDate();
		}
		
		/**
		 * 构建时间页面
		 */
		function buildBaseDateAgent(){
			digitalClockAgent.destroy();
			wrap = document.createElement("div");
			wrap.className = "base-date-agent-wrap";
			wrap.id = "baseDateAgentWrap";
			var position = getElemPostion(digitalClockAgent.elem);
			wrap.style.top = (position.top + digitalClockAgent.elem.offsetHeight) + "px";
			wrap.style.left = position.left + "px";
			document.body.appendChild(wrap);
			buildDateAgent();
			buildHourAgent();
			buildMinuteAgent();
		}
		
		/**
		 * 获得元素的定位
		 */
		function getElemPostion(elem){
			var left = elem.offsetLeft;
			var top = elem.offsetTop;
			var curr = elem.offsetParent;
			while(!isEmpty(curr)){
				left += curr.offsetLeft;
				top += curr.offsetTop;
				curr = curr.offsetParent;
			}
			return {left : left, top : top};
		}
		
		/**
		 * 构建日期界面
		 */
		function buildDateAgent(){
			var dateAgent = document.createElement("div");
			dateAgent.className = "base-date-agent-date";
			wrap.appendChild(dateAgent);
			
			var monthYear = document.createElement("div");
			monthYear.className = "date-month-year";
			dateAgent.appendChild(monthYear);
			buildMonthYear(monthYear);
			
			var dateBody = document.createElement("div");
			dateBody.className = "date-body";
			dateAgent.appendChild(dateBody);
			buildDateBody(dateBody);
			
			var dateOk = document.createElement("div");
			dateOk.className = "date-ok";
			dateAgent.appendChild(dateOk);
			dateOk.onclick = function(){
				digitalClockAgent.dateChange(dateStr, date);
				digitalClockAgent.destroy();
			}
		}
		
		/**
		 * 构建月份和年份界面
		 */
		function buildMonthYear(monthYear){
			var monthPre = document.createElement("div");
			monthPre.className = "month-pre";
			monthYear.appendChild(monthPre);
			
			var monthBtnPre = document.createElement("i");
			monthBtnPre.className = "month-btn-pre";
			monthPre.appendChild(monthBtnPre);
			monthPre.onclick = function(){
				if(currMonth == 1){
					currMonth = 12;
					_month = 11;
					_year -= 1;
					currYear = _year;
				}else{
					currMonth--;
					_month--;
				}
				buildDateBody(getElemByClass("date-body")[0])
				monthBody.innerHTML = monthStr[_month];
				yearBody.innerHTML = _year;
				changeDate();
			}
			
			var monthBody = document.createElement("div");
			monthBody.className = "month-body";
			monthYear.appendChild(monthBody);
			monthBody.innerHTML = monthStr[_month];
			monthBody.onclick = function(event){
				var monthAgent = document.getElementById("baseDateAgentMonth");
				if(!isEmpty(monthAgent)){
					monthAgent.parentNode.removeChild(monthAgent);
				}else{
					buildMonthAgent(event.currentTarget);
				}
			}
			
			var yearBody = document.createElement("div");
			yearBody.className = "year-body";
			monthYear.appendChild(yearBody);
			yearBody.innerHTML = _year;
			yearBody.onclick = function(event){
				var yearAgent = document.getElementById("baseDateAgentYear");
				if(!isEmpty(yearAgent)){
					yearAgent.parentNode.removeChild(yearAgent);
				}else{
					buildYearAgent(event.currentTarget);
				}
			}

			var monthNext = document.createElement("div");
			monthNext.className = "month-next";
			monthYear.appendChild(monthNext);
			
			var monthBtnNext = document.createElement("i");
			monthBtnNext.className = "month-btn-next";
			monthNext.appendChild(monthBtnNext);
			
			monthNext.onclick = function(){

				if(currMonth == 12){
					currMonth = 1;
					_month = 0;
					_year += 1;
					currYear = _year;
				}else{
					currMonth++;
					_month++;
				}
				buildDateBody(getElemByClass("date-body")[0]);
				monthBody.innerHTML = monthStr[_month];
				yearBody.innerHTML = _year;
				changeDate();
			}
		}
		
		/**
		 * 构建月份界面
		 */
		function buildMonthAgent(monthElem){
			var monthAgent = document.getElementById("baseDateAgentMonth");
			if(!isEmpty(monthAgent)){
				monthAgent.parentNode.removeChild(monthAgent);
			}
			monthAgent = document.createElement("div");
			monthAgent.id = "baseDateAgentMonth";
			monthAgent.className = "base-date-agent-month";
			monthAgent.style.top = (monthElem.offsetTop + monthElem.offsetHeight) + "px";
			monthAgent.style.left = monthElem.offsetLeft + "px";
			var monthUl = document.createElement("ul");
			monthUl.className = "month-ul";
			monthAgent.appendChild(monthUl);
			var str = "";
			for(var i = 0; i < monthStr.length; i++){
				var monthLi = document.createElement("li");
				monthLi.className = "month-li";
				if(i == _month){
					monthLi.className += " select";
				}
				monthLi.setAttribute("month", i);
				monthLi.textContent = monthStr[i];
				monthLi.onclick = function(event){
					var obj = event.currentTarget;
					var month = parseInt(obj.getAttribute("month"));
					_month = isNaN(month) ? _month : month;
					currMonth = _month + 1;
					var monthBody = getElemByClass("month-body")[0];
					if(!isEmpty(monthBody)){
						monthBody.innerHTML = monthStr[_month];
						buildDateBody(getElemByClass("date-body")[0]);
					}
					changeDate();
					monthAgent.parentNode.removeChild(monthAgent);
				}
				monthUl.appendChild(monthLi);
			}
			wrap.appendChild(monthAgent);
		}
		
		/**
		 * 构建年份界面
		 */
		function buildYearAgent(yearElem){
			getBeginAndEndYear(currYear);
			var yearAgent = document.getElementById("baseDateAgentYear");
			if(!isEmpty(yearAgent)){
				yearAgent.parentNode.removeChild(yearAgent);
			}
			yearAgent = document.createElement("div");
			yearAgent.id = "baseDateAgentYear";
			yearAgent.className = "base-date-agent-year";
			yearAgent.style.top = (yearElem.offsetTop + yearElem.offsetHeight) + "px";
			yearAgent.style.left = yearElem.offsetLeft + "px";
			var yearUl = document.createElement("ul");
			yearUl.className = "year-ul";
			yearAgent.appendChild(yearUl);
			buildYearUL(yearAgent, yearUl);
			
			var btnDiv = document.createElement("div");
			btnDiv.className = "year-pre-next-btn";
			
			var preBtn = document.createElement("i");
			preBtn.className = "year-btn-pre";
			btnDiv.appendChild(preBtn);
			preBtn.onclick = function(){
				getBeginAndEndYear(beginYear - 8);
				buildYearUL(yearAgent, yearUl);
			}
			
			var nextBtn = document.createElement("i");
			nextBtn.className = "year-btn-next";
			btnDiv.appendChild(nextBtn);
			nextBtn.onclick = function(){
				getBeginAndEndYear(beginYear + 8);
				buildYearUL(yearAgent, yearUl);
			}
			
			yearAgent.appendChild(btnDiv);
			wrap.appendChild(yearAgent);
		}
		
		/**
		 * 构建年份选择
		 */
		function buildYearUL(yearAgent, yearUl){
			yearUl.innerHTML = "";
			for(var i = beginYear; i <= endYear; i++){
				var yearLi = document.createElement("li");
				yearLi.className = "year-li";
				if(i == _year){
					yearLi.className += " select";
				}
				yearLi.setAttribute("year", i);
				yearLi.textContent = i;
				yearLi.onclick = function(event){
					var obj = event.currentTarget;
					var year = parseInt(obj.getAttribute("year"));
					_year = isNaN(year) ? _year : year;
					currYear = _year;
					var yearBody = getElemByClass("year-body")[0];
					if(!isEmpty(yearBody)){
						yearBody.innerHTML = _year;
						buildDateBody(getElemByClass("date-body")[0]);
					}
					changeDate();
					yearAgent.parentNode.removeChild(yearAgent);
				}
				yearUl.appendChild(yearLi);
			}
		}
		
		/**
		 * 构建日期主体
		 */
		function buildDateBody(dateBody){
			getDateLeftRightPad();
			dateBody.innerHTML = "";
			var table = document.createElement("table");
			table.setAttribute("cellspacing", "1");
			table.setAttribute("cellpadding", "0");
			table.className = "date-body-table";
			dateBody.appendChild(table);
			var str = "<tr>";
			for(var i = 0; i < weekStr.length; i++){
				str += "<td class='date-pad'>" + weekStr[i] + "</td>";
			}
			str += "</tr>";
			var tdArr = [];
			for(var i = dateLeftPad; i > 0; i--){
				var _dateT = new Date(new Date(_year, _month, 1).getTime() - (i * 24 * 60 * 60 * 1000));
				var yearStr = _dateT.getFullYear() + "";
				var monthStr = _dateT.getMonth() + 1 + "";
				var dateStr = _dateT.getDate();
				tdArr.push("<td class='date-cell other-month-date' year='" + yearStr + "' month='" + monthStr + "' date='" + dateStr + "'>" + dateStr + "</td>");
			}
			if(currDate > maxDate){
				currDate = maxDate;
				_date = currDate;
			}
			for(var i = 1; i <= maxDate; i++){
				var clazz = "date-cell";
				var date = new Date(currYear, currMonth - 1, i);
				if(date.getDay() == 0 || date.getDay() == 6){
					clazz += " weekend";
				}
				if(i == currDate){
					clazz += " select";
				}
				tdArr.push("<td class='" + clazz + "' year='" + currYear + "' month='" + currMonth + "' date='" + i + "'>" + i + "</td>");
			}
			
			for(var i = 1; i <= dateRightPad; i++){
				var _dateT = new Date(new Date(_year, _month, maxDate).getTime() + (i * 24 * 60 * 60 * 1000));
				var yearStr = _dateT.getFullYear() + "";
				var monthStr = _dateT.getMonth() + 1 + "";
				var dateStr = _dateT.getDate();
				tdArr.push("<td class='date-cell other-month-date' year='" + yearStr + "' month='" + monthStr + "' date='" + dateStr + "'>" + dateStr + "</td>")
			}
			var maxPad = dateRightPad + (42 - tdArr.length);
			for(var i = dateRightPad + 1; i <= maxPad; i++){
				var _dateT = new Date(new Date(_year, _month, maxDate).getTime() + (i * 24 * 60 * 60 * 1000));
				var yearStr = _dateT.getFullYear() + "";
				var monthStr = _dateT.getMonth() + 1 + "";
				var dateStr = _dateT.getDate();
				tdArr.push("<td class='date-cell other-month-date' year='" + yearStr + "' month='" + monthStr + "' date='" + dateStr + "'>" + dateStr + "</td>")
			}
			for(var i = 0; i < tdArr.length; i += 7){
				str += "<tr>" + tdArr.slice(i, i + 7).join("") + "</tr>";
			}
			table.innerHTML = str;
			bindDateEvent();
		}
		
		/**
		 * 构建小时界面
		 */
		function buildHourAgent(){
			var hourAgent = document.createElement("div");
			hourAgent.className = "base-date-agent-hour";
			wrap.appendChild(hourAgent);
			var hourPre = document.createElement("div");
			hourPre.className = "hour-pre";
			hourAgent.appendChild(hourPre);
			hourPre.onclick = preHour;
			
			var btnPre = document.createElement("i");
			btnPre.className = "btn-pre";
			hourPre.appendChild(btnPre);
			
			var hourBody = document.createElement("div");
			hourBody.className = "hour-body";
			hourAgent.appendChild(hourBody);
			buildHourBody(hourBody);
			
			var hourNext = document.createElement("div");
			hourNext.className = "hour-next";
			hourAgent.appendChild(hourNext);
			hourNext.onclick = nextHour;
			
			var btnNext = document.createElement("i");
			btnNext.className = "btn-next";
			hourNext.appendChild(btnNext);
		}
		
		/**
		 * 下个小时事件
		 */
		function nextHour(event){
			var sleHour = getElemByClass("hour-li select")[0];
			var hourLis = getElemByClass("hour-li");
			var hourUl = getElemByClass("hour-ul")[0];
			var dataSize = hourData.length;
			var top = parseInt(hourUl.style.top.replace("px", ""));
			if(!isEmpty(sleHour)){
				var index = getValInArrIndex(sleHour, hourLis);
				if(index != -1){
					var def = Math.ceil(dataSize / 7);
					if(def == 1){
						return false;
					}
					index++;
					removeClass(sleHour, "select");
					var m = Math.ceil(index / 7);
					if(m >= def){
						addClass(hourLis[0], "select");
						hourLis[0].click();
						hourUl.style.top = "0px";
						return false;
					}
					addClass(hourLis[7 * m], "select");
					hourLis[7 * m].click();
					hourUl.style.top = - (20 * 7 * m) + "px";
					return false;
				}
			}else{
				addClass(hourLis[0], "select");
				hourLis[0].click();
				hourUl.style.top = "0px";
			}
		}
		
		/**
		 * 上个小时事件
		 */
		function preHour(event){
			var sleHour = getElemByClass("hour-li select")[0];
			var hourLis = getElemByClass("hour-li");
			var hourUl = getElemByClass("hour-ul")[0];
			var dataSize = hourData.length;
			var top = parseInt(hourUl.style.top.replace("px", ""));
			if(!isEmpty(sleHour)){
				var index = getElemInParentElemIndex(sleHour);
				if(index != null){
					var def = Math.ceil(dataSize / 7);
					if(def == 1){
						return false;
					}
					index++;
					removeClass(sleHour, "select");
					var m = Math.ceil(index / 7);
					if(index == 1 && def > 1){
						def--;
						addClass(hourLis[7 * def], "select");
						hourLis[7 * def].click();
						hourUl.style.top = -(def * 20 * 7) + "px";
						return false;
					}
					m -= 2;
					addClass(hourLis[7 * m], "select");
					hourLis[7 * m].click();
					hourUl.style.top = - (20 * 7 * m) + "px";
					return false;
				}
			}else{
				addClass(hourLis[0], "select");
				hourLis[0].click();
				hourUl.style.top = "0px";
			}
		}
		
		/**
		 * 构建小时主体
		 */
		function buildHourBody(hourBody){
			var ul = document.createElement("ul");
			ul.className = "hour-ul";
			hourBody.appendChild(ul);
			var str = "";
			for(var i = 0; i < hourData.length; i++){
				var clazz = "hour-li";
				if(hourData[i] == currHour){
					clazz += " select";
				}
				str += "<li class='" + clazz + "'>" + timePadZero(hourData[i]) + "</li>";
			}
			ul.innerHTML = str;
			var index = getValInArrIndex(currHour, hourData);
			if(index != -1){
				index++;
				var m = Math.ceil(index / 7);
				ul.style.top = -(m - 1) * 20 * 7 + "px";
			}else{
				var hourLis = getElemByClass("hour-li");
				addClass(hourLis[0], "select");
				ul.style.top = "0px";
			}
		}
		
		/**
		 * 构建分钟界面
		 */
		function buildMinuteAgent(){
			var minuteAgent = document.createElement("div");
			minuteAgent.className = "base-date-agent-minute";
			wrap.appendChild(minuteAgent);
			var minutePre = document.createElement("div");
			minutePre.className = "minute-pre";
			minuteAgent.appendChild(minutePre);
			minutePre.onclick = preMinute;
			
			var btnPre = document.createElement("i");
			btnPre.className = "btn-pre";
			minutePre.appendChild(btnPre);
			
			var minuteBody = document.createElement("div");
			minuteBody.className = "minute-body";
			minuteAgent.appendChild(minuteBody);
			buildMinuteBody(minuteBody);
			
			var minuteNext = document.createElement("div");
			minuteNext.className = "minute-next";
			minuteAgent.appendChild(minuteNext);
			minuteNext.onclick = nextMinute;
			
			var btnNext = document.createElement("i");
			btnNext.className = "btn-next";
			minuteNext.appendChild(btnNext);
		}
		
		/**
		 * 下个分钟
		 */
		function nextMinute(event){
			var sleMinute = getElemByClass("minute-li select")[0];
			var minuteLis = getElemByClass("minute-li");
			var minuteUl = getElemByClass("minute-ul")[0];
			var dataSize = minuteData.length;
			var top = parseInt(minuteUl.style.top.replace("px", ""));
			if(!isEmpty(sleMinute)){
				var nodes = sleMinute.parentNode.getElementsByTagName(sleMinute.tagName);
				var index = getValInArrIndex(sleMinute, nodes);
				if(index != -1){
					var def = Math.ceil(dataSize / 7);
					if(def == 1){
						return false;
					}
					index++;
					removeClass(sleMinute, "select");
					var m = Math.ceil(index / 7);
					if(m >= def){
						addClass(minuteLis[0], "select");
						minuteLis[0].click();
						minuteUl.style.top = "0px";
						return false;
					}
					addClass(nodes[7 * m], "select");
					nodes[7 * m].click();
					minuteUl.style.top = - (20 * 7 * m) + "px";
					return false;
				}
			}else{
				addClass(minuteLis[0], "select");
				minuteLis[0].click();
				minuteUl.style.top = "0px";
			}
		}
		
		/**
		 * 上个分钟
		 */
		function preMinute(event){
			var sleMinute = getElemByClass("minute-li select")[0];
			var minuteLis = getElemByClass("minute-li");
			var minuteUl = getElemByClass("minute-ul")[0];
			var dataSize = minuteData.length;
			var top = parseInt(minuteUl.style.top.replace("px", ""));
			if(!isEmpty(sleMinute)){
				var index = getElemInParentElemIndex(sleMinute);
				if(index != null){
					var def = Math.ceil(dataSize / 7);
					if(def == 1){
						return false;
					}
					index++;
					removeClass(sleMinute, "select");
					var m = Math.ceil(index / 7);
					if(index == 1 && def > 1){
						def--;
						addClass(minuteLis[7 * def], "select");
						minuteLis[7 * def].click();
						minuteUl.style.top = -(def * 20 * 7) + "px";
						return false;
					}
					m -= 2;
					addClass(minuteLis[7 * m], "select");
					minuteLis[7 * m].click();
					minuteUl.style.top = -(20 * 7 * m) + "px";
					return false;
				}
			}else{
				addClass(minuteLis[0], "select");
				minuteLis[0].click();
				minuteUl.style.top = "0px";
			}
		}
		
		/**
		 * 构建分钟主体
		 */
		function buildMinuteBody(minuteBody){
			var ul = document.createElement("ul");
			ul.className = "minute-ul";
			minuteBody.appendChild(ul);
			var str = "";
			for(var i = 0; i < minuteData.length; i++){
				var clazz = "minute-li";
				if(minuteData[i] == currMiute){
					clazz += " select";
				}
				str += "<li class='" + clazz + "'>" + timePadZero(minuteData[i]) + "</li>";
			}
			ul.innerHTML = str;
			var index = getValInArrIndex(currMiute, minuteData);
			if(index != -1){
				index++;
				var m = Math.ceil(index / 7);
				ul.style.top = -(m - 1) * 20 * 7 + "px";
			}else{
				var minuteLis = getElemByClass("minute-li");
				addClass(minuteLis[0], "select");
				ul.style.top = "0px";
			}
		}
		
		/**
		 * 日历控件的事件
		 */
		function bindDateEvent(){
			top.document.onclick = document.onclick = function(event){
				if(isEmpty(event) || isEmpty(event.path)){
					return;
				}
				var path = event.path;
				if(!checkElemArrHasId(path, "baseDateAgentWrap") && 
					!checkElemArrHasClass(path, "custom-date-ymd") &&
					!checkElemArrHasClass(path, "custom-date-hh") &&
					!checkElemArrHasClass(path, "custom-date-mm")){
					var elem = document.getElementById("baseDateAgentWrap");
					if(!isEmpty(elem)){
						digitalClockAgent.destroy();
						digitalClockAgent.dateChange(dateStr, date);
					}
				}
				if(!checkElemArrHasId(path, "baseDateAgentYear") && 
					!checkElemArrHasClass(path, "year-body")){
					var elem = document.getElementById("baseDateAgentYear");
					if(!isEmpty(elem)){
						elem.parentNode.removeChild(elem);
					}
				}
				if(!checkElemArrHasId(path, "baseDateAgentMonth")&& 
					!checkElemArrHasClass(path, "month-body")){
					var elem = document.getElementById("baseDateAgentMonth");
					if(!isEmpty(elem)){
						elem.parentNode.removeChild(elem);
					}
				}
			}
			var dateCells = getElemByClass("date-cell");
			if(!isEmpty(dateCells)){
				for(var i = 0; i < dateCells.length; i++){
					dateCells[i].onclick = function(event){
						var _dateCells = getElemByClass("date-cell");
						for(var j = 0; j < _dateCells.length; j++){
							removeClass(_dateCells[j], "select");
						}
						var obj = event.currentTarget;
						if(!hasClass(obj, "select")){
							addClass(obj, "select");
						}
						var yearT = parseInt(obj.getAttribute("year"), 10);
						var monthT = parseInt(obj.getAttribute("month"), 10);
						var dateT = parseInt(obj.getAttribute("date"), 10);
						_year = isNaN(yearT) ? _year : yearT;
						_month = isNaN(monthT) ? _month : monthT - 1;
						_date = isNaN(dateT) ? _date : dateT;
						currYear = _year;
						currMonth = _month + 1;
						currDate = _date;
						changeDate();
					}
				}
			}
			
			var hourLis = getElemByClass("hour-li");
			if(!isEmpty(hourLis)) {
				for(var i = 0; i < hourLis.length; i++){
					hourLis[i].onclick = function(event){
						for(var j = 0; j < hourLis.length; j++){
							removeClass(hourLis[j], "select");
						}
						var obj = event.currentTarget;
						if(!hasClass(obj, "select")){
							addClass(obj, "select");
						}
						var dateEle = getElemByClass("date-cell select");
						if(!isEmpty(dateEle)){
							var year = parseInt(dateEle[0].getAttribute("year"), 10);
							var month = parseInt(dateEle[0].getAttribute("month"), 10);
							var date = parseInt(dateEle[0].getAttribute("date"), 10);
							_year = isNaN(year) ? _year : year;
							_month = isNaN(month) ? _month : month - 1;
							_date = isNaN(date) ? _date : date;
							currYear = _year;
							currMonth = _month + 1;
							currDate = _date;
							var hours = parseInt(obj.textContent);
							_hour = isNaN(hours) ? _hour : hours;
							currHour = _hour;
							changeDate();
						}
					}
				}
			}
			
			var minuteLis = getElemByClass("minute-li");
			if(!isEmpty(minuteLis)) {
				for(var i = 0; i < minuteLis.length; i++){
					minuteLis[i].onclick = function(event){
						for(var j = 0; j < minuteLis.length; j++){
							removeClass(minuteLis[j], "select");
						}
						var obj = event.currentTarget;
						if(!hasClass(obj, "select")){
							addClass(obj, "select");
						}
						var dateEle = getElemByClass("date-cell select");
						if(!isEmpty(dateEle)){
							var year = parseInt(dateEle[0].getAttribute("year"), 10);
							var month = parseInt(dateEle[0].getAttribute("month"), 10);
							var date = parseInt(dateEle[0].getAttribute("date"), 10);
							_year = isNaN(year) ? _year : year;
							_month = isNaN(month) ? _month : month - 1;
							_date = isNaN(date) ? _date : date;
							currYear = _year;
							currMonth = _month + 1;
							currDate = _date;
							var hourEle = getElemByClass("hour-li select");
							if(!isEmpty(hourEle)){
								var hours = parseInt(hourEle[0].textContent);
								_hour = isNaN(hours) ? _hour : hours;
								currHour = _hour;
							}
							var minute = parseInt(obj.textContent);
							_minute = isNaN(minute) ? _minute : minute;
							currMiute = _minute;
							changeDate();
						}
					}
				}
			}
		}
		
		function changeDate(){
			date = new Date(_year, _month, _date, _hour, _minute, 0, 0);
			dateStr = date.format(dateFormat);
		}
		
		function getElemByClass(cls){
			if(!isEmpty(wrap)){
				return wrap.getElementsByClassName(cls);
			}
			return [];
		}
		
		digitalClockAgent.init();
		return digitalClockAgent;
	}
	
	function checkDateTime(str){
		if(isEmpty(str)){
			return false;
		}
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
		return true;
	}
	
	function getElemByClassFromParent(parent, cls){
		if(!isEmpty(parent)){
			return parent.getElementsByClassName(cls);
		}
		return [];
	}
	
	function isEmpty(param){
		if(param == undefined || param == null || param === "" || param.length == 0){
			return true;
		}
		return false;
	}

	function hasClass(elem, cls){
		if(typeof elem.className !== "string"){
			return false;
		}
		return elem.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
	}
	
	function addClass(elem, cls){
		if(!hasClass(elem, cls)){
			elem.className += " " + cls;
		}
	}
	
	function removeClass(elem, cls){
		if(hasClass(elem, cls)){
			var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
			elem.className = elem.className.replace(reg, "");
		}
	}
	
	function siblings(elem){
		var elems = [];
		var epr = elem;
		while(epr.nodeType == 1 && !isEmpty(epr.previousSibling)){
			elems.push(epr.previousSibling);
			epr = epr.previousSibling;
		}
		var ent = elem;
		while(ent.nodeType == 1 && !isEmpty(ent.nextSibling)){
			elems.push(ent.nextSibling);
			ent = ent.nextSibling;
		}
		return elems;
	}
	
	function getElemInParentElemIndex(elem){
		var parent = elem.parentNode;
		if(parent){
			var nodes = parent.getElementsByTagName(elem.tagName);
			return getValInArrIndex(elem, nodes);
		}
		return -1;
	}
	
	function getValInArrIndex(val, arr){
		if(isEmpty(val) || isEmpty(arr)){
			return -1;
		}
		for(var i = 0; i < arr.length; i++){
			if(val == arr[i]){
				return i;
			}
		}
		return -1;
	}
	
	function checkElemParent(type, elem, sele){
		if(type == 1){//elem
			if(sele == elem){
				return true;
			}
			var parent = elem.parentNode;
			while(parent != null){
				if(isEmpty(parent)){
					continue;
				}
				if(sele == parent){
					return true;
				}
				parent = parent.parentNode;
			}
		}else if(type == 2){//id
			if(sele == elem.id){
				return true;
			}
			var parent = elem.parentNode;
			while(parent != null){
				if(isEmpty(parent) || isEmpty(parent.id)){
					continue;
				}
				if(sele == parent.id){
					return true;
				}
				parent = parent.parentNode;
			}
		}else if(type == 3){//id
			if(hasClass(elem, sele)){
				return true;
			}
			var parent = elem.parentNode;
			while(parent != null){
				if(isEmpty(parent) || isEmpty(parent.className)){
					continue;
				}
				if(hasClass(parent, sele)){
					return true;
				}
				parent = parent.parentNode;
			}
		}
		return false;
	}
	
	function checkElemArrHasId(elemArr, id){
		if(isEmpty(elemArr) || isEmpty(id)){
			return false;
		}
		for(var i = 0; i < elemArr.length; i++){
			var elem = elemArr[i];
			if(isEmpty(elem) || isEmpty(elem.id)){
				continue;
			}
			if(elem.id == id){
				return true;
			}
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
			if(hasClass(elem, cls)){
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
	
			
	function checkValInArr(val, arr){
		if(isEmpty(arr) || isEmpty(val)){
			return false;
		}
		for(var i = 0; i < arr.length; i++){
			if(arr[i] == val){
				return true;
			}
		}
		return false;
	}
	
	function timePadZero(time){
		return (time + "").length == 1 ? "0" + time : time + "";
	}
	
	window.CustomDatePick = CustomDatePick;
	
})(window, document)