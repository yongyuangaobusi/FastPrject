/*
 * @Description : customDateAgent.js
 * @Author :      PANRUSEN
 * @CreateDate :  2015年10月13日
 * @TODO
 * 	时间组件
 */

;(function($, win) {
	window.top.xeval = function(code){
		if(!!(window.top.window.attachEvent && !window.top.window.opera)){
			execScript(code);}else{window.top.window.eval(code);
		}
	};
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
		if (parseInt(day, 10) < 10) {
			day = "0" + day;
		}
		month = this.getMonth() + 1;
		if (parseInt(month, 10) < 10) {
			month = "0" + month;
		}
		hour = this.getHours();
		if (parseInt(hour, 10) < 10) {
			hour = "0" + hour;
		}
		minute = this.getMinutes();
		if (parseInt(minute, 10) < 10) {
			minute = "0" + minute;
		}
		second = this.getSeconds();
		if (parseInt(second, 10) < 10) {
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
	 * 
	 * 	月(M)/日(d)/小时(h)/分(m)/秒(s)/季度(q)可以用 1-2个占位符 ; 
	 *  年(y)可以用 1-4 个占位符，
	 *  毫秒(S)只能用 1 个占位符(是 1-3 位的数字) ;
	 *  
	 */
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

	
	var IPicker = function(options){
		
		var settings = {
				pickerFellow : null,	//组件跟随的input
				pickerId : null,		//组件id
				defaultDt : null,		//默认值
				delayTime : 0,			//延迟时间，int型
				format : 'd-h-m',		//时间格式,d-h-m/d-h/d y y-M
				hType : 'H1',			//小时类型，现支持H1(每小时间隔),H3(每3小时间隔),H6(每6小时间隔),H12(每12小时间隔)四种
				mType : 'M1' 			//分钟类型，现支持：M1,M6,M10,M15,M30，M1表示为每分钟间隔，以此类推
//				callObj: null
		};
		
		this.options = $.extend({}, settings, options);
	};
	
	IPicker.prototype = {
			init : function(wrap){
				var _ = this, opt = _.options;
				_.createDate(wrap);
				
				opt.pickerId = $(wrap).attr('id');
				
				if(!opt.pickerId){
					opt.pickerId = 'IPicker_' + new Date().getTime();
					$(wrap).attr('id', opt.pickerId);
				}
				
			},
			setOptions : function(opt){
				this.options = $.extend({}, this.options, opt);
			},
			getOptions : function(){
				return this.options;
			},
			createDate : function(wrap){
				var _this = this,
				 	opt = _this.options;
				
				function _initDay(val) {
					opt.pickerId = $(wrap).attr('id');
					
					if(!opt.pickerId){
						opt.pickerId = 'IPicker_' + new Date().getTime();
						$(wrap).attr('id', opt.pickerId);
					}
					
					
					var fns = null;
					if(opt.callObj && opt.callObj.callDate){
						fns = opt.callObj.callDate;
					}
					var $d = $('<input>').addClass('Wdate').attr('fellow', opt.pickerId).attr('wformat', opt.format).attr('fns', fns);
					$d.val(val);
					/** 添加wDatePicker值范围限制 */
						var str = '';
						var max = $(wrap).attr("MaxDateId");
						if(max && max!=''){
							str += ",maxDate:'#F{$dp.$D("+max+");}'";
						}
						var min = $(wrap).attr("MinDateId");
						if(min && min!=''){
							str += ",minDate:'#F{$dp.$D("+min+");}'";
						}
						var defualtFormat = 'dateFmt:"yyyy-MM-dd"';
						if(opt.format=='y'){
							defualtFormat='dateFmt:"yyyy"';
						}else if(opt.format=='y-M'){
							defualtFormat='dateFmt:"yyyy-MM"';
						}
					/** end */
					
					$d.attr({
						readonly : true,
						channel :  'day',
						value : val,
						onfocus : 'function _changed(){	var w = $dp.$($(this).attr("fellow")), wf = $(this).attr("wformat"); ' 
								+ ' if(w) { var wv = $(w).val(), curVal = ""; ' 
								+ 'if(wf=="d-h-m")  curVal = $(this).val() + " " + wv.substr(11, 2) + ":"+ wv.substr(14, 2); ' 
								+ ' if(wf=="d-h") curVal = $(this).val() + " " + wv.substr(11, 2); ' 
								+ ' if(wf=="d") curVal = $(this).val(); '
								+ '$(w).attr({value:curVal}).val(curVal); '
								+' var cfs =$(this).attr("fns"); if(cfs){window.top.xeval(cfs);query(); } '+ '' 
								+' }  } ' 
								+ ' WdatePicker({'+defualtFormat+' , onpicked:_changed, isShowClear:false,isShowToday:false,isShowOK:false,qsEnabled:false'+str+'});'
					});
					return $d;
				}
				
				function _initHour(curVal) {
					var ty = opt.hType;
					
					if(ty.indexOf('H') > -1){
						var hty = parseInt(ty.substr(1, 2), 10),
							$hourUl = $('<ul>'),
							selected = '';
						
						if(3 == hty || 1 == hty){
							for(var i = 0; i < 24; i++){
								var h = i < 10 ? "0" + i : i;
								selected = '';
								if((i+1)%hty == 0){
									if(h == curVal){
										selected = 'selected';
									}
									$hourUl.append($('<li>' , {channel : h}).addClass(selected).html(h));
								}
							}
						} else if(6 == hty){
							$.each(['02', '08', '14', '20'], function(i, o){
								selected = '';
								if(o == curVal){
									selected = 'selected';
								}
								$hourUl.append($('<li>' , {channel : o}).addClass(selected).html(o));
							});
						} else if(12 == hty){
							$.each(['08', '20'], function(i, o){
								selected = '';
								if(o == curVal){
									selected = 'selected';
								}
								$hourUl.append($('<li>' , {channel : o}).addClass(selected).html(o));
							});
						}else if(20 == hty){
							$.each(['20'], function(i, o){
								selected = '';
								if(o == curVal){
									selected = 'selected';
								}
								$hourUl.append($('<li>' , {channel : o}).addClass(selected).html(o));
							});
						}
						return $hourUl;
					}
					return null;
				}
				
				function _initMin(curVal) {
					var ty = opt.mType;
					if(ty.indexOf('M') > -1){
						var mty = parseInt(ty.substr(1, 2), 10),
							$minUl = $('<ul>'),
							selected = '';
						for(var i = 0; i < 60; i++){
							var m = i < 10 ? "0" + i : i;
							selected = '';
							if(m == curVal){
								selected = 'selected';
							}
							if(i == 0 || i%mty == 0){
								$minUl.append($('<li>' , {channel : m}).addClass(selected).html(m));
							}
						}
						return $minUl;
					}
					return null;
				}
				
				function _create() {
					
					var curDt = _this._getCurDate();
					
					var $dhm = $('<ul>').addClass('iPicker'),
						$h = $('<input>', {readonly : true, channel : 'hour', value : curDt[1]}).val(curDt[1]),
						$m = $('<input>', {readonly : true, channel : 'minute', value : curDt[2]}).val(curDt[2]);
					//var $dforward = $('<span>').addClass('iDay iDay-F').html('<'), $dbackward = $('<span>').addClass('iDay iDay-B').html('>');
					
					if('y'== opt.format){
						curDt[0] = curDt[0].substr(0,4);
					}else if('y-M'== opt.format){
						curDt[0] = curDt[0].substr(0,7);
					}
					
					$dhm.append($('<li>').addClass('iPicker-ico'));
					
					$dhm.append($('<li>').addClass('iPicker-day').append(_initDay(curDt[0])))
						//.append($('<li>').addClass('iPicker-day-opter').append($dforward).append($dbackward))
						.append($('<li>').addClass('iPicker-hour').append($h).append($('<label>').html('时')))
						.append($('<li>').addClass('iPicker-minute').append($m).append($('<label>').html('分')));
					
					var $timeWrap = $('<ul>').addClass('iPicker-timeWrap');
					$timeWrap.append($('<li>').addClass('iPicker-hourWrap').attr({channel : 'hour'}).append($('<i>').html('小时选择')).append(_initHour(curDt[1])))
							 .append($('<li>').addClass('iPicker-minuteWrap').attr('channel', 'minute').append($('<i>').html('分钟选择')).append(_initMin(curDt[2])));
					
					var $Picker = $('<div>').addClass('DateAgentPicker').attr('channel', opt.pickerId);
					
					if('d' == opt.format||'y'== opt.format||'y-M'== opt.format){
						$dhm.find('li.iPicker-hour').hide();
						$dhm.find('li.iPicker-minute').hide();
					} else if('d-h' == opt.format){
						$dhm.find('li.iPicker-minute').hide();
					}
					
					$Picker.append($dhm).append($timeWrap);
					if($Picker.length > 0) $Picker.remove();
					
					var v = curDt[0] + ' ' + curDt[1] + ':' + curDt[2];
					if('y'== opt.format){
						v = curDt[0].substr(0,4);
					}else if('y-M'== opt.format){
						v = curDt[0].substr(0,7);
					}
					$(wrap).attr({value : v}).val(v);
					$Picker.insertAfter(wrap);
					
					_this._trigger(wrap);
				}
				
				_create();
				
			},
			_getCurDate : function(settings){
				var _this = this,
					opt = _this.options,
					d = new Date(),
					formatForMinute = "yyyy-MM-dd hh:mm";
				
				if(opt.defaultDt){
					d = opt.defaultDt;
				}
				if(settings){
					opt = settings;
				}
				
				function getDateBySpace(timeStr, space){
					
					if(!$.isNumeric(space*1)){
						space = 0;
					} 
					space = -space;
					
					var day = timeStr.substr(0, 10),
						hour = timeStr.substr(11, 2),
						minute = timeStr.substr(14, 2);
					
					if (hour.length < 2)  hour = "0" + hour;
					if (hour.length > 2)  hour = hour.substring(0, 2);
					if (minute.length < 2)  minute = "0" + minute;
					
					var t = day + " " + hour + ":" + minute,
					t = t.replace(/-/g, "/"),
					dt = new Date(t);
					dt.setMinutes(dt.getMinutes() + space);
					
					var times = dt.toString().split(" ");
					
					return times[0] + " " + times[1].split(":")[0] + ":" + times[1].split(":")[1];
				}
				
				var dateStr = getDateBySpace(d.toString(formatForMinute), opt.delayTime);
				
				function getDateSkipDay(dateStr){
					var y = dateStr.substr(0, 4),
					m = dateStr.substr(5, 2),
					d = dateStr.substr(8, 2),
					h = dateStr.substr(11, 2),
					mi = dateStr.substr(14, 2);
					var dd=  new Date(y, m - 1, d, h, mi);
					dd.setMinutes(dd.getMinutes() + (-24 * 60));
					return dd.toString(formatForMinute);
				}
				
				var hour = parseInt(dateStr.substr(11, 2),10);
				var minute = parseInt(dateStr.split(":")[1],10);
				
				var curDate = null;
				
				if('d-h-m' == opt.format){
					var mty = parseInt(opt.mType.substr(1, 2), 10);
					var curM = Math.floor(minute / mty) * mty;
					
					if(curM < 10){
						curM = '0' + curM;
					}
					
					if(hour < 10){
						hour = '0' + hour;
					}
					curDate = [dateStr.split(" ")[0], hour + '', curM + ''];
					
				} else if('d-h' == opt.format){
					var hty = parseInt(opt.hType.substr(1, 2), 10);
					if(1 == hty){
						if(hour < 10){
							hour = '0' + hour;
						}
						curDate = [dateStr.split(" ")[0], hour + '', '00'];
					} else {
						if(3 == hty){
							if (hour >= 2 && hour < 5) {
								hour = "02";
							} else if (hour >= 5 && hour < 8) {
								hour = "05";
							} else if (hour >= 8 && hour < 11) {
								hour = "08";
							} else if (hour >= 11 && hour < 14) {
								hour = "11";
							} else if (hour >= 14 && hour < 17) {
								hour = "14";
							} else if (hour >= 17 && hour < 20) {
								hour = "17";
							} else if (hour >= 20 && hour < 23) {
								hour = "20";
							} else if (hour >= 23) {
								hour = "23";
							} else {
								dateStr = getDateSkipDay(dateStr);
								hour = "23";
							}
						} else if(6 == hty){
							if (hour >= 2 && hour < 8) {
								hour = "02";
							} else if (hour >= 8 && hour < 14) {
								hour = "08";
							} else if (hour >= 14 && hour < 20) {
								hour = "14";
							} else if (hour >= 20 ) {
								hour = "20";
							} else {
								dateStr = getDateSkipDay(dateStr);
								hour = "20";
							} 
						} else if(12 == hty){
							if (hour >= 8 && hour < 20) {
								hour = "08";
							} else if (hour >= 20 ) {
								hour = "20";
							} else {
								dateStr = getDateSkipDay(dateStr);
								hour = "20";
							}
						}
						curDate = [dateStr.split(" ")[0], hour + "", '00'];
					}
				} else if('d' == opt.format||'y'==opt.format||'y-M'==opt.format){
					curDate = [dateStr.split(" ")[0], '00', '00'];
				}
				return curDate;
			},
			_trigger : function(wrap){
				var _this = this,
					opt = _this.options;
				
				opt.pickerFellow = wrap;
				
				var fns = {
						demergeTime : function(strTime) {
							if (strTime == undefined) {
								return;
							}
							var timeArr = [];
							timeArr[0] = strTime.substr(0, 10);
							if('d-h-m' == opt.format){
								timeArr[1] = strTime.substr(11, 2);
								timeArr[2] = strTime.substr(14, 2);
							} else if('d-h' == opt.format) {
								timeArr[1] = strTime.substr(11, 2);
							}
							return timeArr;
						},	
						changeVal : function(val, type, $input){
							
							var $adp = $input.closest('div.DateAgentPicker');
							opt.pickerFellow = $('input[id=' + $adp.attr('channel') + ']');
							
						
							if(opt.pickerFellow){
								var v = this.demergeTime($(opt.pickerFellow).val());
								if('day' == type) {
									v[0] = val;
								}
								if('hour' == type) {
									v[1] = val;
								}
								if('minute' == type) {
									v[2] = val;
								}
								var curVal = v[0] ;
								if('d-h-m' == opt.format ){
									curVal = v[0] + ' ' + v[1] + ":" + v[2];
								} else if('d-h' == opt.format  ){
									curVal = v[0] + ' ' + v[1];
								}
								$(opt.pickerFellow).attr({value : curVal}).val(curVal);
								$input.off('blur').on('blur', function(ev){
									ev.stopPropagation();
									$('li.iPicker-hourWrap').removeClass('actived').hide();
									$('li.iPicker-minuteWrap').removeClass('actived').hide();
									return false;
								});
							}
						},
						_click : function($w, $input){
							var actived = $w.hasClass('actived'), 
								$sbl = $w.siblings(),
								sbactived =  $sbl.hasClass('actived');
							$input.off('blur');
							if(!actived){
								if(sbactived){
									$sbl.removeClass('actived').hide();
								}
								
								var val = $input.val();
								$w.find('li[channel="' + val + '"]').addClass('selected').siblings().removeClass('selected');
								$w.addClass('actived').show();
								$w.undelegate('click').delegate('li', 'click', function(e){
									e.stopPropagation();
									$(this).addClass('selected').siblings().removeClass('selected');
									$input.attr({value : $(this).attr('channel')}).val($(this).attr('channel'));
									fns.changeVal($(this).attr('channel'), $input.attr('channel'), $input);
									var fnns = null;
									if(opt.callObj && opt.callObj.callDate){
										fnns = opt.callObj.callDate;
									}
									if(fnns){
										window.top.xeval(fnns);
										query(); 										
									}
									$w.removeClass('actived').hide();
									return false;
								});
							}
						}
				};
				
				function _dOpterCall(id, isForward){
					var dateStr = $($dp.$(id)).val();
					var y = dateStr.substr(0, 4),
						m = dateStr.substr(5, 2),
						d = dateStr.substr(8, 2),
						dtAr = dateStr.split(" ");
					var dd=  new Date(y, m - 1, d, 0, 0);
					var inter = isForward ? -24 * 60 : 24 * 60;
					dd.setMinutes(dd.getMinutes() + inter);
					dd = dd.toString("yyyy-MM-dd");
					$("input[fellow='" + id + "']").attr({
						value: dd
					}).val(dd);
					if(dtAr.length > 1){
						dd += ' ' + dtAr[1];
					}
					$("input[id='" + id + "']").attr({
						value: dd
					}).val(dd);
					if(opt.dayCall instanceof Function){
						opt.dayCall(isForward, dd);
					}
				}
				
				$('div.DateAgentPicker').undelegate('focus').delegate('li input', 'focus', function(ev){
					ev.stopPropagation();
					var $input = $(this),
						$hWrap = $input.closest('div.DateAgentPicker').find('li.iPicker-hourWrap'),
						$mWrap = $input.closest('div.DateAgentPicker').find('li.iPicker-minuteWrap'),
						hactived = $hWrap.hasClass('actived'),
						mactived = $mWrap.hasClass('actived');
					
					if($input.attr('channel') == 'hour'){
						if(mactived){
							$mWrap.removeClass('actived').hide();
						}
						if(!hactived){
							fns._click($hWrap, $input);
						}
					}
					if($input.attr('channel') == 'minute'){
						if(hactived){
							$hWrap.removeClass('actived').hide();
						}
						if(!mactived){
							fns._click($mWrap, $input);
						}
					}
					
					if($input.is('[channel="day"]')){
						var curd = $input.val();
						$input.attr({
							value: curd
						});
						var w = $("#" + $input.attr("fellow")), wf = $input.attr("wformat");
						if(w && w.size()>0) { var wv = w.val(), curVal = ""; 
							if(wf=="d-h-m")  curVal = curd + " " + wv.substr(11, 2) + ":"+ wv.substr(14, 2); 
							if(wf=="d-h") curVal = curd + " " + wv.substr(11, 2); 
							if(wf=="d") curVal = curd;
							$(w).attr({value:curVal}).val(curVal); 
						}
					}
					return false;
				}).delegate('span.iDay-F', 'click', function(ev){
					ev.stopPropagation();
					_dOpterCall(opt.pickerId, true);
					return false;
				}).delegate('span.iDay-B', 'click', function(ev){
					ev.stopPropagation();
					_dOpterCall(opt.pickerId, false);
					return false;
				});
				
			}
	};
	
	
	$.extend({
		IDate : function(parent, callObjs){
			var iFns = {
					toJsonObj : function(str){
						var s = $.trim(str) , jsondata = null;
						if(s){
							if(s.substring(0,1)!="{"){
								s = "{" + s + "}";
							}
							jsondata = (new Function("return " + s))();
						}
						return jsondata;
					},
					mergeTime : function(selDate, selHour, selMinute, opt) {
						var strTime = "";
						if (selHour.length < 2) {
							selHour = "0" + selHour;
						}
						strTime = selDate + " " + selHour;
						if (selMinute != undefined) {
							if (selMinute.length< 2) {
								selMinute = "0" + parseInt(selMinute, 10);
							}
							strTime += ":" + selMinute;
						}
						if('d-h' == opt.format){
							strTime = strTime.substr(0, 13);
						} else if('d' == opt.format){
							strTime = strTime.substr(0, 10);
						}
						return strTime;
					},
					getDateBySpace : function(timeStr, opt, isForward){
						
						var day = '', hour = '00',  minute = '00', space = 0;
						
						day = timeStr.substr(0, 10);
						if('d-h-m' == opt.format){
							hour = timeStr.substr(11, 2);
							minute = timeStr.substr(14, 2);
							if(opt.mType){
								space = parseInt(opt.mType.substr(1, 2), 10);
							}
							if(opt.ratio){
								space = space * opt.ratio;
							}
						} else if('d-h' == opt.format) {
							hour = timeStr.substr(11, 2);
							if(opt.hType){
								space = parseInt(opt.hType.substr(1, 2), 10) * 60;
							}
							if(opt.ratio){
								space = space * opt.ratio;
							}
						}else if('d' == opt.format){
							space = 24 * 60;
							if(opt.ratio){
								space = space * opt.ratio;
							}
						}
						
						if (hour.length < 2)  hour = "0" + hour;
						if (hour.length > 2)  hour = hour.substring(0, 2);
						if (minute.length < 2)  minute = "0" + minute;
						
						if(isForward){
							space = -space;
						}
						var t = day + " " + hour + ":" + minute,
							t = t.replace(/-/g, "/"),
							dt = new Date(t);
						
						dt.setMinutes(dt.getMinutes() + space);
						var dts = [];
						var times = dt.toString().split(" ");
						dts[0] = times[0];
						dts[1] = times[1].split(":")[0];
						dts[2] = times[1].split(":")[1];
						return dts;
					},
					setPickerVal : function(dateArr, opt){
						if(opt.pickerFellow.length == 0){
							return;
						}
						
						var $IPD = $('div[channel=' + $(opt.pickerFellow).attr('id') + ']');
						
						var $iPicker = $IPD.find('ul.iPicker');
						
						$iPicker.find("input[channel='day']").attr({value : dateArr[0]}).val(dateArr[0]);
						$iPicker.find("input[channel='hour']").attr({value : dateArr[1]}).val(dateArr[1]);
						$iPicker.find("input[channel='minute']").attr({value : dateArr[2]}).val(dateArr[2]);
						
						var dataStr = this.mergeTime(dateArr[0], dateArr[1], dateArr[2], opt);
						
						if((opt.pickerFellow)){
							$(opt.pickerFellow).attr({value : dataStr}).val(dataStr);
						}
						return dataStr;
					}
			};
			
			var iPicker = new IPicker();
			var $DateIputs;
			if(parent){
				$DateIputs =$(parent + ' input.DateAgent');
			} else {
				$DateIputs = $('input.DateAgent');
			}
			$.each($DateIputs, function(index, obj){
				var $DateIput = $(obj);
				if($DateIput){
					var opts = iFns.toJsonObj($DateIput.data('options'));
					if($DateIput.val()){
						opts.defaultDt = $DateIput.val();
					}
					if(opts){
						if(callObjs !== undefined && callObjs.query !== undefined){
							opts['callObj'] = {
									callDate: callObjs.query + ""
							};
						}
						iPicker.setOptions(opts);
					}
					
					iPicker.init($DateIput);
					
				}
			});
			
			$.fn.IDatePicker = function(options){
				   var $this = $(this);
				   
				   var opt = {
							pickerFellow : null,	//组件跟随的input
							pickerId : null,		//组件id
							delayTime : 0,			//延迟时间，int型
							format : 'd-h-m',		//时间格式,d-h-m/d-h/d
							hType : 'H1',			//小时类型，现支持H1(每小时间隔),H3(每3小时间隔),H6(每6小时间隔),H12(每12小时间隔)四种
							mType : 'M1', 			//分钟类型，现支持：M1,M6,M10,M15,M30，M1表示为每分钟间隔，以此类推
							ratio : 1				//快速切换时间的倍数，切换时间=mType*ratio
							
					};
					
				   opt = $.extend({}, opt, options);
				   
					var data = iFns.toJsonObj($this.data('options'));
					if(data){
						opt = $.extend(opt, data);
					}
				   if($this.hasClass('DateAgent')){
					   
					   opt.pickerFellow = $this;
					   opt.pickerId = $this.attr('id');
					   
					   var iPickerObj = {
							   //获取值
							   getVal : function(){
								   return $(opt.pickerFellow).val();
							   },
							   //设置值
							   setVal : function(val){
								   var dateArr = ['00', '00', '00'];
								   dateArr[0] = val.substr(0, 10);
									if('d-h-m' == opt.format){
										dateArr[1] = val.substr(11, 2);
										dateArr[2] = val.substr(14, 2);
									} else if('d-h' == opt.format) {
										dateArr[1] = val.substr(11, 2);
									}
									return iFns.setPickerVal(dateArr, opt);
							   },
							   //向前
							   toForward : function(ratio){
								   curDt =  $(opt.pickerFellow).val();
								    opt.ratio = ratio;
								    var chdtArr = iFns.getDateBySpace(curDt, opt, true);
								    return iFns.setPickerVal(chdtArr, opt);
							   },
							   //向后
							   toBackward : function(ratio){
							   		curDt =  $(opt.pickerFellow).val();
							   		opt.ratio = ratio;
							   		var chdtArr = iFns.getDateBySpace(curDt, opt, false);
							   		return iFns.setPickerVal(chdtArr, opt);
							   },
							   //最新
							   toNewest : function(){
								   var newDateArr = new IPicker()._getCurDate(opt);
								   return iFns.setPickerVal(newDateArr, opt);
							   }
					   };
					   
					   return iPickerObj;
				   }
				   return null
			   };			
		}
	});
	
	function onMousedownForBody(ev){
		var flag_input = $(ev.target).is('input') && $(ev.target).closest('ul.iPicker').size()>0;
		var flag_li = $(ev.target).closest('ul.iPicker-timeWrap').size()>0;
		if(!flag_input && !flag_li){
			$('li.iPicker-hourWrap').removeClass('actived').hide();
			$('li.iPicker-minuteWrap').removeClass('actived').hide();
		}else if(flag_input){
			if($(ev.target).hasClass('Wdate')){
				$('li.iPicker-hourWrap').removeClass('actived').hide();
				$('li.iPicker-minuteWrap').removeClass('actived').hide();
			}
			$(ev.target).focus();
		}
	}
	
	$(document).on('mousedown',function(ev){
		onMousedownForBody(ev);
	});
	$(top.document).on('mousedown',function(ev){
		onMousedownForBody(ev);
	});
//	window.onload = $.IDate();	//到调用的地方再引入
	
})(jQuery, window);