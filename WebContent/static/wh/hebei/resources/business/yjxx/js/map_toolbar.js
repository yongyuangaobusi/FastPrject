/*  
 * map_toolbar.js
 * @Author :      CAOYONG
 * @CreateDate :  2016年7月11日
 * Copyright (c) 2016, NRIET.　
 * 		
 */

/**
 * 格点制作 工具条
 * @param 工具条相关参数
 */
$.fn.gridToolbar = function(param, name){
	
	if(param == "recover"){
		recoverTool(name);
		return;
	}
	//工具条位置 默认在右上角
	var position_top = param.top ? param.top : "65px";
	var position_right = param.right ? param.right : "0px";
	
	var $toolbar = $(this);
	//$toolbar.empty();
	
	//放置工具的容器
	var $toolContent = $('<div class='+param.name+' style="top:'+position_top+';"></div>').addClass("tools_content");
	
	//工具条的图标及名字
	var $bar_head = $('<div class="'+param.name+' bar_head" name="'+param.name+'" opened='+param.opened+' style="top:'+position_top+';right:'+position_right+'"><span class="head_title">'+param.title+'</span></div>').addClass("bar_head_closed");
	//添加工具条上的三角形标记
	var $tri = $('<span class="mark_triangle"></span>').hide();
	$bar_head.prepend($tri);
	
	if(param.size == "small"){
		$toolContent.addClass("small-version");
		$bar_head.addClass("small-version");
	}
	//添加工具
	var tools = param.tools;
	for(var i = 0; i < tools.length; i++){
		var toolParam = tools[i];
		var toolType = toolParam.type;//工具属于开关还是按钮
		var solo = toolParam.solo;//工具是否排他
		var $tool = $('<div class="specific_tool '+toolType+'" name='+toolParam.name+' solo='+solo+' belong='+param.name+'></div>');
		var active = toolParam.active;
		if(active != null && active == false){
			$tool.addClass('disactive');
		}
		var $tool_icon = $('<div class="tool_icon"><i class="'+toolParam.iconClass+'"></i></div>');
		var toolTitle = $('<div class="tool_title"><span class="span_title">'+toolParam.title+'</span></div>');
		$tool.append($tool_icon);//加工具的图标
		$tool.append(toolTitle);//加工具的名称
		$toolContent.append($tool);
		//存在下拉列表
		if(toolParam.droplist){
			var $dropIcon = $('<span class="tool_dropIcon icon-xiafan-7"></span>');
			toolTitle.append($dropIcon);
			var name = toolParam.define;
			//var defineItem = toolParam.droplist[index].name+"-"+toolParam.droplist[index].title;
			$tool.attr("defineItem", name);
			addDroplist($tool,toolParam, param.reCall);//添加下拉菜单
		}
	}
	$toolContent.find('[name='+tools[i-1].name+']').css({'margin-right':'10px'});
	$toolbar.append($bar_head);
	$toolbar.append($toolContent);
	//var dis = -$('.'+ param.name +'.tools_content').width();
	
	
	//如果初始化时设置工具展开，则调接口进行展开
	if(param.opened == "1"){
		showTools($bar_head);
	}
	//TODO 9.18更正
	else{
		// 10.11 修改为固定值
		$toolContent.css({'right':'-1920px'});
		$bar_head.find('.head_title').removeClass("icon_closeBar").addClass("icon_openBar");
	}
	
	/**
	 * 工具条头部点击事件
	 */
	$bar_head.unbind('click').bind('click',function(){
		if($(this).attr('dis') == 'true') return;
		$(this).toggleClass("bar_head_closed");
		$(this).toggleClass("bar_head_opened");
		if($(this).attr("opened") == 0){//工具条没有展开，点击之后要将工具条展开
			//修改标记
			$(this).attr("opened", "1");			
			//显示工具
			showTools($(this));
			
		}else{
			//修改标记
			$(this).attr("opened", "0");
			//隐藏工具
			hideTools($(this));
		}
		
	});
	
	/**
	 * 点击向下的三角形，显示下拉列表。
	 */
	$('.specific_tool .tool_dropIcon').unbind('click').bind('click', function(e){
		e.stopPropagation();  //IE暂时不支持
		var $tool = $(this).parent().parent();
		if($(this).hasClass("tool_dropIcon")){
			//展示下拉列表
			$(this).removeClass('tool_dropIcon icon-xiafan-7');
			$(this).addClass('tool_dropIcon-up icon-shangfan-7');
			/*if($tool.hasClass("trigger-on")){
				$tool.removeClass('trigger-on');
				$tool.addClass('trigger');
			}*/
			showDroplist($tool);
		}else if($(this).hasClass("tool_dropIcon-up")){
			//收起下拉列表
			hideDroplist($tool);
		}
	});
	
	/**
	 * 按钮类型的工具，设置鼠标点下去和松开鼠标的样式
	 */
	$toolContent.find('.specific_tool.button').bind('mousedown', function(){
		if(!$(this).hasClass('disactive')){
			$(this).addClass('btn-mousedown');
		}
	});
	$toolContent.find('.specific_tool.button').bind('mouseup mouseout', function(){
		if($(this).hasClass('btn-mousedown')){
			$(this).removeClass('btn-mousedown');
		}
	});
	/**
	 * 添加下拉列表
	 */
	function addDroplist($tool,toolParam, callBack){
		var droplist = toolParam.droplist;
		var $dropBox_part1 = $('<div class="dropBox_part1" style="display:none;"></div>').addClass("droplist_"+ toolParam.name);
		$tool.parent().append($dropBox_part1);
		var title = toolParam.title;
		for(var j=0; j < droplist.length; j++){
			var sub = droplist[j];
			var item = $('<div class="droplist_item" name="'+sub.name+'">'+sub.title+'</div>');
			$dropBox_part1.append(item);
			item.click(function(){
				var $dropedTool = $(this).parent().parent().find(".list_dropped");//显示为下拉的工具，有两种可能：打开了下拉列表，但没有选择选项；打开了操作面板。
				if($dropedTool.find(".droplist_name").length == 0){//说明没有选中过下拉列表中的值
					$dropedTool.find(".tool_icon").append($('<span class="droplist_name">'+title+'</span>'));
				}
				$dropedTool.find(".span_title").replaceWith($('<span class="span_title" name='+$(this).attr('name')+'>'+$(this).text()+'</span>'));
				hideDroplist($dropedTool);//隐藏下拉
				turnOthersOff($dropedTool);//点击下拉菜单中的选项，认为此时打开了该工具，因此要把与该工具互斥的工具给关掉。
				if($dropedTool.attr('class').indexOf('trigger') >= 0){
					$dropedTool.removeClass('trigger');
					$dropedTool.addClass('trigger-on');
				}
				callBack({toolbarName: $dropedTool.attr('belong'), toolName: $dropedTool.attr('name'), dropItem: $(this).attr('name'), isDropItem: true, clickedItem: $dropedTool, trigger:$dropedTool.hasClass('trigger-on')});//回调接口显示操作面板
			});
		}
	}
	
	/**
	 * 显示下拉列表
	 */
	function showDroplist($tool){
		var $droppedTool = $(".list_dropped");//已经下拉的菜单
		hideDroplist($droppedTool);//将已经下拉的隐藏掉
		if($tool.parent().attr('class') == $droppedTool.parent().attr('class')){
			closePanel($droppedTool);//隐藏显示的面板
		}
		$tool.addClass("list_dropped");
		$tool.children(".tool_icon").css({'margin-top':'0px'});
		
		var className = "droplist_"+ $tool.attr('name');
		var $dropBox_part1 = $("."+className);
		
		if($dropBox_part1.length > 0){
			var position = $tool.position();
			$dropBox_part1.css({
				'top': position.top + $tool.height()+5,
				'left': position.left + 6,
				'z-index': $tool.css("zIndex")-1
			});
			$dropBox_part1.show();
		}
	}
	
	/**
	 * 隐藏下拉菜单
	 */
	function hideDroplist($tool){
		if($tool.length == 0){
			return;
		}
		//隐藏下拉列表
		var $dropBox_part1 = $(".dropBox_part1");
		$dropBox_part1.each(function(i){
			if($(this).css('display') != 'none'){
				var $dropIcon = $tool.find('.tool_dropIcon-up');
				//修改样式
				$dropIcon.removeClass('tool_dropIcon-up icon-shangfan-7');
				$dropIcon.addClass('tool_dropIcon icon-xiafan-7');
				$(this).hide();
				$tool.children(".tool_icon").css({'margin-top':'5px'});
				$tool.removeClass("list_dropped");
			}
		});
		
	}
	
	/**
	 * 工具的点击事件
	 */
	$('.tools_content .specific_tool').unbind('click').bind('click', function(){
		if($(this).hasClass('disactive')){
			return;//不可用的工具点击无效
		}
		var toolName = $(this).attr('name');//工具名
		var dropItem = $(this).find('.span_title').attr('name');//被选中下拉列表名
		var isDropItem = false;
		if($(this).hasClass("list_dropped") && $(this).find('.tool_dropIcon-up,.tool_dropIcon').length > 0){
			return;//点击的下拉状态下的工具按钮，不进行操作。
		}else if(!$(this).hasClass("list_dropped")){
			$('.tools_content .list_dropped').each(function(){
				hideDroplist($(this));//将已经下拉的隐藏掉
			});
			if(!$(this).hasClass('trigger-on')){
				turnOthersOff($(this));//关掉互斥的工具
			}
			if(!dropItem && $(this).find('.tool_dropIcon').length > 0){
				//工具有下拉列表选项但是没有选中下拉，点击工具的时候认为点击了默认的下拉选项
				dropItem = $(this).attr('defineItem');
				var droplistName = $(this).attr("name");
				var $dropItem = $(this).parent().find('.droplist_'+droplistName).find('[name='+dropItem+']');
				$(this).find(".tool_icon").append($('<span class="droplist_name">'+$(this).text()+'</span>'));
				$(this).find(".span_title").replaceWith($('<span class="span_title" name='+dropItem+'>'+$dropItem.text()+'</span>'));
				isDropItem = true;
			}
		}
		var isTrgger = $(this).attr('class').indexOf("trigger");//点击的工具类型是不是button
		if(isTrgger >= 0){//点击的是开关
			$(this).toggleClass('trigger');
			$(this).toggleClass('trigger-on');
		}
		if(param.reCall){
			param.reCall({toolbarName: $(this).attr('belong'), toolName: toolName, dropItem: dropItem, isDropItem: isDropItem, clickedItem: $(this), trigger:$(this).hasClass('trigger-on')});//回调接口显示操作面板
		}
	});
	
	/**
	 * 显示工具条
	 */
	function showTools($head){
		var toolClass = $head.attr('class').split(' ')[0];
		$head.next('.'+ toolClass +'.tools_content').animate({right:18},500,function(){
			//TODO 9.18更正
			$head.find('.mark_triangle').hide();
			$head.find('.head_title').removeClass("icon_openBar").addClass("icon_closeBar");
		});
		
	}
	
	/**
	 * 隐藏工具条
	 */
	function hideTools($head){
		//隐藏工具
		var toolClass = $head.attr('class').split(' ')[0];
		var dis = -$head.next('.'+ toolClass +'.tools_content').width();
		var $content = $head.next('.'+ toolClass +'.tools_content');
		$content.find('.specific_tool.list_dropped').each(function(i){
			closePanel($(this));
			hideDroplist($(this));
		});
		$content.animate({right:dis}, 500,function(){
			$head.find('.mark_triangle').hide();
			//TODO 9.18更正
			$head.find('.head_title').removeClass("icon_closeBar").addClass("icon_openBar");
		});
	}
	
	/**
	 * 关掉与其他工具互斥的工具
	 * $currentTool 当前点击的工具
	 */
	function turnOthersOff($currentTool){
		var isSolo = $currentTool.attr('solo');
		//当前点击的工具如果不是与其他工具互斥的则不需要考虑关闭其他工具
		if(isSolo == "true"){
			$('.specific_tool.trigger-on').each(function(){
				var shouldOff = $(this).attr('solo');//是否需要被关闭
				if(shouldOff == "true"){
					$(this).removeClass('trigger-on');
					$(this).addClass('trigger');
				}
			});
			$('.tools_content .list_dropped').each(function(){
				closePanel($(this));//隐藏显示的面板
			});
		}else{
			return;
		}
	}
	
	/**
	 * 点击关闭面板的图标
	 */
	$('.panel_closeIcon').click(function(){
		//找到面板所属的工具，修改工具对应的样式
		var $panel = $(this).parent();
		var toolName = $panel.attr("name");
		//var $tool = $panel.parent().find('[name='+toolName+']').filter('.specific_tool');
		//$tool.removeClass("trigger");
		//$tool.addClass("trigger-on");
		closePanel($panel);
	});
	
	/**
	 * 关闭面板
	 */
	function closePanel($tool){
		var panelName = $tool.attr("name");
		var $panel = $tool.parent().find('[name='+panelName+']').filter('.toolPanel');
		$panel.hide();
		$tool.parent().find(".list_dropped").children(".tool_icon").css({'margin-top':'5px'});
		$tool.parent().find(".list_dropped").removeClass("list_dropped");
	}
	
	function recoverTool(name){
		var $tool = $('.specific_tool[name='+name+']');
		hideDroplist($tool);
		closePanel($tool);
		if($tool.hasClass('trigger-on')){
			$tool.removeClass('trigger-on');
			$tool.addClass('trigger');
		}
		var $title = $tool.find('.droplist_name');
		if($title.length > 0){
		var title = $title.text();
			$title.remove();
			$tool.find('.span_title').removeAttr('name');
			$tool.find('.span_title').text(title);
		}
	}
};