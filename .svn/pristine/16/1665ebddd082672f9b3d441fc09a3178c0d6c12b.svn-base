$.fn.productNav = function(params){
				// 参数
				var sucFn = null;
				if (params){
					sucFn = params.sucFn;
				}
				
				var box = '<div class="row"><div class="col-lg-9"></div></div>';
				$(this).append(box);
				var $box = $(this).find(".row > div"); 
				var rightTool = '<div class="col-lg-1"><div class="right-colsbtn"><a href="#"><i class="fa fa-step-backward"></i></a></div></div>'; 
				$box.after(rightTool);
				
				var $rt = $box.next();
				
				// 生成第一层tab
				var prodTab =$('<div class="productTab"></div>'); 
				var tabData = $.Menu.curSelMenuData;
				
				if (tabData.children != null && tabData.children.length > 0){
					for (var i = 0; i < tabData.children.length; i++){
						var tabI = tabData.children[i];
						var tab = $('<div id="tab_'+ tabI.id +'"></div>');
						tab.attr("title",tabI.name);
						tab.attr("mid",tabI.id);
						if (i == 0){
							tab.addClass("default");
						}
						
						// 初始化第二层  右侧按钮
						if (tabI.children != null && tabI.children.length > 0 ){
							
							for (var j = 0; j < tabI.children.length; j++){
								var panelI = tabI.children[j];
								
								var $rightbtn = $('<div class="right-btn"></div>');
								$rightbtn.attr("id",panelI.id);
								$rightbtn.attr("mid",panelI.id);
								$rightbtn.attr("pid",tabI.id);
								$rightbtn.attr("title",panelI.name);
								var url = G_CONTEXT.contextPath + panelI.url;
								if (url.indexOf("mod_template")>0) {
									var a = url.substring(url.indexOf('mod_template')+13);
									if (a.indexOf("&")>0) {
										a = a.substring(0,a.indexOf("&"));	
									}
									url=url.replace(a,G_CONTEXT.projectConfig[a]);
								}
								$rightbtn.attr("url",url);
								
								var firstWord = panelI.name.charAt(0);
								$rightbtn.html('<a href="'+ url +'" target="tab_'+ tabI.id +'_body">'+firstWord+'</a>');
								
								$rt.append($rightbtn);
								
								$rightbtn.on("mouseover",function(){
									$(this).find("a").text($(this).attr("title"));
								});
								$rightbtn.on("mouseleave",function(){
									$(this).find("a").text($(this).attr("title").charAt(0));
								});
								
								$rightbtn.find("a").a2ajax(sucFn);
								
								$rightbtn.find("a").on("click",function(){
									//debugger;
									$(".right-btn").removeClass("active");
									$(this).parent().addClass("active");
								});
							}
						}
						// pannel 初始化结束
						
						prodTab.append(tab);
					}
					
				}
					
				$box.append(prodTab);

				$(".productTab").nTabs({ 
					"direction":"top",
					"lazy":true,
					"onTabSelect":function(tab){
						//debugger;
						var tabbodyId = $(tab).find("a").attr("href");
						var mid = $(tabbodyId).attr("mid");
						$(".right-btn").hide();
						$(".right-btn[pid='"+ mid +"']").show();
						$(".right-btn:visible:first").find("a").click();
					},
				}); 

				$(".right-btn:first").find("a").click();
				
				// 隐藏按钮事件
				$(".right-colsbtn").find("a").on("click",function(){
					$("#productNav").animate({opacity:'hide',left:-20},200,function(){
						$("#productNavBtn").show();
					});
					
				});
				
				
//				$(".listBtn").on("click",function(){
//					$(this).parent().parent().children(".prodListDiv").remove();
//					
//					var prodDiv = $('<div class="col-lg-12 col-sm-12 prodListDiv"><div>');
//					var menuId = $(this).attr("id").split("_")[1];
//					var mData = $.Menu.findMenuDataById(menuId);
//					
//					$(this).parent().after(prodDiv);
//					
//					var prodData = mData.children ? mData.children : [];
//					for (var i = 0; i < prodData.length; i++){
//						var prodBtn = $('<div class="col-lg-6 col-md-12 prodBtn" url="'+prodData[i].url+'" id="pb_'+ prodData[i].id +'" num = "'+i+'" name="'+prodData[i].name+'">'+ prodData[i].name +'</div>');
//						prodDiv.append(prodBtn);
//						prodBtn.on("click",function(){
//							var url = $(this).attr("url");
//							var params = {startTime:'2016-03-09 08:00:00'};
//							 $.ajax({
//								 type:'POST',
//								 url:G_CONTEXT.contextPath+url,
//								 dataType:'json',
//								 data: params,
//								 success:function(data){
//									console.log(data);
//								 }
//							 });
//							 
//							//alert($(this).attr("num"));
//							if($(this)[0].style.color != "white") {
//								var content = $('<span value="'+$(this).attr("id")+'" >'+$(this).attr("name")+'</span><br>');
//								$("div.prodPropTitle").next().children("span:first").before(content);
//							}
//							$(".prodBtn").css({background:"white",color:"black"});
//							$(this).css({background:"#86BEF3",color:"white"});
//						});
//					}
//						
//					
//					$(this).parent().find(".active").removeClass("active");
//					$(this).addClass("active");
//				});
				
};