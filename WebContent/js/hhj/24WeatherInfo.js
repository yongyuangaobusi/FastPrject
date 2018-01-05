


function innitChar(){
	 Highcharts.setOptions({
	        lang: {
	           　 printChart:"打印图表",
	              downloadJPEG: "下载JPEG 图片" , 
	              downloadPDF: "下载PDF文档"  ,
	              downloadPNG: "下载PNG 图片"  ,
	              downloadSVG: "下载SVG 矢量图" , 
	              exportButtonTitle: "导出图片" 
	        }
	    });
	 $('#weatherline').highcharts({
	        chart: {
	            type: 'line'
	        },
	        title: {
	            text: ''
	        },
	        
	        xAxis: {
	            categories: ['17:00','18:00','19:00','20:00','21:00','22:00']
	        },
	        yAxis: {
	            title: {
	                text: '单位(oo)'
	            }
	        },
	        tooltip: {
	            crosshairs: true,
	            shared: true
	        },
	        plotOptions: {
	        	
	            line: {
	                marker: {
	                    radius: 4,
	                    lineWidth: 1
	                },
	                dataLabels: {
	                    enabled: true          // 开启数据标签
	                },
	                enableMouseTracking: true // 关闭鼠标跟踪，对应的提示框、点击事件会失效
	            }
	        },
	        legend:{
	            enabled: true
	        },
	        
	        series: [{
	            name: '总数',
	            type:'line',  
	            data: [4,4,7,12,4,50]
	        },{
	            name: '错误量',
	            type:'line',  
	            data: [1,2,2,4,4,5]
	        }]
	    });
}

function getSelections(){
	var ss = [];
	var rows = $('#smsManage').datagrid('getSelections');
	if(rows.length==0){
		$.messager.alert('提示信息', '请至少选择一行后进行发送！！！');	
	}else{
	for(var i=0; i<rows.length; i++){
		var row = rows[i];
		ss.push('{"id":"'+row.id+'","number":"'+row.number+'","content":"'+row.content+'","type":"'+row.type+'"}');
	}
	//  $.messager.alert('提示信息', '['+ss.join(',')+']');
	$.post("sendSms/sendMassages.action", {rows:'['+ss.join(',')+']'}, function(data, textStatus) {
    	if(data){
    		$('#smsManage').datagrid('reload');
    	}else{
    		$.messager.show({
				title : '提示！',
				msg : '服务器异常！！！'
			});
    	}
    }); 
	}
}



    // 求优化！！！
   function markMaxOrMin(value,row) {
	   if(value==0){
		 return   'background-color:#FFE4C4;color:red;';
	   }else{
	   var i1 = row.info0>row.info1?row.info0:row.info1;
	   var i2 = row.info2>row.info3?row.info2:row.info3;
	   var i3 = row.info4>row.info5?row.info4:row.info5;
	   var i4 = row.info6>row.info7?row.info6:row.info7;
	   
	   var j1 = i1>i2?i1:i2;
	   var j2 = i3>i4?i3:i4;
	   var max = j1>j2?j1:j2;
	   /*
	   var m1 = row.info0<row.info1?row.info0:row.info1;
	   var m2 = row.info2<row.info3?row.info2:row.info3;
	   var m3 = row.info4<row.info5?row.info4:row.info5;
	   var m4 = row.info6<row.info7?row.info6:row.info7;
	   
	   var n1 = m1<m2?m1:m2;
	   var n2 = m3<m4?m3:m4;
	   var min = n1<n2?n1:n2;
	   else if (value==min){
		   
			    return 'background-color:#C5C1AA;color:red;';
       }
	   */
	   if (value==max){
				return 'background-color:#CCCCCC;color:red;';
	   }
	   }
   }
   
  
    
    
  
  
    function doSearchTwo() {
	   $('#weather24info').datagrid('load', {
		     stations : $('#station').val(), 
		     element:  $('#element').val()
	   });
    }
    
    function find24info(){
    	$('#weather24info').datagrid({
    		title : "",
			url : 'WeatherReport/get24WeatherInfo',
			fitColumns: true,
			pagination : true,
		    pageSize : 13,
			loadMsg : '数据正在加载,请耐心的等待...',
			pageList : [ 10, 13, 20, 30 ],
			striped : true, //隔行变色特性
		    singleSelect: false,				//单选模式
			rownumbers : true,
			multiSort:true,
			sortOrder:'desc',
			autoRowHeight:true,
			columns : [[
				    {
					field : 'name',
					title : '站点',
					width : 50,
					align : "center"
				    },{
						field : 'info0',
						title : '23时',
						width : 30,
						align : "center",
						sortable:"true",
						styler:markMaxOrMin
					},{
						field : 'info1',
						title : '02时',
						width : 30,
						align : "center",
						styler:markMaxOrMin
					},{
						field : 'info2',
						title : '05时',
						width : 30,
						align : "center",
						styler:markMaxOrMin
					},{
						field : 'info3',
						title : '08时',
						width : 30,
						align : "center",
						styler:markMaxOrMin
					},{
						field : 'info4',
						title : '11时',
						width : 30,
						align : "center",
						styler:markMaxOrMin
					},{
						field : 'info5',
						title : '14时',
						width : 30,
						align : "center",
						styler:markMaxOrMin
					},{
						field : 'info6',
						title : '17时',
						width : 30,
						align : "center",
						styler:markMaxOrMin
					},{
						field : 'info7',
						title : '20时',
						width : 30,
						align : "center",
						styler:markMaxOrMin
					}
					]]
    	});
    }        
	