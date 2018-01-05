/**
 * LegentPicker.js
 * @Author:	JIAOY
 * @CreateDate：2016年6月17日 下午18:17:51
 * @Version 1.1
 * Copyright (C) 2016 NRIET
 * 
 * TODO  图例工具组件
 */

;(function($, window, document, body, undefined){
	function LegentPicker(ele, settings){
		// 初始化参数
		var opt = {
			title : '图例',// 图例标题
			w_legend : 27,//图例色块的宽度
			h_legend : 27,//图例色块的高度
			nh_legend : 27,//数值块的高度
			top : 70,//图例容器的相对高度
			seq : 'increase',// 默认垂直顺序为递增，递增为increase，递减为decrease
			dir : 'right',// 数字居右为right，数字居左为left
			intData: null,//卫星图例的数值数组，不为空则只显示数值，不显示滑竿
			numData : null,//图例的数值数组，为空则滑竿不显示
			imageData : null,//图例的颜色数组
			option : null,// 初始化为init,隐藏为hide,显示为show,清除为clear
			minTop : null,//滑竿的高度下限，默认为最小高度
			maxTop : null,//滑竿的高度上限，默认为最大高度
			min: null,//图例范围的下限值，默认为图例数值的最小值
			max: null,//图例范围的上限值，默认为图例数值的最大值
			warpId : null,//所放容器的ID
			totalHigh : 600,//图例的总高度，默认为600
			productId : null,//产品ID
			unit:null,
			rendTo : ele,
			isDZLD : false//是否是单站雷达
		};
		
		this.configs = $.extend(opt, settings);
		
		this.configs.rendTo = $(ele).data('api', this);
		
		if(!this.configs.rendTo){
			return;
		}
		
		this.instance();
	}

	LegentPicker.prototype = {
		instance: function(){
			this.legendInit();
		},
		updatePicker: function(settings) {
			//仅更新时间 或 未初始化
			if(this.configs.productId != settings.productId || $(this.configs.rendTo).children().length == 0){
				var tempConfigs = $.extend(this.configs, settings);
				
				this.configs = tempConfigs;
				this.instance();
			} 
		},
		// 初始化
		legendInit: function() {
			var opt = this.configs;
			this.initOptValue();
			
			var $rendTo = $(this.configs.rendTo);
			
			var modalDiv = $("<div class='panel-east-bg'></div>");
			
			var html = '<div class="lengent_div"><div id="lengent-reset"></div></div><div class="lengent_div">'
						+ '<div id="slider-range" style="position: absolute; border-left: 1px solid white;  z-index: 20000; width: 0px;"></div>'+ '</div>'
						+ '<div class="lengent_div">' + this.getLegendColor(opt) + '</div>'
						+ '<div class="lengent_div">' + this.getLegendNum(opt) + '</div>'
						+ '<div class="lengent_div"><div id="lengent_unit_div">单位' + opt.unit+'</div></div>';
			modalDiv.html(html);
			
			$rendTo.empty().append(modalDiv);
			
			//$("#"+opt.warpId+"").append(modalDiv);
			this.setLayout(opt);
			if(opt.numData.length==0){
				$("#slider-range").hide();
				$("#lengent-reset").hide();
			}
			if(opt.imageData.length==0){
				$("#slider-range").hide();
				$("#lengent_unit_div").hide();
			}
			this.legendSlider(opt);
			
			// ******
			// 设置新版滑动轴相关式样 TODO
			// ******
			$(".ui-slider-handle.ui-state-default.ui-corner-all").css({
				'width' : 17,
		    	'height' : 11,
		    	'left' : -10,
		    	'background': 'rgb(238, 244, 253)', // 背景色
		    	'border' : '1px solid #ccc', // 边框线
		    	'border-radius' : 2, // 圆角
		    	'box-shadow' : 'rgba(153, 153, 153, 0.71) 0px 0px 1px 0px',// 阴影
		    	'outline': 'none', // 去除全有选中效果
			});
			var that = this;
			$("#lengent-reset").unbind().bind("click",function(){
				var left = $("#slider-range").css("left");
				that.clear();
				that.instance();
				$("#slider-range").css("left",left);
	        	GIS.GridEdit.changeRange(null == that.configs.gisId ? "nGis" : that.configs.gisId, null == that.configs.rasterId ? that.configs.productId : that.configs.rasterId);
			});
		},
		// 生成图例颜色
		getLegendColor: function (opt) {
			var colorhtml =  "<div id='lengent_color_div'>";
			var colArray = opt.imageData;
			var borSty = (opt.numData.length==0)?"":"border: 1px solid rgba(0, 0, 0, 0.26);";
			if(!G_CONTEXT.isUndefined(opt.imageData)){
				switch (opt.seq) {
				case "decrease":// 递减
					for (var i = 0, len = colArray.length / 4; i < len; i++) {
						colorhtml += '<div class="legend_block"  style="'+borSty+'background-color: rgba('
								+ colArray[4 * i]+ ','+ colArray[4 * i + 1]+ ','+ colArray[4 * i + 2]+ ','+ colArray[4 * i + 3]+ ')";>' + '</div>';
					}
					break;
				case "increase":// 递增
					for (var i = colArray.length / 4; i >= 1; i--) {
						colorhtml += '<div class="legend_block"  style="'+borSty+'background-color: rgba('
								+ colArray[4 * i - 4]+ ','+ colArray[4 * i - 3]+ ','+ colArray[4 * i - 2]+ ','+ colArray[4 * i - 1]+ ')";>' + '</div>';
					}
					break;
				default:
					break;
				}
			}
			
			return (colorhtml+"</div>");
		},
		// 生成图例数字
		getLegendNum: function (opt) {
			var numhtml =  "<div id='lengent_num_div'>";
			var numArray = opt.numData;
			if(opt.numData==null ||opt.numData==undefined||opt.numData.length==0){
				numArray = opt.intData;
			}
			if(!G_CONTEXT.isUndefined(numArray)&&!G_CONTEXT.isUndefined(opt.imageData)&&!opt.imageData.length==0){
				switch (opt.seq) {
				case "decrease":// 递减
					for (var j = 0, len = numArray.length; j < len; j++) {
						numhtml += '<div class="legend_block">'+ (numArray[j] == undefined ? '' : numArray[j])+ '</div>';
					}
					break;
				case "increase":// 递增
					for (var j = numArray.length ; j >= 0; j--) {
						numhtml += '<div class="legend_block">'+ (numArray[j] == undefined ? '' : numArray[j])+ '</div>';
					}
					break;
				default:
					break;
				}
			}
			return (numhtml+"</div>");
		},
		initOptValue: function (){
			var opt = this.configs;
			
			opt.numData=LegendsColor[opt.productId].levels==undefined?"":LegendsColor[opt.productId].levels;
			opt.imageData=LegendsColor[opt.productId].imageData==undefined?"":LegendsColor[opt.productId].imageData;
			opt.unit=LegendsColor[opt.productId].unit;
			opt.intData=LegendsColor[opt.productId].levelInter==undefined?"":LegendsColor[opt.productId].levelInter;
			
			if(!G_CONTEXT.isUndefined(opt.imageData)){
				opt.h_legend = opt.totalHigh / (Math.round(opt.imageData.length/4));
			}
			if(!G_CONTEXT.isUndefined(opt.numData)){
				opt.nh_legend = opt.totalHigh / (opt.numData.length+1);
			}
			if(!G_CONTEXT.isUndefined(opt.intData)){
				opt.nh_legend = opt.totalHigh / (opt.intData.length);
			}
		},
		// 设置样式
		setLayout: function (opt) {
			$("#lengent_color_div .legend_block").css({
				'width' : opt.w_legend,
				'height' : opt.h_legend
			});
			$("#lengent_num_div .legend_block").css({
				'width' : opt.w_legend,
				'height' : opt.nh_legend
			});
			$("#panel_legent").css({
				'top' : opt.top
			});
			$(".legentScale-slider .slider").css({
				'width' : opt.w_legend
			});
			$("#slider-range").css({
				'height' : opt.totalHigh
			});
			$("#lengent_unit_div").css({
	//			'right': -52,
				'left': -1,
				'top': opt.totalHigh + 10,
				'width': opt.w_legend*3
			});
	//		if(opt.productId=="CH5"){
	//			$("#lengent_unit_div").css({
	//				'color': '#ffffff'				
	//			});
	//			$(".legend_block").css({
	//				'color': '#ffffff'				
	//			});
	//		}
			switch (opt.dir) {
			case "left":// 居左
				$("#lengent_num_div").css({
					'right' : 1,
					'margin-right' :5
				});
				$(".legend_block").css({
					'text-align' : 'right'
				});
				$("#slider-range").css({
					'left' : opt.w_legend,
					'margin-left' :5
				});
				break;
			case "right":// 居右
				$("#lengent_num_div").css({
					'left' : opt.w_legend,
					'margin-left' :5
				});
				$(".legend_block").css({
					'text-align' : 'left'
				});
				$("#slider-range").css({
					'right' : 1,
					'margin-right' :-17 // 修改原有式样-偏移 TODO
				});
				break;
			default:
				break;
			}
			switch (opt.seq) {
			case "decrease":// 递减
				opt.maxTop = opt.totalHigh;//(opt.numData==undefined||opt.numData==null)?"":opt.totalHigh - (opt.numData.indexOf(opt.min) + 1)* opt.h_legend;
				opt.minTop = 0;//(opt.numData==undefined||opt.numData==null)?"":opt.totalHigh - (opt.numData.indexOf(opt.max) + 1)* opt.h_legend;
				$("#lengent_num_div").css({
					'top' : opt.h_legend-5
				});
				break;
			case "increase":// 递增
				opt.maxTop = opt.totalHigh;//(opt.numData==undefined||opt.numData==null)?"":(opt.numData.indexOf(opt.max) + 1) * opt.h_legend;
				opt.minTop = 0;//(opt.numData==undefined||opt.numData==null)?"":(opt.numData.indexOf(opt.min) + 1) * opt.h_legend;
				var numTop = G_CONTEXT.isUndefined(opt.numData)?-19:-10;
				$("#lengent_num_div").css({
					'top' : numTop
				});
				break;
			default:
				break;
			}
			
		},
		// 图例滑动事件
		legendSlider: function (opt) {
			var configs = this.configs;
			$("#slider-range").legendslider({
				orientation : "vertical",
				range : true,
				max : opt.totalHigh,
				min : 0,
				step : opt.h_legend,
				values : [opt.minTop, opt.maxTop],//默认设置在滑竿的底部和顶部
				slide : function(event, ui) {
						opt.minTop = opt.seq == "increase" ? opt.numData[Math.round(ui.values[0]/ opt.h_legend) - 1]: opt.numData[opt.numData.length- Math.round(ui.values[1] / opt.h_legend)];
						opt.maxTop = opt.seq == "increase" ? opt.numData[Math.round(ui.values[1]/ opt.h_legend) - 1]: opt.numData[opt.numData.length- Math.round(ui.values[0] / opt.h_legend)];
						configs.min = opt.minTop == undefined ? null: opt.minTop;
						configs.max = opt.maxTop == undefined ? null: opt.maxTop;
						if(configs.isDZLD){
							configs.min = $.inArray(configs.min,opt.numData);
							configs.min = -1 == configs.min ? null : (configs.min+1);
							configs.max = $.inArray(configs.max,opt.numData);
							configs.max = -1 == configs.max ? null : (configs.max+1);
						}
	//				console.log(opt.numData);
	//				console.log(ui.values[1]+"-"+ui.values[0]+"-"+opt.h_legend+"修约"+ Math.round(ui.values[1] / opt.h_legend)+opt.productId+"范围"+min+"到"+max);
						GIS.GridEdit.changeRange(null == opt.gisId ? "nGis" : opt.gisId, null == opt.rasterId ? opt.productId : opt.rasterId, configs.min, configs.max);								
					}
				});
		},
		getRangeValue: function (){
			var opt = this.configs;
			
			var ranges = {max: opt.max, min: opt.min};
			return ranges;
		},
		clear: function(){
			var $rendTo = $(this.configs.rendTo);
			$rendTo.children().remove();
			$rendTo.show();
			this.configs.min = null;
			this.configs.max = null;
        },
        hide: function(){
			var $rendTo = $(this.configs.rendTo);
			$rendTo.hide();
        },
        show: function(){
			var $rendTo = $(this.configs.rendTo);
			$rendTo.show();
        },
	}
	
	var PLUGIN_NAME = 'nLegentPicker';
	var PLUGIN_API = {
			hide: LegentPicker.prototype.hide,
			show: LegentPicker.prototype.show,
			clear: LegentPicker.prototype.clear
	};
	var plugin = null;
	$.fn[PLUGIN_NAME] = function(key){
		
		var args = arguments;
		
		return this.each(function(){
			var $this = $(this);
			plugin =  $this.data(PLUGIN_NAME);
			
			if(!PLUGIN_API[key]) {
				if(!plugin){
					plugin = new LegentPicker(this, key);
					$this.data(PLUGIN_NAME, plugin);
				} else {
					plugin.updatePicker(key);
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
			getRange: function(){
				return plugin.getRangeValue(obj);
			}
		};
		if(api[key]){
			return api[key]();
		}
		return api;
	};
})(window.jQuery, window, document);
