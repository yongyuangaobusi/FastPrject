


function getReport(station){
	var date = new Date();
	if(date.getHours()>=17){
		 var time = getTitleFormat(date)+" 17时发布";
		 var title = "未来三天滚动预报";
	     getInfoBy(station,time,-1,3,title,1); 
	}else if(date.getHours()>=5){
		 var time =  getTitleFormat(date)+" 05时发布"; // 2017年6月1日08时发布未来三天滚动预报
		 var title = "未来三天滚动预报";
		 getInfoBy(station,time,-1,3,title,0); 
	}else{
		 date.setDate(date.getDate()-1);
		 var time = getTitleFormat(date)+"  17时发布";
		 var title = "未来三天滚动预报";
		 getInfoBy(station,time,-2,3,title,1); // 昨天20时数据
	}
}

function getInfoBy(station,time,tag,period,title,fag){
    $.post("WeatherReport/get72WeatherInfo", {type:station}, function(data, textStatus) {
	$("#WeatherInfo").html("");
    var dataObj=eval("("+data+")");
    var day="日(白)"; var night="日(夜)";
    var Info = "<tr style='font-size:18px'><th style='text-align:center;'>站名</th>" ;       
	var days =  getDayFormat(period+1,tag).split(",");
	if(fag==0){
	   for(var i=0;i<period;i++ ){
			  Info = Info+"<th style='text-align:center;'>"+days[i]+day+"-"+days[i]+night+"</th>";
	   }
	}else if(fag==1){
       for(var i=0;i<period;i++ ){
		  Info = Info+"<th style='text-align:center;'>"+days[i]+night+"-"+days[i+1]+day+"</th>";
	   }
	}
    Info = Info+"</tr>"
    var weatherInfo = Info; 
 	
    for(var j=0;j<dataObj.length;j++){
			weatherInfo = weatherInfo+"<tr><td  style='width:123px;border-bottom:1px solid #ccc'>"+dataObj[j].station+"</td>";
			for(var i0=0;i0<period;i0++){
			var warn= getWarnInfo(dataObj[j].date[i0].level);
		    var imgs = dataObj[j].date[i0].imge.split(",");
			if(imgs.length>1){
				weatherInfo = weatherInfo+"<td style='width:123px;padding-top:10px;border-bottom:1px solid #ccc' class='"+warn+"'><img src='img/weathericonsmall/"+imgs[0]+"' weith='30' height='40' /><img src='img/weathericonsmall/"+imgs[1]+"' weith='30' height='40' /><br>";
			}else{
				weatherInfo = weatherInfo+"<td style='width:123px;border-bottom:1px solid #ccc' class='"+warn+"'><img src='img/weathericonsmall/"+imgs[0]+"' weith='30' height='40' /><br>";
			}
			weatherInfo = weatherInfo+dataObj[j].date[i0].state+"<br>"+dataObj[j].date[i0].temparature+"&#8451;<br>"+dataObj[j].date[i0].windy+"</td>";
			}
			weatherInfo = weatherInfo+"</tr>";
    }
      
    $("#DateInfo").html(time);
    $("#title1").html(title);
	$("#WeatherInfo").html(weatherInfo);
	});
   
}



function getWarnInfo(state){
	
	var values = state.split(",");
	
	var blue = [8,9,21,22];
	var orange = [10,23,24];
	var red = [11,12,25];
	if(getBOR(blue,values[0])||getBOR(blue,values[1])){
		return "warnBlue";
	}
	if(getBOR(orange,values[0])||getBOR(orange,values[1])){
	  	return "warnOrange";
	}
	if(getBOR(red,values[0])||getBOR(red,values[1])){
		return "warnRed";
	}
	
	return "";
}

// 值 对应蓝色、橙色、红色
function getBOR(array,value){
	var fag = false;
	for(var i=0;i<array.length;i++){
	 	if(array[i]==value){
         fag = true;
         break;
	 	}
	}
	return fag;
}


// 返回 时间格式 05/12,05/13
function getDayFormat(num,fag){
	 var days= "";
	 var now=new Date();
	 now.setDate(now.getDate()+fag);
	 for(var i=0;i<num;i++){
		now.setDate(now.getDate()+1);
		days=days+getFormat(now)+","
	 }
	 return days.substr(0,days.length-1);
}

function getFormat (date) {  
    var m = date.getMonth() + 1;  
    m = m < 10 ? '0' + m : m;  
    var d = date.getDate();  
    d = d < 10 ? ('0' + d) : d;  
  //  return  m + '/' + d;  
     return  d;  
}

function getTimeDate(seconds){
	var date = new Date(seconds);
	return  getTitleFormat(date);
}

function getTitleFormat (date) {  
    var y = date.getYear()+1900;
	var m = date.getMonth() + 1;  
    m = m < 10 ? '0' + m : m;  
    var d = date.getDate();  
    d = d < 10 ? ('0' + d) : d;  
    return  y+'年'+m+'月'+d+'日';  
} 

function ww3(date){  
    var y = date.getFullYear();  
    var m = date.getMonth()+1;  
    var d = date.getDate();  
    var h = date.getHours();  
  //  var str = y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d)+':'+(h<10?('0'+h):h);  
    var str = y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d);  
    return str+' 00:00:00';  
}  






