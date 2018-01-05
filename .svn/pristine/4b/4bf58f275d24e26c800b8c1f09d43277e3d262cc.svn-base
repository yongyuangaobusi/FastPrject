var G_CONTEXT;

//项目全局对象
if(!G_CONTEXT) {
	G_CONTEXT = {};
} else {
	throw new Error("G_CONTEXT already exists!");
}

/**
 * 基本信息
 */
G_CONTEXT = {
	countdown : 3, //定时秒数
	interval : null,
	contextPath : top.contextPath ,//上下文
	//projectConfig : top.projectConfig.props ,//上下文
	topWindow : window.parent.document,
	pic : {
		transparent : {url : window.contextPath+"hebei/resources/business/zhfx/skjc/kstwin/img/transparent.png"},
		noData : {url : "hebei/resources/business/zhfx/skjc/kstwin/img/noData.png"}
	}
};
/**
 * 获取快视图底图
 * @param areaId 区域ID或站点ID
 * @param height 高度
 * @returns {Array}
 */
G_CONTEXT.getLayers = function(areaId,height){
	var kstLayers = [];
	$.ajax({
		type : "POST",
		url : window.contextPath+"zhfx/kstwin/getLayers.do",
		data : {"id" : areaId},
		async : false,
		success : function(resp){
			for(var i = 0; i < resp.length; i++){
				var img = resp[i];
				if(null != height && "" != height){
					img.src = window.contextPath+img.src.replace("#H",height);
				}else{
					img.src = window.contextPath+img.src;
				}
				kstLayers.push(img);
			}
		}
	});
	return kstLayers;
};
/**
 * 显示快视图窗口
 * type zdz : 自动站；radar：雷达；satellite ：卫星
 * time 时间
 * proId 产品ID
 * options 扩展参数 目前用于：当type为radar时是站点id；当type为satellite时是卫星类型
 * closedFun 关闭窗口回调函数
 * callBack 调用者提供弹窗界面调用的函数
 */
G_CONTEXT.showKstWin = function(type,time,proId,options,closedFun,callBack){
	var title = "";
	var url = "";
	var autostationTypes = ['RAIN', 'TEMP', 'WIND', 'HUMI', 'PRES', 'VISI', 'SNOW', 'ANFI'];
	var radaTypes = ['RADA', 'SWAN'];
	var sateTypes = ['SATE','FY2','KH','KUIHUA'];
	var weatherterrainType=['weatherterrain'];
	var lightType = ['distribute','density'];
	//TODO 测试 后面请调整
	if(type == 'ANFI')
		type = 'WIND';
	
	if(autostationTypes.indexOf(type) != -1){
		title = "自动站";
		url = window.contextPath+"zhfx/kstwin/autostation.do";
	}else if(radaTypes.indexOf(type) != -1){
		title = "雷达";
		url = window.contextPath+"zhfx/kstwin/radar.do";
	}else if(sateTypes.indexOf(type) != -1){
		title = "卫星";
		url = window.contextPath+"zhfx/kstwin/satellite.do";
	}else if(weatherterrainType.indexOf(type) != -1){
		title = "天气形势";
		url = window.contextPath+"zhfx/kstwin/weatherterrain.do";
	}else if(lightType.indexOf(type) != -1){
		title = "闪电";
		url = window.contextPath+"zhfx/kstwin/light.do";
}
	
	url += "?time="+encodeURI(time)+"&productId="+proId+"&options="+options+"&type="+type;
	window.Html2Canvas = null;
	window.NAnimat = null;
	$.modal.show({
		id:"showKstWin",//id
		title:title,//弹出框名称
		m_left:($("body").width()-1161)/2+"px",
		width:1161,
		height:780,
		m_top : 60,//上边距
		url:url,
		backdrop:true,//是否遮罩
		closeTip:true,//是否需要关闭按钮
		closed : function(){
			delete $.modal.sktFun;
			delete $.modal.sktclosedFun;
			if($.isFunction(closedFun)){
				closedFun();
			}
		}
	});
	if($.isFunction(closedFun)){
		delete $.modal.sktclosedFun;
		$.modal.sktclosedFun = closedFun;
	}
	if($.isFunction(callBack)){
		delete $.modal.sktFun;
		$.modal.sktFun = callBack;
	}
};

/**
 * 生成或删除遮罩
 */
G_CONTEXT.backdrop = function(flag) {
	if(flag) {
		if($(".modal-backdrop").length <= 0) {
			$('<div></div>').addClass('modal-backdrop in').appendTo($("body"));
		}
	} else {
		if($("div.modal").length == 1 || $("#alertButton").length == 0) {
			$("div.modal-backdrop.in").remove();
		}
	}
}

/**
 * 弹出框
 */
G_CONTEXT.createModalDiv = function(obj) {}
/**
 * 生成警告框
 */
G_CONTEXT.createAlertDiv = function(wid,content) {
	var id="warining_";
	if(wid) {
		id += wid;
	}
	var modalDiv = $("<div id='"+id+"'></div>").addClass("modal");
	var alertButton = "<div id='alertButton' class='alert alert-warning col-lg-6 col-lg-offset-3'>" +
			"<button type='button' class='close'><span aria-hidden='true'>&times;</span><span class='sr-only'>Close</span></button>" +
			"<strong>"+wid+"</strong>" + content
			"</div>";
	modalDiv.append(alertButton);
	$("body").append(modalDiv);
	modalDiv.show();
	G_CONTEXT.interval = setInterval("settime('"+id+"')",1000);
	$(".close").on("click",function(){
		modalDiv.remove();
		G_CONTEXT.backdrop(false);
		clearInterval(G_CONTEXT.interval);
		G_CONTEXT.countdown = 3;
	});
	
	
	if(top.$.messager){
		//弹出提示 error、info、question、warning
		window.alert = function (msg,type,fu){
			top.$.messager.alert(' ',msg,type,fu);
		};
		// 弹出确认框
		window.confirm = function(msg,okCall,cancelCall){
			msg = msg.replace(/\n/g, '<br/>');
			top.$.messager.confirm(' ',msg,function(flag){
				if(flag){
					if(typeof(okCall) != 'undefined'){
						okCall();
					}
				}else{
					if(typeof(cancelCall) != 'undefined'){
						cancelCall();
					}
				}
			});
		};
	}
}


/**
 * data转json
 */
G_CONTEXT.toJsonObj = function(str){
	var s = $.trim(str) , jsondata = null;
	if(s){
		if(s.substring(0,1)!="{"){
			s = "{" + s + "}";
		}
		jsondata = (new Function("return " + s))();
	}
	return jsondata;
};
/**
 * 判断值是否存在
 * @param val
 */
G_CONTEXT.isUndefined = function(val) {
	var rest = val == undefined || val == 'undefined' ? true : 
				val == null || val == 'null' ? true : 
					val == "" ? true : false;
	return rest;
};

/**
 * 定时器
 * @param id
 */
function settime(id) {
	$("#countdown").remove();
	if(G_CONTEXT.countdown > 0) {
		var span = "<span id='countdown' style='float: right;margin-right: 2%;'>"+G_CONTEXT.countdown+"s</span>";
		$("#alertButton").append(span);
		G_CONTEXT.countdown--;
	} else {
		$('#'+id).remove();
		G_CONTEXT.backdrop(false);
		clearInterval(G_CONTEXT.interval);
		G_CONTEXT.countdown = 3;
	}
}

// tips
$(document).on('mouseover mouseout','[tips]',function(e){
	e = e || windows.event || top.evnet;
	
	if (e.type == "mouseover"){
		var text = $('<div class="tooltip top" role="tooltip">'+
		'<div class="tooltip-arrow"></div>'+
		'<div class="tooltip-inner">'+
		$(this).attr("tips") + 
		'</div>'+
		'</div>');
		
		$("body").append(text);
		
		text.css("position","fixed");
		text.css("top",$(this).offset().top - $(window).scrollTop() - text.height() - 8);
		text.css("left",$(this).offset().left + 10); 
		text.css("z-index","999999999");
	}
	else if (e.type == "mouseout"){
		$(".tooltip").remove();
	}
  
});


//置顶
$(window).on('scroll',function(e){
	if ($(window).scrollTop() > 0){
		if ($(".scrollUp").length == 0){
			var text = $('<div class="scrollUp" style="z-index:9999999"><i class="fa fa-chevron-circle-up" style="font-size:50px;cursor:pointer"></i></div>');
			$("body").append(text);
			
			$(".scrollUp").off("click").on("click",function(){
				//$(window).scrollTop(0);
				$("body").animate({scrollTop:0},'slow');
				
			});
		}
	}
	else {
		$(".scrollUp").remove(); 
	}
});


/**
 * 公共方法,将a标签转为ajax提交  
 * 参数: fs,fe,fc分别为  成功回调函数,失败回调函数,和完成回调函数
 */
jQuery.fn.a2ajax = function(fs,fe,fc){
	$(this).on('click',function(){
		var url = $(this).attr("href");
		var target = $(this).attr("target");
		if (url.match(/^javascript:/g)){
			return true;
		}
		if (url.match(/^#&/g)){
			return true;
		}
		
		$.ajax({
			url:url,
			type:'get',
			success:function(data){
				
				$("#" + target).html(data);
				
				// 载入模板
//				loadModel($("#" + target));
				
				if(fs){
					fs();
				}

			},
			error:function(data){
				if(fe){
					fe();
				}else{
					G_CONTEXT.createAlertDiv("jinggao");
				}
			},
			complete:function(data){
				if (fc){
					fc();
				}
			}
		});
		
		return false; 
	});
};

G_CONTEXT.resize = function() {
	$(window).on("resize",function(){
		//计算gis图高度 
		var headH = $(".main-head").height();
		var gisH = window.innerHeight - headH;
		
		$(".gisContainer").height(gisH);
		
		var left = (window.innerWidth - $("#productAttr").outerWidth())/2;
		
		$("#productAttr").css({left:left,bottom:"0px"});
	});
};

$(window).on("resize",function(){
	//计算gis图高度 
	var headH = $(".main-head").height();
	var gisH = window.innerHeight - headH;
	
	$(".gisContainer").height(gisH);
	
	var left = (window.innerWidth - $("#productAttr").outerWidth())/2;
	
	$("#productAttr").css({left:left,bottom:"0px"});
});


/**
 * 页面加载统一方法
 * 用法 :   $("#divId").loadPage("main.do")
 */
jQuery.fn.loadPage = function(url, callbackFn){
	$(this).load(url,function(){
		loadModel($(this));
		if (callbackFn){
			callbackFn();
		}
	});
};

/**
 * 页面模板加载
 * @param obj  obj为jquery对象
 */
function loadModel(obj){
	var modelDiv = $(obj).find("div[model]");
	var modelName = modelDiv.attr('model');
	
	if (!modelName){
		return;
	}
	
	loadScript("ui/widgets/layout/" + modelName + ".js");
}

/**
 * 动态加载js文件
 * @param url
 * @param callbackFn
 */
function loadScript(url, callbackFn){
	var strs = url.split("/");
	var id = strs[strs.length - 1].split(".")[0];
	
	if ($("#" + id).length > 0){
		$("#" + id).remove();
	}
	url = G_CONTEXT.contextPath + url;
	var script = $("<script id='"+ id +"' type='text/javascript' src='"+url+"'></script>");
	$("body").append(script);
}


/**
 * 一些通用的dom创建方法
 */
$.DomCreator = {
		createPanel:function(params){
			var id = params.id;
			var name = params.name;
			var url = params.url;
			var onclick = params.onclick;
			
			var text = ''
				+'<div id="panel_'+ id +'" class="panel" style="margin-bottom:5px; border-top:1px solid #2A8BD2;" url="'+url+'">'
                +'<div class="panel-heading" style="background:#F3F3F5;color:#2A8BD2;position:relative">'
                +     name
                +	'<div class="ibox-tools" style="position:absolute;top:11px;right:13px;">'
                +    	'<a class="collapse-link">'
                +    		'<i class="fa fa-chevron-up" style="color:#2A8BD2""></i>'
                +        '</a>'
                +    '</div>'
                +'</div>'   
                +'<div class="panel-body">'
                +'</div>'
                +'</div>';
			
			var dom = $(text);
			//debugger;
			dom.find(".panel-heading").on("click",function(){
				alert(1);
				//debugger;
				if (onclick){
					onclick();
				}
				
				if (url){
					$.ajax({
						url:url,
						type:"get",
						success:function(resp){
							$(this).find(".panel-body").html(resp);
						},
						error:function(resp){
							alert("请求失败");
						},
						
					});
					
				}
				
			});
			
			return dom;
		},
};

function resizeMap(){
	if (window.myMap){
		myMap.resize();
	}
	else{
		setTimeout(resizeMap,50);
	}
}


/**
* 获取风向的中英文描述
* @param angle 风向角度
*/
G_CONTEXT.getWindDireObj = function(angle){
	var windDirName = [
	                    {"CH":"北","EN":"N"}, 
	                    {"CH":"北东北","EN":"NNE"}, 
	                    {"CH":"东北","EN":"NE"},  
	                    {"CH":"东东北","EN":"ENE"},
	                    {"CH":"东","EN":"E"}, 
	                    {"CH":"东东南","EN":"ESE"},
	                    {"CH":"东南","EN":"SE"},
	                    {"CH":"南东南","EN":"SSE"}, 
	                    {"CH":"南","EN":"S"},
	                    {"CH":"南西南","EN":"SSW"}, 
	                    {"CH":"西南","EN":"SW"},
	                    {"CH":"西西南","EN":"WSW"}, 
	                    {"CH":"西","EN":"W"}, 
	                    {"CH":"西西北","EN":"WNW"}, 
	                    {"CH":"西北","EN":"NW"} ,
	                    {"CH":"北西北","EN":"NNW"},
	                    {"CH":"北风","EN":"N"}];
	var wd = null;
	if(!G_CONTEXT.isUndefined(angle)){
		var direId = G_CONTEXT.calcWindDire(angle);
		wd = windDirName[direId];
	} else {
		wd = {"CH":"","EN":""};
	}
	return wd;
};

/**
* 计算16风向
* @param angle 风向角度
*/
G_CONTEXT.calcWindDire = function(angle){
	if(!$.isNumeric(angle*1)){
		return;
	}
	return Math.floor(angle*1 / 22.5);
};

/**
 * 获取地址栏中url地址的参数
 * @param name
 * @returns
 */
G_CONTEXT.getQueryString = function(name){
	var reg = new RegExp("(^|&)"+name+"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null){
		return unescape(r[2]);
	}
	return null;
};