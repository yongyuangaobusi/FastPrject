/**
 * 系统工具 控件
 */
$.fn.systemTools = function(param){
		var picturePath = G_CONTEXT.contextPath + 'HB/n-ui/widgets/nriet/system_tool/img/';
		//系统工具种类
		var sysTools = param.sysTools;
		//开发人员之定义位置
		var position_top = param.top ? param.top : "65px";
		var position_right = param.right ? param.right : "0px";
		//dom元素
		var obj = $(this);
		obj.empty();
		var hideContent = function(){
			var sysTool = obj.find(".systools_content"); 
//			if (sysTool.width() == 0 || sysTool.width() == window.innerWidth){
//				setTimeout(hideContent, 10); 
//				return;
//			}
			//隐藏已经创建的工具条
			buttonContainer.animate({width:"0px"},0);
			sysTool.attr("isShow","false");
		};
		
		//组装页面元素
		var content = $('<div></div>').addClass("systools_content");
		content.css({'top':position_top});
		content.css({'right':position_right});
//		content.css("display","none");
		var sys_check = $('<div class="sys_tool_checked" title="绘制"><div class="sys_tool_title">绘制</div></div>');
		content.append(sys_check);
		var buttonContainer = $('<div class="buttonContainer"><div>')
		content.append(buttonContainer);
		$.each(sysTools.contents, function(key, child){
			if( key.length > 8 && "division" == key.slice(0,8)){
				var division = $('<div class="dottedDivision"></div>');
				buttonContainer.append(division);
			}else{
				if(child.clickflag){
					var button = $('<div class="complex_tool tool_hover" name="'+key+'" channel="systool_'+ child.name +'" title="' + child.title+'" downPic="'+child.picClick+'" upPic="'+child.pic+'" clickflag="'+child.clickflag+'"><img src="' + picturePath + child.pic+'" class="picsize mouseHover"></div>');
				}else{
					var button = $('<div class="complex_tool" name="'+key+'" channel="systool_'+ child.name +'" title="' + child.title+'" downPic="'+child.picClick+'" upPic="'+child.pic+'" clickflag="'+child.clickflag+'"><img src="' + picturePath + child.picClick+'" class="picsize"></div>');
				}
				buttonContainer.append(button);
				button.unbind("click").bind("click",function(){
					var div = $(this);
					if(div.attr("clickflag") == "false"){
						return;
					}
					GIS.Warning.editDropArea("nGis","mapPan");//设置为漫游状态
					if("base_area" == div.attr("name") || "base_district" == div.attr("name")){
						if(div.hasClass("buttonclick")){
							$(".complex_tool.buttonclick").removeClass("buttonclick");
							$.each($("div[channel='systool_chosemethod']"),function(i,data){
								var name = $(data).attr("name");
								changeStatus(name,"downPic");
							});
						}else{
							$(".complex_tool.buttonclick").removeClass("buttonclick");
							div.addClass("buttonclick");
							$.each($("div[channel='systool_chosemethod']"),function(i,data){
								var name = $(data).attr("name");
								if("broken_line" == name || "area_line" == name){
									changeStatus(name,"upPic");
								}else{
									changeStatus(name,"downPic");
								}
							});
							if($.isFunction(child.callBack)){
								child.callBack();
							}
						}
					}else{//后面所有按钮
						if(div.hasClass("buttonclick")) {
							div.removeClass("buttonclick");
						} else {
							$("div[channel='systool_chosemethod']").removeClass("buttonclick");
							if("sync_area" != div.attr("name") && "colour_area" != div.attr("name")){
								div.addClass("buttonclick");					
							}
							if($.isFunction(child.callBack)){
								child.callBack();
							}
						}
					}
					
				});
			}
		});
		
		function changeStatus(name,downOrUp){
			var path;
			if("downPic" == downOrUp ){
				path = picturePath + $("div[name='"+name+"']").attr("downPic");
				$("div[name='"+name+"']").removeClass("tool_hover"); //取消Hover状态
				$("div[name='"+name+"']").find("img").removeClass("mouseHover"); //取消Hover状态
				$("div[name='"+name+"']").css({"cursor":"default"});//鼠标取消点击状态
				$("div[name='"+name+"']>img").attr("src",path);//edit_area置灰
				$("div[name='"+name+"']").attr("clickflag",false);
			}else if("upPic" == downOrUp){
				path = picturePath + $("div[name='"+name+"']").attr("upPic");
				$("div[name='"+name+"']").addClass("tool_hover"); 
				$("div[name='"+name+"']").find("img").addClass("mouseHover"); 
				$("div[name='"+name+"']").css({"cursor":"pointer"});//鼠标取消点击状态
				$("div[name='"+name+"']>img").attr("src",path);//edit_area恢复
				$("div[name='"+name+"']").attr("clickflag",true);
			}
		}
		
		obj.append(content);
		obj.show(); 
//		setTimeout(hideContent, 0); 
		hideContent();
		/**
		 * 监听事件 : 系统工具隐藏
		 */
		$(".sys_tool_checked").unbind("click").bind('click',function(){
			var that = $(this);
			var content = $(this).parent();
			var isShow = content.attr("isShow");
			if (!isShow || isShow == 'false'){
				if($('.complex_tool').length == 9){
					buttonContainer.animate({width:"460px"},500,function(){
						that.addClass("sys_tool_checked_click");
					});
				}else if($('.complex_tool').length == 8){
					buttonContainer.animate({width:"420px"},500,function(){
						that.addClass("sys_tool_checked_click");
					});
				}else if($('.complex_tool').length == 7){
					buttonContainer.animate({width:"375px"},500,function(){
						that.addClass("sys_tool_checked_click");
					});
				}
				
				content.attr("isShow","true");
			}
			else{
				var cR = -1 * content.width() + content.find(".sys_tool_checked").width();
				buttonContainer.animate({width:"0px"},500,function(){
					that.removeClass("sys_tool_checked_click");
				});
				content.attr("isShow","false");
			}
		});
};