var WARNING_INFO = {
	realTimeSwitch:"",
	init:function(){
		this.initLayout();
		this.initWarnInfo(null);
		this.bindEvents();
	},
	initLayout:function(){
		var $this = this;
		//tabs初始化： 
		$("#warnContainer").nTabs({
			"direction":"top",  
			"lazy":true, 
			"onTabSelect":function(tab){
				//tab页切换事件
				var tabbodyId = $(tab).find("a").attr("href");
				if(tabbodyId != "#warningAnalyse")return;
				var date = new Date();
				var warnAnalyseUrl = G_CONTEXT.contextPath+"warn/getWarnAnalyse.do";
				var startTime = $("#analyseTimeOpr .input-ymd:first").val()+" "+$("#analyseTimeOpr  .input-hh:first").val()+":"+$("#analyseTimeOpr .input-mm:first").val()+":00";
				var endTime = $("#analyseTimeOpr .input-ymd:last").val()+" "+$("#analyseTimeOpr .input-hh:last").val()+":"+$("#analyseTimeOpr .input-mm:last").val()+":00";

//				var dataParam = {"startTime":startTime,"endTime":endTime};
//				var dataParam = {"startTime":"2016-4-24 15:32:00","endTime":"2016-5-25 11:12:00"};
				var dataParam = {"startTime":"2016-05-28 13:40:07","endTime":"2016-5-30 11:12:00","userId":userId};
				var $temp = $("#warningAnalyse");
				$this.packageCommonFun(warnAnalyseUrl,dataParam,$temp);

			}
		},1);
		
		$(".customDate").customDate('init');
	},
	//向报警信息页面推送信息
	initWarnInfo:function(warnJobData){

		var $temp = $("#warningHappen");
		if(!warnJobData){
			var date = new Date();
			var warnInfoUrl = G_CONTEXT.contextPath+"warn/getwarninfo.do";
			var startTime = $temp.find("#happenTimeOpr .input-ymd").val()+" "+$temp.find("#happenTimeOpr .input-hh").val()+":"+$temp.find("#happenTimeOpr .input-mm").val()+":00";
//			var dataParam = {"startTime":startTime};
			var dataParam = {"startTime":"2016-05-29 00:00:00","userId":userId};
			this.packageCommonFun(warnInfoUrl,dataParam,$temp);
		}else{
			$temp.find("tbody").remove();
			$temp.find("thead").after("<tbody>");
			$(warnJobData).each(function(i,val){
				var status = val.status==true?"已知":"处理";
				var statusColor = val.status==true?"":"orange";
				var temp = "<tr class = 'parentWarn'>"
					+"<input type = 'hidden' class = 'id' value ='"+val.id+"'</>"
					+"<input type = 'hidden' class = 'warnProId' value ='"+val.warnProId+"'</>"
					+"<td><img class = 'picClick' src = '../resources/business/zhyj/img/open.bmp'/>"+val.warnName+"</td>"
					+"<td>"+val.startTime+"</td>"
					+"<td>"+val.validTime+"</td>"
					+"<td>"+val.warnType+"</td>"
					+"<td>"+val.proType+"</td>"
					+"<td>"+val.warnContent+"</td>"
					+"<td class = 'status' style = 'color:"+statusColor+"'>"+status+"</td>"
					+"<td>图片</td></tr>"
					+"</tr>";
				
				$temp.find("tbody").append(temp);
			});
				
			$temp.find("thead").after("</tbody>");
			
		}
		
		
		
		
		
		
	},
	bindEvents:function(){
		var parentThis = this;
		//点击表格元素，展开/闭合灾害具体信息
		$("#warnContainer").on("click",".picClick",function(){
			var $temp = $(this);

			if($temp.parent().parent().hasClass("active")){
				var classType = $temp.parent().parent().children("td:first").text()+Date.parse($temp.parent().parent().children("td:eq(1)").text());
				$("."+classType).remove();
				$temp.parent().parent().removeClass("active");
				$temp.prop("src","../resources/business/zhyj/img/open.bmp");
			}else{
				//报警产品ID
				var warnProId = $temp.parent().parent().children(".warnProId").val();
				//报警时间
				var startTime = $temp.parent().parent().children("td:eq(1)").text();
				var warnDetailUrl = G_CONTEXT.contextPath+"warn/getwarndetailinfo.do?t="+new Date().getTime();
				var paramObj = {'warnProId':warnProId,'startTime':startTime,'userId':userId};
				var classType = $temp.parent().parent().children("td:first").text()+Date.parse($temp.parent().parent().children("td:eq(1)").text());
				$.ajax({
					type:'post',
					url:warnDetailUrl,
					dataType:'json',
					data:paramObj,
					success:function(data){
						
						$temp.prop("src","../resources/business/zhyj/img/close.bmp");
						$temp.parent().parent().addClass("active");
						
						var result = data.params.warnDetailList;
						if(result.length<=0)return;
						var temInfo = "<tr class = '"+classType+"' style = 'font-weight:bold'><td></td><td>位置</td><td>站名</td><td>降水量</td><td>级别</td><td></td><td></td><td></td></tr>";
						$(result).each(function(i,val){
							var template = "<tr class = '"+classType+"' >"
											+"<td></td>"
											+"<td>"+val.stationAddress+"</td>"
											+"<td>"+val.stationName+"</td>"
											+"<td>"+val.val+"</td>"
											+"<td>"+val.warnLevel+"</td>"
											+"<td></td>"
											+"<td></td>"
											+"<td></td>"
											+"</tr>";
							temInfo+=template;
						});

						$temp.parent().parent().after(temInfo);
						$("."+classType).css("border-width","0px");
					},
					error:function(request){
						alert("数据加载失败!");
					}
				});
			}
		});
		
		//处理状态切换已知
		$("#warnContainer").on("click",".status",function(){
			
//			alert($(this).text());
			var status = $(this).text() == "已知"?"1":"0";
			if(status == "1")return;
			var warnId = $(this).parent().children(".id").val();
			var paramArr = [];
			paramArr.push({warnId:warnId,status:"1"});
			var dataParam = JSON.stringify(paramArr);

			$(this).text("已知");
			$(this).css("color","#676A6C");
			parentThis.packagedealWithStatus(dataParam);
		});
		
		
		//我知道了 
		$("#warnContainer .know_operation").on("click",function(){
			var paramArr = [];
			var status = "",warnId = "";
			$(this).parent().parent().find("tbody tr").each(function(i,val){
				status = val.children.item(8).innerText=="已知"?"1":"0";
				if(status == "1")return;
				warnId = val.children.item(0).value;
				paramArr.push({warnId:warnId,status:"1"});
				

				$(this).children(".status").text("已知");
				$(this).children(".status").css("color","#676A6C");
			});
			
			if(paramArr.length<=0)return;
			var dataParam = JSON.stringify(paramArr);
			parentThis.packagedealWithStatus(dataParam);
		});
		
		//  所有要素图层展示/隐藏
		$(".layout_operation img").on("click",function(){
			var $this = $(this);
			var warnProTypeUrl = G_CONTEXT.contextPath+"warn/getProType.do?t="+new Date().getTime(); 
			$.ajax({
				type:'post',
				url:warnProTypeUrl,
				dataType:'json',
				data:{"userId":userId,"warnType":"1"},
				success:function(data){
					var result = data.params.warnProTypeList;
					if(result.length<0)return;
					
					var flag = "false";
					if($this.hasClass("passive")){
						flag = "true";
						$this.removeClass("passive");
					}else{
						$this.addClass("passive");
					}
					$(result).each(function(i,res){
						GIS.Warning.VisibleLayer("nGis", res.warnProId+"_warningLayer",flag);
					});
				},
				error:function(){
					alert("数据加载失败!");
				}
			});
		});
		
		//实时推送开关状态切换
		$("#realTimeOpr").on("click","img",function(){
			if($(this).hasClass("passive")){
				$(this).prop("src","../resources/business/zhyj/img/on.bmp");
				$(this).attr("value","realTimeOn");
				$(this).removeClass("passive");
			}else{
				$(this).prop("src","../resources/business/zhyj/img/off.bmp");
				$(this).attr("value","realTimeClose");
				$(this).addClass("passive");
			}
		});
		
		//弹出指导反馈界面-------吴晔
		$("#guideInfo").on("click",function(){
			$.modal.show({
				id:"guideBack",//主键id
				title:"报警反馈信息",//标题
				container: 'nPage', //加载容器
				m_right:"300px",//right;
				m_top:"300px",//top;
				url:G_CONTEXT.contextPath+"/warn/guide_info.do",//加载url，在项目中可以是jsp或者是url链接
				backdrop:false,//遮罩
				closeTip:true,//关闭按钮（右上角）,默认为true
				size:"large",
				footer:false,//底部框 
			});
		});
	},
	// 报警实况/分析信息获取
	packageCommonFun:function(warnUrl,dataParam,$temp){

		$temp.find("tbody").remove();
		$.ajax({
			type:'POST',
			url:warnUrl,
			dataType:'json',
			data:dataParam,
			success:function(data){
				var result = data.params.warnList;
				if(result.length<=0)return;
				$temp.find("thead").after("<tbody>");
				$(result).each(function(i,val){
					var status = val.status==true?"已知":"处理";
					var statusColor = val.status==true?"":"orange";
					var temp = "<tr class = 'parentWarn'>"
								+"<input type = 'hidden' class = 'id' value ='"+val.id+"'</>"
								+"<input type = 'hidden' class = 'warnProId' value ='"+val.warnProId+"'</>"
								+"<td><img class = 'picClick' src = '../resources/business/zhyj/img/open.bmp'/>"+val.warnName+"</td>"
								+"<td>"+val.startTime+"</td>"
								+"<td>"+val.validTime+"</td>"
								+"<td>"+val.warnType+"</td>"
								+"<td>"+val.proType+"</td>"
								+"<td>"+val.warnContent+"</td>"
								+"<td class = 'status' style = 'color:"+statusColor+"'>"+status+"</td>"
								+"<td>图片</td></tr>"
								+"</tr>";
					
					$temp.find("tbody").append(temp);
				});
					
				$temp.find("thead").after("</tbody>");
				
			},
			error:function(){
				alert("数据加载失败!");
			}
		});
		
	},
	//处理状态切换已知
	packagedealWithStatus:function(dataParam){
		var modifyWarnStatusUrl = G_CONTEXT.contextPath+"warn/modifyWarnInfo.do?t="+new Date().getTime();
		$.ajax({
			type:"post",
			url:modifyWarnStatusUrl,
			dataType:"json",
			data:{'dataParam':dataParam},
			success:function(data){
//				$(".status").text("已知");
//				$(".status").css("color","#676A6C");
			},
			error:function(){
				alert("数据加载失败!");
			}
		});
	}
};


