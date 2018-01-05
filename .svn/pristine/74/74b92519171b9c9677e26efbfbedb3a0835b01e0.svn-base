/**
 * @Description : dialog_custom.js
 * @Author :      PANRUSEN
 * @CreateDate :  2015年9月5日
 * @TODO
 * 	弹窗组件
 *  对artDialog的二次封装
 */

;(function($, win){
	
	
var Customer = function(options){

    this.defaults = {
    	curAgent : null,
    	event : 'click',
    	sysId : null, //系统id,如西藏调用时，传入xizang
		url : null,
		initCall : null,
		closeCall : null,
		title : true,
		titleContent : null,
		leftContent : null,
		headerTbas : false,
		reload : true,
		diaOpts : {
			width : "50%",
			height : "50%",
			zIndex : 9999,
			opacity : 0.5,
			lock : false,
			resize : false,
			fixed : true,
			follow : null
		},
		attaWins : {
			winSet : null,
			setting : {
				width : "50%",
				height : "50%",
				zIndex : 9999,
				opacity : 0.5,
				lock : false,
				resize : false,
				fixed : true,
				close : false
			}
		}
	};
    this.options = $.extend({}, this.defaults, options);
}

var CustomerWin;
if (!win.CustomerWin) {
	CustomerWin = {};
} else {
	 artDialog.alertTips("CustomerWin has already existed!");
}

var CurDlog = function(options){
	 var defaults = {
	   	id : null,
	   	isExist : false
	};
	this.options = $.extend({}, defaults, options);
	this.isExist = this.options.isExist;
}
CurDlog.prototype = {
	close : function(){
		var opt = this.options;
		if(art.dialog({id: opt.id})){
			art.dialog({id: opt.id}).close();
		}
	}
};


Customer.prototype = {
	//获取参数信息
	getOptions : function(){
		return this.options;
	},
	init : function(curtarget){
		var _this = this;
		_this._open(_this.getOptions() , curtarget);
	},
	_open : function(opts , curtarget){
		var _this = this;
		//判断窗口是否已经存在，这里要求每个窗口的id唯一
		//窗口如存在将不再执行初始化
		if(CustomerWin[opts.id]){
			if(!opts.reload){
				if(!CustomerWin[opts.id].showed){
					CustomerWin[opts.id].DOM.wrap.css({left:opts.diaOpts.left+"px",top:opts.diaOpts.top+"px"});
					CustomerWin[opts.id].showed = true;
					art.dialog({id: opts.id}).show();
					if (opts.initCall instanceof Function) {
						opts.initCall(new CurDlog({
							id : opts.id,
							isExist : true,
							customer : curtarget
						}));
					}
				} else {
					CustomerWin[opts.id].showed = false;
					art.dialog({id: opts.id}).hide();
					if (opts.closeCall instanceof Function) {
						opts.closeCall(true);
					}
				}
				
				//判断是否有附属子窗口
				var attaWins = opts.attaWins.winSet;
				if(attaWins){
					$.each($(attaWins) , function(i  , w){
						if(CustomerWin["atta" +  w.id]){
							
							if(!CustomerWin["atta"  + w.id].showed){
								CustomerWin["atta"  + w.id].showed = true;
								CustomerWin["atta"  + w.id].DOM.wrap.css({left:opts.attaWins.setting.left+"px",top:opts.attaWins.setting.top+"px"});
								art.dialog({id: "atta"  + w.id}).show();
							} else {
								CustomerWin["atta"  + w.id].showed = false;
								art.dialog({id: "atta"  + w.id}).hide();
							}
							
						}
					});
				}
			} else {
				if(!opts.noClose){
					CustomerWin[opts.id].showed = false;
					art.dialog({id: opts.id}).close();
					
					var attaWins = opts.attaWins.winSet;
					if(attaWins){
						$.each($(attaWins) , function(i  , w){
							if(CustomerWin["atta" +  w.id]){
								CustomerWin["atta"  + w.id].showed = false;
								art.dialog({id: "atta"  + w.id}).close();
							}
						});
					}
				}
			}
			return;
		} 
		
		var titleht = "", url = "";
		if(opts.headerTbas){
			titleht += "<ul class='headertabs'>";
			$.each($(opts.headerTbas) , function(i , t){
					var select = "";
					if(t.isDefault) {
						select = "selected";
						url = t.url;
					}
					titleht += "<li class='tabBtn " + select + "' channel='" + t.id + "' name='" + t.name + "' page='" + t.url + "' >" + t.name + "</li>"
			});
			titleht += "</ul>"
		} else if(opts.title){
			url = opts.url;
			titleht = opts.title;
		}
		
		var diaOpt = $.extend({
			id : opts.id,
			title : titleht,
			leftContent : opts.leftContent,
			headerTbas : opts.headerTbas,
			reqData : opts.data,
			type : opts.type,
			init : function() {
				var attaWins = opts.attaWins.winSet;
				if(attaWins){
					_this._openAttaWin(opts);
				}
				if (opts.initCall instanceof Function) {
					opts.initCall(new CurDlog({
						id : opts.id,
						isExist : true,
						customer : curtarget
					}));
				}
			},
			close : function() {
				this.closed = true;
				var attaWins = opts.attaWins.winSet;
				if(attaWins){
					$.each($(attaWins) , function(i  , w){
						if(CustomerWin["atta" +  w.id]){
							art.dialog({id: "atta"  + w.id}).close();
						}
					});
				}
				if (opts.closeCall instanceof Function) {
					opts.closeCall(true);
				}
				CustomerWin[opts.id].showed = false;
				CustomerWin[opts.id] = null;
			}
		}, opts.diaOpts);
		
		CustomerWin[opts.id] = artDialog.opencustom(url, diaOpt);
		CustomerWin[opts.id].showed = true;
		return CustomerWin[opts.id];
		
	},
	_openAttaWin : function(opts){
		var attaWins = opts.attaWins.winSet;
		if(attaWins){
			$.each($(attaWins) , function(i  , w){
				var diaOpt = $.extend({
					id : "atta" + w.id,
					title : w.title,
					cancel: false,
					init : function() {
						this.show();
					},
					close : function() {
						CustomerWin["atta"  + w.id].showed = false;
						CustomerWin["atta"  + w.id] = null;
					}
				}, opts.attaWins.setting);
				CustomerWin["atta" + w.id] = artDialog.opencustom(w.url, diaOpt);
				CustomerWin["atta"  + w.id].showed = true;
			});
		}
	},
	loadGroup : function(curtarget){
		var _ = this;
		opts = _.options;
		if(opts.group){
			for(var key in opts.group){
				var obj = opts.group[key];
				if(key != $(curtarget).attr('id')){
					$('#' + key).off('click').on('click' , function(e){
						e.stopPropagation();
						_.reload(obj);
						return false;
					});
				}
			}
		}
	},
	reload : function(settings){
		
		var _ = this;
		opts = _.options;
		
		var opt = {
				title : null,
				url : null
		};
		opt = $.extend({}, opt, settings);
		
		var $customWin = CustomerWin[opts.id];
		if($customWin){
			var config = $customWin.config,
				dom = $customWin.DOM;
			
			if(!opt.title){
				opt.title = $(dom.title).html() ? 
							$(dom.title).html() : "弹出消息" ;
			}
			
			var pageId = "Page" + config.id;
			if(opt.url){
				_ajaxLoad(pageId, opt.url, function(rst){
					if(rst){
						$(dom.title).empty().html(opt.title);
					}
				});
			}
		}
		function _ajaxLoad(pageId, url , call){
			var $iform = $(top.document.createElement("form"));
			$iform.ajaxSubmit({
				target : "#" + pageId,   
			    url : url, 
			    type:"get",
				contentType:"application/x-www-form-urlencoded;charset=UTF-8",
				clearForm:true,
				resetForm:true,
			    success: function(html){ 
			    	if(call instanceof Function){
			    		call(true);
			    	}
			    },
			    error : function(e) {},
			    complete : function(xhr, status){}
			});
		}
	}
}

$.fn.dialogCustom = function(options){
	
	var customer = new Customer(options);
	var opt = customer.getOptions();
	$(this).off(opt.event).on(opt.event , function(e){
		e.stopPropagation();
		customer.init(this);
		return false;
	});
	
	return customer;
	
};

$.extend({
	dialogAgent : function(options){
			
		var customer = new Customer(options);
		var opt = customer.getOptions();
		
		if(opt.curAgent){
			customer.init(opt.curAgent);
		}
		
		return customer;
	}
});

//弹窗集合
$.dialogMaster = win.dialogMaster =  $.fn.dialogMaster = function(options){
	var defaults = {
			type : null,	//ok(确认),confirm(确认/取消)，getValue(获取返回值),tip
			ok : function(){},		//确认按钮回调函数
			cancel : function(){},	//取消按钮回调函数
			contentInfo : null,	//消息内容
			dialogSet : {	//弹窗集合
				confirm : null,
				getValue : null
			}
	};
	defaults = $.extend(defaults, options);
	initDialogSet(defaults);
	var dialog = defaults.dialogSet[defaults.type];
	if(!dialog){
		return false;
	}
	if(!(this instanceof jQuery)){
		dialog(this,defaults);
		return false;
	}
	return this.each(function(){
		var dataOptions = $.data(this,'dataOptions');
		if(dataOptions){
			$.extend(dataOptions,defaults);
		}else{
			dataOptions = $.data(this,'dataOptions',defaults);
		}
		$(this).off("click").on("click",function(event){
			var dialogWin = $.data(this,"dialog");
			if(dialogWin){
				dialogWin.close();
				$.data(this,"dialog",null);
			}else{
				$.data(this,"dialog",dialog(this,dataOptions));
			}
			event.stopPropagation();//阻止冒泡 防止行点击事件
		});
	});
};
//初始化弹窗集合
function initDialogSet(options){
	options.dialogSet.ok = okDialog;
	options.dialogSet.confirm = confirmDialog;
	options.dialogSet.getValue = getValueDialog;
	options.dialogSet.tip = alertTip;
}
function alertTip(target, opt){
	var info = opt.info ? opt.info : '消息';
	artDialog.alertTips(info + '.');
}
/** 生成弹窗*/
function okDialog(target,opt){
	var d = art.dialog({
		resize : false,
		content : opt.contentInfo,
		zIndex : opt.zIndex,
		fixed : true,
		focus : true,
		lock: opt.lock || false,
		opacity : opt.opacity || 0.5,
		ok : opt.ok,
		close : function(){
			if(target instanceof HTMLElement){
				$.data(target,'dialog',null);
			}
		}
	});
	return d;
}
function confirmDialog(target,opt){
	var c_defaults = {
			resize : false,
			content : opt.contentInfo,
			zIndex : opt.zIndex,
			fixed : true,
			ok : null,
			cancel : null,
			opacity : opt.opacity || 0.5,
			focus : true,
			close: function(){
				if(target instanceof HTMLElement){
					$.data(target,'dialog',null);
				}
			}
		};
	var c_config = $.extend(c_defaults, opt);
	var d = art.dialog(c_config);
	return d;
}
function getValueDialog(target,opt){
	var d = art.dialog({
		resize : false,
		content : opt.contentInfo,
		zIndex : 9999,
		fixed : true,
		ok : opt.ok,
		close: function(){
			if(target instanceof HTMLElement){
				$.data(target,'dialog',null);
			}
		}
	});
	return d;
}
	
})(jQuery, window);