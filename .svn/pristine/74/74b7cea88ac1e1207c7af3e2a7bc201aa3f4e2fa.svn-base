/**
 * grid_panel.js
 * @Author:	JIAOY,XINCHENG
 * @CreateDate：2016年7月8日 下午13:17:51
 * @Version 1.1
 * Copyright (C) 2016 NRIET
 * 
 * TODO  背景场组件
 */
var GridPanel_PageParam = {
		interval:[],//定时器id
		data :[],//背景场数据
		location:{},
		resultData : {},//查询返回数据
		Select_Ele : null,//当前选中的背景场
		Copy_Eles : null,//复制列的背景场
		USERCLASS : 8,//一天有多少个时段
		USERPOST : $("#userInfo_post").val(),
		FORECASTDAY : $("#userInfo_post").val()==3?4:8,//预报未来几天
		opt : {
			  tableHead : [],
			  //短期岗
			  ysdw_1 : [ {id : 'TP',name : '降水',type:'24,1',dataname:["TP24H","TP3H"]},
			           {id : 'TMP',name : '气温',type:'min,max,1',dataname:["TMIN","TMAX","TMP"]},
			           {id : 'EDA',name : '风场',type:'1',dataname:["EDA"]},
					   {id : 'RH',name : '湿度',type:'min,max,1',dataname:["RHMIN","RHMAX","RH"]},
					   {id : 'VIS',name : '能见度',type:'1',dataname:["VIS"]},
					   {id : 'TCC',name : '云量',type:'1',dataname:["TCC"]},
					   {id : 'WEA',name : '天气现象',type:'1',dataname:["WEA"]},
					   {id : 'DIS',name : '灾害落区',type:'1',dataname:["DIS"]}
					  ],
			  //中期岗
			  ysdw_2 : [{id : 'TP',name : '降水',type:'24,1',dataname:["TP24H","TP3H"]},
			           {id : 'TMP',name : '气温',type:'min,max,1',dataname:["TMIN","TMAX","TMP"]},
			           {id : 'EDA',name : '风场',type:'1',dataname:["EDA"]},
					   {id : 'RH',name : '湿度',type:'min,max,1',dataname:["RHMIN","RHMAX","RH"]},
					   {id : 'VIS',name : '能见度',type:'1',dataname:["VIS"]},
					   {id : 'TCC',name : '云量',type:'1',dataname:["TCC"]},
					   {id : 'WEA',name : '天气现象',type:'1',dataname:["WEA"]},
					   {id : 'DIS',name : '灾害落区',type:'1',dataname:["DIS"]}
					  ],
			 //状态class; 0:未修改,1:已修改,2:已保存,3:已发布,4:无数据,5:不一致,6:实况
			 status2Class:["bjc-unmodify","bjc-modified","bjc-saved","bjc-published","bjc-nodata","bjc-inconformity","bjc-live"],
			 mode: '',
			 flag: 'init',// 初始化为init
			 first:true,//初始化标识
			 selMods:[]//右击背景场可以选择的模式
		},
		//背景场更改状态动画效果所用参数
		change_param : {
				resultFlag : true,//是否继续改变状态标识
				$tDataList : null, //要更改的背景场
				tDataList_ : new Array//数据更改前的属性值集合
		},
		//初始化表头
		initTablehead : function(le){
			var that = this;
			var html="";
			var opt = that.opt;
			opt.tableHead = ["<div class='table-cell' channel='DIS' data-key='header'>灾害<br>落区</div>",
				  			"<div class='table-cell' channel='WEA' data-key='header'>天气<br>现象</div>",
				  			"<div class='table-cell' channel='CC' data-key='header' style='line-height: 54px;'>云量</div>",
				  			"<div class='table-cell' channel='VIS' data-key='header' style='line-height: 54px;'>能见度</div>",
				  			"<div channel='RH' data-key='header'><div class='table-cells'>湿度</div><div>" 
				  					+($("#userInfo_post").val()==3?"<div class='table-cell' style='height:24px;'>低</div>"
				  							+ "<div class='table-cell' style='height:24px;'>高</div>"
				  							+ "<div class='table-cell' style='height:24px;'>3H</div>":
			  								"<div class='table-cell' style='height:24px;'>24H低</div>"
			  								+ "<div class='table-cell' style='height:24px;'>24H高</div>"
			  								+ "<div class='table-cell' style='height:24px;'>3H</div>")+
			  						"</div></div>",
			  				"<div class='table-cell' channel='EDA' data-key='header' style='line-height: 54px;'>风场</div>",
				  			"<div channel='TMP' data-key='header'>"
				  					+ "<div class='table-cells' >气温</div><div>"+
				  					($("#userInfo_post").val()==3?"<div class='table-cell' style='height:24px;'>低</div>"
				  							+ "<div class='table-cell' style='height:24px;'>高</div>"
				  							+ "<div class='table-cell' style='height:24px;'>3H</div>":
			  								"<div class='table-cell' style='height:24px;'>24H低</div>"
			  								+ "<div class='table-cell' style='height:24px;'>24H高</div>"
			  								+ "<div class='table-cell' style='height:24px;'>3H</div>")+
				  					"</div></div>",
				  			"<div channel='TP' data-key='header' >"
				  					+ "<div class='table-cells' >降水</div><div>"
				  					+($("#userInfo_post").val()==3?"<div class='table-cell' style='height:24px;'>24H</div>"
						  					+ "<div class='table-cell' style='height:24px;'>3H</div>":
					  						"<div class='table-cell' style='height:24px;'>24H</div>"
						  					+ "<div class='table-cell' style='height:24px;'>3H</div>")
				  					+ "</div></div>" 
				  			];
			for (var i = 8-le, wlen = 8; i < wlen; i++) {
				html += opt.tableHead[i];
			}
			for (var j = 0; j < 8-le; j++) {
				html += opt.tableHead[j];
			}
			$(".table-header").html("");
			$(".table-header").html(html);
			$(".table-cell").css({'width' : 58});
		},
		//初始化背景场表格
		initTablebody : function(le){
			var that = this;
			var data = that.data;
			var opt = that.opt;
			$("div[class ^='table-body-row']").remove();
			var tempNum = 1;
			$(".grid-table-body").html("");
			for(var i=0;i<that.FORECASTDAY;i++){//预报未来天
				var html="";
				var periodTime=that.USERCLASS;
				if(i == that.FORECASTDAY && periodTime == 0)continue;
				var cellsHigh=(i==that.FORECASTDAY)?periodTime*23+"px":(that.USERCLASS*23+'px');
				var rowDiv = $("<div class='table-body-row'>");
				for (var j = 7; j >= 0; j--){
					var types = opt.ysdw[j].type.split(",");
					var cellsDiv = $("<div "+(types.length==1?('class="body-cells" channel="'+opt.ysdw[j].dataname[0]
						+'"'):'')+" ysid='"+opt.ysdw[j].id+"' data-key='body' title='"+opt.ysdw[j].name+"'>");
					var cellHtml = "";
					if(types.length==1){

					}else{
						cellHtml = "";
						for(var tyLe=0;tyLe<types.length;tyLe++){
							if(types[tyLe]==1){

							}else if(i<that.FORECASTDAY||(periodTime!=0 && i==that.FORECASTDAY)){
								var source ="";
								var status ="4"; 
								var attribute = "";
								if(data && opt.ysdw[j] && data[opt.ysdw[j].dataname[tyLe]]&& data[opt.ysdw[j].dataname[tyLe]][i]) {
									var tData = data[opt.ysdw[j].dataname[tyLe]][i];
									source = that.formatSource(tData.source);
									status = tData.status;
									attribute = "datac="+i;
									tempNum ++;
								}
								cellHtml+="<div class='body-cells' channel='"+opt.ysdw[j].dataname[tyLe]+"' name='"+types[tyLe]+"'>";
								cellHtml+="<div class='body-cell "+opt.status2Class[status]+"' "+attribute+
									" style='height:"+cellsHigh+";line-height:"+cellsHigh+"'>"+source+"</div>";
							}
							cellHtml+="</div>";
						}
					}
					cellsDiv.html(cellHtml);
					rowDiv.append(cellsDiv);
				}
				$(".grid-table-body").append(rowDiv);
			}
		},
		//表格数据格式化
		formatSource:function(source){
			var group = {REAL:"实况",PUBL:"主观",PREV:"主观",NODT:"无数据",NWGD:"国家",'EC-ERROR':"EC偏差",'NWGD-ERROR':"国家偏差"};
			return group[source]||source;
		},
		//控制列的移动
		upsetTablebody : function(){
			var that = this;
			var $sel = $("#YSDW .ysdw-selected");
			$(".grid-table-body .table-body-row div[data-key=body]:hidden").show();
			$(".grid-table-body .table-body-row .body-cells:hidden").show();
			$(".grid-table-body .table-body-row").each(function(index){
				var $ele = $(this);
				var count = $ele.find("div[data-key=body]").length;//统计一行几列
				for(var i=0;i<count;i++){//排序
					var $move_ele;
					if($sel.index() >= count/2){
						$move_ele = $ele.find("div[data-key=body]:last");//最后一列
						if($move_ele && ($sel.attr("channel")==$move_ele.attr("ysid")))break;
						$move_ele.remove();
						$ele.prepend($move_ele);
					}else if($sel.index() < count/2){
						$move_ele = $ele.find("div[data-key=body]:first").remove();//的第一列
						$ele.append($move_ele);
						if($move_ele && ($sel.attr("channel")==$move_ele.attr("ysid")))break;
					}
				}
				if($(".gdzz-left-product").hasClass('col-lg-3'))
				for(var x=0;x<count-5;){
					var $ele_=$ele.find("div[data-key=body]").eq(x);
					var $ele_cells = $ele_.find(".body-cells");
					if($ele_cells && $ele_cells.length+x>count-5){//多列大于5
						$ele_.find(".body-cells:lt("+(count-5-x)+")").hide();
						break;
					}else{//单独一列
						$ele_.hide();
						x+= $ele_cells.length||1;
					}
				}
			});
			that.bindmouse();
		},
		//更新背景场数据
		updateTablebody:function(){
			var that = this;
			that.bindmouse();
			$(".grid-table-body .table-body-row:eq(1) .body-cells[channel=TP24H] .body-cell:not(.bjc-live):eq(0)").click();
			GridPanel_PageParam.addCover();
//			
		},
		//TODO 背景场状态更改
		/* obj
		 *  addClass  更改后的样式 (String)(+)
		 *  outTime    延时(毫秒)(+)
		 *  operate    操作标识(boolean)true 索引+1
		 *  dataIndex  操作后要改为索引
		 *  changeText 内容更改标识(String)
		 */
		changeBjcEles : function(obj){
			var that = this;
			if(!obj.addClass) return;
			var change_param = that.change_param;
			that.change_param.tDataList_ = new Array;
			if(change_param.$tDataList.length>0)change_param.$tDataList.each(function(index){
				var $ele = $(this);
				if(obj.outTime){
					that.interval.push(setTimeout(function(){//动画全部延时加载
						if(change_param.resultFlag){//控制是否继续更改
							var tempObj = {};
							var tempData = null;
							if($ele.attr("datac")>=0){
								tempData = that.data[$ele.parents(".body-cells").attr("channel")][$ele.attr("datac")];
								if(obj.operate && tempData){
									tempObj = {"dataIndex":tempData.index,"dataMaxIndex":tempData.maxIndex};
									if(obj.dataIndex){
										tempData.maxIndex = tempData.index = obj.dataIndex;
									}else
										tempData.maxIndex = tempData.index += tempData.index==-1?2:1;//索引为-1,操作后+2
								}
								if(obj.changeText && tempData){
									tempObj = $.extend({"text":$ele.html(),"source":tempData.source}, tempObj);
									tempData.source = obj.source;
									$ele.html(obj.changeText);
								}
								tempObj = $.extend({"data":tempData,"index":index,"classname":$ele.attr("class"),"status":tempData.status}, tempObj);
								tempData.status = that.opt.status2Class.indexOf(obj.addClass);
								change_param.tDataList_.push(tempObj);
								$ele.removeClass("bjc-unmodify bjc-modified bjc-saved bjc-published bjc-nodata bjc-inconformity");
								$ele.addClass(obj.addClass);
							}
						}
					},obj.outTime*index));
				}else{
					var tempObj = {};
					var tempData = null;
					if($ele.attr("datac")>=0){
						tempData = that.data[$ele.parents(".body-cells").attr("channel")][$ele.attr("datac")];
						if(obj.operate && tempData){
							tempObj = {"dataIndex":tempData.index,"dataMaxIndex":tempData.maxIndex};
							if(obj.dataIndex){
								tempData.maxIndex = tempData.index = obj.dataIndex;
							}else
								tempData.maxIndex = tempData.index += tempData.index==-1?2:1;//索引为-1,操作后+2
						}
						if(obj.changeText && tempData){
							tempObj = $.extend({"text":$ele.html(),"source":tempData.source}, tempObj);
							tempData.source = obj.source;
							$ele.html(obj.changeText);
						}
						tempObj = $.extend({"data":tempData,"index":index,"classname":$ele.attr("class"),"status":tempData.status}, tempObj);
						tempData.status = that.opt.status2Class.indexOf(obj.addClass);
						change_param.tDataList_.push(tempObj);
						$ele.removeClass("bjc-unmodify bjc-modified bjc-saved bjc-published bjc-nodata bjc-inconformity");
						$ele.addClass(obj.addClass);
					}
				}
				
			});
		},
		clickedSelect : function(){
			$(".table-body-row .body-cell.cSelected").click();
		},
		//TODO 背景场状态还原
		tDataList_restore : function(){
			var that = this;
			var change_param = that.change_param;
			that.interval.forEach(function(id){
				clearTimeout(id);
			});
			that.interval = [];
			change_param.tDataList_.forEach(function(tData,index){
				if(tData.text)$(change_param.$tDataList[tData.index]).html(tData.text);
				if(tData.classname){
					tData.data.status = tData.status;
					$(change_param.$tDataList[tData.index]).attr("class",tData.classname);
				}
				if(change_param.tDataList_.data){
					tData.data.index = tData.dataIndex;
					tData.data.maxIndex = tData.dataMaxIndex;
				}
			});
		},
		//TODO 背景场不一致检查
		checkBjcByz : function(data){
			if(!data)return;
			$(".grid-table-body .bjc-inconformity").removeClass("bjc-inconformity");
			data.forEach(function(eles,index){
				var ref = eles.ref;
				eles.ref.period.forEach(function(per_eles,per_index){
					if(ref.refele == "TMP" || ref.refele == "RH" || ref.refele == "TCC"){
						$($(".grid-table-body .table-body-row .body-cells[channel="+eles.ref.refele+"] .body-cell")[per_eles]).addClass("bjc-inconformity");
						$($(".grid-table-body .table-body-row .body-cells[channel="+eles.element+"] .body-cell")[per_eles]).addClass("bjc-inconformity");
					}else
					$(".grid-table-body .table-body-row:eq("+per_eles+") .body-cells[channel="+eles.ref.refele+"] .body-cell," +
							".grid-table-body .table-body-row:eq("+per_eles+") .body-cells[channel="+eles.element+"] .body-cell")
							.addClass("bjc-inconformity");
				});
			});
		},
		//时间轴添加时间标识
		timebarAddFlag : function(){
			var that = this;
			var $Sele = $(".table-body-row .body-cell.cSelected");
			$("#nDateline .nodediy-context .node").removeClass("selected");
			if($Sele.length>0)if($Sele.parent(".body-cells").attr("name")==1||$Sele.parent(".body-cells").is("[data-key=body]")){
				$("#nDateline .nodediy-context #node_"+Number(that.Select_Ele.periodDate)).addClass("selected");
			}else{
				var endIndex = $("#nDateline .nodediy-context .node#node_"+Number(that.Select_Ele.periodDate)).index();
				//$("#nDateline .nodediy-context .node#node_"+Number(that.Select_Ele.periodDate)).addClass("selected");
				$("#nDateline .nodediy-context").find(".node,.node-split").slice(endIndex-that.USERCLASS,endIndex+1).addClass("selected");
			}
			that.queryDisWaring();
		},
		
		//鼠标操作事件
		bindmouse : function(){
			$('.table-body-row .body-cell').attr('tabindex',1);
			$('.table-body-row .body-cell').unbind('keydown').bind({
				"keydown":function(event){
					if(event.keyCode == 40){
						event.preventDefault(); 
						GridPanel_PageParam.clickNext(true);
					}else if(event.keyCode == 38){
						event.preventDefault();
						GridPanel_PageParam.clickNext(false);
					}else if(event.keyCode == 9){//Tab键
						event.preventDefault();
					}
				}
			});
			var that = this;
			var data = that.data;
			/**
			 * 鼠标点击事件
			 */
			$(".table-body-row .body-cell").unbind('click').bind('click',function(e){
				
				var id = $(this).attr("datac");
				if(id){
					//日期定位联动
					$("#RQDW .ysdw-body div.ysdw-select").removeClass("ysdw-select");
					$("#RQDW .ysdw-body:eq("+$(this).parents(".table-body-row").index()+") div").addClass("ysdw-select");
					//联动要素定位
					$("#YSDW div:eq(1) .ysdw-body div.ysdw-select").removeClass("ysdw-select");
					$("#YSDW div:eq(1) .ysdw-body[channel="+
							$(this).parents("div[data-key=body]").attr("ysid")+"] div").addClass("ysdw-select");
					if($(this).is(".bjc-live")){
						GDZZ_TOOLS.disable();
					}else{
						GDZZ_TOOLS.enable();
					}
					var eleData = data[$(this).parents(".body-cells").attr("channel")][$(this).attr("datac")];
					eleData.fcstDate = new Date(eleData.fcstDate);
					eleData.periodDate = new Date(eleData.periodDate);
					eleData.channel = $(this).parents("div[data-key=body]").attr("ysid");
					GridPanel_PageParam.Select_Ele = eleData;
					var perioded = eleData.period;
					if(Number(eleData.period) < 0) {
						perioded = "历史";
					} 
					var fcstDate = Number(eleData.fcstDate) + (eleData.period-
							(($(this).parent(".body-cells").attr("name")==1||
									$(this).parent(".body-cells").is("[data-key=body]"))?(24/that.USERCLASS):24))*3600000;
					var html_ = new Date(fcstDate).getDate()+"日"+new Date(fcstDate).getHours()+"时~"+
					eleData.periodDate.getDate()+"日"+eleData.periodDate.getHours()+"时("+perioded+")";
					$("#DQYB .DQYB_span").html(html_);
					$(".table-body-row .body-cell.cSelected").removeClass("cSelected");
					$(this).addClass("cSelected");
					that.bjcAddButton();
					that.timebarAddFlag();
					GDZZ_TOOLS.updateParam("gridParam");
					
					that.readMonoPeriodGrid(eleData);
				}
				if($(this).is(".bjc-live")){
					$("#CZAJ .czaj-redo").removeClass("czaj-redo").addClass("czaj-redo-loading");
				}else{
					$("#CZAJ .czaj-redo-loading").removeClass("czaj-redo-loading").addClass("czaj-redo");
				}
			});
			/**
			 * 鼠标右击事件
			 */
			//TODO 右击事件
			$(".table-body-row div div").unbind('contextmenu').bind('contextmenu',function(e){
				var that = GridPanel_PageParam;
				if($(this).is(".bjc-live")||$(this).parents(".table-body-row").index()==0)return false;
				if(e.which==3){
					var id = $(this).attr("datac");
					if(id){
						var $tData = data[$(this).parents(".body-cells").attr("channel")][$(this).attr("datac")];
						$("#dialogContent .modelUl .common-a[mod="+$tData.source+"]").click();
					}
					$(".table-body-row .body-cell.cRightSelected").removeClass("cRightSelected");
					if(!$(this).is(".cRightSelected")){
						$(this).addClass("cRightSelected");
					}
					$("#stationDialog #choose option:eq(0)").attr("selected",true);
					//依据要素id控制下拉选项
					var channel = $(this).parents("div[data-key=body]").attr("ysid");
					if(channel == "TP"){//||channel == "TMP"||channel == "RH"||channel == "TCC"){
						$("#stationDialog #choose option[value=2],#stationDialog #choose option[value=3]").show();
					}else{
						$("#stationDialog #choose option[value=2],#stationDialog #choose option[value=3]").hide();
					}
					var oEvent = e || event;
					var oEx = oEvent.clientY;
					var oEy = oEvent.clientX;
					if(oEx > ($(".nriet-footer.footer.fixed").offset().top-$("#stationDialog").height())){
						oEx = $(".nriet-footer.footer.fixed").offset().top-$("#stationDialog").height();
					}
					$("#stationDialog").css({"top":oEx-$(".grid-table-body").offset().top+80,
							"left":oEy-$(".grid-table-body").offset().left+2});
					var _ele = that.Select_Ele;
					$.ajax({
						type:'POST',
						url:window.contextPath + 'gdzz/queryDataSourceStatus.do',
						dataType:"json",
						data:{
							fcstTime : _ele.fcstDate,//'2016-07-19 08:00',
							element : channel,
							period : 24*($(this).parents(".table-body-row").index()+(that.USERPOST == 3?0:3)),
							type : $("#stationDialog #choose option:selected").val(),
							areaCode : $("#userInfo_hide").attr("userCode"),
							post : _ele.post
						},
						success:function(result){
							$("#dialogContent .modelUl span").addClass("modelUl-unclick");
							$("#dialogContent .modelUl span").each(function(index,ele){
								if(result.params.dataMap[$(ele).attr("mod")]){
									$(ele).removeClass("modelUl-unclick");
								}
							});
							$("#dialogContent .rank ul>li~li").each(function(index,ele){
								var rl = result.params.rankList;
								if(rl && rl[index]){
									$(ele).html(
										$("#dialogContent .modelUl span[mod="+rl[index]+"]").html()
									);
								}else{
									$(ele).html("");
								}
							});
							$("#stationDialog").show();
						}
					});
//					$("#dialogContent .modelUl span").removeClass("modelUl-unclick");
//					$("#dialogContent .modelUl span[mod=PREV]")
//					.addClass("modelUl-unclick");
//					$("#stationDialog").show();
					//屏蔽浏览器右键菜单
					e.preventDefault();
					return false;
				}
			});
		},
		//逐列点击
		clickNext:function(flag){
			var $sel_Ele = $(".table-body-row .body-cell.cSelected");//选中背景场
			var channel = $sel_Ele.parent(".body-cells").attr("channel");//channel值
			var $sel_Parent = $(".grid-table-body .table-body-row .body-cells[channel="+channel+"]");//选中的当前列
			var $sel_EleNext = $sel_Parent.find(".body-cell[datac="+(Number($sel_Ele.attr("datac"))+(flag?1:-1))+"]");//下一个
			var rowIndex = $sel_EleNext.parents(".table-body-row").index();//下一个背景场所在行索引值
			if(rowIndex != -1 && rowIndex != $("#RQDW div:eq(1) .ysdw-selected").index()){
				$("#RQDW div:eq(1) .ysdw-body:eq("+rowIndex+")").click();
			}
			if($sel_EleNext)$sel_EleNext.click();
		},
		readMonoPeriodGrid:function(eleData,flag){
			var that = this;
			var url="";
			if (eleData.channel=="TP") {//降雨
				url='/Web/HB/hebei/resources/business/gdzz/main/js/readMonoPeriodGrid_TP.json';
			}else if (eleData.channel=="TMP") {//气温
				url='/Web/HB/hebei/resources/business/gdzz/main/js/readMonoPeriodGrid_TMP.json';
			}else if (eleData.channel=="EDA") {//风场
				alert("1222");
				url='/Web/HB/hebei/resources/business/gdzz/main/js/readMonoPeriodGrid_EDA.json';
			}else if (eleData.channel=="RH") {//湿度
				url='/Web/HB/hebei/resources/business/gdzz/main/js/readMonoPeriodGrid_RH.json';
			}else if (eleData.channel=="VIS") {//能见度
				url='/Web/HB/hebei/resources/business/gdzz/main/js/readMonoPeriodGrid_VIS.json';
			}else if (eleData.channel=="TCC") {//云量
				url='/Web/HB/hebei/resources/business/gdzz/main/js/readMonoPeriodGrid_TCC.json';
			}else if (eleData.channel=="WEA") {//天气现象
				url='/Web/HB/hebei/resources/business/gdzz/main/js/readMonoPeriodGrid_WEA.json';
			}else if (eleData.channel=="DIS") {//灾害落区
				url='/Web/HB/hebei/resources/business/gdzz/main/js/readMonoPeriodGrid_DIS.json';
			}
			$.ajax({
				type:'POST',
				url:url,
				dataType:"json",
				data:eleData,
				success:function(result){
					GridPanel_PageParam.location = result.params.data;
					var rst = result.params.data;
					var gridData = result.params.gridData;
					var rangeObj = {
							disInter: false,
							isCut: false,
							jsonUrl: "hb_bianjie",
							roadJson:"road",
							nCols: that.USERPOST == 3? 179: 37,
							nRows: that.USERPOST == 3? 218: 45,
							noDataValue: typeof(rst.invalid) == "undefined" ? 9999 : rst.invalid,
							valmax: null,
							valmin: null,
							xCell: that.USERPOST == 3? 0.01: 0.05,
							xmax: 118.202,
							xmin: 116.6,
							yCell: that.USERPOST == 3? 0.01: 0.05,
							ymax: 40.353,
							ymin: 38.4
					};
					result.params.gridSetting.forEach(function(grid){
						if(grid.post == (that.USERPOST == 3?0:1)){
							rangeObj.xmax = grid.endLon;
							rangeObj.ymax = grid.endLat;
							rangeObj.xCell = grid.dlon;
							rangeObj.yCell = grid.dlat;
							rangeObj.nCols = grid.nlat;
							rangeObj.nRows = grid.nlon;
							rangeObj.xmin = grid.startLon;
							rangeObj.ymin = grid.startLat;
						}
					});
					if(rst)rangeObj = {
							jsonUrl : 'hb_bianjie',
							roadJson:"road",
							nCols : rst.ny,
							nRows : rst.nx,
							xCell : rst.dy,
							yCell : rst.dx,
							xmax : rst.endLon,
							xmin : rst.startLon,
							ymax : rst.endLat,
							ymin : rst.startLat,
							noDataValue : typeof(rst.invalid) == "undefined" ? 9999 : rst.invalid,
							valmin: null,
							valmax: null,
							isCut : false,
							disInter : false		//是否不插值
						};
					if(eleData.channel == "WEA"||eleData.channel == "DIS")rangeObj.disInter=true;
					GridPanel_PageParam.resultData.rangeObj = rangeObj;
					GIS.GridEdit.clearByTypes("nGis",["splash","isoline","wind","windanimate","number","splash","isoline","number"]);
					GIS.Element.clearData("nGis");
					if(gridData.length>0){
						alert("a");
						for(var i = 0, len = gridData.length; i < len; i++){
							if(gridData[i] == null || gridData[i] == "NaN"){
								gridData[i] = rangeObj.noDataValue;
							}
						}
						if(flag=="redo")GDZZ_TOOLS.writeTemporaryGrid(gridData);
						GridPanel_PageParam.resultData.gridData = gridData;
						GIS.GridEdit.showByTypes("nGis", GDZZ_TOOLS.gisDisplayType(eleData.element), gridData, GDZZ_TOOLS.gisDisplayRangeObj(rangeObj),  function(gridData,statData){
							GDZZ_TOOLS.writeTemporaryGrid(gridData);//保存格点临时文件
							GridPanel_PageParam.updateStationTable(statData);//修改表格站点值
						}, GDZZ_TOOLS.legendColors[eleData.element], 0);
						that.loadStation(eleData,result.params.statDataList);
					}else{
						alert("b");
						var len = rangeObj.nCols * rangeObj.nRows;
						if(GridPanel_PageParam.Select_Ele.channel == 'EDA')len = len*2;
						gridData = new Array(len);
						for(var i = 0; i < len;i++){gridData[i] = rangeObj.noDataValue;}
						GridPanel_PageParam.resultData.gridData = gridData;
						GIS.GridEdit.showByTypes("nGis", GDZZ_TOOLS.gisDisplayType(eleData.element), gridData, GDZZ_TOOLS.gisDisplayRangeObj(GridPanel_PageParam.resultData.rangeObj),  function(gridData,statData){
							GDZZ_TOOLS.writeTemporaryGrid(gridData);//保存格点临时文件
							GridPanel_PageParam.updateStationTable(statData);//修改表格站点值
						}, GDZZ_TOOLS.legendColors[eleData.element], 0);
					}
					alert("c");
					GDZZ_TOOLS.updateParam("gridData");
				},
				error:function(message){
					var rangeObj = GridPanel_PageParam.resultData.rangeObj;
					var len = rangeObj.nCols * rangeObj.nRows;
					if(GridPanel_PageParam.Select_Ele.channel == 'EDA')len = len*2;
					gridData = new Array(len);
					for(var i = 0; i < len;i++){gridData[i] = rangeObj.noDataValue;}
					GridPanel_PageParam.resultData.gridData = gridData;
					GIS.GridEdit.showByTypes("nGis", GDZZ_TOOLS.gisDisplayType(eleData.element), [], GridPanel_PageParam.resultData.rangeObj, "", GDZZ_TOOLS.legendColors[eleData.element], 0);
				}
			});
		},
		/**
		 * 遮罩
		 */
		addCover:function(flag,classname){
			if(!classname)classname = "loading-backdrop";
			if(!flag || $('div[name=synergy]').is(":visible")){
				if(flag)return;
				$('div[name=synergy]').remove();// 移除遮罩
			}else{
				$('#nPage').append("<div name=synergy><div class=modal-backdrop></div><div class=back-image></div></div>");//<div class="+classname+"></div>
				var panel = $('#nPage>div[name=synergy] .back-image');
				panel.css({"top":($('#nPage').height()/2-150),"left":($('#nPage').width()/2-150)});
				panel.css("background","url(../hebei/resources/business/gdzz/main/img/"+classname+".gif)");
			}
		},
		//选中背景场右下角添加拖动按钮
		bjcAddButton : function(obj){
//			
		
	},
	getWind:function(degree){
		var windSign = "";
		var wind = ["北","北东北","东北","东东北","东","东东南","东南","南东南","南","南西南","西南","西西南","西","西西北","西北","北西北","北"];
		if(degree!=null){
			var i = Math.floor((degree+11.26)/22.5);
			i -= 16*(Math.floor(i/16));
			windSign = wind[i];
		}else{
			windSign= "静风";
		}
		return windSign||degree;

	},
	//站点加载
	loadStation : function(eleData,list){
		var that = this;
		var jsondata = {};
		alert(that.Select_Ele.channel);
		var channel = that.Select_Ele.channel;
		jsondata.eleList = [];
		list.forEach(function(temp,index){
			jsondata.eleList.push({
				lat : temp.lat,
				lon : temp.lon,
				stationId : temp.code,
				stationName : temp.name,
				stationType : "0",
				val : temp.val,
				val2 : temp.val2,
				alt : null,
				areaCode : null,
				city : null,
				county : null,
				magnifcation:0,
				province : null,
				time : null
			});
		});
		var limit = GDZZ_TOOLS.valueLimit[eleData.element];
		var range = null;
		if(limit)
			range = {min:limit[0],max:limit[1]};
		that.updateStationTable(jsondata.eleList);
		if(channel == "DIS" || channel == "WEA")return;//灾害落区/天气现象不绘制站点
		jsondata.eleKey = "";
		var eleType = that.Select_Ele.channel
			.replace("TP","RAIN")
			.replace("TMP","TEMP")
			.replace("EDA","WIND")
			.replace("RH","HUMI")
			.replace("VIS","VISI");
		that.Select_Ele.stationType = eleType;
		jsondata.eleType = eleType;
		jsondata.statType = "0";
		
		var statFlag = true;
		if(GDZZ_TOOLS)
			statFlag = GDZZ_TOOLS.stationCon();
		/**
		 * 单要素显示
		 * @param mapId:地图id
		 * @param jsonData:数据elekey eleList eleType statType levels isUnLevel-true不分级
		 * @param pop 回调函数
		 * @param range 阈值范围，对象：min、max
		 * @param visibleFlag 是否显示
		 * @returns
		 */
		alert(stationTool.stationSel);
		GIS.Element.showCanvas1("nGis", jsondata, stationTool.stationSel, range,true,true);//站点加载
		GIS.Element.isShowAll("nGis",statFlag);
	},
	//站点数据面板更新
	updateStationTable : function(list,flag){
		var that = this;
		if(list&&list.length>0){
			$(".stationInfoPanel[name=stationInfo] table.stationInfoTable tr:gt(0)").remove();
			if(that.Select_Ele.channel == "EDA"){
				$(".stationInfoPanel[name=stationInfo] table.stationInfoTable td[name=channel]")
				.html("<div class='station-eda-div'>风速</div><div class='station-eda-div'>风向</div>");
			}else
				$(".stationInfoPanel[name=stationInfo] table.stationInfoTable td[name=channel]").text($("#YSDW .ysdw-select").text());
			list.forEach(function($ele,index){
				var sType = $ele.stationType == '0'?"国家": $ele.stationType == '1'?"区域":"";
				var eleVal = Number(Number($ele['val']).toFixed(2));
				if(that.Select_Ele.channel == "WEA"){
					eleVal = $(".freeAreaPanel[ele=WEA] .containter .item-weather[code="+eleVal+"]").text();
				}else if(that.Select_Ele.channel == "DIS"){
					eleVal = $(".freeAreaPanel[ele=DIS] .containter .item-disaster[code="+eleVal+"]").text();
				}
				if(that.Select_Ele.channel == "EDA"){
					var sign = eleVal==0?"静风":that.getWind($ele.val2);
					eleVal = "<div class='station-eda-div'>"+(eleVal==0?'0':(eleVal||''))
					"</div><div class='station-eda-div'>"+sign+"</div>";
				}
				if(flag){
					eleVal = "<div class='station-eda-div'>"+ eleVal +
					"</div><div class='station-eda-div'>"+Number(Number($ele['val2']).toFixed(2));+"</div>";
				}
				var html = "<tr><td>"+$ele.stationId+"</td><td>"+$ele.stationName+"</td><td>"
				+sType+"</td><td>"+(eleVal==0?'0':(eleVal||''))+"</td></tr>";
				$(".stationInfoPanel[name=stationInfo] table.stationInfoTable").append(html);
			});
			$(".stationInfoTable tr:odd").css("background","#D2EBF5");
			$(".stationInfoTable tr:even").css("background","#FFF");
			$(".stationInfoTable tr:eq(0)").css("background","#CCC");
		}
	},
	//查询灾害落区
	queryDisWaring:function(array){
		var flag = false;
		if(!array){$(".waringInfoPanel .waringLabel").each(function(i,e){
			var $e = $(e);
			var t = $("#"+$e.attr("node"));
			if(t.is(".selected")){
				$e.find("img").addClass("selected selFlag");
				flag = true;
			}else{
				$e.find("img").removeClass("selected selFlag");
			}
		});}else{flag = true;}
		GIS.Warning.deleteOneTypeLayers("nGis",{searchData:["DIS"]});//清除首席岗的灾害落区
		if(flag){
			var start = new Date($("#nDateline .node.selected:eq(0)").attr("title")),end = new Date($("#nDateline .node.selected:eq(-1)").attr("title"));
			var distance = (end - start)/3600000 + 3;
			$.ajax({
				type:'POST',
				url:window.contextPath + 'gdzz/queryDisWarnJsonData.do',
				dataType:"json",
				data:{
					startTime : new Date(end),
					distance : distance,
					wargingArea : $("#userInfo_hide").attr("userCode")
				},
				success:function(result){
					var waring = result.params.data;
					var type = {"01":"高温","03":"霾","04":"大雾","05":"霜冻","06":"冰雹","07":"雷电","08":"干旱","10":"大风","11":"寒潮","12":"暴雪","13":"暴雨","14":"台风","15":"沙尘暴"};
					var level = {"00":"红色","01":"橙色","02":"黄色","03":"蓝色"};
					var color = {"00":"#FF0202","01":"#FF8D00","02":"#FF0","03":"#179CFD"};
					for(var key in waring){
						try {
							data = JSON.parse(waring[key]);
							var fea = data.features[0];
							var type_level = key.split("_")[2]+"_"+key.split("_")[3];
							if(array && array.indexOf(type_level) < 0)continue;
							var n = type[key.split("_")[2]]+level[key.split("_")[3]]+"预警";
							var jd = {"Features":[{"rings":fea.geometry.coordinates}],"color":color[key.split("_")[3]],"disaster":n,"layerId":"DIS"+n+1};
							GIS.GridEdit.areaUnion("nGis",jd,null,function(a,b,c){
								});
						} catch (e) {}
					}
				}
			});
		}
	}
	
};
//TODO 分隔
jQuery.fn.gridPanel = function(param,list) {
//	if(param == "setBackground") {
//		fn_bjcXtys(list);
//		console.log(list);
//		return;
//	}
	if(param == "dateChanged"){
		dateChanged();
		return;
	}
	
	var data=GridPanel_PageParam.data;
	// 初始化参数
	//24:短期岗;4:中期岗
	var USERCLASS = GridPanel_PageParam.USERCLASS;//数值为一天预报的次数
	var USERPOST = GridPanel_PageParam.USERPOST;//
	var FORECASTDAY = GridPanel_PageParam.FORECASTDAY;//预报的天数
	var opt = GridPanel_PageParam.opt;
	//GridPanel_PageParam.opt = opt;
	opt = $.extend(opt, param);
	// 区分需求
	switch (opt.flag) {
	case "init":
		setTimeout(function(){
			if(!$('#QBSJ .DateAgentPicker').is('.DateAgentPicker'))
			$.IDate('#QBSJ', {query: function query(){
				jQuery.fn.gridPanel("dateChanged");
			}});// 初始化产品面板上的时间选择器组件
		},10);
		initBjcPanel();
		GDZZ_TOOLS.initPage();
		if($("#gridRight").val()!="1") {//权限控制
			$(".czaj-upload").remove();
		}
		break;
	case "upset":
		$("#userInfo_post").val(param.post);
//		GridPanel_PageParam.USERCLASS = USERCLASS = $("#userInfo_post").val()==3?24:8;//一天有多少个时段
		GridPanel_PageParam.USERPOST = USERPOST = $("#userInfo_post").val();
		GridPanel_PageParam.FORECASTDAY = FORECASTDAY = $("#userInfo_post").val()==3?4:8;//预报未来几天
//		GridPanel_PageParam.initTablebody();
		var span_title = $("#userInfo_post").val()==3?"短期岗":"中期岗";
		$(".tools_content .specific_tool[name=changePost] .tool_title .span_title").text(span_title);
		GridPanel_PageParam.opt.first=opt.first=true;
		initBjcPanel();
		break;
	case "set":
		break;
	case "close":
		break;
	}
	// 初始化
	function initBjcPanel() {
		GridPanel_PageParam.opt.ysdw = opt.ysdw = opt.ysdw_1;
		if(USERPOST != 3)GridPanel_PageParam.opt.ysdw = opt.ysdw = opt.ysdw_2;
		//updateRqdw();
		queryMakingStatus();
		//GridPanel_PageParam.initTablehead(opt.ysdw.length);
		initYSDW();
		setLayout();
		register();//注册事件
	}
	//获取背景场数据源，状态
	function queryMakingStatus(){
		GridPanel_PageParam.addCover(true);
		$.ajax({
			type:'POST',
			url:'/Web/HB/hebei/resources/business/gdzz/main/js/queryMakingStatus.json',
			dataType:"json",
			success:function(result){
				data = result.params.data;
				GridPanel_PageParam.data = data;
				setLayout();
				//TODO 表格加载数据
				GridPanel_PageParam.updateTablebody();
				//GridPanel_PageParam.addCover();
				opt.waringFlagData=null;
			}
		});
	}
	//添加灾害标识
	function addWaringFlag(data){
		if($("#nPage .waringInfoPanel").is(".waringInfoPanel")){
			$("#nPage .waringInfoPanel").html("");
		}else{
			$("#nPage").append("<div class=waringInfoPanel></div>");
		}
		var panel = $("#nPage .waringInfoPanel");
		var nullSpan = [];
		$("#nDateline .nodediy-context .node").each(function(i,e){
			var key = $(e).attr("title").substr(0,13);
			var waring = data[key];
			if(waring && waring.length > 0){
				if(nullSpan == []){
					nullSpan = waring;
				}else{
					for(ni in nullSpan){
						var n = nullSpan[ni];
						if(waring.indexOf(n) < 0){
							nullSpan[ni] = 'none';
						}
						if(nullSpan.lastIndexOf('none') == nullSpan.length-1){
							nullSpan.pop();
						}
					}
					for(wi in waring){
						var w = waring[wi];
						if(nullSpan.indexOf(w) < 0){
							var noneIndex = nullSpan.indexOf("none");
							if(noneIndex == -1){
								nullSpan.push(w);
							}else{
								nullSpan[noneIndex] = w;
							}
						}
					}
				}
				var node = "node_" + Number(new Date(key + ":00"));
				var imgs = $("<span class=waringLabel node="+node+"></span>");
				nullSpan.forEach(function(d,index){
					if(d == 'none'){
						imgs.append("<span style='padding-left: 21px;'></span>");
					}else
					imgs.append("<img name="+ d +" src='"+window.contextPath+"hebei/resources/business/gdzz/main/img/waringIco/"+d+".png'>");
				});
				panel.append(imgs);
			}
		});
		$(".waringInfoPanel .waringLabel img").unbind("click").bind("click",function(){
			var $this = $(this);
			var ele = $("#"+$this.parent().attr("node"));
			var name = $this.attr("name");
			if(!ele.is(".selected"))return;
			if($this.is(".selected")){
				$(".waringInfoPanel .waringLabel img.selected[name="+name+"]").removeClass("selected");
			}else{
				$(".waringInfoPanel .waringLabel img.selFlag[name="+name+"]").addClass("selected");
			}
			var array = [];
			$(".waringInfoPanel .waringLabel img.selected").each(function(i,e){
				var n = $(e).attr("name");
				if(array.indexOf(n)<0){
					array.push(n);
				}
			});
			GridPanel_PageParam.queryDisWaring(array);
		});
		GridPanel_PageParam.queryDisWaring();
		waringFlagMove();
	}
	//灾害落区标识位置控制
	function waringFlagMove(){
		$(".waringInfoPanel").css('left',$(".gdzz-left").width()+3);
		$(".waringInfoPanel .waringLabel").each(function(i,e){
			var $e = $(e);
			var o = $("#"+$e.attr("node")).offset();
			if(o){
				if(o.top <= $(".col-lg-11 .condi-block:eq(2)").offset().top){
					$e.show();
				}else{
					$e.hide();
				}
				$e.css('top',o.top-49);
			}
		});
	}
	//更新日期定位
	function updateRqdw(index){
		$(".table-body-row .body-cell.cRightSelected").removeClass("cRightSelected");
		$("#stationDialog").hide();//右击面板隐藏
		if(USERCLASS != 24 && $("#RQDW div:eq(1) .ysdw-body").length<FORECASTDAY){
			var $rqdw_len = $("#RQDW div:eq(1) .ysdw-body").length;
			for(var x_24=0;x_24<FORECASTDAY-$rqdw_len;x_24++){
				$("#RQDW div:eq(1)").append("<span class='ysdw-body' style='min-width: 47px;'><div></div></span>");
			}
		}else if($("#RQDW div:eq(1) .ysdw-body").length>FORECASTDAY){
			$("#RQDW div:eq(1) span.ysdw-body:gt("+(FORECASTDAY-1)+")").remove();
		}
		for(var i=0;i<FORECASTDAY;i++){
			var time = 24*(USERPOST == 3?i:i+3);
			$("#RQDW div:eq(1) span:eq("+i+") div").text(time);
		}
	}
	//初始化要素定位面板
	function initYSDW(){
		var ysHtml = "";
		for (var i = 0, wlen = opt.ysdw.length; i < wlen; i++) {
			var ysClass = (i==0)?"ysdw-body ysdw-selected":"ysdw-body";
			
			var ysDivClass = (i==0)?"ysdw-select":"";
			ysHtml += '<span class="'+ysClass+'" elesize="'+ opt.ysdw[i].dataname.length +'" channel="'+
				opt.ysdw[i].id+'"><div class='+ysDivClass+'>'+opt.ysdw[i].name+'</div></span>';
		}
		$("#YSDW").find("div").eq(1).html(ysHtml);
	}
	// 注册事件
	function register(){
		$("#btnUnfold").unbind('click').bind('click',function(e) {
			var $left = $(".gdzz-left-product");
			if ($left.hasClass('col-lg-5')) {
				$left.removeClass('col-lg-5').addClass('col-lg-3');
				$("#btnUnfold .czaj-unfold-title").text("展开");
			} else {
				$left.removeClass('col-lg-3').addClass('col-lg-5');
				$("#btnUnfold .czaj-unfold-title").text("收起");
			}
			setLayout();
		});	
		//要素定位点击
		$("#YSDW").undelegate('.ysdw-body', 'click').delegate('.ysdw-body','click',function(ev) {
			
			var $this = $(this);
			$this.addClass('ysdw-selected').siblings().removeClass('ysdw-selected');
			$("#RQDW div:eq(1) span:eq(1)").click();
			$(".table-body-row .body-cell.cRightSelected").removeClass("cRightSelected");
			$("#stationDialog").hide();
			
			setLayout();
		});
		//保存按钮
		$("#CZAJ .czaj-save").unbind('click').bind('click',function(e){
			var $ele = $(this);
			if($ele.is(".czaj-save")){
				var _ele = GridPanel_PageParam.Select_Ele;
				GridPanel_PageParam.addCover(true,"saving-backdrop");
				$ele.removeClass("czaj-save").addClass("czaj-save-loading");
				GridPanel_PageParam.change_param.resultFlag = true;//是否继续改变状态标识
			
				/* obj
				 *  addClasss  更改后的样式 (String)(+)
				 *  outTime    延时(毫秒)(+)
				 *  operate    操作标识(boolean)true 索引+1
				 *  changeText 内容更改标识(String)
				 */
				$.ajax({
					type:'POST',
					url:window.contextPath + 'gdzz/saveGrid.do',
					dataType:"json",
					data:{fcstTime:_ele.fcstDate,post:_ele.post},
					//TODO 添加撤销样式
					success:function(result){
						GridPanel_PageParam.addCover();
						if(result.success){
							var errorElement = "",errorValEle = "";
							var notChangeChannel = "";
							//GridPanel_PageParam.change_param.$tDataList.removeClass("bjc-modified").addClass(opt.status2Class[2]);
							var nullPeriods = result.params.nullPeriods;
							if(nullPeriods && nullPeriods.length > 0) {
								for(var i=0;i<nullPeriods.length;i++) {
									var perFlag = false;
									var element = nullPeriods[i].element;
									var periodList = nullPeriods[i].list;
									var valList = nullPeriods[i].valList;
									if(valList && valList.length > 0){
										for(var j=0;j<valList.length;j++) {
											$(".grid-table-body .table-body-row .body-cells[channel="+element+"] div.body-cell[period='"+valList[j]+"']").addClass("bjc-inconformity");
										}
										errorValEle += element+",";
									}
									if(periodList && periodList.length > 0){
										for(var j=0;j<periodList.length;j++) {
											$(".grid-table-body .table-body-row .body-cells[channel="+element+"] div.body-cell[period='"+periodList[j]+"']").addClass("bjc-inconformity");
										}
										errorElement += element+",";
										notChangeChannel += "[channel="+element+"],";
									}
								}
								errorElement = errorElement.substr(0,errorElement.length-1);
								notChangeChannel = notChangeChannel.substr(0,notChangeChannel.length-1);
							}
							
							GridPanel_PageParam.change_param.$tDataList = $(".table-body-row .body-cells:not("+notChangeChannel+") .body-cell.bjc-modified:not(.bjc-inconformity)"); //要更改的背景场
							GridPanel_PageParam.change_param.tDataList_ = new Array;//数据更改前的属性值集合
							GridPanel_PageParam.changeBjcEles({"addClass":opt.status2Class[2],"outTime":0});
							if(errorElement && errorElement.length > 0 || (errorValEle && errorValEle.length > 0)) {
								var tit = "";
								if(errorElement.length > 0){
									tit += errorElement+ "存在空值,";
								}
								if(errorValEle.length > 0){
									tit += errorValEle.substr(0,errorValEle.length-1)+"超出阈值范围,";
								}
								alert(tit+"检查失败！");
							} else {
								alert("保存成功");
							}
						}else{
							//GridPanel_PageParam.change_param.resultFlag = false;
							alert("保存失败");
							//GridPanel_PageParam.tDataList_restore();
						}
						$ele.removeClass("czaj-save-loading").addClass("czaj-save");
					},
					error:function(){
						//GridPanel_PageParam.change_param.resultFlag = false;
						alert("保存失败");
						//GridPanel_PageParam.tDataList_restore();
						$ele.removeClass("czaj-save-loading").addClass("czaj-save");
						GridPanel_PageParam.addCover();
					}
				});
			}
		});
		//TODO 发布按钮
		$("#CZAJ .czaj-upload").unbind('click').bind('click',function(e){
			var $ele = $(this);
			if($ele.is(".czaj-upload")){
				var _ele = GridPanel_PageParam.Select_Ele;
				GridPanel_PageParam.addCover(true,"publishing-backdrop");
				$ele.removeClass("czaj-upload").addClass("czaj-upload-loading");
				GridPanel_PageParam.change_param.resultFlag = true;//是否继续改变状态标识
				//GridPanel_PageParam.change_param.$tDataList = $(".table-body-row .body-cell[datac]:not(.bjc-live)"); //要更改的背景场
				//GridPanel_PageParam.change_param.tDataList_ = new Array;//数据更改前的属性值集合
				/* obj
				 *  addClasss  更改后的样式 (String)(+)
				 *  outTime    延时(毫秒)(+)
				 *  operate    操作标识(boolean)true 索引+1
				 *  changeText 内容更改标识(String)
				 */
				//GridPanel_PageParam.changeBjcEles({"addClass":"bjc-published","outTime":20});
				$.ajax({
					type:'POST',
					url:window.contextPath + 'gdzz/publishGrid.do',
					dataType:"json",
					data:{fcstTime:_ele.fcstDate,
						post:_ele.post,
						elements:GDZZ_TOOLS.checkElements(),
						userId:_ele.userId
					},
					success:function(result){
						if(result.success){
							var errorElement = "",errorValEle = "";
							var notChangeChannel = "";
							var nullPeriods = result.params.nullPeriods;
							if(nullPeriods && nullPeriods.length > 0) {
								for(var i=0;i<nullPeriods.length;i++) {
									var element = nullPeriods[i].element;
									var periodList = nullPeriods[i].list;
									var valList = nullPeriods[i].valList;
									if(valList && valList.length > 0){
										for(var j=0;j<valList.length;j++) {
											$(".grid-table-body .table-body-row .body-cells[channel="+element+"] div.body-cell[period='"+valList[j]+"']").addClass("bjc-inconformity");
										}
										errorValEle += element+",";
									}
									if(periodList && periodList.length > 0){
										for(var j=0;j<periodList.length;j++) {
											$(".grid-table-body .table-body-row .body-cells[channel="+element+"] div.body-cell[period='"+periodList[j]+"']").addClass("bjc-inconformity");
										}
										errorElement += element+",";
										notChangeChannel += "[channel="+element+"],";
									}
								}
								errorElement = errorElement.substr(0,errorElement.length-1);
								notChangeChannel = notChangeChannel.substr(0,notChangeChannel.length-1);
							}
							
							GridPanel_PageParam.change_param.$tDataList = $(".table-body-row .body-cells:not("+notChangeChannel+") .body-cell:not(.bjc-live,.bjc-inconformity)"); //要更改的背景场
							GridPanel_PageParam.change_param.tDataList_ = new Array;//数据更改前的属性值集合
							GridPanel_PageParam.changeBjcEles({"addClass":GridPanel_PageParam.opt.status2Class[2],"outTime":0});
							
							if(errorElement && errorElement.length > 0 || (errorValEle && errorValEle.length > 0)) {
								var tit = "";
								if(errorElement.length > 0){
									tit += errorElement+ "存在空值,";
								}
								if(errorValEle.length > 0){
									tit += errorValEle.substr(0,errorValEle.length-1)+"超出阈值范围,";
								}
								alert(tit+"检查失败！");
							} else {
								alert(result.message);
								$(".table-body-row .body-cells .body-cell[datac]:not(.bjc-live)")
									.removeClass("bjc-unmodify bjc-modified bjc-saved bjc-published bjc-nodata bjc-inconformity")
									.addClass("bjc-published");
							}
						} else{
							alert(result.message);
							if(result.code == "consisCheck"){//不一致背景色修改
								GDZZ_TOOLS.showConsisResult(result);
								GridPanel_PageParam.checkBjcByz(result.params.data);
							}
						}
						$ele.removeClass("czaj-upload-loading").addClass("czaj-upload");
						GridPanel_PageParam.addCover();
					},
					error:function(){
						alert("发布成功！");
						queryMakingStatus();
						$ele.removeClass("czaj-upload-loading").addClass("czaj-upload");
						GridPanel_PageParam.addCover();
					}
				});
			}
		});
		//重做按钮
		$("#CZAJ .czaj-redo").unbind('click').bind('click',function(e){
			if($(this).is(".czaj-redo")){
				var eleData =  JSON.parse(JSON.stringify(GridPanel_PageParam.Select_Ele));
				eleData.fcstDate = new Date(eleData.fcstDate);
				eleData.periodDate = new Date(eleData.periodDate);
				eleData.index = -1;
				eleData.status = 0;
				GridPanel_PageParam.readMonoPeriodGrid(eleData,"redo");
			}
		});
		//右击隐藏
		$("#stationDialog").unbind('contextmenu').bind('contextmenu',function(e){
			if(e.which==3){
				$(".table-body-row .body-cell.cRightSelected").removeClass("cRightSelected");
				$("#dialogContent .modelUl .common-a:eq(0)").click();
				$("#stationDialog #choose option:eq(0)").selected();
				$("#stationDialog").hide();
				e.preventDefault();
				return false;
			}
		});
		
//		//指针离开隐藏
//		$("#stationDialog").unbind('mouseleave').bind('mouseleave',function(e){
//			$(".table-body-row .body-cell.cRightSelected").removeClass("cRightSelected");
//			$("#dialogContent .modelUl .common-a:eq(0)").click();
//			$("#stationDialog #choose option:eq(0)").selected();
//			$("#stationDialog").hide();
//			e.preventDefault();
//			return false;
//		});
		//复制背景场
		$("#move2Copy").unbind('click').bind('click',function(e){
			document.onselectstart = function(){
				event.returnValue = false;
			};
			var G_data = GridPanel_PageParam.data;
			var $sel_Ele = $(".table-body-row .body-cell.cSelected");//选中背景场
			var channel = $sel_Ele.parent(".body-cells").attr("channel");//channel值
			var $eles = $(".grid-table-body .table-body-row .body-cells[channel="+channel+"] .body-cell:not(.bjc-live)");//选中的当前列
			GridPanel_PageParam.Copy_Eles = $eles;
			var copyData = new Array;
			if($("#move2Copy").is(".icon-icon-add-alarm-products-1")){
				$("#move2Copy").removeClass("icon-icon-add-alarm-products-1").addClass("icon-icon-guan-1");
				$eles.unbind("click contextmenu keydown");
				$eles.unbind("mousedown").bind("mousedown",function(e){
					if($(this).is(".cSelected"))return;
					//清除选中样式
					$eles.removeClass("pasteElement pasteElement-top pasteElement-bottom pasteElement-border");
					var start = $eles.index($(this));
					var end = -1;
					copyData = new Array;
					var copydata = G_data[channel][$(this).attr("datac")];
					copydata.fcstDate = new Date(copydata.fcstDate)+"";
					copydata.periodDate = new Date(copydata.periodDate)+"";
					copyData.push(copydata);
					$(this).addClass("pasteElement-border");
					
					$eles.unbind("mouseenter").bind("mouseenter",function(e){
						end = $eles.index($(this));
						$eles.removeClass("pasteElement pasteElement-top pasteElement-bottom pasteElement-border");
						copyData = new Array;
						var eles = [];
						if(end>start){
							eles = $eles.slice(start,end+1);
						}else if(end<start){
							eles = $eles.slice(end,start+1);
						}
						if(end!=start)eles.each(function(index,ele){
							if(!$(ele).is(".cSelected")){
								if(index==0){
									$(ele).addClass("pasteElement-top");
								}else if(index == (eles.length-1)){
									$(ele).addClass("pasteElement-bottom");
								}else{
									$(ele).addClass("pasteElement");
								}
								var copydata = G_data[channel][$(this).attr("datac")];
								copydata.fcstDate = new Date(copydata.fcstDate)+"";
								copydata.periodDate = new Date(copydata.periodDate)+"";
								copyData.push(copydata);
							}
						});
					});
					$("body").unbind("mouseup").bind("mouseup",function(e){
						GridPanel_PageParam.change_param.resultFlag = true;//是否继续改变状态标识
						GridPanel_PageParam.change_param.$tDataList = $(".grid-table-body .body-cells div[class*=pasteElement]"); //要更改的背景场
						
						$eles.unbind("mouseenter mousedown mouseup");
						$("body").unbind("mouseup");
						//ajax
						var eleData =  JSON.parse(JSON.stringify(GridPanel_PageParam.Select_Ele));
						eleData.fcstDate = new Date(eleData.fcstDate)+"";
						eleData.periodDate = new Date(eleData.periodDate)+"";
						var obj = {statusFrom_str: JSON.stringify(eleData),
								list: JSON.stringify(copyData)};
						GridPanel_PageParam.changeBjcEles({addClass:opt.status2Class[1],operate:true});
						$.ajax({
							type:'POST',
							url:window.contextPath + 'gdzz/copyMonoPeriodGrid.do',
							dataType:"json",
							data:obj,
							success:function(){
								GridPanel_PageParam.bindmouse();
							}
						});
						$("#move2Copy").addClass("icon-icon-add-alarm-products-1").removeClass("icon-icon-guan-1");
						setTimeout(function(){
							$eles.removeClass("pasteElement pasteElement-top pasteElement-bottom pasteElement-border");
						},$eles.length*20);
						$eles.css("cursor" , "pointer");
					});
				});
				$eles.css("cursor" , "cell");
			}else{
				$("#move2Copy").addClass("icon-icon-add-alarm-products-1").removeClass("icon-icon-guan-1");
				$eles.unbind("mouseenter mousedown mouseup");
				$("body").unbind("mouseup");
				$eles.removeClass("pasteElement pasteElement-top pasteElement-bottom pasteElement-border");
				GridPanel_PageParam.bindmouse();
				$eles.css("cursor" , "pointer");
			}
			$(".table-body-row .body-cell.cRightSelected").removeClass("cRightSelected");
			$("#stationDialog").hide();
		});
		//左右按钮点击事件
		$(".czaj-arrow3").unbind('click').bind('click',function(e){
			var $ele_index = $("#YSDW div:eq(1) .ysdw-body.ysdw-selected").index();
			var $length = $("#YSDW div:eq(1) .ysdw-body").length;
			if($(this).children("span").is(".icon-icon-forward-arrow3-4")){//向左
				if($ele_index == 0){
					$("#YSDW div:eq(1) .ysdw-body")[$length-1].click();
				}else{
					$("#YSDW div:eq(1) .ysdw-body")[$ele_index-1].click();
				}
			}else{//向右
				if($ele_index ==($length-1)){
					$("#YSDW div:eq(1) .ysdw-body")[0].click();
				}else{
					$("#YSDW div:eq(1) .ysdw-body")[$ele_index+1].click();
				}
			}
		});
		
//		//背景场滚动事件
//		$('.grid-table-body').unbind('mousewheel.chosen DOMMouseScroll.chosen').bind('mousewheel.chosen DOMMouseScroll.chosen', function(evt) {
//			var top = $('section.nodediy-scroll').scrollTop();
//			$('section.nodediy-scroll').scrollTop( $('section.nodediy-scroll').scrollTop()+evt.originalEvent.deltaY);
//			$("#RQDW .ysdw-body.ysdw-selected").removeClass("ysdw-selected");
//			$("#RQDW .ysdw-body:eq("+Math.floor($('section.nodediy-scroll').scrollTop()/(23*USERCLASS-10))+")").addClass("ysdw-selected");
//			GridPanel_PageParam.bjcAddButton({top:$('section.nodediy-scroll').scrollTop()-top,wheel:true});
//		});
		$('.grid-table-body').scroll(function(evt){
			$('section.nodediy-scroll').scrollTop($(evt.currentTarget).scrollTop());
			GridPanel_PageParam.bjcAddButton({top:$(evt.currentTarget).scrollTop()-top,wheel:true});
		});
		//showdialog模式选择
		$("#stationDialog .model .modelUl .common-a").unbind('click').bind('click',function(e){
			if(!$(this).is(".modelUl-a") && !$(this).is(".modelUl-unclick")){
				$("#stationDialog .model .modelUl .common-a.modelUl-a").removeClass("modelUl-a");
				$(this).addClass("modelUl-a");
			}
		});
		//showdialog下拉框change事件
		$("#stationDialog #choose").unbind("change").bind("change",function(option){
			var _ele = GridPanel_PageParam.Select_Ele;
			$.ajax({
				type:'POST',
				url:window.contextPath + 'gdzz/queryDataSourceStatus.do',
				dataType:"json",
				data:{
					"fcstTime" : _ele.fcstDate,
					"element" : $(".table-body-row .body-cell.cRightSelected").parents("div[data-key=body]").attr("ysid"),
					"period" : 24*($(this).parents(".table-body-row").index()+(USERPOST == 3?0:3)),
					"type" : Number($(this).val()),
					"post" : _ele.post
				},
				success:function(result){
					$("#dialogContent .modelUl span").addClass("modelUl-unclick");
					$("#dialogContent .modelUl span").each(function(index,ele){
						if(result.params.dataMap[$(ele).attr("mod")]){
							$(ele).removeClass("modelUl-unclick");
						}
					});
				}
			});
		});
		//showdialog确认取消点击
		$("#stationDialog .footer .buttons .button").unbind('click').bind('click',function(e){
			if($(this).attr("id")=="ok"){
				var $V_sel = $("#stationDialog #choose option:selected").val();//showdialog的select值
				var $C_sel = $("#stationDialog .modelUl .common-a.modelUl-a");//showdialog的模式选择
				var $E_sel = $(".table-body-row .body-cell.cRightSelected");//右击选中的背景场
				var channel = $E_sel.parents("div[data-key=body]").attr("ysid");//选中的背景场要素ID
				if(channel){
					var _ele = GridPanel_PageParam.Select_Ele;
					GridPanel_PageParam.addCover(true);
					var obj = {
							fcstTime:_ele.fcstDate,
							mode:$C_sel.attr("mod"),
							element:channel,
							period:24*($E_sel.parents(".table-body-row").index()+(USERPOST == 3?0:3)),
							type:Number($V_sel),
							post:_ele.post
					};
					$.ajax({
						type:'POST',
						url:window.contextPath + 'gdzz/updateDataSource.do',
						dataType:"json",
						data:obj,
						success:function(result){
							if(result.success){
								var alertText = "";
								$(".table-body-row:eq(0) .body-cells").each(function(index,ele){
									if(result.params.dataList.indexOf($(ele).attr("channel"))<0){
										var text = $(ele).attr("title")||$(ele).parent("div[data-key=body]").attr("title");
											if(alertText.indexOf(text)<0 && "灾害落区天气现象云量能见度湿度".indexOf(text)<0)
										alertText += "，"+text;
									}
								});
								if($V_sel==4 && alertText.length>1){
									alert(alertText.substr(1)+"不存在"+($C_sel.attr("modval").replace("国家","国家指导")));
								}
								dateChanged();
								GridPanel_PageParam.clickedSelect();
								GDZZ_TOOLS.checkDoable();//检查是否可以撤销
							}else{
								dateChanged();
								alert("修改失败!!");
								GridPanel_PageParam.addCover();
							}
						},
						error:function(xml){
							dateChanged();
							alert("修改失败!!");
							GridPanel_PageParam.addCover();
						}
					});
				}
			}
			//showdialog回归初始化
			$(".table-body-row .body-cell.cRightSelected").removeClass("cRightSelected");
			$("#dialogContent .modelUl .common-a:eq(0)").click();
			$("#stationDialog #choose option:eq(0)").selected();
			$("#stationDialog").hide();
		});
		//日期定位点击事件
		$("#RQDW").undelegate('.ysdw-body', 'click').delegate('.ysdw-body','click',function(ev) {
			var $this = $(this);
			$this.addClass('ysdw-selected').siblings().removeClass('ysdw-selected');
			var rqdwIndex = $("#RQDW .ysdw-body.ysdw-selected").index();
			$(".grid-table-body").scrollTop( 23*USERCLASS*rqdwIndex);
			var ysid = $("#YSDW div:eq(1) .ysdw-body.ysdw-selected").attr("channel");
			if(ysid == "TP" || ysid == "TMP" || ysid == "RH"){
				var channel = ysid.replace("TP","TP24H").replace("TMP","TMAX").replace("RH","RHMAX");
				$(".grid-table-body .table-body-row:eq("+rqdwIndex+") div[ysid="+ysid+"] div[channel="+channel+"]:eq(0) .body-cell").click();
			}else{
				$(".grid-table-body .table-body-row:eq("+rqdwIndex+") div[ysid="+ysid+"] .body-cell:not(.bjc-live):eq(0)").click();
			}
			$('section.nodediy-scroll').scrollTop( 23*USERCLASS*rqdwIndex);
			
		});
	}
	// 设置样式
	function setLayout() {
		var tts = 0;
		var $date = $("#date").val();
		if($("#date") && $("#date").val().split(":").length<2){
			$date = $date+":00";
		}
		var hour =  new Date($date).getHours();
		var date_start = "";//起报时间(小时)
		
		
		var $left = $(".gdzz-left-product");
		$left.css({"width" : 349});
		$(".col-lg-11").css({"width" : 311});
		$("#YSDW").css({"height" : 47});
		$("#YSDW").find("div").eq(0).css({"margin-right" : 6});
		$("#YSDW").find("div").eq(1).css({"width" : 231});
		$("#YSDW").find("div").eq(1).find("span:lt(6)").css({"min-width" : 47});
		$("#YSDW").find("div").eq(1).find("span:gt(5)").css({"min-width" : 93});
		$("#YSDW").find("div").eq(1).find("span:gt(4)").css({"margin-top" : -1});
		$("#RQDW").find("div").eq(1).css({"width" : 231});
		setEnfold();
		
		
	}
	// 展开按钮事件
	function setUnfold() {
		var le = $("#YSDW .ysdw-selected").index();
		GridPanel_PageParam.initTablehead(le);
		if(opt.first){GridPanel_PageParam.initTablebody(le);}
		else{GridPanel_PageParam.upsetTablebody();}
		$(".table-header").find("[data-key='header']").show();
		$(".grid-table-body").find("[data-key='body']").show();
		$(".table-body-row .body-cell.cRightSelected").removeClass("cRightSelected");
		$("#stationDialog").hide();
	}
	// 收起按钮事件
	function setEnfold() {
		var ysid = $("#YSDW .ysdw-selected").attr("channel");
		var le = $("#YSDW .ysdw-selected").index();
		//GridPanel_PageParam.initTablehead(le);
		if(opt.first){GridPanel_PageParam.initTablebody(le);}
		else{GridPanel_PageParam.upsetTablebody();}
		var index = $(".table-header").find("div[channel='" + ysid + "']").index();
		$(".table-header").find("div[data-key='header']").hide();
		$(".grid-table-body").find("div[data-key='body']").hide();
		var firLen = 5;

	}
	/**
	 * 自定义时间轴
	 * --obj里的参数
	 * baseTime      //基准时间
	 * timeSpacing   //间隔，单位：小时
	 * nodeLength    //控制填充实况时间长度
	 * margin_top    //调整时间轴顶端margin
	 * div_height    //调整时间轴高度
	 * totTimeSpacing//总时间跨度，单位：小时
	*/
	function diytimebar(obj) {
		if($('#nDateline')){
			$('#nDateline').html("");
			$('#nDateline').append("<div class='nDataline_div' style='height: "+obj.div_height+"px;'><section class='nodediy-scroll'>"+
					"<section class='nodediy-context' style='width: 38px;margin-top: "+
					obj.margin_top+"px;'></section></section></div>");
			var Time = new Date(new Date()-24*60*60*1000);//起始时间
			if(obj.baseTime)Time = new Date(obj.baseTime);
			var timeSpa = 1; //时间间隔(小时)
			if(obj.timeSpacing)timeSpa = obj.timeSpacing;
			var totTimeSpa = 4*24;//时长(小时)
			if(obj.totTimeSpacing)totTimeSpa = obj.totTimeSpacing;
			
			var count = 0;
//			var ysid = $("#YSDW .ysdw-selected").attr("channel");
//			var element = opt.ysdw[$("#YSDW .ysdw-selected").index()].dataname[$("#YSDW .ysdw-selected").attr("elesize")-1];
			for(var t = -24-obj.nodeLength*timeSpa,addTime=Time;t < totTimeSpa-24;t+=timeSpa){
				++count;
				var beforeDay = addTime.getDate();
				addTime = new Date(Number(Time)+3600000*t);
				var className = "node";
				var node_class = "node-split-text";
				var $dataEle = null;
				if(count-obj.nodeLength>0)//排除增加的无用时间
					$dataEle = $(".grid-table-body .table-body-row").find(".body-cells:last").find(".body-cell").eq(count-obj.nodeLength-1);
				if(USERPOST == 3 && (count <= obj.nodeLength || ($dataEle && $dataEle.is(".bjc-live")))){
					className += " bjc-live";
					node_class += " node-live";
				}
				var nextDay = addTime.getDate();
				if(beforeDay != nextDay && t != -24-obj.nodeLength*timeSpa){
					var node_day = addTime.getDate()<10?"0"+addTime.getDate():addTime.getDate();
					$('#nDateline').find(".nodediy-context").append("<i class='node-split' title='"+node_day+"日'><i class='"+node_class+"'>"+node_day+"日</i></i>");
				}
				var hour = addTime.getHours()<10?"0"+addTime.getHours():addTime.getHours();
//				if(hour>8&&hour<21){
//					className += " node-am";
//				}else{
//					className += " node-pm";
//				}
				if(t >= 0){
					className += " node-edit"
				}
				$("#nDateline .nodediy-context").append("<i class='"+className+"' id='node_"+Number(addTime)+"' title='"+addTime+"'>"+hour+"</i>");
			}
			$('#nDateline .nDataline_div .node:gt('+obj.nodeLength+')').unbind("click").bind("click",function(){
				if(GridPanel_PageParam && GridPanel_PageParam.Select_Ele &&
						"TMAX,TMIN,RHMIN,RHMAX,TP24H".indexOf(GridPanel_PageParam.Select_Ele.element)>-1)return;
				var $time = Number($(this).attr("id").substr(5));
				var period = ($time-new Date(GridPanel_PageParam.Select_Ele.fcstDate))/3600000;
				var channel = GridPanel_PageParam.Select_Ele.element;
				var $clk_ele = $(".grid-table-body .table-body-row .body-cells[channel="+channel+"] .body-cell[period="+period+"]");//选中的当前背景场
				
				$clk_ele.click();
			});
		}
	}
	//TODO 时间改变事件
	function dateChanged(){
		
		
		opt = GridPanel_PageParam.opt;
		USERCLASS = GridPanel_PageParam.USERCLASS;
		USERPOST = GridPanel_PageParam.USERPOST;
		FORECASTDAY = GridPanel_PageParam.FORECASTDAY;
		updateRqdw();
		GDZZ_TOOLS.readLagend();
		queryMakingStatus();
	}
};