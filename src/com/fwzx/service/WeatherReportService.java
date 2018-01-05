package com.fwzx.service;

import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

@Service
public interface WeatherReportService {
    // 未来24小时精细预报
	JSONObject get24weatherinfo(Object[]args);
	
	// 未来三天预报
	JSONArray get72weatherinfo();
	/**
	 * 
	 * @param path
	 * @return 0 简报未更新 ;0 工作文件夹删除; name 简报名
	 */
	String getSimpleReport(String path,boolean fag);
}
