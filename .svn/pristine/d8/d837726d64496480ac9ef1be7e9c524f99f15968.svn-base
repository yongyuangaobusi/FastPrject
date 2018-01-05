var monostatic_radar = {
	init : function(){
		this.initData();
	},
	initData : function(){
		var container = $(".monostatic-radar-container");
		$.each(monostaticRadarDatas,function(i,data){
			if("站名" == i){
				container.append('<div class="monostatic-radar-item" style="margin-top: 10px;"><div class="station-item">'+i+'：</div><div class="monostatic-radar-item-name">'+data+'</div></div>');
			}else{
				container.append('<div class="monostatic-radar-item"><div class="station-item">'+i+'：</div><div class="monostatic-radar-item-name">'+data+'</div></div>');
			}
		});
	}
};