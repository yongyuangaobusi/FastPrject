/**
 * @Description : login.js
 * @Author : PANRUSEN
 * @CreateDate : 2015年10月30日
 * @TODO
 */

window.alert = function(msg, type, fu) {
	top.$.messager.alert(' ', msg, type, fu);
};
window.confirm = function(msg, okCall, cancelCall) {
	top.$.messager.confirm(' ', msg, function(flag) {
		if (flag) {
			if (typeof (okCall) != 'undefined') {
				okCall();
			}
		} else {
			if (typeof (cancelCall) != 'undefined') {
				cancelCall();
			}
		}
	});
};
$.validity.setup({
	outputMode : "showErr"
}); // 校验错误弹出

var loginHeight; // 登录框高度
var loginWidth;

/**
 * 计算登录框位置
 */
function fixPosition() {
	$('#bg').width($(window).width());

	$('#login-panel').css({
		'top' : ($(window).height() - loginHeight) / 2 + 'px',
		left : ($(window).width() - loginWidth) / 2
	});

	$('#login-mask').css({
		top : $('#login-panel').css('top'),
		left : $('#login-panel').offset().left,
		width : $('#login-panel').outerWidth(),
		height : $('#login-panel').outerHeight()
	});
}

$(function() {
	
	$.cookie('channel', null, {path : cookiePath});
	$.cookie('pageUrl', null, {path : cookiePath});
	$.cookie('menuUrl', null, {path : cookiePath});

//	loginHeight = $('#login-panel').outerHeight();
//	loginWidth = $('#login-panel').outerWidth();
//
//	fixPosition(); // 设置登录框位置
//	$('.login-input').placeholder();
//
//	$(window).resize(fixPosition);

	$('#loginform').validity(function() {
		$('#name').require('请填写用户名!');
		$('input[type=password]').require('请填写密码!');
		/*
		 * <c:if test="${isVerifyCode == true}">
		 * $('#randcode').require('请填写验证码!'); </c:if>
		 */
	}, {
		beforeSubmit : function(result) {
			
			
			$('#login-btn').val('登录中...');
			if (!result) {
				$('#login-btn').val('登 录');
			}
		},
		success : function(result) {
			alert("dddd");
			if (result.success) {
				top.location.href = 'mainframe/init.do';
			} else {
				$('#verifyImg').click();
				alert(result.message);
			}
			$('#login-btn').val('登 录');
		},
		error : function() {
			top.location.href = 'main.jsp';
			alert("11111");
			//$('#login-btn').val('登 录');
		}
	});
	
	var Weather = function(settings){
		
		var defaults = { };
		this.options = $.extend({},	defaults, settings);
		
		this.vedio = document.getElementById("login-bgvedio");
		this.vedio.playbackRate = 0.8;
		
		this.whMask =  $('div.login-imask');
		this.loginMask = $('div#login-mask');
		
		var $mask = this.whMask;
		
		window.setTimeout(function() {
			$mask.animate({
				 opacity: 'show'
			 }, 'slow');
		}, 1);
		
	}
	
	Weather.prototype = {
			init : function(){
				
				var w = this.getWheather();
				//var config = this.config[w.id]
				var d = new Date(),
					h = d.getHours();
				var day =  ((h > 0 || h == 0) && h < 6 ) || h > 17? "N" : "D";
				
				var config = this.config['clear' + day];
				$(this.vedio).attr('src', cookiePath + config.src);
				$(this.whMask).css({background : config.color});
				
			},
			config : {
				clouds : {color : 'linear-gradient(to bottom, rgba(163, 204, 241, 0.1) 0%, rgba(132, 191, 230, 0.61) 70%)',
						  src : '/hebei/resources/login/css/video/clouds.mp4'},
				clearD : {color : 'linear-gradient(rgba(108, 185, 164, 0.0666667) 0%, rgba(141, 149, 151, 0.17) 80%)',
						  src : '/hebei/resources/login/css/video/clear.mp4'},
				clearN : {color : 'linear-gradient(rgba(205, 231, 255, 0.0784314) 0%, rgba(0, 63, 104, 0.55) 70%)',
						  src : '/hebei/resources/login/css/video/clearN.mp4'},
			},
			getWheather : function(){
				var $w = {
						id : null,
						name : null,
						areaName : null
				};
				return $w;
			}
			
	};
	
	
	$.extend({
		WeatherAgent : function(){
			var weather = new Weather();
			weather.init();
		}
	});
	window.onload = $.WeatherAgent();
	
});