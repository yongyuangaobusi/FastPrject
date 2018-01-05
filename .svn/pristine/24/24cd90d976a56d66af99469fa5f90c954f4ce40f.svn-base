/*table_tool.js
 * 
 * */

if( stationTool ){
	stationTool = null;
}
var stationTool = {
		getPeriodIndex:function(){
			debugger;
			var index = null;
			for( var i = 0 ; i<$(".period").length; i++ ){
				if( $(".period").eq(i).hasClass("icon-radio-clk") ){
					index = i ;
					break;
				}
			}
			return index;
		},
		firstTime:false,
		initStationId:null,
		stationSel:function(a,b,c,d){
			debugger;
			stationTool.areaCode = null;
			var location = GridPanel_PageParam.location;
			if( $(".specific_tool[name='freeArea']").hasClass("trigger-on") ||  $(".specific_tool[name='brush']").hasClass("trigger-on")) return false;
			if($(".specific_tool[name='contourLine']").hasClass("trigger-on")) return false;
			if( !(b.lat>location.startLat&&b.lat<location.endLat&&b.lon>location.startLon&&b.lon<location.endLon )){
				return false;
			}
			var type = false;
			if( d ) stationTool.areaCode = d;
			stationTool.initStationId = b.stationId;
			stationTool.stationName = b.stationName;
			stationTool.lat = b.lat;
			stationTool.lon = b.lon;
			if( type ){
				showChartCorrect();
			}else{
				$.modal.show({
					id:"chartShow",//主键id
					title:"数据展示",//标题
					container: 'nPage', //加载容器
					backdrop:true,
					//m_left:"300px",//left;
					m_top:"20px",//top;
					url:G_CONTEXT.contextPath+"correct/chartShow.do",//加载url，在项目中可以是jsp或者是url链接
					width : 1280,
					height:800
				});
				
			}
		},
}





















