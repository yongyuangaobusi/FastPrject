/**
 * @Description : loadmask_custom.js
 * @Author :      PANRUSEN
 * @CreateDate :  2015年9月29日
 * @TODO
 */

;(function($, win){
	
	$.extend({
		customMask : function(options){
			
			var opt = $.extend({}, {
				wrapper : null,
				maskInfo : "",
				loadFn: null
			}, options);
			
			if(!opt.wrapper) opt.wrapper = win.document.body;
			
			if(opt.maskInfo.length > 0){
				$(opt.wrapper).mask(opt.maskInfo);
				if(typeof opt.loadFn != null && opt.loadFn != undefined){
					opt.loadFn();
					$(opt.wrapper).unmask();
				}
			} else {
				$(opt.wrapper).unmask();
			}
		} 
	});
	
	
})(jQuery, window.top);