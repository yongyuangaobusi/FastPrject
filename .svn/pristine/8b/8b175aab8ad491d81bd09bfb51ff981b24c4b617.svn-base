var SUBJECTIVE_POP = {
	info : {},
	subjective : {
		title : "详细信息",
		contents : [
		    {key : "publishUnit", name : "发布单位", clazz : "", formatter : function(val){
		    	return val;
		    }},
		    {key : "warnLevel", name : "预警等级", clazz : "", formatter : function(warnLevel, warnProId){
		    	var levelObj = {"00" : "红色", "01" : "橙色", "02" : "黄色", "03" : "蓝色"};
		    	var proObj = {"01" : "高温", "02" : "道路结冰", "03" : "霾", "04" : "大雾", "05" : "霜冻", "06" : "冰雹",
		    			"07" : "雷电", "08" : "干旱", "09" : "", "10" : "大风", "11" : "寒潮", "12" : "暴雪", "13" : "暴雨",
		    			"14" : "台风","15" : "沙尘暴"};
		    	return proObj[warnProId] + levelObj[warnLevel] + "预警";
		    }},
		    {key : "warnContent", name : "预警内容", clazz : "subjective-unit-level", formatter : function(val){
		    	return val;
		    }},
		    {key : "warnMeasure", name : "防御指南", clazz : "subjective-unit-level", formatter : function(val){
		    	return val;
		    }},
		    {key : "warnPeriod", name : "预报时效", clazz : "subjective-force-publishp", formatter : function(val){
		    	if(!val || val == ""){
		    		return "--";
		    	}
		    	return val + "小时";
		    }},
		    {key : "makeTime", name : "发布时间", clazz : "subjective-publisht-jfp", formatter : function(val){
		    	if(!val || val == ""){
		    		return "--";
		    	}
		    	return val.substring(0, 16);
		    }},
		    {key : "publisherName", name : "发布人", clazz : "subjective-force-publishp", formatter : function(val){
		    	return val;
		    }},
		    {key : "issuerName", name : "签发人", clazz : "subjective-publisht-jfp", formatter : function(val){
		    	return val;
		    }},
		],
		yjzd_contents : [
		    {key : "publishUnit", name : "发布单位", clazz : "", formatter : function(val){
		    	return val;
		    }},
		    {key : "warnLevel", name : "预警等级", clazz : "", formatter : function(warnLevel, warnProId){
		    	var levelObj = {"00" : "红色", "01" : "橙色", "02" : "黄色", "03" : "蓝色"};
		    	var proObj = {"01" : "高温", "02" : "道路结冰", "03" : "霾", "04" : "大雾", "05" : "霜冻", "06" : "冰雹",
		    			"07" : "雷电", "08" : "干旱", "09" : "", "10" : "大风", "11" : "寒潮", "12" : "暴雪", "13" : "暴雨",
		    			"14" : "台风","15" : "沙尘暴"};
		    	return proObj[warnProId] + levelObj[warnLevel] + "预警";
		    }},
		    {key : "warnContent", name : "预警内容", clazz : "subjective-unit-level", formatter : function(val){
		    	return val;
		    }},
		    {key : "warnPeriod", name : "预报时效", clazz : "subjective-force-publishp", formatter : function(val){
		    	if(!val || val == ""){
		    		return "--";
		    	}
		    	return val + "小时";
		    }},
		    {key : "makeTime", name : "发布时间", clazz : "subjective-publisht-jfp", formatter : function(val){
		    	if(!val || val == ""){
		    		return "--";
		    	}
		    	return val.substring(0, 16);
		    }},
		    {key : "publisherName", name : "发布人", clazz : "subjective-force-publishp", formatter : function(val){
		    	return val;
		    }},
		],
		btns : [
			    {name : "预警变更", clazz : "", callback : function(id,pid){
			    	$.ajax({
						type : 'POST',
						url : G_CONTEXT.contextPath + "warnmake/checkChangeWarnSignal.do",
						data : {'pid':pid,'signalType':'1'},
						async: false,
						success : function(data) {
							if(data.success){
								SUBJECTIVE_POP.toNewPage('bg',id);
							}else{
								var newid = data.objectData.id;	//存在的那条已经变更过来的id
								$.dialogMaster({
									type : "confirm",
									lock: true,
									title:"变更确认",
									id: "tipsConfirm",
									opacity : 0.1,
									zIndex : 999999999,
									contentInfo : '<div class="tips">是否重载上次变更？</div>',
									ok : function(){
										SUBJECTIVE_POP.toNewPage('bg',newid); 
									},
									cancel:function(){
										if($(event.target).text()=="取消"){
											$.ajax({
												type : 'POST',
												url : G_CONTEXT.contextPath + "warnmake/delForecastSign.do",
												async : false,
												data : {'id' : newid},
												success : function(data) {
													if(data.success){
														SUBJECTIVE_POP.toNewPage('bg',id); 
													}
												}
											});
										}
									}
								});
							}
						}
					});
			    }},
			    {name : "预警解除", clazz : "", callback : function(id,pid){
			    	$.ajax({
						type : 'POST',
						url : G_CONTEXT.contextPath + "warnmake/checkChangeWarnSignal.do",
						data : {'pid':pid,'signalType':'2'},
						async: false,
						success : function(data) {
							if(data.success){
								SUBJECTIVE_POP.toNewPage('jc',id);
							}else{
								var newid = data.objectData.id;	//存在的那条已经变更过来的id
								$.dialogMaster({
									type : "confirm",
									lock: true,
									title:"解除确认",
									id: "tipsConfirm",
									opacity : 0.1,
									zIndex : 999999999,
									contentInfo : '<div class="tips">是否重载上次解除？</div>',
									ok : function(){
										SUBJECTIVE_POP.toNewPage('jc',newid); 
									},
									cancel:function(){
										if($(event.target).text()=="取消"){
											$.ajax({
												type : 'POST',
												url : G_CONTEXT.contextPath + "warnmake/delForecastSign.do",
												async : false,
												data : {'id' : newid},
												success : function(data) {
													if(data.success){
														SUBJECTIVE_POP.toNewPage('jc',id); 
													}
												}
											});
										}
									}
								});
							}
						}
					});
			    }},
		],
		yjzd_btns : [
		        {name : "制作预警指导", url : "", callback : function(){
		        	var originSyncData;
		        	if(typeof ZHYJ_MAIN != "undefined"){
		        		originSyncData= $.extend({}, ZHYJ_MAIN.syncData);					
		        	}else{
		        		originSyncData = $.extend({}, WEATHER_MONITOR.syncData);
		        		delete originSyncData.gisInfo;
		        	}
		        	if(originSyncData==null) {
		        		return;
		        	}				
		        	delete originSyncData.warnMeasure;
		        	var syncDataTrans=JSON.stringify(originSyncData);
		        	var data = {
						url : "zhyj/zhyj_warn_make.do",//跳转路径
						deMenuId : "5",//菜单的id
						flag : "1",//标识
						syncData : syncDataTrans,//需要带过去的数据，json格式字符串
						maketype : 'yjzd'
					};
		        	var url = G_CONTEXT.contextPath+"mainframe/init.do";//重新加载初始化界面
		        	var urlPost = G_CONTEXT.contextPath+"mainframe/getInitParam.do";//ajax请求封装参数
		        	$.ajax({
		        		type:'post',
		        		url:urlPost,
		        		data:data,
		        		dataJson:'json',
		        		async:false,
		        		success:function(data){
		        			window.open(url,'newwindow','');
		        		}
		        	});
		        }},
		        {name : "制作预警信号", url : "", callback : function(){
		        	var originSyncData;
		        	if(typeof ZHYJ_MAIN != "undefined"){
		        		originSyncData= $.extend({}, ZHYJ_MAIN.syncData);					
		        	}else{
		        		originSyncData = $.extend({}, WEATHER_MONITOR.syncData);
		        		delete originSyncData.gisInfo;
		        	}
		        	if(originSyncData==null) {
		        		return;
		        	}				
		        	delete originSyncData.warnMeasure;
		        	var syncDataTrans=JSON.stringify(originSyncData);
		        	var data = {
						url : "zhyj/zhyj_warn_make.do",//跳转路径
						deMenuId : "5",//菜单的id
						flag : "1",//标识
						syncData : syncDataTrans,//需要带过去的数据，json格式字符串
						maketype : 'yjxh'
					};
		        	var url = G_CONTEXT.contextPath+"mainframe/init.do";//重新加载初始化界面
		        	var urlPost = G_CONTEXT.contextPath+"mainframe/getInitParam.do";//ajax请求封装参数
		        	$.ajax({
		        		type:'post',
		        		url:urlPost,
		        		data:data,
		        		dataJson:'json',
		        		async:false,
		        		success:function(data){
		        			window.open(url,'newwindow','');
		        		}
		        	});
		        	
		        }},
		        ],
	},
	radar : {
		title : "详细信息", 
		contents : [
            {key : "warnProId", name : "报警类型", clazz : "", "unit" : "", formatter : function(warnProId){
            	return "TITAN";
            }},       
            {key : "area", name : "影响范围", clazz : "", "unit" : "km^2", formatter : function(val){
			   return SUBJECTIVE_POP.formatNumber(val);
            }},       
            {key : "centHgt", name : "中心高度", clazz : "", "unit" : "km", formatter : function(val){
            	return SUBJECTIVE_POP.formatNumber(val);
            }},       
            {key : "centLon", name : "中心经度", clazz : "", "unit" : "°", formatter : function(val){
            	return SUBJECTIVE_POP.formatNumber(val);
			}},       
            {key : "centLat", name : "中心纬度", clazz : "", "unit" : "°", formatter : function(val){
            	return SUBJECTIVE_POP.formatNumber(val);
			}},       
			{key : "maxRefl", name : "最大反射率", clazz : "", "unit" : "dBZ", formatter : function(val){
				return SUBJECTIVE_POP.formatNumber(val);
			}},       
			{key : "moveDir", name : "移动方向", clazz : "", "unit" : "°", formatter : function(val){
				return SUBJECTIVE_POP.formatNumber(val);
			}},       
			{key : "moveSpeed", name : "移动速度", clazz : "", "unit" : "km/h", formatter : function(val){
				return SUBJECTIVE_POP.formatNumber(val);
			}},       
			{key : "reflCentHgt", name : "回波高度", clazz : "", "unit" : "km", formatter : function(val){
				return SUBJECTIVE_POP.formatNumber(val);
			}},       
			{key : "topHgt", name : "回波顶高", clazz : "", "unit" : "km", formatter : function(val){
				return SUBJECTIVE_POP.formatNumber(val);
			}},       
			{key : "vil", name : "液态水含量", clazz : "", "unit" : "kg/m^2", formatter : function(val){
				return SUBJECTIVE_POP.formatNumber(val);
			}}
	    ],
	},
	init : function(data){
		this.info = data;
		this.bindEvent();
		this.initElementContent(data);
	},
	initElementContent : function(data){
		console.log(data);
		var subjective = this.subjective;
		if(data.warnProId == "S_TITAN"){
			subjective = this.radar;
		}
		var contents = subjective.contents;
		if(data.proType == 2){
			contents = subjective.yjzd_contents;
		}
		var $content = $("#subjectivePopContainer .subjective-pop-content").empty();
		$(".subjective-pop-wrap .subjective-pop-title .title-content").text(subjective.title);
		var $contentWrap = $(".subjective-pop-content-wrap").empty();
		$contentWrap.append($("<input type='hidden' id='warnId'>").val(data.id));
		if(data.WarningTime){
			$contentWrap.append($("<input type='hidden' id='popWarningTime' />").val(data.WarningTime));
		}
		$contentWrap.append($("<input type='hidden' id='popWarnId'>").val(data.id));
		$contentWrap.append($("<input type='hidden' id='popWarnProId'>").val(data.warnProId));
		$contentWrap.append($("<input type='hidden' id='popWarnIId'>").val(data.iid));
		var height = 0;
		var signalHeight = 0;
		$(contents).each(function(i, content){
			var $subjectiveWarn = $("<div class='subjective-warn'>");
			$contentWrap.append($subjectiveWarn);
			$subjectiveWarn.addClass(content.clazz);
			var text = data[content.key];
			if($.isFunction(content.formatter)){
				if(content.key == "warnLevel"){
					text = content.formatter(text, data.warnProId);
				}else{
					text = content.formatter(text);
				}
			}
			$subjectiveWarn.append($("<div class='subjective-warn-name'>").attr("title", content.name).text(content.name + "："));
			if(text){
				text += content.unit || "";
			}
			text = text || "--";
			$subjectiveWarn.append($("<div class='subjective-warn-content'>").text(text));
		});
		$(".subjective-warn").each(function(){
			height += $(this).outerHeight();
			signalHeight = $(this).outerHeight();
		});
		if(data.warnProId == "S_TITAN"){
			var num = subjective.contents.length;
			if(subjective.contents.length % 2 == 1){
				num++;
			}
			$contentWrap.height((num / 2) * signalHeight);
		}else if(data.proType == 2){
			$contentWrap.height(height - 70);
		}else{
			$contentWrap.height(height - 105);
		}
		if(data.proType == 2 || data.proType == 3 || data.proType == "yjxh"){
			if(subjective.yjzd_btns && subjective.yjzd_btns.length > 0){
				var names = data.names;
				var flag = false;
				for(var i in names){
					var eachCode = names[i].code;
					if(eachCode.startsWith(codeId)){
						flag = true;
						break;
					}
				}
				if(!flag){					//过滤不在该用户区域的btn 
					return;
				}
				var $btnArea = $("<div class='subjective-btn-wrap'>");
				$(".subjective-pop-wrap").append($btnArea);
				$(subjective.yjzd_btns).each(function(i, btn){
					if(btn.name == "制作预警指导" && codeId.length != 2){
						return;
					}
					var $btn = $("<a class='btn btn-make btn-sm'></a>");
					$btnArea.append($btn);
					$btn.text(btn.name);
					$btn.unbind("click").bind("click", function(){
						if($.isFunction(btn.callback)){
							btn.callback(data.iid);
						}
					});
				});
			}
		}
		if(data.makeUserAreaCode == codeId && $.isNumeric(data.signalType) && (data.signalType == 0 || data.signalType == 1)){
			if(subjective.btns && subjective.btns.length > 0){
				var $btnArea = $(".subjective-btn-wrap");
				$(subjective.btns).each(function(i, btn){
					var $btn = $("<a class='btn btn-make btn-sm'></a>");
					$btnArea.append($btn);
					$btn.text(btn.name);
					$btn.unbind("click").bind("click", function(){
						if($.isFunction(btn.callback)){
							btn.callback(data.iid,data.pid);
						}
					});
				});
			}
		}
	},
	bindEvent : function(){
		$("#subjectivePopContainer .close-btn").off("click").on("click", function(){
			closeInfoWindow("nGis");
			GIS.Warning.ClearLayerById("nGis","clickSelectedLayer");
		});
		
		$('#subjectivePopContainer').undelegate(".subjective-pop-title").delegate(".subjective-pop-title","mousedown",function(){
			var isMove = true;
			var _this = $(".esriPopup");
			$(this).css({"cursor": "move"});//点击鼠标切换为手势图形
			var m_x = Number(_this.css("left").split("px")[0]);//点击窗体时，left
			var m_y = Number(_this.css("top").split("px")[0]);//点击窗体时，top
			var abs_x = event.pageX;//点击窗体时，左边距
			var abs_y = event.pageY;//点击窗体时，上边距
			//单击住头部可进行拖拽，计算移动大小，以及移动范围限制
			$(document).unbind('mousemove').bind('mousemove',function(event){
				if(isMove) {
					//event.pageX,移动后的左边距;event.pageY,移动后的上边距
					var ebs_x = m_x-(abs_x-event.pageX); //移动后的left
					var ebs_y = m_y+(event.pageY - abs_y);//移动后的top
					var body_w = $("body").width();
					var body_h = $("body").height();
					var div_w = _this.width();
					var div_h = _this.height();
					//不可超出左右边框
					if(ebs_x <= 0) {
						ebs_x = 0;
					} else if (ebs_x > body_w - div_w) {
						ebs_x = body_w - div_w;
					} else {
						
					}
					//不可超出上下边框
					if(ebs_y <= 0) {
						ebs_y = 0;
					} else if (ebs_y > body_h - div_h - 50) {
						ebs_y = body_h - div_h - 50;
					} else {
						
					}
					//重新设定弹出框的左边距，上边距
					_this.css({'left':ebs_x,'top':ebs_y });
				}
			}).mouseup(function(){
				isMove = false
				$(document).unbind('mousemove');
				$(".subjective-pop-title").css({"cursor": "default"});//点击鼠标切换为手势图形
			});//鼠标移除事件；单击事件结束事件。
		});
	},
	formatNumber : function(val){
		if (!val) {
			return val;
		}
		val = val + "";
		var index = val.indexOf(".");
		if (index > -1 && val.length >= (index + 3)) {
			val = val.substring(0, index + 3);
		}
		return val;
	},
	closePop : function(warningTime, warnProId, id, warnType, proType, pid){
		var info = this.info;
		if(warningTime){
			if(warnProId){
				if($("#popWarningTime").val() == warningTime && 
						$("#popWarnProId").val() == warnProId){
					if(id){
						if($("#popWarnId").val() == id){
							closeInfoWindow("nGis");
						}
					}else if(warnType && proType){
						if(info.warnType == warnType && info.proType == proType){
							closeInfoWindow("nGis");
						}
					}else{
						closeInfoWindow("nGis");
					}
					if(pid){
						if($("#popWarnId").val().split("_")[0] == pid){
							closeInfoWindow("nGis");
						}
					}
				}
			}else{
				if($("#popWarningTime").val() == warningTime){
					closeInfoWindow("nGis");
				}
			}
		}
	},
	//变更 解除 跳转
	toNewPage:function(flag,id){
    	var data = {
			url : "zhyj/zhyj_warn_make.do",//跳转路径
			deMenuId : "5",//菜单的id
			flag : flag,//标识
			signalId : id,//标识
		};
		var url = G_CONTEXT.contextPath+"mainframe/init.do";//重新加载初始化界面
		var urlPost = G_CONTEXT.contextPath+"mainframe/getInitParam.do";//ajax请求封装参数
		$.ajax({
			type:'post',
			url:urlPost,
			data:data,
			dataJson:'json',
			async:false,
			success:function(data){
				window.open(url,'newwindow','');
			}
		});
	}
}