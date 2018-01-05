(function($) {
	$.modal = {};

	$.modal.createModal = function(obj){
		var _modal = $(this);
		
		var settings = {
				id : null,
				title : null,
				container: null,		
				m_left : null,
				m_right : null,
				m_top : null,
				m_bottom : null,
				closeTip : true,		//右上角的叉号
				footer : false,			//是否需要弹出框的底部(一般确认框拥有)
				size : 'middle',		//弹出框的大小控制 默认为middle
				width : null,
				height : null,
				fixed : true,
				retain : false,			//是否保留弹出窗内容
				callback : function() {	//回调函数
				}
		};
		
		settings = $.extend(settings, obj);
		
		var id = "modal_";
		//传递id
		if(obj.id) {
			id += obj.id;
		}
		var modalDiv = $("<div id='"+id+"'></div>");//.addClass("modal");
		var modalDialog = $("<div style='position: absolute;margin:0;width:"+obj.width+"px;'></div>").addClass("modal-dialog");
		if(obj.m_right) {
			modalDialog.css({'right':obj.m_right});
		} else {
			//如果指定弹出框left
			if(obj.m_left) {
				modalDialog.css({'left' : obj.m_left});
			} else {
//				modalDialog.css({'left' : '500px'});
				modalDialog.css({'left' : ($(window).width() - modalDialog.width())/2 + 'px'});
			}
		}
		
		if(obj.m_top) {
			modalDialog.css({'top':obj.m_top});
		}else{
			if (obj.m_bottom) {
				modalDialog.css({'bottom':obj.m_bottom});
			} else {
				modalDialog.css({'bottom' : '30px'});
			}
		}
		
		//弹出框的大小控制
		if(obj.size=="small") {
			modalDialog.addClass('modal-sm');
		} else if(obj.size=="large"){
			modalDialog.addClass('modal-lg');
		} else {
			//默认为middle
		}
		//弹出框内容
		var modalContent = $("<div></div>").addClass("modal-content");
		
		//弹出框头部
		var modalHeader = $("<div></div>").addClass("modal-header");
		
		//是否需要出现右上角的叉号
		if(obj.closeTip != false) {
			var close = $('<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>')
			modalHeader.append(close);
			//关闭按钮的绑定事件
			close.on("click",function(){
				//关闭遮罩
				G_CONTEXT.backdrop(false);
				if($.isFunction(obj.closed)){
					obj.closed();
				}
				//弹出框移除
				if(!obj.hide){
					modalDiv.remove();
				}else{
					modalDiv.hide();
				}
			});
		}
		
		var modalTitle;
		//弹出框标题
		if(obj.size=="small")
			modalTitle = $("<h6>"+obj.title+"</h6>");
		else
			modalTitle = $("<h4>"+obj.title+"</h4>");
		
		modalTitle.addClass("modal-title");
		
		//弹出框主体
		var modalBody = $("<div style='height:"+obj.height+"px; overflow-y:auto'></div>").addClass("modal-body");
		modalHeader.append(modalTitle);
		modalContent.append(modalHeader).append(modalBody);
		//是否需要弹出框的底部(一般确认框拥有)
		if(obj.footer) {
			var modalFooter = $("<div></div>").addClass("modal-footer");
			var closeButton = $('<button type="button" class="btn btn-white">取消</button>');
			var saveButton = $('<button type="button" class="btn btn-primary">确定</button>');
			modalFooter.append(closeButton).append(saveButton);
			modalContent.append(modalFooter);
			//取消按钮事件绑定
			closeButton.on("click",function(){
				G_CONTEXT.backdrop(false);
				modalDiv.remove();
			});
			//确认键事件
			saveButton.on("click",function(){
				if(obj.callback) {
					obj.callback();
				}
			});
		}
		modalDiv.append(modalDialog.append(modalContent));
//		_modal.append(modalDiv);

		if(settings.container != null)
			$('#' + settings.container).append(modalDiv);
		else 
			$('body').append(modalDiv);
		
		//_modal.append(modalDiv);
		//弹出框显示
		modalDiv.show();
		//去除文字选中事件（蓝色阴影）
		$("#"+id+" .modal-header h4","#"+id+" .modal-body").on("selectstart",function(){
			return false;
		});
		//单击弹出框的头部，确定点击处的位置
		$("#"+id+" .modal-header").mousedown(function(event){
			var isMove = true;
			var _this = $(this).closest(".modal-dialog");
			$(this).css({"cursor": "pointer"});//点击鼠标切换为手势图形
			var m_x = Number(_this.css("left").split("px")[0]);//点击窗体时，left
			var m_y = Number(_this.css("top").split("px")[0]);//点击窗体时，top
			var abs_x = event.pageX;//点击窗体时，左边距
			var abs_y = event.pageY;//点击窗体时，上边距
			//单击住头部可进行拖拽，计算移动大小，以及移动范围限制
			$(document).off('mousemove').on('mousemove',function(event){
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
					} else if (ebs_y > body_h - div_h) {
						ebs_y = body_h - div_h;
					} else {
						
					}
					//重新设定弹出框的左边距，上边距
					_this.css({'left':ebs_x,'top':ebs_y });
				}
			}).mouseup(function(){
				isMove = false;
				$(document).off('mousemove');
				$("#"+id+" .modal-header").css("cursor", "default");
			});//鼠标移除事件；单击事件结束事件。
			
			settings.callback();
		});
	}
		
	// 弹出框显示
	$.modal.show = function(obj) {
		// 遮罩显示与否
		G_CONTEXT.backdrop(obj.backdrop);
		// 生成模态框
		$.modal.createModal({
			id : obj.id,
			title : obj.title,
			container : obj.container,
			m_left : obj.m_left,
			m_right : obj.m_right,
			m_top : obj.m_top,
			m_bottom : obj.m_bottom,
			closeTip : obj.closeTip,
			footer : obj.footer,
			size : obj.size,
			width : obj.width,
			height : obj.height,
			hide : obj.hide,
			closed : obj.closed,
			callback : obj.callback
		});
		if (obj.url) {
			$("#modal_" + obj.id + " .modal-body")
					.load(obj.url, obj.operateFuc, obj.loadSuccess);
		} else if (obj.html) {
			$("#modal_" + obj.id + " .modal-body").append(obj.html);
		} else {

		}
	};

	
	
	// 确认框
	$.modal.confirm = function(title, content, callback) {
		// 遮罩显示与否
		G_CONTEXT.backdrop(true);
		// 生成模态框
		var id = "confirm_";
		G_CONTEXT.createModalDiv({
			id : id,
			title : title,
			// m_left:obj.m_left,
			// m_top:obj.m_top,
			footer : true,
			size : "small",
			callback : callback
		});
		$("#modal_" + id + " .modal-body").append(content);
	};

	// 关闭弹出框
	$.modal.close = function(id, callback) {
		G_CONTEXT.backdrop(false);
		$("#modal_" + id).remove();
		if (callback) {
			callback();
		}
	};
	// 隐藏弹出框
	$.modal.hide = function(id, callback) {
		G_CONTEXT.backdrop(false);
		$("#modal_" + id).hide();
		if (callback) {
			callback();
		}
	};

	$.modal.closeAll = function(callback) {
		G_CONTEXT.backdrop(false);
		$("div[id ^='modal_']").remove();
	};

})(jQuery);
