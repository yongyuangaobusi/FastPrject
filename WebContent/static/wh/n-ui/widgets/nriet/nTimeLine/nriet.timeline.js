/*  
 * nriet.timeline.js
 * @Author :      PANRUSEN
 * @CreateDate :  2016年6月15日
 * Copyright (c) 2016, NRIET.　
 * TODO
 * 		时间轴组件
 */


;(function($, window, document, body, undefined){
	
	'use strict';

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
	/*
	 * Date的扩展，将 Date 转化为指定格式的String: 
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
	
	var nDTUtil = {
			getCurTimeByFmt : function(fmt){
				if(!fmt){
					return null;
				}
				return new Date().toString(fmt);
			},
			/*
			 * 得到与基准时间最近，且分钟取最近能被inteval整除的数，并返回时间字符串数组
			 * @param strTime 格式：yyyy-MM-dd hh:mm:ss、yyyy-MM-dd hh:mm
			 * @param isBackward  是否向后取最近
			 * @return 数组格式["yyyy-MM-dd","HH","mm"].
			 */
			getLastTimeByRide : function(strTime, inteval, isBackward){
				var dateArr = nDTUtil.demergeTime(strTime);
				var min = window.parseInt(dateArr[2], 10);
				if(isBackward) {
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
				
				return dateArr[0] + " " + dateArr[1] + ":" + dateArr[2] ;
			},
			//获取年月日（yyyy-MM-dd）
			getDates: function(strTime){
				if(!strTime && (strTime.length >= 10)){
					return;
				}
				return strTime.substr(0, 10);
			},
			//获取年月日（yyyy-MM）
			getMon: function(strTime){
				if(!strTime && (strTime.length >= 10)){
					return;
				}
				return strTime.substr(0, 7);
			},
			//获取年月日（dd）
			getDay: function(strTime){
				if(!strTime && (strTime.length >= 10)){
					return;
				}
				return strTime.substr(8, 2);
			},
			//获取小时（HH）
			getHour: function(strTime){
				if(!strTime && (strTime.length >= 13)){
					return;
				}
				return strTime.substr(11, 2);
			},
			//获取分钟（mm）
			getMin: function(strTime){
				if(!strTime && (strTime.length >= 16)){
					return;
				}
				return strTime.substr(14, 2);
			},
			/*
			 * @param strTime yyyy-MM-dd HH:mm
			 * @returns 时间数组 [yyyy-MM-dd,HH,mm]
			 */
			demergeTime : function(strTime) {
				if (strTime == undefined) {
					return null;
				}
				var timeArr = [];
				timeArr[0] = strTime.substr(0, 10);
				timeArr[1] = strTime.substr(11, 2);
				timeArr[2] = strTime.substr(14, 2);
				if(strTime.length > 17) {
					timeArr[3] = strTime.substr(17, 2);
				}
				return timeArr;
			},
			/*
			 * 合并时间
			 * @param selDate yyyy-MM-dd
			 * @param selHour  hh12
			 * @param selMinute mm
			 * @returns {String} yyyy-MM-dd HH:mm
			 */
			mergeTime: function(selDate, selHour, selMinute, selSec) {
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
			},
			getDateStrBySkipMinute : function(strDate, skipMinute, fmt) {
				var dateStr = "";

				var arr = strDate.split(" ");
				var arr1 = arr[0].split("-");
				var arr2 = arr[1].split(":");
				
				if(arr2.length == 1)
					arr2[1] = "00";

				strDate = new Date(arr1[0], arr1[1] - 1, arr1[2], arr2[0], arr2[1], "00");
				
				strDate.setMinutes(strDate.getMinutes() + skipMinute);
				
				dateStr = strDate.toString(fmt);
				
				return dateStr;
			},
			isEqualForHour : function(strDate1, strDate2){
				var isEqual = false;
				if (strDate1 && strDate2) {
					if (strDate1.length >= 13 && strDate2.length >= 13) {
						var time1 = strDate1.substr(0, 13);
						var time2 = strDate2.substr(0, 13);
						if (time1 === time2) {
							isEqual = true;
						}
					}
				}
				return isEqual;
			},
			isEqualForDate : function(strDate1, strDate2){
				var isEqual = false;
				if (strDate1 && strDate2) {
					if (strDate1.length >= 10 && strDate2.length >= 10) {
						var time1 = strDate1.substr(0, 10);
						var time2 = strDate2.substr(0, 10);
						if (time1 === time2) {
							isEqual = true;
						}
					}
				}
				return isEqual;
			},
			isEqualForMon : function(strDate1, strDate2){
				var isEqual = false;
				if (strDate1 && strDate2) {
					if (strDate1.length >= 10 && strDate2.length >= 7) {
						var time1 = strDate1.substr(0, 7);
						var time2 = strDate2.substr(0, 7);
						if (time1 === time2) {
							isEqual = true;
						}
					}
				}
				return isEqual;
			}
	};
	
	var NAME = 'NTimeLine';
	var defaults = {
			baseTime: null,								//基准时间
			baseFmt: 'yyyy-MM-dd hh:mm',				//基准时间格式
			timeSpacing: 5,								//间隔，单位：分钟，默认为5分钟
			totTimeSpacing: 3,								//总时间跨度，单位：天，默认为3天
			isBackward: false,
			rendTo : null
	};
	
	function TimLiner(ele, settings){
		var options = {
				baseTime: null,								//基准时间
				baseFmt: 'yyyy-MM-dd hh:mm',				//基准时间格式
				timeSpacing: 5,								//间隔，单位：分钟，默认为5分钟
				totTimeSpacing: 3,							//总时间跨度，单位：天，默认为3天
				isBackward: false,
				timeScaleData: null,
				scaleEleData: null,
				rendTo : ele,
				curScale: null,
				modp: false,									//是否为数值模式
				picBtn: true									//是否支持产品缩略图
		};
		
		this.configs = $.extend(defaults, options, settings);
		this.configs.rendTo = $(ele).data('api', this);
		
		if(!this.configs.rendTo){
			return;
		}
		if(!this.configs.baseTime){
			var tm = nDTUtil.getCurTimeByFmt(this.configs.baseFmt);
			this.configs.baseTime = nDTUtil.getLastTimeByRide(tm, this.configs.timeSpacing);
		} 
		this.instance();
	}
	var QvTab = null;
	TimLiner.prototype = {
			tab : null,
			ScaleObj: null,
			instance: function(isReInstance, isTabCall, reset){
				if(this.configs.modp){		//重置起报时间 转成标准格式baseFmt
					var timeSpacing = this.configs.timeSpacing;
					this.configs.baseTime = nDTUtil.getDateStrBySkipMinute(this.configs.baseTime, 0, this.configs.baseFmt);
				}
				var scaleTime = this.getTime();
				if(!isTabCall){
					this.genTimeArr();
					this.genScaleObj();
				}
				this.genPluginElement(isReInstance, scaleTime, reset);
			},
			//生成时间刻度数据
			genTimeArr: function(){
				var tmpTimeArr = [], 
					len = Math.ceil((this.configs.totTimeSpacing * 24 * 60 + 1) / this.configs.timeSpacing),
					timeSpacing = this.configs.isBackward ? this.configs.timeSpacing : -this.configs.timeSpacing;
				var baseTime = this.configs.baseTime;
				if(this.configs.newBaseTime){
					baseTime = this.configs.newBaseTime;
				}
				for(var i=0; i < len; i++ ){
					tmpTimeArr[i] = nDTUtil.getDateStrBySkipMinute(baseTime, timeSpacing*i, this.configs.baseFmt);
				}
				var timeArr = this.configs.isBackward ? tmpTimeArr : tmpTimeArr.reverse();
				if(this.configs.modp && this.configs.isRain){	//数值预报 去掉 00 起报时效
					timeArr = timeArr.slice(0, 0).concat(timeArr.slice(1, this.length));
				}
				this.configs.timeScaleData = timeArr;
			},
			//生成时间刻度对象，包含：索引，显示文字，提示文字，其中对象有isSplit属性区分是否是间隔
			genScaleObj : function(){
				var timeScaleArr = this.configs.timeScaleData,
					span = this.configs.timeSpacing,
					modp = this.configs.modp;

				if(!timeScaleArr || timeScaleArr.legth < 1){
					return;
				}
				var eleData = [];
				var lastStrDate = null, curStrDate = null;
				$.each(timeScaleArr, function(i, scale){
					curStrDate = scale;
					var scObj = {
							isEqual: true,
							text: null,
							title: null,
							val: null
					};
					if(Math.abs(span) < 60){
						if(i>0 && !nDTUtil.isEqualForHour(curStrDate, lastStrDate) && !modp){
							var split = {
									isSplit: true,
									scText : !nDTUtil.isEqualForDate(curStrDate, lastStrDate) ? nDTUtil.getDates(scale) : nDTUtil.getHour(scale) + "H",
									scTitle: scale,
									scVal: scale
							};
							eleData.push(split);
						}
						lastStrDate = curStrDate;
						var ele = {
								index : i + 1,
								scText : nDTUtil.getMin(scale),
								scTitle: scale,
								scVal: scale
						};
						eleData.push(ele);
					} else {
						if(i>0 && !nDTUtil.isEqualForDate(curStrDate, lastStrDate) && !modp){
							var split = {
									isSplit: true,
									scText : !nDTUtil.isEqualForMon(curStrDate, lastStrDate) ? nDTUtil.getDates(scale) : nDTUtil.getDay(scale) + "D",
									scTitle: scale,
									scVal: scale
							};
							eleData.push(split);
						}
						lastStrDate = curStrDate;
						
						var scText;
						if(modp){
							scText = nDTUtil.getDay(scale) + nDTUtil.getHour(scale);
						} else {
							scText = nDTUtil.getHour(scale);
						}
						
						var ele = {
								index : i + 1,
								scText : scText,
								scTitle: scale,
								scVal: scale
						};
						eleData.push(ele);
					}
					
				});
				this.configs.scaleEleData = eleData;
			},
			//生成组件HTML要素节点
			genPluginElement: function(isReInstance, scaleTime, reset){
				var scaleEleData = this.configs.scaleEleData, 
					_this = this;
				var $rendTo = $(this.configs.rendTo);
				if(!scaleEleData || scaleEleData.legth < 1){
					return;
				}
				
				var $PluginRoot = $('<section>').addClass('n-timeline'),
					$nodeScroll= $('<section>').addClass('node-scroll'),
					$nodeConetxt= isReInstance? $($rendTo.find('section.node-context')) : $('<section>').addClass('node-context');

				$nodeConetxt.empty().html('');
				var cww = 5;
				var defaultTime;
				
				if(_this.configs.modp) {	//数值模式 需要跳过当前时间00
					//未重置情况下，默认选中上次选中的时效；重置或上次中时效不存在时，则选中第一个
					var timeScaleArr = _this.configs.timeScaleData;
					var index = $.inArray(scaleTime+"", timeScaleArr);
					if(!reset && index >= 0){
						defaultTime = scaleTime;
					} else if(_this.configs.selectedTime != null) {		//模式切换时 添加默认选中时间
						defaultTime = _this.configs.selectedTime;
						_this.configs.selectedTime = null;
					} else {
						var baseTime = _this.configs.baseTime;
						if(_this.configs.newBaseTime){
							baseTime = _this.configs.newBaseTime;
						}
						if(_this.configs.isRain){
							defaultTime= nDTUtil.getDateStrBySkipMinute(baseTime, _this.configs.timeSpacing, _this.configs.baseFmt);
						}else{
							defaultTime = baseTime;
						}
					}
				} else {
					defaultTime = _this.configs.baseTime;
				}
				$.each(scaleEleData, function(i, ele){
					if(!ele.isSplit){
						var node_modp = '';
						
						if(_this.configs.modp){
							cww += 42;
							node_modp = 'node_modp';
						} else {
							cww += 32;
						}
						
						var selected = ele.scVal == defaultTime ?  "actived" : '';
					
						if(ele.scVal == defaultTime ){
							$PluginRoot.attr({
								'data-value': ele.scVal,
								'data-step': ele.index*1
							});
							_this.configs.curScale = {
									value:  ele.scVal,
									step: ele.index*1
							};
							_this.ScaleObj = _this.configs.curScale;
						}
						var node = $('<i>').addClass('node '+ node_modp + ' ' + selected).attr({
							id : 'node_' + ele.index,
							title : ele.scTitle,
							'data-val': ele.scVal,
							'data-contextWd': cww
						}).data({
							val: ele.scVal,
							contextWd: cww
						}).html(ele.scText + "");
						$nodeConetxt.append(node);
					} else {
						var spl =  $('<i>').addClass('node-split-line'),
							spt =  $('<i>').addClass('node-split-text').html(ele.scText);
						$nodeConetxt.append($('<i>').addClass('node-split').append(spl).append(spt).attr({title: ele.scText}));
						cww += 5;
					}
				});
				$nodeConetxt.width(cww);
				
				var $PluginBtns = null;
				if(!isReInstance){
					$PluginBtns= $('<section>').addClass('node-btns');
					var	$btnL = $('<i>').addClass('node-btn node-btn-forward'),
						$btnR = $('<i>').addClass('node-btn node-btn-backward'),
						$btnPic;
					if(_this.configs.picBtn)
						$btnPic = $('<i>').addClass('node-btn node-btn-pic')
					else 
						$btnPic = $('<i>').addClass('node-btn node-btn-pic-disabled');
					$PluginBtns.append($btnL).append($btnR).append($btnPic);
				}	
				var $PluginQvContext = $('<section>').addClass('node-qvs');
				if(_this.configs.modp)
					$PluginQvContext.addClass('node-qvs-modp');
				
				if(!_this.configs.qvAreaCode){
					_this.configs.qvAreaCode = 'hebei';
				}
				if(!_this.configs.busisKey){
					_this.configs.busisKey = 'autostaion';
				}
				if(!QvTab){
					QvTab = $PluginQvContext.nTab({
						areaCode : _this.configs.qvAreaCode,
						busisKey: _this.configs.busisKey,
						modp: _this.configs.modp
					});
				}
				window.setTimeout(function(){
					if(!isReInstance){
						$nodeScroll.append($nodeConetxt);
						$rendTo.empty().append($PluginRoot.append($PluginQvContext).append($nodeScroll).append($PluginBtns));
					} 
					if(isReInstance && $('ul.n-tab-header li:eq(0)').data('index') > 0){
						QvTab.nTab('updateItem', null, _this.configs.baseTime, reset);
					}
				
					_this.setCurScroll(null);
					_this.register();
					
				}, 100);
			},
			//设置轴滚动
			setCurScroll: function(step){
				var _this = this, 
					$Sroll = $('section.node-scroll'), 
					$NodeContext = $('section.node-context');
				var scrollWidth = $Sroll.width(),
					nodeConetxtWidth = $NodeContext.width(),
					stepWidth = 32;
				if(this.configs.modp)
					stepWidth = 42;
				
				if(!_this.configs.modp) {
					var offset = 0;
					offset = nodeConetxtWidth - scrollWidth ;
					$Sroll.scrollLeft(offset);
				}
				
	        },
	        scrollLine: function(isForward, $obj){
	        	var $Sroll = $('section.node-scroll'), 
					stepWidth = 32,
					scrollLeft = $Sroll.scrollLeft() + stepWidth*2,
					scrollWidth = $Sroll.width();
	        	if(this.configs.modp)
	        		stepWidth = 42;
	        	
	        	var contextwd = $obj.data("contextwd");
	        	if(isForward){
	        		if(contextwd <= scrollLeft){
		        		$Sroll.scrollLeft(scrollLeft - scrollWidth);
		        	} 
	        	} else {
	        		if(contextwd - scrollWidth >= scrollLeft - stepWidth*2){
	        			$Sroll.scrollLeft(scrollLeft + scrollWidth - stepWidth*3);
	        		}
	        	}
	        },
	        //事件注册
	        register: function(){
	        	var _this = this,
	        		$PluginRoot = $('section.n-timeline'),
	        		$Sroll = $('section.nodecontext-scroll'), 
	        		$NodeContext = $('section.nodecontext');
	        	function _unBind(){
	        		if(document.all){
	        			document.onselectstart = function(){return false;};
	        		}else{
	        			document.onmousedown = function(){return false;};
	        			document.onmiuseup = function(){return true;};
	        		}
	        	}
	        	//键盘联动
				$(top.document).off('keydown').on('keydown',function(event){
					if(!$("#modal_showKstWin").is(":visible")){
						var e = event || window.event || arguments.callee.caller.arguments[0];
//						e.stopPropagation();
						if(e && (e.keyCode==37)){//左、上
							$PluginRoot.find("i.node-btn-forward").click();
						}
						if(e && (e.keyCode==39)){//右、下
							$PluginRoot.find("i.node-btn-backward").click();
						}
//						 e.preventDefault && e.preventDefault();
//						 e.returnValue = false;
//						 e.stopPropagation && e.stopPropagation();
//						 return false;
					}
				});
	        	$PluginRoot.undelegate('click').delegate('i.node', 'click', function(e, etype){
	        		e.stopPropagation();
	        		_unBind();
	        		$(this).addClass('actived').siblings().removeClass('actived');
	        		var obj = {
	        				value: $(this).data('val'),
	        				step: $(this).attr('id').substr(5, ($(this).attr('id').length - 4))*1
	        		};
	        		$PluginRoot.attr({
						'data-value': obj.value,
						'data-step': obj.step
					}).data({
						value:  obj.value,
						step: obj.step
					});
	        		_this.configs.curScale = obj;
	        		_this.ScaleObj = obj;
	        		_this.clickCallFn(etype);
	        		if(_this.configs.modp && _this.configs.picBtn){
		        		QvTab.nTab('updateSelected', obj.value);
		        	}
	        	}).delegate('i.node-btn-forward', 'click', function(e){
	        		e.stopPropagation();
	        		_unBind();
	        		var curSt = _this.configs.curScale ;
	        		if(curSt.step*1 !== 1){
		        		var $node = $('#node_' + (curSt.step - 1));
		        		_this.scrollLine(true, $node);
		        		$node.addClass('actived').siblings().removeClass('actived');
		        		var obj = {
		        				value: $node.data('val'),
		        				step: $node.attr('id').substr(5, ($node.attr('id').length - 4))
		        		};
		        		 _this.configs.curScale = obj;
		        		 $PluginRoot.attr({
								'data-value': obj.value,
								'data-step': obj.step
							}).data({
								value:  obj.value,
								step: obj.step
							});
		        		 _this.ScaleObj = obj;
		        		 _this.clickCallFn();
		        		 if(_this.configs.modp && _this.configs.picBtn){
				        	QvTab.nTab('updateSelected', obj.value);
				        }
	        		}
	        	}).delegate('i.node-btn-backward', 'click', function(e){
	        		e.stopPropagation();
	        		_unBind();
	        		var curSt = _this.configs.curScale ;
	        		if(curSt.step*1 !== _this.configs.scaleEleData[_this.configs.scaleEleData.length - 1].index*1 ){
		        		var $node = $('#node_' + (curSt.step*1 + 1));
		        		_this.scrollLine(false, $node);
		        		$node.addClass('actived').siblings().removeClass('actived');
		        		var obj = {
		        				value: $node.data('val'),
		        				step: $node.attr('id').substr(5, ($node.attr('id').length - 4))
		        		};
		        		 _this.configs.curScale = obj;
		        		 $PluginRoot.attr({
								'data-value': obj.value,
								'data-step': obj.step
							}).data({
								value:  obj.value,
								step: obj.step
							});
		        		 _this.ScaleObj = obj;
		        		 _this.clickCallFn(false);
		        		 if(_this.configs.modp && _this.configs.picBtn){
				        	QvTab.nTab('updateSelected', obj.value);
				        }
	        		}
	        	}).delegate('i.node-btn-pic', 'click', function(e){
	        		e.stopPropagation();
	        		_unBind();
	        		
	        		var $QV = $("section.node-qvs");
	        		$QV.toggleClass('node-qvs-actived');
	        		if($QV.hasClass('node-qvs-actived')){
	        			 _this.clickCallFn(false, true);
						QvTab.nTab('showTab');
	        		} else {
	        			QvTab.nTab('hideTab');
	        		}
	        	});
	        },
	        clickCallFn: function(etype, openTab){
	        	var _this = this;
	        	if(!_this.configs.picBtn){
        			_this.clickCall(_this.configs.clickCall);
	        	} else if($('ul.n-tab-header li:eq(0)').data('index') > 0){
	    			 var curtab =  QvTab.nTab.API('getCurTab');
	    			 if(curtab){
	    				 curtab.isClick = etype ? false :  true;
	    				 curtab.openTab = openTab;
		        		 _this.clickCall(_this.configs.clickCall, curtab); 
	    			 }
	    		 } else {
	    			 _this.clickCall(_this.configs.clickCall);
	    		 }
	        },
	        callQvTab: function(obj){
	        	if(!QvTab){
	        		return;
	        	}
	        	if(!obj){
	        		return;
	        	}
	        	QvTab.nTab(obj.fn, obj.param);
	        },
	        timeCall: function(fn){
	        	var _this = this;
	        	if(!_this.ScaleObj){
	        		_this.ScaleObj = _this.configs.curScale;
	        	}
	        	_this.ScaleObj.step = _this.ScaleObj.step*1;
	        	if(fn !== undefined && fn instanceof Function){
	        		fn(_this.ScaleObj);
	        	}
	        },
	        clickCall: function(fn, obj){
	        	var _this = this;
	        	if(!_this.ScaleObj){
	        		_this.ScaleObj = _this.configs.curScale;
	        	}
	        	_this.ScaleObj.step = _this.ScaleObj.step*1;
	        	if(fn !== undefined && fn instanceof Function){
	        		fn(_this.ScaleObj, obj);
	        	}
	        },
	        getTime: function(){
	        	var _this = this;
	        	if(!_this.ScaleObj){
	        		_this.ScaleObj = _this.configs.curScale;
	        	}
	        	var scaleObj = _this.ScaleObj;
	        	var recTime = '';
	        	if(scaleObj)
	        		recTime = scaleObj.value;
	        	return recTime;
	        },
	        getStep: function(){
	        	var _this = this;
	        	if(!_this.ScaleObj){
	        		_this.ScaleObj = _this.configs.curScale;
	        	}
	        	var scaleObj = _this.ScaleObj;
	        	var step;
	        	if(this.configs.modp){
	        		step = scaleObj.step * (this.configs.timeSpacing / 60);
	        	} else {
	        		step = scaleObj.step;
	        	}
	        	return step;
	        },
	        /**
	         * 
	         * @param dates 置换时间条的选中时间
	         * @param obj 置换时间条的查询条件
	         * @param queryParams  置换缩略图查询条件
	         */
	        reInstance: function(dates, obj, queryParams){
	        	if(!dates){
	        		return;
	        	}
	        	var _this = this,
	        		reset = false;
    	
	        	if(obj){
	        		var curBaseTime = _this.configs.baseTime,
	        		curTimeSpacing = _this.configs.timeSpacing;
	        		
	        		if(curBaseTime != obj.queryTime ||
	        				curTimeSpacing != obj.timeSpacing){
		        		reset = true;
		        	}
	        		
	        		_this.configs.timeSpacing = obj.timeSpacing;
	        		_this.configs.totTimeSpacing = obj.totTimeSpacing;
	        		if(null != obj.isRain){
		        		_this.configs.isRain = obj.isRain;
		        	}
	        	}
	        	if(obj&&obj.newBaseTime){
	        		_this.configs.newBaseTime = obj.newBaseTime;
	        	}
        		_this.configs.baseTime = dates;
	        	
	        	if(queryParams) {
	        		QvTab.nTab('updateParams', queryParams);
	        	}
	        	_this.instance(true, false, reset);
	        },
	        selectScale: function(timeKey){
	        	if(!timeKey){
	        		return;
	        	}
	        	var _this = this,
	        		timeScaleArr = _this.configs.timeScaleData,
	        		index = $.inArray(timeKey+"", timeScaleArr),
	        		isForward = false;
	        	
	        	if(index >= 0){
	        		var $ct = $(_this.configs.rendTo).find('i#' + 'node_' + (index+1));
	        		var $sdt = $ct.siblings('.actived');
	        		if($ct.length > 0){
	        			$ct.addClass('actived').siblings().removeClass('actived');
	        			$ct.trigger('click', true);
	        		}
	        		
		        	if($sdt.data("contextwd") < $ct.data("contextwd")){
		        		isForward = false;
		        	} else {
		        		isForward = true;
		        	}
		        	_this.scrollLine(isForward, $ct);
	        	} else {
        			_this.configs.baseTime = timeKey;
		        	_this.instance(true);
	        	}
	        }
	};
	
	var PLUGIN_NAME = 'nTimeLine';
	var PLUGIN_API = {
			timeCall: TimLiner.prototype.timeCall,
			callQvTab: TimLiner.prototype.callQvTab,
			reInstance: TimLiner.prototype.reInstance,
			selectScale: TimLiner.prototype.selectScale
	};
	var plugin = null;
	$.fn[PLUGIN_NAME] = function(key){
		
		var args = arguments;
	
		return this.each(function(){
			var $this = $(this);
			plugin =  $this.data(PLUGIN_NAME);
			if(!plugin){
				plugin = new TimLiner(this, key);
				$this.data(PLUGIN_NAME, plugin);
			}
			if(args[1] && args[1].param && args[1].param.queryParams && args[1].param.queryParams.eleType){
				var grpId = args[1].param.queryParams.eleType;
				// 卫星功能特殊处理 yty 2016-12-22
				if(grpId == "FY2" || grpId == "KH"){
					$('#nDateline .n-tab-header,#nDateline .n-tab-content').empty();
				}
			}
			try {
				if (PLUGIN_API[key]) {
					plugin[key].apply(plugin, Array.prototype.slice.call(args, 1));
				}
			} catch (e) {
				alert(e.message);
			}
		});
	};
	
	$.fn[PLUGIN_NAME].API = function(key, obj){
		if(!plugin){
			return;
		}
		var api = {
			getTime: function(){
				return plugin.getTime();
			},
			getStep: function(){
				return plugin.getStep();
			},
			selectScale: function(){
				plugin.selectScale(obj);
			}
		};
		if(api[key]){
			return api[key]();
		}
		return api;
	};
	
	$.extend({
		nTimer: function(key, obj){
			
			if(!plugin){
				return;
			}
			
			var api = {
				getTime : function() {
					return plugin.getTime();
				},
				getStep : function() {
					return plugin.getStep();
				},
				selectScale: function(){
					plugin.selectScale(obj);
				}
			};
			if (api[key]) {
				return api[key]();
			}
			return api;
		}
	});
	
})(window.jQuery, window, document);