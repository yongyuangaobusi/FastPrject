<!DOCTYPE HTML PUBLIC "-//W3C//Dtd HTML 4.01 transitional//EN">
<%@ page contentType="text/html; charset=UTF-8" %>
<%
    String path = request.getContextPath();
    String baseurl = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
%>
<html>
<head>
    <base href="<%=baseurl%>">
    <title>自动化系统</title>
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE10"/>
    <meta name="renderer" content="webkit|ie-comp|ie-stand">
    <link rel="stylesheet" type="text/css" href="static/ljf/css/iconfont.css">
    <link rel="stylesheet" type="text/css" href="static/ljf/css/timePicker.css">
    <script type="text/javascript" src="js/jquery-1.7.2.min.js"></script>
	

    <style type="text/css">
        html,body{
			width: 100%;
			height: 100%;
			font-family: "微软雅黑";
			background: #E3E3E5;
			min-width: 1660px;
		}
		*{
			margin: 0;
			padding: 0;
		}
		
		.page-top{
			width: 100%;
			height: 40px;
			text-align: center;
			line-height: 40px;
			background: #D8E8F8;
			color: white;
			position: relative;
		}
		.page-top .page-top-title{
			font-size: 20px;
			font-weight: 900;
			color: #4FBBFE;
		}
		.page-top .page-top-close{
			position: absolute;
			top: 5px;
			right: 5px;
			width: 30px;
			height: 30px;
			text-align: center;
			line-height: 30px;
			border-radius: 4px;
			background: #48B7FB;
			cursor: pointer;
		}
		
		.dialog-top{
			width: 100%;
			height: 40px;
			text-align: center;
			line-height: 40px;
			background: #D8E8F8;
			color: white;
			position: relative;
		}
		.dialog-top .dialog-top-title{
			font-size: 20px;
			font-weight: 900;
			color: #7CCBE6;
		}
		.dialog-top .dialog-top-close{
			position: absolute;
			top: 5px;
			right: 5px;
			width: 30px;
			height: 30px;
			text-align: center;
			line-height: 30px;
			border-radius: 4px;
			background: #7CCBE6;
			cursor: pointer;
		}
		.btn{
			padding: 5px 20px;
			padding-left: 10px;
		    border: none;
		    background: #3BB5FF;
		    color: white;
		    font-weight: 900;
		    border-radius: 4px;
		}
		.btn i{
			padding-right: 10px;
		}
		
		.content{
			width: 98%;
			/*height: 100%;*/
			padding: 20px 1%;
			display: flex;
		}
		.correction-data{
			width: ;
			float: left;
		}
		.correction-rule{
			margin: 0 auto;
		}
		.correction-operate{
			position: relative;
		}
		.correction-operate button{
			margin-top: 15px;
			font-size: 16px;
			font-weight: 200;
			cursor: pointer;
		}
		.correction-operate button i{
			margin-right: 5px;
			font-size: 18px;
		}
		.correction-operate #history-file{
			width: 127px;
			heigth: 30px;
			position: absolute;
			top: 15px;
			left: 50%;
			margin-left: -63.5px;
			opacity: 0;
			filter: alpha(opacity = 0)
		}
		
		table{
			background: #DAEEF3;
		}  
		table tr:hover{
			background: #E3E2CD;
		}
   		tr{
   			background: #FFFFFF;
		}  
		th{
			text-align: center !important;
		}
		td,th{
			padding: 2px 5px;
			text-align: right;
		}
		.correction-data tr td:nth-child(11),td:nth-child(12),td:nth-child(13){
			background: #D1FFD0;
		}
		
		#container{
			margin: 20px auto 0 20px
		}
		.time-picker{
			width: 38px;
			float: left;
		}
		.time-picker-middle{
			float: left;
		}
		
		#uploadForm{
			overflow: hidden;
		}
		/* #uploadForm .btn{
			position: relative;
			width: 100px;
			float: left;
			margin-top: 15px
			
		} */
		/* #uploadForm .btn input{
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			opacity: 0;
			filter: alpha(opacity=0)
		} */
		.correction-operate table td{
			text-align: center;
		}
		.correction-operate table{
			margin: 0 auto;
			background: #E3E3E5;
		}
		.correction-operate table tr{
			background: #E3E3E5;
		}
		.selectFile div{
			position: relative;
			width: 100px;
			margin-top: 15px;
		}
		.selectFile div input{
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			opacity: 0;
			filter: alpha(opacity=0)
		}
		#date{
			width: 110px;
		    height: 30px;
		    border-radius: 5px;
		    border: 1px solid #ccc;
		    text-align: center;
		    margin-top: 15px;
		}
    </style>
</head>
<body>
	<!--头部		start-->
	<div class="page-top">
		<p class="page-top-title">数据订正</p>
		<div class="page-top-close" onclick="window.close();">X</div>
	</div>
	<!--头部		end-->
	
	<!--内容-->
	<div class="content">
		<!--订正前后数据		start-->
		<div class="correction-data">
			<table class="tbcontainer">
				<tr> 
					<th>序号</th>
			        <th>日期</th>
			        <th>总辐射</th> 
			        <th>散射辐射</th>
			        <th>垂直辐射</th>
			        <th>风速</th>
			        <th>风向</th>
			        <th>温度</th>
			        <th>湿度</th>
			        <th>气压</th>
			        <th>总辐射(订正)</th>
			        <th>散射辐射(订正)</th>
			        <th>垂直辐射(订正)</th>
			    </tr>
				<!-- <tr>
					<td>1</td>
					<td>200708000000</td>
					<td>000.98</td>
					<td>300.00</td>
					<td>000.00</td>
					<td>0.00</td>
					<td>000.00</td>
					<td>00.00</td>
					<td>0.00</td>
					<td>000.00</td>
					<td>000.00</td>
					<td>000.00</td>
					<td>000.00</td>
				</tr> -->
			</table>
		</div>
		<!--订正前后数据		end-->
		
		<div style="flex: 1;text-align: center;position:relative;">
			<!--订正规则		start-->
			<!--<div class="correction-rule">-->
				<table class="correction-rule tbcontainer">
					<tr>
						<th>订正日期</th>
						<th>订正时次</th>
						<th>订正系数</th>
					</tr>
					<!-- <tr>
						<td>9月/5日</td>
						<td class="correction-time">
							<input type="text" class="time-picker correction-time-start" />
							<span class="time-picker-middle">-</span>
							<input type="text" class="time-picker correction-time-end" />
						</td>
					</tr>
					<tr>
						<td>9月/5日</td>
					</tr>
					<tr>
						<td>9月/5日</td>
					</tr>
					<tr>
						<td>9月/5日</td>
					</tr>
					<tr>
						<td>9月/5日</td>
					</tr>
					<tr>
						<td>9月/5日</td>
					</tr> -->
				</table>
			<!--</div>-->
			<!--订正规则		end-->
			<br />
			<!--订正操作		start-->
			<div class="correction-operate">
				<table cellspacing="0" cellpadding="0" bgcolor="#E3E3E5">
					<tr>
						<td><input id ="date" value="" placeholder="请输入查询日期" /></td>
						<td><button class="btn" id="search"><i class="iconfont icon-lishi"></i>开始查询</button></td>
					</tr>
					<tr>
						<td></td>
						<td><button class="btn" id="by-table-correction"><i class="iconfont icon-dingzheng"></i>按表订正</button></td>
					</tr>
					<tr>
						<td></td>
						<td><button class="btn" id="hightchartLineShow"><i class="iconfont icon-tubiaozhexiantu"></i>折线图示</button></td>
					</tr>
					<tr>
						<td></td>
						<td><button class="btn" id="save-file"><i class="iconfont icon-baocun"></i>保存文件</button></td>
					</tr>
					<form id= "uploadForm" > 
					<tr>
						
						<td class="selectFile"><div class="btn" >选择上传文件<input type="file" name="myfiles"/> </div></td>
						<td><button class="btn" onclick="doUpload()"><i class="iconfont icon-shangchuan"></i>开始上传</button></td>
						
					</tr></form> 
				</table>
				
			
			
			
			
				<!-- <input id ="date" value="20170911" />
				<button class="btn" id="search"><i class="iconfont icon-lishi"></i>历史文件</button><br />
				<input id ="date" value="20170911" />
				<button class="btn" id="by-table-correction"><i class="iconfont icon-dingzheng"></i>按表订正</button><br />
				<input id ="date" value="20170911" />
				<button class="btn" id="hightchartLineShow"><i class="iconfont icon-tubiaozhexiantu"></i>折线图显示</button>
				<button class="btn" id="dianji">获取提交的数据</button>
				<input type="file" id="history-file" onchange="myfn()" />
				<input id ="date" value="20170911" />
				<button class="btn" id="save-file"><i class="iconfont icon-baocun"></i>保存文件</button><br />
				
				<form id= "uploadForm" > 
				<input id ="date" value="20170911" /> 
					<div class="btn" >选择上传文件<input type="file" name="myfiles"/> </div>
                    <button class="btn" onclick="doUpload()">上传</button>        
              		<input type="button" value="上传" onclick="doUpload()" />  
              	</form>  -->
			</div>
			<div id="container" style="position:absolute;right:10px;"></div>
				
				
 			</div>
 			<!--订正操作		end-->
			
				
			</div>
			
</body>
<script type="text/javascript">
$.post("/ShowWord/show.action",{},function(date){	
	
	  
	},"json");
//上传文件
function doUpload() {  
    var formData = new FormData($( "#uploadForm" )[0]);  
   $.ajax({  
         url: '/autoplatform/Downloadftp/upload.action' ,  
         type: 'POST',  
         data: formData,  
         async: false,  
         cache: false,  
         contentType: false,  
         processData: false,  
         success: function (returndata) {  
        	 if (returndata=="true") {
        		 alert("上传成功！");  
			}else {
				alert("上传失败，请确认已选择正确文件！");  
			}
         },  
         error: function (returndata) {  
        	 alert("上传失败，请确认已选择正确文件！");  
         }  
    }); 
}  


//点击折线图显示
$("#hightchartLineShow").on("click",function(){
	var op;
	var data=new Array();
	var dateDataArr = []
	$(".date-data").each(function(){
		dateDataArr.push($(this).html())
	
	})
  	$(".total-radiation").each(function(){
		totalRadiationArr.push($(this).html())
	})
	console.log(dateDataArr)
	console.log(totalRadiationArr)
	for (var i = 0; i < dateDataArr.length; i++) {
		var s=dateDataArr[i];
		var q=s.substring(0,4) 
		var p=s.substring(4,6) 
		var xk=parseInt(p)-1
		
		
		var o=s.substring(6,8) 
	    var n=s.substring(8,10) 
	    var m=s.substring(10,12) 
		s="Date.UTC("+q+","+String(xk)+","+o+","+n+","+m+")";
		data.push([s,totalRadiationArr[i]]);
	
	}
	
	op=JSON.stringify(data)
	op = op.replace(/\"/g, "");
	var myop = strToObj(op)
	function strToObj(json){ 
        return eval("("+json+")"); 
	}
	 $('#container').highcharts({
         chart: {
             zoomType: 'x'
         },
         title: {
             text: '总辐射图'
         },
         subtitle: {
             text: document.ontouchstart === undefined ?
             '鼠标拖动可以进行缩放' : '手势操作进行缩放'
         },
         xAxis: {
             type: 'datetime',
             dateTimeLabelFormats: {
                 millisecond: '%H:%M:%S.%L',
                 second: '%H:%M:%S',
                 minute: '%H:%M',
                 hour: '%H:%M',
                 day: '%m-%d',
                 week: '%m-%d',
                 month: '%Y-%m',
                 year: '%Y'
             }
         },
         tooltip: {
             dateTimeLabelFormats: {
                 millisecond: '%H:%M:%S.%L',
                 second: '%H:%M:%S',
                 minute: '%H:%M',
                 hour: '%H:%M',
                 day: '%Y-%m-%d',
                 week: '%m-%d',
                 month: '%Y-%m',
                 year: '%Y'
             }
         },
         yAxis: {
             title: {
                 text: '辐射度'
             }
         },
         legend: {
        	        layout: 'vertical',
        	        align: 'right',
        	        verticalAlign: 'middle',
        	        borderWidth: 0
         },
         plotOptions: {
        	
             /* series: 
             {
            	 turboThreshold:90000 ,
             } */
             //set 0 to disable the cheack
     
             area: {
                 fillColor: {
                     linearGradient: {
                         x1: 0,
                         y1: 0,
                         x2: 0,
                         y2: 1
                     },
                     stops: [
                         [0, Highcharts.getOptions().colors[0]],
                         [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                     ]
                 },
                 marker: {
                     radius: 2
                 },
                 lineWidth: 1,
                 states: {
                     hover: {
                         lineWidth: 1
                     }
                 },
                 threshold: null,
                
             }
         },
         series: [{
        	 turboThreshold:90000,
             type: 'area',
             name: '总辐射',
             data: myop
         } ]
     });
 });


//保存txt文件 （此方法现在无用）
$("#save-file").on("click",function(){
	var myjsona = []
	for(i=1;i<$(".correction-data tr").length;i++){
		//for(var j=1;j<$(".correction-data").rows[i].cells.length;j++){
			/* var myjson = {};
			myjson.data1 = $(".correction-data tr").eq(i).children("td:eq(1)").html();
			myjson.data2 = $(".correction-data tr").eq(i).children("td:eq(2)").html();
			myjson.data3 = $(".correction-data tr").eq(i).children("td:eq(3)").html();
			myjson.data4 = $(".correction-data tr").eq(i).children("td:eq(4)").html();
			myjson.data5 = $(".correction-data tr").eq(i).children("td:eq(5)").html();
			myjson.data6 = $(".correction-data tr").eq(i).children("td:eq(6)").html();
			myjson.data7 = $(".correction-data tr").eq(i).children("td:eq(7)").html();
			myjson.data8 = $(".correction-data tr").eq(i).children("td:eq(8)").html();
			myjson.data9 = $(".correction-data tr").eq(i).children("td:eq(9)").html();
			myjson.data10 = $(".correction-data tr").eq(i).children("td:eq(10)").html();
			myjson.data11 = $(".correction-data tr").eq(i).children("td:eq(11)").html();
			myjson.data12 = $(".correction-data tr").eq(i).children("td:eq(12)").html();
		//}
			myshuju.push(myjson) */
			
			var data1 = $(".correction-data tr").eq(i).children("td:eq(1)").html();
			var data2 = $(".correction-data tr").eq(i).children("td:eq(2)").html();
			var data3 = $(".correction-data tr").eq(i).children("td:eq(3)").html();
			var data4 = $(".correction-data tr").eq(i).children("td:eq(4)").html();
			var data5 = $(".correction-data tr").eq(i).children("td:eq(5)").html();
			var data6 = $(".correction-data tr").eq(i).children("td:eq(6)").html();
			var data7 = $(".correction-data tr").eq(i).children("td:eq(7)").html();
			var data8 = $(".correction-data tr").eq(i).children("td:eq(8)").html();
			var data9 = $(".correction-data tr").eq(i).children("td:eq(9)").html();
			var data10 = $(".correction-data tr").eq(i).children("td:eq(10)").html();
			var data11 = $(".correction-data tr").eq(i).children("td:eq(11)").html();
			var data12 = $(".correction-data tr").eq(i).children("td:eq(12)").html();
			
			var myNowDataOne;
			myNowDataOne = data1 +" "+ data2 +" "+ data3 +" "+ data4 +" "+ data5 +" "+ data6 +" "+ data7 +" "+ data8 +" "+ data9 +" "+ data10 +" "+ data11 +" "+ data12 +"\r\n"
			//myNowData += myNowDataOne
			//myNowDataOne += myNowDataOne
			myjsona.push(myNowDataOne)
	}
	var myjsonaa = '';
	 $.each(myjsona, function (n,value) {
         //alert(n+' '+value);
         var trs = "";
        trs += value;
        myjsonaa += trs;
    });
	var txtshuju = myjsonaa;
	
	function getYesterday() { 
		dd = new Date(); 
	    dd.setDate(dd.getDate() -1);//获取AddDayCount天后的日期 
	    var y = dd.getFullYear();
	    var m = dd.getMonth()+1;//获取当前月份的日期 
	    var d = dd.getDate(); 
	    var mm,dd;
	    if(m.toString().length == 1){
	    	mm = "0"+m
	    }else{
	    	mm = m
	    }
	    if(d.toString().length == 1){
	    	dd = "0"+d
	    }else{
	    	dd = d
	    }
	    
	    //return y+"-"+m+"-"+d; 
	    return "HBCDEG-sun-" +y+mm+dd+"20";
	}
	var namePart = getYesterday()
	//var namePart = getNowFormatDate();
	var name = namePart + ".txt";
	var blob = new Blob([txtshuju], {type: "text/plain;charset=utf-8"});
	saveAs(blob, name);
})
$("#search").on("click",function(){
	
   var s=$("#date").val();
	$.post("Downloadftp/down.action",{"temp":s},function(data){
	
		//$(".correction-data table").append('<tr><th>序号</th><th>日期</th><th>总辐射</th><th>散射辐射</th><th>垂直辐射</th><th>风速</th><th>风向</th><th>温度</th><th>湿度</th><th>气压</th><th>总辐射(订正)</th><th>散射辐射(订正)</th><th>垂直辐射(订正)</th></tr>')
		if (data.length<=0) {
			alert("输入条件未查出数据！！")  	
		}else {
			$(".correction-data table").find("tr:not(:first)").remove();
		var myDataArr = [];
		for(var i=0;i<data.length;i++){
			var putStr = data[i][i].replace(/\s+/g," ").split(" ");
			
			var myjson = {};
			myjson.date1 = putStr[0];
			myjson.date2 = putStr[1];
			myjson.date3 = putStr[2];
			myjson.date4 = putStr[3];
			myjson.date5 = putStr[4];
			myjson.date6 = putStr[5];
			myDataArr.push(myjson)
			
			
			
			var putStrNum = i+1;
			var corrention = '';
			corrention += '<tr>';
			corrention += '<td class="">'+putStrNum+'</td>';					//序号
			corrention += '<td class="date-data">'+putStr[0]+'</td>';			//日期
			corrention += '<td class="total-radiation">'+putStr[1]+'</td>';		//总辐射
			corrention += '<td class="scattering-radiation">'+putStr[2]+'</td>';//散射辐射
			corrention += '<td class="vertical-radiation">'+putStr[3]+'</td>';	//垂直辐射
			corrention += '<td>'+putStr[4]+'</td>';								//风速
			corrention += '<td>'+putStr[5]+'</td>';								//风向
			corrention += '<td>'+putStr[6]+'</td>';								//温度
			corrention += '<td>'+putStr[7]+'</td>';								//湿度
			corrention += '<td>'+putStr[8]+'</td>';								//气压
			corrention += '<td class="correction-total-radiation"></td>';		//订正总辐射
			corrention += '<td class="correction-scattering-radiation"></td>';	//订正散射辐射
			corrention += '<td class="correction-vertical-radiation"></td>';	//订正垂直辐射
			corrention += '</tr>';
			$(".correction-data table").append(corrention);
		}
		getSevenDay(1)
		function getSevenDay(thisnum){
			$(".correction-rule").find("tr:not(:first)").remove();
				var dd;
				if(thisnum == 1){
					 var dateY = $(".tbcontainer .date-data").eq(0).html().substring(0,4)
					 var dateM = $(".tbcontainer .date-data").eq(0).html().substring(4,6)
					 var dateD = $(".tbcontainer .date-data").eq(0).html().substring(6,8)
					 var newDate = dateY +'/'+ dateM +'/'+ dateD
					 console.log(dateY)
					 console.log(dateM)
					 console.log(dateD)
					dd = new Date(newDate); 
				}else{
					dd = new Date(); 
				}
				console.log(dd)
				for(var i=0;i<7;i++){
					var putDate = GetDateStr(i);
					var correctionRuleHtml = '';
					correctionRuleHtml += '<tr>';
					correctionRuleHtml += '<td class="correction-date">'+putDate+'</td>';									//订正日期
					correctionRuleHtml += '<td class="correction-time">';													//订正时次
					correctionRuleHtml += '<input type="text" class="time-picker correction-time-start" value="00:00" />';	//订正时次-开始时间
					correctionRuleHtml += '<span class="time-picker-middle">-</span>';										//
					correctionRuleHtml += '<input type="text" class="time-picker correction-time-end" value="23:45" />';	//订正时次-结束时间
					correctionRuleHtml += '</td>';
					correctionRuleHtml += '<td class="correction-coefficient">0.5</td>';									//订正系数
					correctionRuleHtml += '</tr>';
					$(".correction-rule").append(correctionRuleHtml);
				}
				$(".time-picker").hunterTimePicker();
			}
		function GetDateStr(AddDayCount) { 
			var dateY = $(".tbcontainer .date-data").eq(0).html().substring(0,4)
			 var dateM = $(".tbcontainer .date-data").eq(0).html().substring(4,6)
			 var dateD = $(".tbcontainer .date-data").eq(0).html().substring(6,8)
			 var newDate = dateY +'/'+ dateM +'/'+ dateD
			dd = new Date(newDate); 
		    dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期 
		    var y = dd.getFullYear();
		    var m = dd.getMonth()+1;//获取当前月份的日期 
		    var d = dd.getDate(); 
		    var mm,dd;
		    if(m.toString().length == 1){
		    	mm = "0"+m
		    }else{
		    	mm = m
		    }
		    if(d.toString().length == 1){
		    	dd = "0"+d
		    }else{
		    	dd = d
		    }
		    
		    //return y+"-"+m+"-"+d; 
		    return mm+"月/"+dd+"日";
		}
		}
	},"json")
	
})

//获取当前日期格式为YYYYMMDD
function getNowFormatDate(){
    var day = new Date();
    var Year = 0;
    var Month = 0;
    var Day = 0;
    var CurrentDate = "";
    Year= day.getFullYear();//支持IE和火狐浏览器.
    Month= day.getMonth()+1;
    Day = day.getDate();
    CurrentDate += Year;
    if (Month >= 10 ){
     CurrentDate += Month;
    }
    else{
     CurrentDate += "0" + Month;
    }
    if (Day >= 10 ){
     CurrentDate += Day ;
    }
    else{
     CurrentDate += "0" + Day ;
    }
    return "MNGL_"+CurrentDate+"20";
 }
 
 
//var myshuju = [];
var myNowData;
//获取所有数据
function getAllData(){
	var myjsona = []
	for(i=1;i<$(".correction-data tr").length;i++){
		//for(var j=1;j<$(".correction-data").rows[i].cells.length;j++){
			/* var myjson = {};
			myjson.data1 = $(".correction-data tr").eq(i).children("td:eq(1)").html();
			myjson.data2 = $(".correction-data tr").eq(i).children("td:eq(2)").html();
			myjson.data3 = $(".correction-data tr").eq(i).children("td:eq(3)").html();
			myjson.data4 = $(".correction-data tr").eq(i).children("td:eq(4)").html();
			myjson.data5 = $(".correction-data tr").eq(i).children("td:eq(5)").html();
			myjson.data6 = $(".correction-data tr").eq(i).children("td:eq(6)").html();
			myjson.data7 = $(".correction-data tr").eq(i).children("td:eq(7)").html();
			myjson.data8 = $(".correction-data tr").eq(i).children("td:eq(8)").html();
			myjson.data9 = $(".correction-data tr").eq(i).children("td:eq(9)").html();
			myjson.data10 = $(".correction-data tr").eq(i).children("td:eq(10)").html();
			myjson.data11 = $(".correction-data tr").eq(i).children("td:eq(11)").html();
			myjson.data12 = $(".correction-data tr").eq(i).children("td:eq(12)").html();
		//}
			myshuju.push(myjson) */
			
			var data1 = $(".correction-data tr").eq(i).children("td:eq(1)").html();
			var data2 = $(".correction-data tr").eq(i).children("td:eq(2)").html();
			var data3 = $(".correction-data tr").eq(i).children("td:eq(3)").html();
			var data4 = $(".correction-data tr").eq(i).children("td:eq(4)").html();
			var data5 = $(".correction-data tr").eq(i).children("td:eq(5)").html();
			var data6 = $(".correction-data tr").eq(i).children("td:eq(6)").html();
			var data7 = $(".correction-data tr").eq(i).children("td:eq(7)").html();
			var data8 = $(".correction-data tr").eq(i).children("td:eq(8)").html();
			var data9 = $(".correction-data tr").eq(i).children("td:eq(9)").html();
			var data10 = $(".correction-data tr").eq(i).children("td:eq(10)").html();
			var data11 = $(".correction-data tr").eq(i).children("td:eq(11)").html();
			var data12 = $(".correction-data tr").eq(i).children("td:eq(12)").html();
			
			var myNowDataOne;
			myNowDataOne = data1 +" "+ data2 +" "+ data3 +" "+ data4 +" "+ data5 +" "+ data6 +" "+ data7 +" "+ data8 +" "+ data9 +" "+ data10 +" "+ data11 +" "+ data12 +" "
			//myNowData += myNowDataOne
			//myNowDataOne += myNowDataOne
			myjsona.push(myNowDataOne)
	}
	var myjsonaa = '';
	 $.each(myjsona, function (n,value) {
         //alert(n+' '+value);
         var trs = "";
        trs += value;
        myjsonaa += trs;
    });
	 //myjsonaa = tbody
	//myNowData = strToObj(myNowData)
	//function strToObj(json){ 
    //    return eval("("+json+")"); 
	//}
	//myNowData = myNowDataOne
	//alert(typeof myNowData)
	//myNowData = parseInt(myNowData)
	//$(".correction-data td").each(function(){
		//console.log($(this).html())
	//})
}
/* $("#dianji").on("click",function(){
	
	for(i=1;i<$(".correction-data tr").length;i++){
		//for(var j=1;j<$(".correction-data").rows[i].cells.length;j++){
			var myjson = {};
			myjson.data1 = $(".correction-data tr").eq(i).children("td:eq(1)").html();
			myjson.data2 = $(".correction-data tr").eq(i).children("td:eq(2)").html();
			myjson.data3 = $(".correction-data tr").eq(i).children("td:eq(3)").html();
			myjson.data4 = $(".correction-data tr").eq(i).children("td:eq(4)").html();
			myjson.data5 = $(".correction-data tr").eq(i).children("td:eq(5)").html();
			myjson.data6 = $(".correction-data tr").eq(i).children("td:eq(6)").html();
			myjson.data7 = $(".correction-data tr").eq(i).children("td:eq(7)").html();
			myjson.data8 = $(".correction-data tr").eq(i).children("td:eq(8)").html();
			myjson.data9 = $(".correction-data tr").eq(i).children("td:eq(9)").html();
			myjson.data10 = $(".correction-data tr").eq(i).children("td:eq(10)").html();
			myjson.data11 = $(".correction-data tr").eq(i).children("td:eq(11)").html();
			myjson.data12 = $(".correction-data tr").eq(i).children("td:eq(12)").html();
		//}
			myshuju.push(myjson)
	}
	
	
	console.log(myshuju)
	//$(".correction-data td").each(function(){
		//console.log($(this).html())
	//})
}) */


//读取txt文件内容

var totalRadiationArr = [];				//总辐射
var correctionTotalRadiationArr = [];   //订正后所有总辐射
$(function(){
function getSevenDay(thisnum){
	$(".correction-rule").find("tr:not(:first)").remove();
		if(thisnum == 1){
			 var dateY = $(".tbcontainer .date-data").eq(0).html().substring(0,4)
			 var dateM = $(".tbcontainer .date-data").eq(0).html().substring(5,6)
			 var dateD = $(".tbcontainer .date-data").eq(0).html().substring(7,8)
			 var newDate = dateY +'/'+ dateM +'/'+ dateD
			var dd = new Date(newDate); 
		}else{
			var dd = new Date(); 
		}
		console.log(dd)
		for(var i=0;i<7;i++){
			var putDate = GetDateStr(i);
			var correctionRuleHtml = '';
			correctionRuleHtml += '<tr>';
			correctionRuleHtml += '<td class="correction-date">'+putDate+'</td>';									//订正日期
			correctionRuleHtml += '<td class="correction-time">';													//订正时次
			correctionRuleHtml += '<input type="text" class="time-picker correction-time-start" value="00:00" />';	//订正时次-开始时间
			correctionRuleHtml += '<span class="time-picker-middle">-</span>';										//
			correctionRuleHtml += '<input type="text" class="time-picker correction-time-end" value="23:45" />';	//订正时次-结束时间
			correctionRuleHtml += '</td>';
			correctionRuleHtml += '<td class="correction-coefficient">0.5</td>';									//订正系数
			correctionRuleHtml += '</tr>';
			$(".correction-rule").append(correctionRuleHtml);
		}
		$(".time-picker").hunterTimePicker();
	}
	$.post("Downloadftp/down.action?temp=new",{},function(data){
		var myDataArr = [];
		for(var i=0;i<data.length;i++){
			var putStr = data[i][i].replace(/\s+/g," ").split(" ");
			
			var myjson = {};
			myjson.date1 = putStr[0];
			myjson.date2 = putStr[1];
			myjson.date3 = putStr[2];
			myjson.date4 = putStr[3];
			myjson.date5 = putStr[4];
			myjson.date6 = putStr[5];
			myDataArr.push(myjson)
			
			
			
			var putStrNum = i+1;
			var corrention = '';
			corrention += '<tr>';
			corrention += '<td class="">'+putStrNum+'</td>';					//序号
			corrention += '<td class="date-data">'+putStr[0]+'</td>';			//日期
			corrention += '<td class="total-radiation">'+putStr[1]+'</td>';		//总辐射
			corrention += '<td class="scattering-radiation">'+putStr[2]+'</td>';//散射辐射
			corrention += '<td class="vertical-radiation">'+putStr[3]+'</td>';	//垂直辐射
			corrention += '<td>'+putStr[4]+'</td>';								//风速
			corrention += '<td>'+putStr[5]+'</td>';								//风向
			corrention += '<td>'+putStr[6]+'</td>';								//温度
			corrention += '<td>'+putStr[7]+'</td>';								//湿度
			corrention += '<td>'+putStr[8]+'</td>';								//气压
			corrention += '<td class="correction-total-radiation"></td>';		//订正总辐射
			corrention += '<td class="correction-scattering-radiation"></td>';	//订正散射辐射
			corrention += '<td class="correction-vertical-radiation"></td>';	//订正垂直辐射
			corrention += '</tr>';
			$(".correction-data table").append(corrention);
		}
	},"json")
	
	/* 添加订正日期、时次、系数 */
	getSevenDay()
	

	//获取当前日期零点的时间戳 例如：2017/09/15 00:00:00
	var timeStamp = new Date(new Date().setHours(0, 0, 0, 0)).getTime()
	
	//时间戳转为 yyyymmddhhmm
	function timeStamp2String(time){
	    var datetime = new Date();
	    datetime.setTime(time);
	    var year = datetime.getFullYear();
	    var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
	    var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
	    var hour = datetime.getHours()< 10 ? "0" + datetime.getHours() : datetime.getHours();
	    var minute = datetime.getMinutes()< 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
	    var second = datetime.getSeconds()< 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
	    return year + "" + month + "" + date+""+hour+""+minute ;//+":"+second;
	}
	
	function changeNowTime(){
		for(var i=0;i<673;i++){
			$(".date-data").eq(i).html(timeStamp2String(timeStamp + 900000*i))
		}
	}
	
	//按表订正按钮
	
	$("#by-table-correction").on("click",function(){
		
		//var tableDateDataArr = [];
		//$(".date-data").each(function(){
		//	tableDateDataArr.push($(this).html())
		//})
		//for(var i=0;i<673;i++){
		//	$(".date-data").eq(i).html(timeStamp2String(timeStamp + 900000*i))
		//}
		
		
		
		
		var a1 =  $(".correction-time-end").prev().prev().val();
		var b1 = $(".correction-time-end").val();
		var date = new Date();
		var a = a1.split(":");
		var b = b1.split(":");
		if(date.setHours(a[0],a[1]) < date.setHours(b[0],b[1])){
		
			
		
			//var totalRadiationArr = [];				//总辐射
			var correctionCoefficientArr = [];		//订正系数
			//var correctionTotalRadiationArr = [];   //订正后所有总辐射
			
			var scatteringRadiationArr = []			//散射辐射
			var correntionScatteringRadiationArr = [] //订正后散射辐射
			
			var verticalRadiationArr = []			//垂直辐射
			var correntionVerticalRadiationArr = []	//订正后垂直辐射
			
			$(".total-radiation").each(function(){
				totalRadiationArr.push($(this).html())
			})
			$(".scattering-radiation").each(function(){
				scatteringRadiationArr.push($(this).html())
			})
			$(".vertical-radiation").each(function(){
				verticalRadiationArr.push($(this).html())
			})
			
			
			$(".correction-coefficient").each(function(){
				correctionCoefficientArr.push($(this).html())
			})
			
			/* $(".correction-total-radiation").each(function(){
				correctionTotalRadiationArr.push($(this).html())
			}) */
			
			
			for(var i=0;i<7;i++){
				var correctionTimeStart = $(".correction-time-start").eq(i).val().replace(/[^0-9]/ig,"");
				var correctionTimeEnd = $(".correction-time-end").eq(i).val().replace(/[^0-9]/ig,"");
				var correctionData = $(".correction-date").eq(i).text().replace(/[^0-9]/ig,"");
				
				var correctionStart = correctionData + correctionTimeStart;
				var correctionEnd = correctionData + correctionTimeEnd;
				
				var startIndex;	//开始下标（开始位置）
				var endIndex;	//结束下标（结束位置）
				$(".date-data").each(function(){
					if($(this).text().substr($(this).text().length-8) == correctionStart){
						startIndex = $(".date-data").index($(this));
						
					}
				})
				$(".date-data").each(function(){
					if($(this).text().substr($(this).text().length-8) == correctionEnd){
						endIndex = $(".date-data").index($(this));
					}
				})
				
				//console.log(startIndex)
				//console.log(endIndex)
				for(var ii=startIndex;ii<=endIndex+1;ii++){
					var oneHtml = (totalRadiationArr[ii]*correctionCoefficientArr[i]).toFixed(2);
					var twoHtml = (scatteringRadiationArr[ii]*correctionCoefficientArr[i]).toFixed(2);
					var threeHtml = (verticalRadiationArr[ii]*correctionCoefficientArr[i]).toFixed(2);
					
					$(".correction-total-radiation").eq(ii).html(oneHtml);
					$(".correction-scattering-radiation").eq(ii).html(twoHtml);
					$(".correction-vertical-radiation").eq(ii).html(threeHtml)
				}
				
			}
			
			getSevenDay(1)
			changeNowTime()
			contrastFigure()
		}else{
			showShadowNotice('请选择正确的时次')
		}
		
	})
	
	//对比图（总辐射和订正后的辐射）
	function contrastFigure(){
		
		var correctionTotalRadiationArr1 = [];   //订正后所有总辐射
		$(".correction-total-radiation").each(function(){
			correctionTotalRadiationArr1.push($(this).html())
		})
		
		var op;
		var correctionOp;
		var data=new Array();
		var correctionData = new Array();
		var dateDataArr = []
		$(".date-data").each(function(){
			dateDataArr.push($(this).html())
		
		})
		var totalRadiationArr1 = []
	  	$(".total-radiation").each(function(){
	  		totalRadiationArr1.push($(this).html())
		})
		//console.log(dateDataArr)
		//console.log(totalRadiationArr1)
		//console.log(correctionTotalRadiationArr1)
		for (var i = 0; i < dateDataArr.length; i++) {
			var s=dateDataArr[i];
			var q=s.substring(0,4) 
			var p=s.substring(4,6) 
			var xk=parseInt(p)-1
			
			
			var o=s.substring(6,8) 
		    var n=s.substring(8,10) 
		    var m=s.substring(10,12) 
			s="Date.UTC("+q+","+String(xk)+","+o+","+n+","+m+")";
			data.push([s,totalRadiationArr1[i]]);
			correctionData.push([s,correctionTotalRadiationArr1[i]]);
		}
		//console.log(data)
		//console.log(correctionData)
		op=JSON.stringify(data)
		op = op.replace(/\"/g, "");
		var myop = strToObj(op)
		correctionOp = JSON.stringify(correctionData)
		correctionOp = correctionOp.replace(/\"/g, "");
		//console.log(op)
		//console.log(correctionOp)
		var mycorrectionOp = strToObj(correctionOp);
		//console.log(myop)
		//console.log(mycorrectionOp)
		function strToObj(json){ 
	        return eval("("+json+")"); 
		}
		 $('#container').highcharts({
	         chart: {
	             zoomType: 'x'
	         },
	         title: {
	             text: '总辐射对比图'
	         },
	         subtitle: {
	             text: document.ontouchstart === undefined ?
	             '鼠标拖动可以进行缩放' : '手势操作进行缩放'
	         },
	         xAxis: {
	             type: 'datetime',
	             dateTimeLabelFormats: {
	                 millisecond: '%H:%M:%S.%L',
	                 second: '%H:%M:%S',
	                 minute: '%H:%M',
	                 hour: '%H:%M',
	                 day: '%m-%d',
	                 week: '%m-%d',
	                 month: '%Y-%m',
	                 year: '%Y'
	             }
	         },
	         tooltip: {
	             dateTimeLabelFormats: {
	                 millisecond: '%H:%M:%S.%L',
	                 second: '%H:%M:%S',
	                 minute: '%H:%M',
	                 hour: '%H:%M',
	                 day: '%Y-%m-%d',
	                 week: '%m-%d',
	                 month: '%Y-%m',
	                 year: '%Y'
	             }
	         },
	         yAxis: {
	             title: {
	                 text: '辐射度'
	             }
	         },
	         legend: {
	             enabled: false
	         },
	         plotOptions: {
	        	
	             /* series: 
	             {
	            	 turboThreshold:90000 ,
	             } */
	             //set 0 to disable the cheack
	     
	             area: {
	                 fillColor: {
	                     linearGradient: {
	                         x1: 0,
	                         y1: 0,
	                         x2: 0,
	                         y2: 1
	                     },
	                     stops: [
	                         [0, Highcharts.getOptions().colors[0]],
	                         [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
	                     ]
	                 },
	                 marker: {
	                     radius: 2
	                 },
	                 lineWidth: 1,
	                 states: {
	                     hover: {
	                         lineWidth: 1
	                     }
	                 },
	                 threshold: null,
	                
	             }
	         },
	         series: [{
	        	 turboThreshold:90000,
	             type: 'area',
	             name: '总辐射',
	             data: myop
	         },{
	        	 turboThreshold:90000,
	             type: 'area',
	             name: '订正后总辐射',
	             data: mycorrectionOp
	         }]
	     });
	}
	
	/* 获取日期并返回	a月/b日	格式 */
	function GetDateStr(AddDayCount) { 
	    var dd = new Date();
	    dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期 
	    var y = dd.getFullYear();
	    var m = dd.getMonth()+1;//获取当前月份的日期 
	    var d = dd.getDate(); 
	    var mm,dd;
	    if(m.toString().length == 1){
	    	mm = "0"+m
	    }else{
	    	mm = m
	    }
	    if(d.toString().length == 1){
	    	dd = "0"+d
	    }else{
	    	dd = d
	    }
	    
	    //return y+"-"+m+"-"+d; 
	    return mm+"月/"+dd+"日";
	}
});
</script>
</html>
