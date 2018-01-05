$(function(){
	//页面自适应
	window.onresize = autohw;
	autohw();
})
function autohw(){
	var width = $(window).width();	
	var height = $(window).height();	
	$("#main").width(width);
	$("#main").height(height);
	$("#row_main").height(height-79);
	if(width>=900&&width<=1280){
		$("#head").css("margin-top",0);
	}
	if(width>1280&&width<=1440){
		$("#head").css("margin-top",50);
	}
	if(width>1440&&width<=1920){
		$("#head").css("margin-top",70);
	}
}