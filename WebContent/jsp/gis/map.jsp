	 <%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML >
<html>
<head>
	<base href="<%=basePath%>">
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<title>主页</title>
	<link rel="stylesheet" href="static/wh/test/css/style.css" />
	<script type="text/javascript" src="static/wh/test/js/jquery-1.7.2.min.js"></script>
</head>

<body style="padding: 0px;position: absolute;width: 100%;height:100%;margin: 0px;">
	<div>
		<div id="mapDiv" style="min-height:95%;padding: 0px;position: absolute;width: 100%;">
			<div id="nGis" class="toolbar_test" style="height: 100%;padding: 0px;position: absolute;width: 100%;">
		</div>
		<div id="warningDiv1" class="mWarnTit" style="position: absolute;top: 0;left: 0;z-index: 999;background: #2E78BA; font-size: 22px;  color: #fff;margin: 0;padding: 0;text-align: center;width: 100%;line-height: 50px;opacity: 0.8;">
            
             
        </div>
		<div class="chose choseElement">
			<input type="button" value="30分钟累计降水量" />
			<input type="button" value="24小时累计降雨量" />
			<input class="on" type="button" value="气温" />
			<input  type="button" value="相对湿度" />
			<input  type="button" value="风向风速" />
			<input  type="button" value="能见度" />
			<p>要素选择</p>
		</div>
		<br />
	
	
	<div id="win" style="display:none;">
		<div id="tt" class="easyui-tabs" style="width:100%;height:100%;">
        	
        	
    	</div>
	</div>
<div id="grid-legend" style="float:right;position:absolute; right:50px;bottom:10px;"></div>
  </div>
  </div>			
</div>
</div>
</body>

<script type="text/javascript">
var i=0;
var qybm="";
var pre="pre1h";
var userId,userType;

$(function(){
	
		
	addCookies12("chennel","tem");
		var myDate = new Date();
		//获取当前年
		var year=myDate.getFullYear();
		//获取当前月
		var month=myDate.getMonth()+1;
		//获取当前日
		var date=myDate.getDate(); 

		var now=year+'-'+ (Array(2).join('0') + month).slice(-2)+"-"+(Array(2).join('0') + date).slice(-2);
		
		userId=readCookies12("userid");
		userType=readCookies12("userType");
		
		
		 
		$(".mPreviousButton").hide();
		$(".mNextButton").hide();
		GIS.Init.initMap("nGis",function(){
			$.fn.gridPanel({flag : "init",type : "GE"});
			//GIS.Element.gpLayer("nGis",'f',true);
			refresh(30000);
			GIS.Element.gs("nGis");
			//$(".table-body-row .body-cell.cSelected").click();
		},null,null,"hebei","main",qybm);
		
		
		
		//refreshData1();
	});
function refresh(min){
	
	setTimeout(refreshTMin,min)
}
function refreshTMin(){
	
	getMapData("TMP","TMP","gridParam",false,"","pre1h","");
	self.setInterval(function()
	{
		//alert("wuhe");
		getMapData("TMP","TMP","gridParam",false,"","pre1h","");
		
	},1800000);
}
</script>
	
<link type="text/css" rel="stylesheet" href="http://121.28.82.197:7080/library_test/3.9/3.9/js/dojo/zgis/css/font.css"/>
<link type="text/css" rel="stylesheet" href="http://121.28.82.197:7080/library_test/3.9/3.9/js/dojo/dijit/themes/tundra/tundra.css"/>
<link type="text/css" rel="stylesheet" href="http://121.28.82.197:7080/library_test/3.9/3.9/js/esri/css/esri.css"/>
<link type="text/css" rel="stylesheet" href="http://121.28.82.197:7080/library_test/3.9/3.9/js/dojo/zgis/css/hebei.css"/>
<script type="text/javascript" src="http://121.28.82.197:7080/library_test/3.9/3.9/js/dojo/zgis/util/snap.svg-min.js"></script>
<script type="text/javascript" src="http://121.28.82.197:7080/library_test/3.9/3.9/init.js"></script>
<script type="text/javascript" src="http://121.28.82.197:7080/library_test/3.9/3.9/js/dojo/zgis/map_V0.1.js"></script>
<script type="text/javascript" src="http://121.28.82.197:7080/library_test/3.9/3.9/js/dojo/zgis/zcd/zcd.js"></script>
<script type="text/javascript" src="http://121.28.82.197:7080/library_test/3.9/3.9/js/dojo/zgis/util/wContour.js"></script>
<script type="text/javascript" src="http://121.28.82.197:7080/library_test/3.9/3.9/js/dojo/zgis/util/Contour.js"></script>
<script type="text/javascript" src="http://121.28.82.197:7080/library_test/3.9/3.9/js/dojo/zgis/util/canvg.js"></script>
<script type="text/javascript" src="http://121.28.82.197:7080/library_test/3.9/3.9/js/dojo/zgis/util/rgbcolor.js"></script>
<script type="text/javascript" src="http://121.28.82.197:7080/library_test/3.9/3.9/js/dojo/zgis/pagelayout/copyMap.js"></script>



<script type="text/javascript" src="static/wh/test/js/map_toolbar.js"></script>
<script type="text/javascript" src="static/wh/test/js/map_panel.js"></script>
<script type="text/javascript" src="static/wh/test/js/legend.js"></script>
<link href="static/wh/test/css/grid_panel.css" rel="stylesheet" type="text/css"/>
<link href="static/wh/test/css/grid_toolbar.css" rel="stylesheet" type="text/css"/>
<link href="static/wh/test/css/tool_panel.css" rel="stylesheet" type="text/css"/>
<script type="text/javascript" src="static/wh/test/js/map_main_jy.js"></script>



</html>