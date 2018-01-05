ELEMENT_POP.elements = {
	autostation : {
		title : "自动站实况",
		subtitle : "自动站实况详情",
		url : "warn/getAwsStationDetailInfo.do",
		contentHeight : 140,
		contents : [
			{
				children : [
					{
						"key" : "lon",
						"name" : "经度",
						"unit" : "°",
						"clazz" : "common",
						formatter : function(val) {
							return ELEMENT_POP.formatNumber(val);
						}
					},
					{
						"key" : "lat",
						"name" : "纬度",
						"unit" : "°",
						"clazz" : "common",
						formatter : function(val) {
							return ELEMENT_POP.formatNumber(val);
						}
					},
					{
						"key" : "stationId",
						"name" : "站号",
						"unit" : "",
						"clazz" : "common"
					},
					{
						"key" : "stationName",
						"name" : "站名",
						"unit" : "",
						"clazz" : "common"
					},
					{
						"key" : "snowVal",
						"name" : "雪深",
						"unit" : "cm",
						"clazz" : "common"
					},
					{
						"key" : "visVal",
						"name" : "能见度",
						"unit" : "m",
						"clazz" : "common"
					},
				]
			},
			{
				children : [
					{
						"key" : "rain05Val",
						"name" : "30风钟雨量",
						"unit" : "mm",
						"clazz" : "common"
					},
					{
						"key" : "rainVal",
						"name" : "1小时雨量",
						"unit" : "mm",
						"clazz" : "common"
					},
					{
						"key" : "rain3Val",
						"name" : "3小时雨量",
						"unit" : "mm",
						"clazz" : "common"
					},
					{
						"key" : "rain6Val",
						"name" : "6小时雨量",
						"unit" : "mm",
						"clazz" : "common"
					},
					{
						"key" : "rain12Val",
						"name" : "12小时雨量",
						"unit" : "mm",
						"clazz" : "common"
					},
					{
						"key" : "rain24Val",
						"name" : "24小时雨量",
						"unit" : "mm",
						"clazz" : "common"
					}
				]
			},
			{
				children : [
					{
						"key" : "sp1HVarVal",
						"name" : "1小时变压",
						"unit" : "hPa",
						"clazz" : "common"
					},
					{
						"key" : "sp3HVarVal",
						"name" : "3小时变压",
						"unit" : "hPa",
						"clazz" : "common"
					},
					{
						"key" : "wsVal",
						"name" : "10分钟风速",
						"unit" : "m/s",
						"clazz" : "common"
					},
					{
						"key" : "windDirection",
						"name" : "10分钟风向",
						"unit" : "",
						"clazz" : "common",
					},
					{
						"key" : "wsExtVal",
						"name" : "极大风风速",
						"unit" : "m/s",
						"clazz" : "common"
					},
					{
						"key" : "windExtDir",
						"name" : "极大风风向",
						"unit" : "",
						"clazz" : "common",
					},
					]
			},
			{
				children : [
					{
						"key" : "tmpVal",
						"name" : "实时高温",
						"unit" : "℃",
						"clazz" : "common"
					},
					{
						"key" : "tmpMaxVal",
						"name" : "日最高高温",
						"unit" : "℃",
						"clazz" : "common"
					},
					{
						"key" : "tmpMinVal",
						"name" : "日最低高温",
						"unit" : "℃",
						"clazz" : "common"
					},
					{
						"key" : "t1HVarVal",
						"name" : "1小时降温",
						"unit" : "℃",
						"clazz" : "common"
					},
					{
						"key" : "t24HVarVal",
						"name" : "24小时降温",
						"unit" : "℃",
						"clazz" : "common"
					},
					{
						"key" : "TS_T_24MI",
						"name" : "日最低降温",
						"unit" : "℃",
						"clazz" : "common"
					},
				]
			},
		],
		xgyptitle : "自动站研判产品",
		xgyptabs : [
			//	            {name : "相关因子", url : "zhyj/ypcpRelevantFactorInit.do"},
			{
				name : "参考产品",
				url : "zhyj/referenceProductInit.do"
			},
			//	            {name : "检验分析", url : "zhyj/ypcpCheckoutAnalysisInit.do"},
			{
				name : "自动站信息",
				url : "zhyj/autostationInfoInit.do"
			},
		],
	},
	tornad : {
		title : "龙卷信息",
		subtitle : "龙卷详情",
		contentHeight : 75,
		contents : [
			{
				children : [
					{
						key : "warnProId",
						name : "报警类型",
						clazz : "warn-type",
						"unit" : "",
						formatter : function(warnProId) {
							return "龙卷";
						}
					},
					{
						key : "stationName",
						name : "雷达站",
						clazz : "warn-station",
						"unit" : ""
					},
					{
						key : "lon",
						name : "中心经度",
						clazz : "warn-lon-lat",
						"unit" : "°",
						formatter : function(val) {
							return ELEMENT_POP.formatNumber(val);
						}
					},
					{
						key : "bjDatetime",
						name : "报警时间",
						clazz : "warn-time",
						"unit" : "",
						formatter : function(val) {
							if (val && val != "") {
								return val.substring(0, 16);
							}
							return "";
						}
					}
				]
			},
			{
				children : [
					{
						key : "et",
						name : "回波顶高",
						clazz : "storm-hbdg",
						"unit" : "km"
					},
					{
						key : "rMax",
						name : "最大反射率",
						clazz : "storm-zdfsl",
						"unit" : "dBZ"
					},
					{
						key : "lat",
						name : "中心纬度",
						clazz : "warn-lon-lat",
						"unit" : "°",
						formatter : function(val) {
							return ELEMENT_POP.formatNumber(val);
						}
					},
					{
						key : "vil",
						name : "垂直液态水含量",
						clazz : "warn-time",
						"unit" : "kg/㎡"
					},
				]
			} ],
		xgyptitle : "龙卷研判产品",
		xgyptabs : [
			{
				name : "相关因子",
				url : "zhyj/ypcpRelevantFactorInit.do"
			}
		//	          {name : "参考产品", url : "zhyj/referenceProductInit.do"},
		//	          {name : "检验分析", url : "zhyj/ypcpCheckoutAnalysisInit.do"},
		//	          {name : "龙卷特征", url : "zhyj/autostationInfoInit.do"}
		],
	},
	hail : {
		title : "冰雹信息",
		subtitle : "冰雹详情",
		contentHeight : 105,
		contents : [
			{
				children : [
					{
						key : "warnProId",
						name : "报警类型",
						clazz : "warn-type",
						"unit" : "",
						formatter : function(warnProId) {
							return "冰雹";
						}
					},
					{
						key : "stationName",
						name : "雷达站",
						clazz : "warn-station",
						"unit" : ""
					},
					{
						key : "lon",
						name : "中心经度",
						clazz : "warn-lon-lat",
						"unit" : "°",
						formatter : function(val) {
							return ELEMENT_POP.formatNumber(val);
						}
					},
					{
						key : "lat",
						name : "中心纬度",
						clazz : "warn-lon-lat",
						"unit" : "°",
						formatter : function(val) {
							return ELEMENT_POP.formatNumber(val);
						}
					},
					{
						key : "bjDatetime",
						name : "报警时间",
						clazz : "warn-time",
						"unit" : "",
						formatter : function(val) {
							if (val && val != "") {
								return val.substring(0, 16);
							}
							return "";
						}
					}
				]
			},
			{
				children : [
					{
						key : "stormId",
						name : "风暴单元号",
						clazz : "storm-temp-height",
						"unit" : ""
					},
					{
						key : "height",
						name : "高度",
						clazz : "storm-temp-height",
						"unit" : "km"
					},
					{
						key : "height0",
						name : "0度层高度",
						clazz : "storm-temp-height",
						"unit" : "km"
					},
					{
						key : "height20",
						name : "-20度层高度",
						clazz : "storm-temp-height",
						"unit" : "km"
					},
					{
						key : "vil",
						name : "垂直液态水含量",
						clazz : "storm-czytshl",
						"unit" : "kg/㎡"
					},
				]
			},
			{
				children : [
					{
						key : "et",
						name : "回波顶高",
						clazz : "storm-temp-height",
						"unit" : "km"
					},
					{
						key : "rMax",
						name : "最大反射率",
						clazz : "storm-temp-height",
						"unit" : "dBZ"
					},
				]
			} ],
		xgyptitle : "冰雹研判产品",
		xgyptabs : [
			{
				name : "相关因子",
				url : "zhyj/ypcpRelevantFactorInit.do"
			}
		//	          {name : "参考产品", url : "zhyj/referenceProductInit.do"},
		//	          {name : "检验分析", url : "zhyj/ypcpCheckoutAnalysisInit.do"},
		//	          {name : "冰雹特征", url : "zhyj/autostationInfoInit.do"}
		],
	},
	meso : {
		title : "中气旋信息",
		subtitle : "中气旋详情",
		contentHeight : 105,
		contents : [
			{
				children : [
					{
						key : "warnProId",
						name : "报警类型",
						clazz : "warn-type",
						"unit" : "",
						formatter : function(warnProId) {
							return "中气旋";
						}
					},
					{
						key : "stationName",
						name : "雷达站",
						clazz : "warn-station",
						"unit" : ""
					},
					{
						key : "lon",
						name : "中心经度",
						clazz : "warn-lon-lat",
						"unit" : "°",
						formatter : function(val) {
							return ELEMENT_POP.formatNumber(val);
						}
					},
					{
						key : "lat",
						name : "中心纬度",
						clazz : "warn-lon-lat",
						"unit" : "°",
						formatter : function(val) {
							return ELEMENT_POP.formatNumber(val);
						}
					},
					{
						key : "bjDatetime",
						name : "报警时间",
						clazz : "warn-time",
						"unit" : "",
						formatter : function(val) {
							if (val && val != "") {
								return val.substring(0, 16);
							}
							return "";
						}
					}
				]
			},
			{
				children : [
					{
						key : "stormId",
						name : "风暴单元号",
						clazz : "storm-temp-height",
						"unit" : ""
					},
					{
						key : "az",
						name : "方位角",
						clazz : "storm-hbdg",
						"unit" : "deg"
					},
					{
						key : "ran",
						name : "距离",
						clazz : "storm-temp-height",
						"unit" : "km"
					},
					{
						key : "eb",
						name : "回波底高",
						clazz : "storm-hbdg",
						"unit" : "km"
					},
					{
						key : "et",
						name : "回波顶高",
						clazz : "storm-czytshl",
						"unit" : "km"
					},
				]
			},
			{
				children : [
					{
						key : "extHeight",
						name : "伸展高度",
						clazz : "storm-hbdg",
						"unit" : "km"
					},
					{
						key : "shear",
						name : "切变",
						clazz : "storm-zdfsl",
						"unit" : "E-3/s"
					},
					{
						key : "radLen",
						name : "径向长度",
						clazz : "storm-hbdg",
						"unit" : "km"
					},
					{
						key : "azdia",
						name : "垂直径向长度",
						clazz : "storm-hbdg",
						"unit" : "km"
					},
					{
						key : "intensity",
						name : "中气旋强度",
						clazz : "storm-czytshl",
						"unit" : "",
						formatter : function(val) {
							var typeObj = {
								"N" : "不是中气旋",
								"L" : "弱中气旋",
								"M" : "中等强度中气旋",
								"H" : "强中气旋"
							};
							return typeObj[val.trim()];
						}
					},
				]
			} ],
		xgyptitle : "中气旋研判产品",
		xgyptabs : [
			{
				name : "相关因子",
				url : "zhyj/ypcpRelevantFactorInit.do"
			}
		//	          {name : "参考产品", url : "zhyj/referenceProductInit.do"},
		//	          {name : "检验分析", url : "zhyj/ypcpCheckoutAnalysisInit.do"},
		//	          {name : "中气旋特征", url : "zhyj/autostationInfoInit.do"}
		],
	},
	light : {
		title : "闪电信息",
		subtitle : "闪电详情",
		contentHeight : 45,
		contents : [
			{
				children : [
					{
						key : "lon",
						name : "经度",
						clazz : "warn-lon-lat",
						"unit" : "°",
						formatter : function(val) {
							return ELEMENT_POP.formatNumber(val);
						}
					},
					{
						key : "lat",
						name : "纬度",
						clazz : "warn-lon-lat",
						"unit" : "°",
						formatter : function(val) {
							return ELEMENT_POP.formatNumber(val);
						}
					},
					{
						key : "intensity",
						name : "强度",
						clazz : "warn-lon-lat",
						"unit" : "KA"
					},
					{
						key : "gradient",
						name : "陡度",
						clazz : "warn-lon-lat",
						"unit" : "KA/us"
					},
				]
			}
		],
	//         xgyptitle : "闪电研判产品",
	//         xgyptabs : [
	//	          {name : "相关因子", url : "zhyj/ypcpRelevantFactorInit.do"}
	//	          {name : "参考产品", url : "zhyj/referenceProductInit.do"},
	//	          {name : "检验分析", url : "zhyj/ypcpCheckoutAnalysisInit.do"},
	//	          {name : "龙卷特征", url : "zhyj/autostationInfoInit.do"}
	//	          ],
	},
	rada : {
		title : "回波信息",
		subtitle : "回波详情",
		contentHeight : 75,
		contents : [
			{
				children : [
					{
						key : "et",
						name : "回波顶高",
						clazz : "storm-hbdg",
						"unit" : "km"
					},
					{
						key : "rMax",
						name : "最大反射率",
						clazz : "storm-zdfsl",
						"unit" : "dBZ"
					},
					{
						key : "lat",
						name : "中心纬度",
						clazz : "warn-lon-lat",
						"unit" : "°",
						formatter : function(val) {
							return ELEMENT_POP.formatNumber(val);
						}
					},
					{
						key : "vil",
						name : "垂直液态水含量",
						clazz : "warn-time",
						"unit" : "kg/㎡"
					},
				]
			} ],
	//          xgyptitle : "回波研判产品",
	//          xgyptabs : [
	//	          {name : "相关因子", url : "zhyj/ypcpRelevantFactorInit.do"}
	//	          {name : "参考产品", url : "zhyj/referenceProductInit.do"},
	//	          {name : "检验分析", url : "zhyj/ypcpCheckoutAnalysisInit.do"},
	//	          {name : "龙卷特征", url : "zhyj/autostationInfoInit.do"}
	//	          ],
	},
	//风暴信息
	storm : {
		title : "风暴信息",
		subtitle : "风暴详情",
		contentHeight : 140,
		contents : [
			{
				children : [
					{
						key : "warnProId",
						name : "报警类型",
						clazz : "warn-type",
						"unit" : "",
						formatter : function(warnProId) {
							return "风暴";
						}
					},
					{
						key : "stationName",
						name : "雷达站",
						clazz : "warn-station",
						"unit" : ""
					},
					{
						key : "lon",
						name : "中心经度",
						clazz : "warn-lon-lat",
						"unit" : "°",
						formatter : function(val) {
							return ELEMENT_POP.formatNumber(val);
						}
					},
					{
						key : "lat",
						name : "中心纬度",
						clazz : "warn-lon-lat",
						"unit" : "°",
						formatter : function(val) {
							return ELEMENT_POP.formatNumber(val);
						}
					},
					{
						key : "bjDatetime",
						name : "报警时间",
						clazz : "warn-time",
						"unit" : "",
						formatter : function(val) {
							if (val && val != "") {
								return val.substring(0, 16);
							}
							return "";
						}
					}
				]
			},
			{
				children : [
					{
						key : "stormId",
						name : "风暴号",
						clazz : "warn-location",
						"unit" : ""
					},
					{
						key : "ms",
						name : "移动速度",
						clazz : "storm-zdfsl",
						"unit" : "m/s"
					},
					{
						key : "md",
						name : "移动方向",
						clazz : "storm-zdfsl",
						"unit" : "°"
					},
					{
						key : "az",
						name : "方位角",
						clazz : "",
						"unit" : "deg"
					},
					{
						key : "ran",
						name : "距离",
						clazz : "warn-time",
						"unit" : "km"
					},
				]
			},
			{
				children : [
					{
						key : "eb",
						name : "回波底高",
						clazz : "storm-hbdg",
						"unit" : "km"
					},
					{
						key : "et",
						name : "回波顶高",
						clazz : "storm-hbdg",
						"unit" : "km"
					},
					{
						key : "maxRefHt",
						name : "最大反射率高度",
						clazz : "storm-hbdg",
						"unit" : "km"
					},
					{
						key : "poh",
						name : "降雹概率",
						clazz : "storm-hbdg",
						"unit" : "%"
					},
					{
						key : "posh",
						name : "严重降雹概率",
						clazz : "warn-time",
						"unit" : "%"
					},
				]
			},
			{
				children : [
					{
						key : "vil",
						name : "垂直液态水含量",
						clazz : "",
						"unit" : "kg/㎡"
					},
					{
						key : "rMax",
						name : "最大反射率",
						clazz : "storm-zdfsl",
						"unit" : "dBZ"
					},
					{
						key : "centHt",
						name : "质心高度",
						clazz : "storm-zdfsl",
						"unit" : "km"
					},
				]
			},
		],
		xgyptitle : "风暴研判产品",
		xgyptabs : [
			{
				name : "相关因子",
				url : "zhyj/ypcpRelevantFactorInit.do"
			},
//            {name : "参考产品", url : "zhyj/referenceProductInit.do"},
//            {name : "检验分析", url : "zhyj/ypcpCheckoutAnalysisInit.do"},
	        {name : "风暴特征", url : "zhyj/autostationInfoInit.do"},
		],
	},
	titan : {
		title : "雷暴信息",
		subtitle : "雷暴详情",
		contentHeight : 115,
		contents : [
			{
				children : [
					{
						key : "warnProId",
						name : "报警类型",
						clazz : "",
						"unit" : "",
						formatter : function(warnProId) {
							return "TITAN雷暴";
						}
					},
					{
						key : "area",
						name : "影响范围",
						clazz : "",
						"unit" : "km^2",
						formatter : function(val) {
							return ELEMENT_POP.formatNumber(val);
						}
					},
					{
						key : "centHgt",
						name : "中心高度",
						clazz : "",
						"unit" : "km",
						formatter : function(val) {
							return ELEMENT_POP.formatNumber(val);
						}
					},
					{
						key : "centLon",
						name : "中心经度",
						clazz : "",
						"unit" : "°",
						formatter : function(val) {
							return ELEMENT_POP.formatNumber(val);
						}
					},
					{
						key : "centLat",
						name : "中心纬度",
						clazz : "",
						"unit" : "°",
						formatter : function(val) {
							return ELEMENT_POP.formatNumber(val);
						}
					} ]
			},
			{
				children : [
					{
						key : "maxRefl",
						name : "最大反射率",
						clazz : "",
						"unit" : "dBZ",
						formatter : function(val) {
							return ELEMENT_POP.formatNumber(val);
						}
					},
					{
						key : "moveDir",
						name : "移动方向",
						clazz : "",
						"unit" : "°",
						formatter : function(val) {
							return ELEMENT_POP.formatNumber(val);
						}
					},
					{
						key : "moveSpeed",
						name : "移动速度",
						clazz : "",
						"unit" : "km/h",
						formatter : function(val) {
							return ELEMENT_POP.formatNumber(val);
						}
					},
					{
						key : "reflCentHgt",
						name : "回波高度",
						clazz : "",
						"unit" : "km",
						formatter : function(val) {
							return ELEMENT_POP.formatNumber(val);
						}
					},
					{
						key : "topHgt",
						name : "回波顶高",
						clazz : "",
						"unit" : "km",
						formatter : function(val) {
							return ELEMENT_POP.formatNumber(val);
						}
					} ]
			},
			{
				children : [
					{
						key : "vil",
						name : "液态水含量",
						clazz : "",
						"unit" : "kg/㎡",
						formatter : function(val) {
							return ELEMENT_POP.formatNumber(val);
						}
					} ]
			} ],
		xgyptitle : "雷暴研判产品",
		xgyptabs : [
			{
				name : "相关因子",
				url : "zhyj/ypcpRelevantFactorInit.do"
			},
		//            {name : "参考产品", url : "zhyj/referenceProductInit.do"}
		],
	//	          {name : "检验分析", url : "zhyj/ypcpCheckoutAnalysisInit.do"},
	//            {name : "雷暴特征", url : "zhyj/autostationInfoInit.do"}],
	},
	heavyrain : {
		title : "强降水预报",
		subtitle : "强降水详情",
		contentHeight : 70,
		contents : [
			{
				children : [
					{
						"key" : "",
						"name" : "报警类型",
						"unit" : "",
						formatter : function(val) {
							return "强降水";
						}
					},
					{
						"key" : "warnLevel",
						"name" : "预报等级",
						clazz : "element-warn-level",
						"unit" : "",
						formatter : function(val) {
							if (!val) {
								return val;
							}
							return "≥ " + val + "mm";
						}
					},
					{
						"key" : "startTime",
						"name" : "报警时间",
						clazz : "warn-time",
						"unit" : "",
						formatter : function(val) {
							if (val && val != "") {
								return val.substring(0, 16);
							}
							return "";
						}
					},
					{
						"key" : "happenTime",
						"name" : "预报时间",
						clazz : "warn-time",
						"unit" : "",
						formatter : function(val) {
							if (val && val != "") {
								return val.substring(0, 16);
							}
							return "";
						}
					},
				]
			},
			{
				children : [ {
					"key" : "warnContent",
					"name" : "报警信息",
					"unit" : "",
					clazz : "heavyrain-warn-info"
				} ]
			} ],
		xgyptitle : "强降水研判产品",
		xgyptabs : [
			{
				name : "相关因子",
				url : "zhyj/ypcpRelevantFactorInit.do"
			},
			{
				name : "参考产品",
				url : "zhyj/referenceProductInit.do"
			},
			//            {name : "检验分析", url : "zhyj/ypcpCheckoutAnalysisInit.do"},
			//            {name : "强降水特征", url : "zhyj/autostationInfoInit.do"},
			{
				name : "强降水特征",
				url : "zhyj/autostationCharacteristicInit.do"
			},
		],
		btns : [
			{
				name : "制作预警指导",
				url : "",
				callBack : function() {
					var originSyncData = ZHYJ_MAIN.syncData;
					if (originSyncData == null) {
						return;
					}
					var syncDataTrans = JSON.stringify(ZHYJ_MAIN.syncData);
					var data = {
						url : "zhyj/zhyj_warn_make.do", //跳转路径
						deMenuId : "5", //菜单的id
						flag : "1", //标识
						syncData : syncDataTrans, //需要带过去的数据，json格式字符串
						maketype : 'yjzd'
					};
					var url = G_CONTEXT.contextPath + "mainframe/init.do"; //重新加载初始化界面
					var urlPost = G_CONTEXT.contextPath + "mainframe/getInitParam.do"; //ajax请求封装参数
					$.ajax({
						type : 'post',
						url : urlPost,
						data : data,
						dataJson : 'json',
						async : false,
						success : function(data) {
							window.open(url, '预警制作', '');
						}
					});
				}
			},
			//            {name : "制作灾害落区", url : "", callBack : function(){
			//            	
			//            }},
			{
				name : "制作预警信号",
				url : "",
				callBack : function() {
					var originSyncData = ZHYJ_MAIN.syncData;
					if (originSyncData == null) {
						return;
					}
					var syncDataTrans = JSON.stringify(ZHYJ_MAIN.syncData);
					var data = {
						url : "zhyj/zhyj_warn_make.do", //跳转路径
						deMenuId : "5", //菜单的id
						flag : "1", //标识
						syncData : syncDataTrans, //需要带过去的数据，json格式字符串
						maketype : 'yjxh'
					};
					var url = G_CONTEXT.contextPath + "mainframe/init.do"; //重新加载初始化界面
					var urlPost = G_CONTEXT.contextPath + "mainframe/getInitParam.do"; //ajax请求封装参数
					$.ajax({
						type : 'post',
						url : urlPost,
						data : data,
						dataJson : 'json',
						async : false,
						success : function(data) {
							window.open(url, 'newwindow', '');
						}
					});

				}
			} ]
	},
	heavywind : {
		title : "大风预报",
		subtitle : "大风详情",
		contentHeight : 70,
		contents : [
			{
				children : [
					{
						"key" : "",
						"name" : "报警类型",
						"unit" : "",
						formatter : function(val) {
							return "大风";
						}
					},
					{
						"key" : "warnLevel",
						"name" : "预报等级",
						clazz : "element-warn-level",
						"unit" : "",
						formatter : function(val) {
							if (!val) {
								return val;
							}
							return "≥ " + val + "m/s";
						}
					},
					{
						"key" : "startTime",
						"name" : "报警时间",
						clazz : "warn-time",
						"unit" : "",
						formatter : function(val) {
							if (val && val != "") {
								return val.substring(0, 16);
							}
							return "";
						}
					},
					{
						"key" : "happenTime",
						"name" : "预报时间",
						clazz : "warn-time",
						"unit" : "",
						formatter : function(val) {
							if (val && val != "") {
								return val.substring(0, 16);
							}
							return "";
						}
					},
				]
			},
			{
				children : [ {
					"key" : "warnContent",
					"name" : "报警信息",
					"unit" : "",
					clazz : "heavyrain-warn-info"
				} ]
			} ],
		xgyptitle : "大风研判产品",
		xgyptabs : [
			//                 {name : "相关因子", url : "zhyj/ypcpRelevantFactorInit.do"},
			//                 {name : "参考产品", url : "zhyj/referenceProductInit.do"},
			//          	   {name : "检验分析", url : "zhyj/ypcpCheckoutAnalysisInit.do"},
			{
				name : "大风特征",
				url : "zhyj/autostationCharacteristicInit.do"
			},
		],
		btns : [
			{
				name : "制作预警指导",
				url : "",
				callBack : function() {
					var originSyncData = ZHYJ_MAIN.syncData;
					if (originSyncData == null) {
						return;
					}
					var syncDataTrans = JSON.stringify(ZHYJ_MAIN.syncData);
					var data = {
						url : "zhyj/zhyj_warn_make.do", //跳转路径
						deMenuId : "5", //菜单的id
						flag : "1", //标识
						syncData : syncDataTrans, //需要带过去的数据，json格式字符串
						maketype : 'yjzd'
					};
					var url = G_CONTEXT.contextPath + "mainframe/init.do"; //重新加载初始化界面
					var urlPost = G_CONTEXT.contextPath + "mainframe/getInitParam.do"; //ajax请求封装参数
					$.ajax({
						type : 'post',
						url : urlPost,
						data : data,
						dataJson : 'json',
						async : false,
						success : function(data) {
							window.open(url, 'newwindow', '');
						}
					});
				}
			},
			//             {name : "制作灾害落区", url : "", callBack : function(){
			//            	
			//             }},
			{
				name : "制作预警信号",
				url : "",
				callBack : function() {
					var originSyncData = ZHYJ_MAIN.syncData;
					if (originSyncData == null) {
						return;
					}
					var syncDataTrans = JSON.stringify(ZHYJ_MAIN.syncData);
					var data = {
						url : "zhyj/zhyj_warn_make.do", //跳转路径
						deMenuId : "5", //菜单的id
						flag : "1", //标识
						syncData : syncDataTrans, //需要带过去的数据，json格式字符串
						maketype : 'yjxh'
					};
					var url = G_CONTEXT.contextPath + "mainframe/init.do"; //重新加载初始化界面
					var urlPost = G_CONTEXT.contextPath + "mainframe/getInitParam.do"; //ajax请求封装参数
					$.ajax({
						type : 'post',
						url : urlPost,
						data : data,
						dataJson : 'json',
						async : false,
						success : function(data) {
							window.open(url, 'newwindow', '');
						}
					});

				}
			} ]
	},
	t_var : {
		title : "寒潮预报",
		subtitle : "寒潮详情",
		contentHeight : 70,
		contents : [
			{
				children : [
					{
						"key" : "",
						"name" : "报警类型",
						"unit" : "",
						formatter : function(val) {
							return "寒潮";
						}
					},
					{
						"key" : "warnLevel",
						"name" : "预报等级",
						clazz : "element-warn-level",
						"unit" : "",
						formatter : function(val) {
							if (!val) {
								return val;
							}
							return "≥ " + val + "℃";
						}
					},
					{
						"key" : "startTime",
						"name" : "报警时间",
						clazz : "warn-time",
						"unit" : "",
						formatter : function(val) {
							if (val && val != "") {
								return val.substring(0, 16);
							}
							return "";
						}
					},
					{
						"key" : "happenTime",
						"name" : "预报时间",
						clazz : "warn-time",
						"unit" : "",
						formatter : function(val) {
							if (val && val != "") {
								return val.substring(0, 16);
							}
							return "";
						}
					},
				]
			},
			{
				children : [ {
					"key" : "warnContent",
					"name" : "报警信息",
					"unit" : "",
					clazz : "heavyrain-warn-info"
				} ]
			} ],
		xgyptitle : "寒潮研判产品",
		xgyptabs : [
			//                 {name : "相关因子", url : "zhyj/ypcpRelevantFactorInit.do"},
			//                 {name : "参考产品", url : "zhyj/referenceProductInit.do"},
			//          	   {name : "检验分析", url : "zhyj/ypcpCheckoutAnalysisInit.do"},
			{
				name : "寒潮特征",
				url : "zhyj/autostationCharacteristicInit.do"
			},
		],
		btns : [
			{
				name : "制作预警指导",
				url : "",
				callBack : function() {
					var originSyncData = ZHYJ_MAIN.syncData;
					if (originSyncData == null) {
						return;
					}
					var syncDataTrans = JSON.stringify(ZHYJ_MAIN.syncData);
					var data = {
						url : "zhyj/zhyj_warn_make.do", //跳转路径
						deMenuId : "5", //菜单的id
						flag : "1", //标识
						syncData : syncDataTrans, //需要带过去的数据，json格式字符串
						maketype : 'yjzd'
					};
					var url = G_CONTEXT.contextPath + "mainframe/init.do"; //重新加载初始化界面
					var urlPost = G_CONTEXT.contextPath + "mainframe/getInitParam.do"; //ajax请求封装参数
					$.ajax({
						type : 'post',
						url : urlPost,
						data : data,
						dataJson : 'json',
						async : false,
						success : function(data) {
							window.open(url, 'newwindow', '');
						}
					});
				}
			},
			//             {name : "制作灾害落区", url : "", callBack : function(){
			//            	
			//             }},
			{
				name : "制作预警信号",
				url : "",
				callBack : function() {
					var originSyncData = ZHYJ_MAIN.syncData;
					if (originSyncData == null) {
						return;
					}
					var syncDataTrans = JSON.stringify(ZHYJ_MAIN.syncData);
					var data = {
						url : "zhyj/zhyj_warn_make.do", //跳转路径
						deMenuId : "5", //菜单的id
						flag : "1", //标识
						syncData : syncDataTrans, //需要带过去的数据，json格式字符串
						maketype : 'yjxh'
					};
					var url = G_CONTEXT.contextPath + "mainframe/init.do"; //重新加载初始化界面
					var urlPost = G_CONTEXT.contextPath + "mainframe/getInitParam.do"; //ajax请求封装参数
					$.ajax({
						type : 'post',
						url : urlPost,
						data : data,
						dataJson : 'json',
						async : false,
						success : function(data) {
							window.open(url, 'newwindow', '');
						}
					});

				}
			} ]
	},
	snow : {
		title : "暴雪预报",
		subtitle : "暴雪详情",
		contentHeight : 70,
		contents : [
			{
				children : [
					{
						"key" : "",
						"name" : "报警类型",
						"unit" : "",
						formatter : function(val) {
							return "暴雪";
						}
					},
					{
						"key" : "warnLevel",
						"name" : "预报等级",
						clazz : "element-warn-level",
						"unit" : "",
						formatter : function(val) {
							if (!val) {
								return val;
							}
							return "≥ " + val + "mm";
						}
					},
					{
						"key" : "startTime",
						"name" : "报警时间",
						clazz : "warn-time",
						"unit" : "",
						formatter : function(val) {
							if (val && val != "") {
								return val.substring(0, 16);
							}
							return "";
						}
					},
					{
						"key" : "happenTime",
						"name" : "预报时间",
						clazz : "warn-time",
						"unit" : "",
						formatter : function(val) {
							if (val && val != "") {
								return val.substring(0, 16);
							}
							return "";
						}
					},
				]
			},
			{
				children : [ {
					"key" : "warnContent",
					"name" : "报警信息",
					"unit" : "",
					clazz : "heavyrain-warn-info"
				} ]
			} ],
		xgyptitle : "暴雪研判产品",
		xgyptabs : [
			//                 {name : "相关因子", url : "zhyj/ypcpRelevantFactorInit.do"},
			//                 {name : "参考产品", url : "zhyj/referenceProductInit.do"},
			//          	   {name : "检验分析", url : "zhyj/ypcpCheckoutAnalysisInit.do"},
			{
				name : "暴雪特征",
				url : "zhyj/autostationCharacteristicInit.do"
			},
		],
		btns : [
			{
				name : "制作预警指导",
				url : "",
				callBack : function() {
					var originSyncData = ZHYJ_MAIN.syncData;
					if (originSyncData == null) {
						return;
					}
					var syncDataTrans = JSON.stringify(ZHYJ_MAIN.syncData);
					var data = {
						url : "zhyj/zhyj_warn_make.do", //跳转路径
						deMenuId : "5", //菜单的id
						flag : "1", //标识
						syncData : syncDataTrans, //需要带过去的数据，json格式字符串
						maketype : 'yjzd'
					};
					var url = G_CONTEXT.contextPath + "mainframe/init.do"; //重新加载初始化界面
					var urlPost = G_CONTEXT.contextPath + "mainframe/getInitParam.do"; //ajax请求封装参数
					$.ajax({
						type : 'post',
						url : urlPost,
						data : data,
						dataJson : 'json',
						async : false,
						success : function(data) {
							window.open(url, 'newwindow', '');
						}
					});
				}
			},
			//             {name : "制作灾害落区", url : "", callBack : function(){
			//            	
			//             }},
			{
				name : "制作预警信号",
				url : "",
				callBack : function() {
					var originSyncData = ZHYJ_MAIN.syncData;
					if (originSyncData == null) {
						return;
					}
					var syncDataTrans = JSON.stringify(ZHYJ_MAIN.syncData);
					var data = {
						url : "zhyj/zhyj_warn_make.do", //跳转路径
						deMenuId : "5", //菜单的id
						flag : "1", //标识
						syncData : syncDataTrans, //需要带过去的数据，json格式字符串
						maketype : 'yjxh'
					};
					var url = G_CONTEXT.contextPath + "mainframe/init.do"; //重新加载初始化界面
					var urlPost = G_CONTEXT.contextPath + "mainframe/getInitParam.do"; //ajax请求封装参数
					$.ajax({
						type : 'post',
						url : urlPost,
						data : data,
						dataJson : 'json',
						async : false,
						success : function(data) {
							window.open(url, 'newwindow', '');
						}
					});

				}
			} ]
	},
	frost : {
		title : "霜冻预报",
		subtitle : "霜冻详情",
		contentHeight : 70,
		contents : [
			{
				children : [
					{
						"key" : "",
						"name" : "报警类型",
						"unit" : "",
						formatter : function(val) {
							return "霜冻";
						}
					},
					{
						"key" : "warnLevel",
						"name" : "预报等级",
						clazz : "element-warn-level",
						"unit" : "",
						formatter : function(val) {
							if (!val) {
								return val;
							}
							return "≤" + val + "℃";
						}
					},
					{
						"key" : "startTime",
						"name" : "报警时间",
						clazz : "warn-time",
						"unit" : "",
						formatter : function(val) {
							if (val && val != "") {
								return val.substring(0, 16);
							}
							return "";
						}
					},
					{
						"key" : "happenTime",
						"name" : "预报时间",
						clazz : "warn-time",
						"unit" : "",
						formatter : function(val) {
							if (val && val != "") {
								return val.substring(0, 16);
							}
							return "";
						}
					},
				]
			},
			{
				children : [ {
					"key" : "warnContent",
					"name" : "报警信息",
					"unit" : "",
					clazz : "heavyrain-warn-info"
				} ]
			} ],
		xgyptitle : "霜冻研判产品",
		xgyptabs : [
			//                 {name : "相关因子", url : "zhyj/ypcpRelevantFactorInit.do"},
			//                 {name : "参考产品", url : "zhyj/referenceProductInit.do"},
			//          	   {name : "检验分析", url : "zhyj/ypcpCheckoutAnalysisInit.do"},
			{
				name : "霜冻特征",
				url : "zhyj/autostationCharacteristicInit.do"
			},
		],
		btns : [
			{
				name : "制作预警指导",
				url : "",
				callBack : function() {
					var originSyncData = ZHYJ_MAIN.syncData;
					if (originSyncData == null) {
						return;
					}
					var syncDataTrans = JSON.stringify(ZHYJ_MAIN.syncData);
					var data = {
						url : "zhyj/zhyj_warn_make.do", //跳转路径
						deMenuId : "5", //菜单的id
						flag : "1", //标识
						syncData : syncDataTrans, //需要带过去的数据，json格式字符串
						maketype : 'yjzd'
					};
					var url = G_CONTEXT.contextPath + "mainframe/init.do"; //重新加载初始化界面
					var urlPost = G_CONTEXT.contextPath + "mainframe/getInitParam.do"; //ajax请求封装参数
					$.ajax({
						type : 'post',
						url : urlPost,
						data : data,
						dataJson : 'json',
						async : false,
						success : function(data) {
							window.open(url, 'newwindow', '');
						}
					});
				}
			},
			//             {name : "制作灾害落区", url : "", callBack : function(){
			//            	
			//             }},
			{
				name : "制作预警信号",
				url : "",
				callBack : function() {
					var originSyncData = ZHYJ_MAIN.syncData;
					if (originSyncData == null) {
						return;
					}
					var syncDataTrans = JSON.stringify(ZHYJ_MAIN.syncData);
					var data = {
						url : "zhyj/zhyj_warn_make.do", //跳转路径
						deMenuId : "5", //菜单的id
						flag : "1", //标识
						syncData : syncDataTrans, //需要带过去的数据，json格式字符串
						maketype : 'yjxh'
					};
					var url = G_CONTEXT.contextPath + "mainframe/init.do"; //重新加载初始化界面
					var urlPost = G_CONTEXT.contextPath + "mainframe/getInitParam.do"; //ajax请求封装参数
					$.ajax({
						type : 'post',
						url : urlPost,
						data : data,
						dataJson : 'json',
						async : false,
						success : function(data) {
							window.open(url, 'newwindow', '');
						}
					});

				}
			} ]
	},
	htemp : {
		title : "高温预报",
		subtitle : "高温详情",
		contentHeight : 70,
		contents : [
			{
				children : [
					{
						"key" : "",
						"name" : "报警类型",
						"unit" : "",
						formatter : function(val) {
							return "高温";
						}
					},
					{
						"key" : "warnLevel",
						"name" : "预报等级",
						clazz : "element-warn-level",
						"unit" : "",
						formatter : function(val) {
							if (!val) {
								return val;
							}
							return "≥" + val + "℃";
						}
					},
					{
						"key" : "startTime",
						"name" : "报警时间",
						clazz : "warn-time",
						"unit" : "",
						formatter : function(val) {
							if (val && val != "") {
								return val.substring(0, 16);
							}
							return "";
						}
					},
					{
						"key" : "happenTime",
						"name" : "预报时间",
						clazz : "warn-time",
						"unit" : "",
						formatter : function(val) {
							if (val && val != "") {
								return val.substring(0, 16);
							}
							return "";
						}
					},
				]
			},
			{
				children : [ {
					"key" : "warnContent",
					"name" : "报警信息",
					"unit" : "",
					clazz : "heavyrain-warn-info"
				} ]
			} ],
		xgyptitle : "高温研判产品",
		xgyptabs : [
			//                 {name : "相关因子", url : "zhyj/ypcpRelevantFactorInit.do"},
			//                 {name : "参考产品", url : "zhyj/referenceProductInit.do"},
			//          	   {name : "检验分析", url : "zhyj/ypcpCheckoutAnalysisInit.do"},
			{
				name : "高温特征",
				url : "zhyj/autostationCharacteristicInit.do"
			},
		],
		btns : [
			{
				name : "制作预警指导",
				url : "",
				callBack : function() {
					var originSyncData = ZHYJ_MAIN.syncData;
					if (originSyncData == null) {
						return;
					}
					var syncDataTrans = JSON.stringify(ZHYJ_MAIN.syncData);
					var data = {
						url : "zhyj/zhyj_warn_make.do", //跳转路径
						deMenuId : "5", //菜单的id
						flag : "1", //标识
						syncData : syncDataTrans, //需要带过去的数据，json格式字符串
						maketype : 'yjzd'
					};
					var url = G_CONTEXT.contextPath + "mainframe/init.do"; //重新加载初始化界面
					var urlPost = G_CONTEXT.contextPath + "mainframe/getInitParam.do"; //ajax请求封装参数
					$.ajax({
						type : 'post',
						url : urlPost,
						data : data,
						dataJson : 'json',
						async : false,
						success : function(data) {
							window.open(url, 'newwindow', '');
						}
					});
				}
			},
			//             {name : "制作灾害落区", url : "", callBack : function(){
			//            	
			//             }},
			{
				name : "制作预警信号",
				url : "",
				callBack : function() {
					var originSyncData = ZHYJ_MAIN.syncData;
					if (originSyncData == null) {
						return;
					}
					var syncDataTrans = JSON.stringify(ZHYJ_MAIN.syncData);
					var data = {
						url : "zhyj/zhyj_warn_make.do", //跳转路径
						deMenuId : "5", //菜单的id
						flag : "1", //标识
						syncData : syncDataTrans, //需要带过去的数据，json格式字符串
						maketype : 'yjxh'
					};
					var url = G_CONTEXT.contextPath + "mainframe/init.do"; //重新加载初始化界面
					var urlPost = G_CONTEXT.contextPath + "mainframe/getInitParam.do"; //ajax请求封装参数
					$.ajax({
						type : 'post',
						url : urlPost,
						data : data,
						dataJson : 'json',
						async : false,
						success : function(data) {
							window.open(url, 'newwindow', '');
						}
					});

				}
			} ]
	},
	vis : {
		title : "低能见度预报",
		subtitle : "低能见度详情",
		contentHeight : 70,
		contents : [
			{
				children : [
					{
						"key" : "",
						"name" : "报警类型",
						"unit" : "",
						formatter : function(val) {
							return "低能见度";
						}
					},
					{
						"key" : "warnLevel",
						"name" : "预报等级",
						clazz : "element-warn-level",
						"unit" : "",
						formatter : function(val) {
							if (!val) {
								return val;
							}
							return "≤" + val + "m";
						}
					},
					{
						"key" : "startTime",
						"name" : "报警时间",
						clazz : "warn-time",
						"unit" : "",
						formatter : function(val) {
							if (val && val != "") {
								return val.substring(0, 16);
							}
							return "";
						}
					},
					{
						"key" : "happenTime",
						"name" : "预报时间",
						clazz : "warn-time",
						"unit" : "",
						formatter : function(val) {
							if (val && val != "") {
								return val.substring(0, 16);
							}
							return "";
						}
					},
				]
			},
			{
				children : [ {
					"key" : "warnContent",
					"name" : "报警信息",
					"unit" : "",
					clazz : "heavyrain-warn-info"
				} ]
			} ],
		xgyptitle : "低能见度研判产品",
		xgyptabs : [
			//                 {name : "相关因子", url : "zhyj/ypcpRelevantFactorInit.do"},
			//                 {name : "参考产品", url : "zhyj/referenceProductInit.do"},
			//          	   {name : "检验分析", url : "zhyj/ypcpCheckoutAnalysisInit.do"},
			{
				name : "低能见度特征",
				url : "zhyj/autostationCharacteristicInit.do"
			},
		],
		btns : [
			{
				name : "制作预警指导",
				url : "",
				callBack : function() {
					var originSyncData = ZHYJ_MAIN.syncData;
					if (originSyncData == null) {
						return;
					}
					var syncDataTrans = JSON.stringify(ZHYJ_MAIN.syncData);
					var data = {
						url : "zhyj/zhyj_warn_make.do", //跳转路径
						deMenuId : "5", //菜单的id
						flag : "1", //标识
						syncData : syncDataTrans, //需要带过去的数据，json格式字符串
						maketype : 'yjzd'
					};
					var url = G_CONTEXT.contextPath + "mainframe/init.do"; //重新加载初始化界面
					var urlPost = G_CONTEXT.contextPath + "mainframe/getInitParam.do"; //ajax请求封装参数
					$.ajax({
						type : 'post',
						url : urlPost,
						data : data,
						dataJson : 'json',
						async : false,
						success : function(data) {
							window.open(url, 'newwindow', '');
						}
					});
				}
			},
			//             {name : "制作灾害落区", url : "", callBack : function(){
			//            	
			//             }},
			{
				name : "制作预警信号",
				url : "",
				callBack : function() {
					var originSyncData = ZHYJ_MAIN.syncData;
					if (originSyncData == null) {
						return;
					}
					var syncDataTrans = JSON.stringify(ZHYJ_MAIN.syncData);
					var data = {
						url : "zhyj/zhyj_warn_make.do", //跳转路径
						deMenuId : "5", //菜单的id
						flag : "1", //标识
						syncData : syncDataTrans, //需要带过去的数据，json格式字符串
						maketype : 'yjxh'
					};
					var url = G_CONTEXT.contextPath + "mainframe/init.do"; //重新加载初始化界面
					var urlPost = G_CONTEXT.contextPath + "mainframe/getInitParam.do"; //ajax请求封装参数
					$.ajax({
						type : 'post',
						url : urlPost,
						data : data,
						dataJson : 'json',
						async : false,
						success : function(data) {
							window.open(url, 'newwindow', '');
						}
					});

				}
			} ]
	},
	important : {
		title : "重要天气报详情",
		subtitle : "详情",
		contentHeight : 30,
		contents : [
			{
				children : [
					{
						"item" : "lon",
						"key" : "lon",
						"name" : "经度",
						"unit" : "°",
						"clazz" : "warn-important-element",
						formatter : function(val) {
							return ELEMENT_POP.formatNumber(val);
						}
					},
					{
						"item" : "lat",
						"key" : "lat",
						"name" : "纬度",
						"unit" : "°",
						"clazz" : "warn-important-element",
						formatter : function(val) {
							return ELEMENT_POP.formatNumber(val);
						}
					},
					{
						"item" : "stationId",
						"key" : "stationId",
						"name" : "站号",
						"unit" : "",
						"clazz" : "warn-important-element"
					},
					{
						"item" : "stationName",
						"key" : "stationName",
						"name" : "站名",
						"unit" : "",
						"clazz" : "warn-important-element"
					},
					{
						"item" : "bjDatetime",
						"key" : "bjDatetime",
						"name" : "出现时间",
						"clazz" : "warn-time warn-important-element warn-important-element-time",
						"unit" : "",
						formatter : function(val) {
							return new Date(val).format("yyyy-MM-dd hh:mm");
						}
					},
					{
						"item" : "iVisVal",
						"key" : "iVisVal",
						"name" : "能见度",
						"unit" : "m",
						"clazz" : "warn-important-element"
					},
					{
						"item" : "iMaxDiamVal",
						"key" : "iMaxDiamVal",
						"name" : "最大直径",
						"unit" : "mm",
						"clazz" : "warn-important-element"
					},
					{
						"item" : "iRain24Val",
						"key" : "val",
						"name" : "降水",
						"unit" : "mm",
						"clazz" : "warn-important-element"
					},
					{
						"item" : "iWsExtVal",
						"key" : "val",
						"name" : "风速",
						"unit" : "mm",
						"clazz" : "warn-important-element"
					},
					{
						"item" : "iWindExtDir",
						"key" : "windDirection",
						"name" : "风向",
						"unit" : "",
						"clazz" : "warn-important-element"
					},
					{
						"item" : "iRain1Val",
						"key" : "val",
						"name" : "降水",
						"unit" : "mm",
						"clazz" : "warn-important-element"
					},
					{
						"item" : "iRain3Val",
						"key" : "val",
						"name" : "降水",
						"unit" : "mm",
						"clazz" : "warn-important-element"
					},
					{
						"item" : "iRain6Val",
						"key" : "val",
						"name" : "降水",
						"unit" : "mm",
						"clazz" : "warn-important-element"
					},
					{
						"item" : "iSnowVal",
						"key" : "val",
						"name" : "积雪",
						"unit" : "cm",
						"clazz" : "warn-important-element",
						formatter : function(val) {
							if ($.isNumeric(val)) {
								return parseFloat(val) * 10;
							}
							return val;
						}
					},
				]
			},
		],
		xgyptitle : "自动站研判产品",
		xgyptabs : [
			{
				name : "参考产品",
				url : "zhyj/referenceProductInit.do"
			},
			{
				name : "自动站信息",
				url : "zhyj/autostationInfoInit.do"
			},
		],
	}
};

ELEMENT_POP.formatNumber = function(val) {
	if (!val) {
		return val;
	}
	val = val + "";
	var index = val.indexOf(".");
	if (index > -1 && val.length >= (index + 3)) {
		val = val.substring(0, index + 3);
	}
	return val;
}