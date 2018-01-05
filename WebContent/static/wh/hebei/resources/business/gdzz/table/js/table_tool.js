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
			stationTool.channel=b.channel;
			
//			var url="";
//			data={};
//			if(b.channel="EDA"){
//				url="/shplatform/FlControl/getDay.action";
//				data.stationId=b.stationId;
//				
//			}else{
//				url="/shplatform/FlControl/getDay.action";
//				data.id=1;
//				data.page=1;
//				data.rows=100;
//			}
//			$.ajax({
//				type:'POST',
//				url:url,
//				dataType:"json",
//				data:{"id":1,"page":1,"rows":100},
//				success:function(tResult){
//					
//					return tResult;
//				}
//			});
			
			return "testdtd";
		},
}





















