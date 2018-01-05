/*  
 * main.js
 * @Author :      PANRUSEN
 * @CreateDate :  2016年5月23日
 * Copyright (c) 2016, NRIET.　
 * TODO
 * 		顶部菜单业务处理
 */

;(function($, win, undefined) {
	
	if($.fn.MenuRenderer){
		$.fn.MenuRenderer = {};
	}
	
	//注册系统菜单渲染器对象
	$.fn.MenuRenderer = function(settings){
		
		var defaults = {
				deMenuId : '', 	//默认选中的菜单Id
				moduleId : ''
		};
		
		this.options = $.extend({}, defaults, settings);
		//取cookie
//		var cookie_moduleId = $.cookie('moduleId');
//		if(cookie_moduleId && cookie_moduleId != 'index')
//			this.options.moduleId = cookie_moduleId;
//		else {
//			$.cookie('moduleId', this.options.moduleId);
//		}
			
		
		this.menuData = null;
		this.menuWrapper = this;
		
		var _ = this;
		//渲染器实现
		var Renderer = {
				curSeledMenu : null,
				//初始化
				init : function(){
					var _this = this;
					 $.ajax({
						 type:	'get',
						 url:	'menuInfo.do',
						 dataType:'json',
						 async : false,
						 success:function(result){
							 data = eval("("+result+")");
							 if(data){
								 _.menuData = data.data.children;
							 }
							 //更新缓存
							//_.options.moduleId = moduleId;
							 
							 _this.renderer();
						 }
					 });
				},
				//渲染菜单
				renderer : function(){
					if(!_.menuData){
						return;	
					}
					var _this = this;
					var $mlWrapper = $(_.menuWrapper).empty();
					var url = "zhyj/zhyj_main.do";
					var selectedModuleId;
					//临时添加_by_kev
					moduleId="gdzz";
					$.each(_.menuData,function(){
						if(moduleId == this.moduleId){
							url = this.url;
							_.options.deMenuId = this.id;
							_.options.moduleId = this.moduleId;
							selectedModuleId = this.moduleId;
							return false;
						}
					});
					if(!selectedModuleId) {	//找不到相应菜单时，取默认菜单
						selectedModuleId = _.options.moduleId;
//						$.cookie('moduleId', _.options.moduleId); 
					}
						
					if(!$.isEmptyObject(_params)){
						_.options.deMenuId = _params.deMenuId;
						url = _params.url;
					}
					if(_params != '' && _params.flag=='3') {//格点制作产品预报
						_.options.deMenuId = 7;
						url = 'ntownFore/init.do';
					}
					
					$.each(_.menuData, function(i, m){
						var selected = _.options.moduleId == m.moduleId ? "active" : "";
//						url = _.options.deMenuId == m.id ? m.url : "";
						var mli = $("<li>").addClass('nriet-topnav ' + selected).attr({
							id : m.id,
							'data-url' : m.url,
							'module-id' : m.moduleId
						}).html(m.name);
						if( _.options.deMenuId == m.id){
							_this.curSeledMenu = mli;
						}
						$mlWrapper.append(mli);
					});
					
					_this.ajaxPage(url, selectedModuleId);
					_this.regEvs();
				},
				//请求界面
				ajaxPage : function(path, selectedModuleId, ev){
					var iform = top.document.createElement("form");
					if(win.Pace && "click" == ev){
						Pace.restart();
					}
					$(".aui_state_focus").remove();
					$.modal.closeAll();
					$(iform).ajaxSubmit({
						target : "#nPage",
						url : window.contextPath + path,
						type : "post",
//						data : {
//							'viewPath' : path
//						},
						contentType : "html",
						cache : false,
						clearForm : true,
						resetForm : true,
						success : function(html) {
						},
						error : function(e) {
							console.log(e);
						},
						complete : function(err, status) {
						}
					});
					//更新cookie index单独处理
//					if(selectedModuleId != 'index')
//						$.cookie('moduleId', selectedModuleId);
				},
				iframeBusisPage: function(_this){
					var url = _this.attr("data-url");
					if (!url||url.length<1) {
						return;
					}
					var frameContent = '<iframe id="loader-wrap" name="loader-wrap" frameborder="0" scrolling="no" style="width: 100%; height: 100%; background: #FFF;" '+ 
						'src="' + url + '"></iframe>';
					$('#nPage').html(frameContent);
				},
				//注册事件
				regEvs : function(){
					var _this = this;
					function _setCss(obj, etype){
						if("mouseover" == etype){
							$(obj).addClass('fadeInHover').siblings().removeClass('active');
						}
						if("mouseout" == etype){
							$(obj).removeClass('fadeInHover');
							$(_this.curSeledMenu).addClass('active');
						}
						if("click" == etype){
							$(obj).addClass('active').siblings().removeClass('active');
						}
					}
					$(_.menuWrapper).undelegate().delegate('li.nriet-topnav','mouseover',function(ev){
						ev.stopPropagation();
						_setCss(this, 'mouseover');
						return false;
					}).delegate('li.nriet-topnav','mouseout',function(ev){
						ev.stopPropagation();
						_setCss(this, 'mouseout');
						return false;
					}).delegate('li.nriet-topnav','click',function(ev){
						ev.stopPropagation();
						var moduleid = $(this).attr("module-id");
						_this.curSeledMenu = this;
						_setCss(this);
						if("fwzz" == moduleid || "cpgx" == moduleid){
							
							if($(this).attr("data-url").indexOf("?")>0){
								$(this).attr("data-url",$(this).attr("data-url").substr(0,$(this).attr("data-url").indexOf("?")));
							}
							var url = $(this).attr("data-url")+"?username="+loginName+"&password="+upwd+"&moduleid="+moduleid;
							$(this).attr("data-url",url);
//							window.location.href = url;
//							$.cookie('moduleId', '');
							_this.iframeBusisPage($(this));
							
						}else{
							_this.ajaxPage($(this).data("url"), $(this).attr("module-id"), 'click');
						}
						return false;
					});
					
					$("#topUserNav .nav-exit i").unbind("click").bind("click", function(){
						window.location.href = window.contextPath + "logout.do";
					});
				}
		};
		
		Renderer.init();
		return Renderer;
	};
	
	//初始化菜单
	//默认配置选中id为2的菜单“综合分析”  不可为空
	$("#topNav").MenuRenderer({
		moduleId:'zhyj'
	});
	
})(jQuery, window);