package com.fwzx.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;



@RequestMapping("/GmControl")
@Controller
public class GeometryController {
	@Autowired
	public JdbcTemplate jdbcTemplate;
	
	 @SuppressWarnings("deprecation")
	 @RequestMapping("getGeoStr.action")
	 @ResponseBody
	 public String getXiaoshi(String userId) throws ParseException{
			 try {
				 String sql = "select t.Att_Desc1 from attention t where t.BaseUser_Id="+userId+" ";
				 List<Map<String, Object>> list = jdbcTemplate.queryForList(sql);
				 JSONArray json = new JSONArray();
		            for(Map<String,Object> a : list){
		                JSONObject jo = new JSONObject();
		                jo.put("geometry", a.get("Att_Desc1"));
		                //jo.put("time", date_e);
		                json.add(jo);
		            }
				 String json1="{\"type\":\"GE\",\"state\":\"true\",\"geometry\":"+JSON.toJSONString(json)+"}";
				 return json1;
				} catch (DataAccessException e) {
					return "{\"type\":\"GE\",\"state\":\"false\",\"geometry\":"+JSON.toJSONString(new Object())+"}";
				}
	 }
	 @RequestMapping("getStationList.action")
	 @ResponseBody
	 public String getStationList() throws ParseException{
			 try {
				SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH");//可以方便地修改日期格式
				SimpleDateFormat dateFormat123 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//可以方便地修改日期格式
				
				Date beginDate = new Date();
				Calendar date = Calendar.getInstance();
				date.setTime(beginDate);
				date.set(Calendar.MINUTE, date.get(Calendar.MINUTE) - 10);
				Date endDate = dateFormat123.parse(dateFormat123.format(date.getTime()));
				String _date="";
				int min=(endDate.getMinutes()/10)*10;
				_date= dateFormat.format( endDate )+":"+ String.format("%02d", min)+":00";
					
				 String sql = "select t.station_id,t.tem,t.pre_1h,t.win_d_avg_10mi,t.win_s_avg_10mi,t.humi,t.vis_hou_10mi from country_station_data t  where t.datetime='"+_date+"'";
				 List<Map<String, Object>> list = jdbcTemplate.queryForList(sql);
				 JSONArray json = new JSONArray();
		            for(Map<String,Object> a : list){
		                JSONObject jo = new JSONObject();
		                jo.put("stationId", a.get("station_id"));
		                jo.put("tem", a.get("tem"));
		                jo.put("pre_1h", a.get("pre_1h"));
		                jo.put("win_d_avg_10mi", a.get("win_d_avg_10mi"));
		                jo.put("win_s_avg_10mi", a.get("win_s_avg_10mi"));
		                jo.put("humi", a.get("humi"));
		                jo.put("vis_hou_10mi", a.get("vis_hou_10mi"));
		                json.add(jo);
		            }
				 String json1="{\"type\":\"GE\",\"state\":\"true\",\"dateTime\":\""+_date+"\",\"geometry\":"+JSON.toJSONString(json)+"}";
				 return json1;
				} catch (DataAccessException e) {
					return "{\"type\":\"GE\",\"state\":\"false\",\"geometry\":"+JSON.toJSONString(new Object())+"}";
				}
	 }
	
	
		//降雨插值188个站数据
		@RequestMapping("getIdw.action")
		@ResponseBody
		public String getIdwData() throws ParseException{
			try {
				
				Date now = new Date();
						 
				SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH");//可以方便地修改日期格式
				SimpleDateFormat dateFormat123 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//可以方便地修改日期格式
				String date_s="",date_e="";
				Date beginDate = new Date();
				Calendar date = Calendar.getInstance();
				date.setTime(beginDate);
				date.set(Calendar.DATE, date.get(Calendar.DATE) - 1);
				date.set(Calendar.MINUTE, date.get(Calendar.MINUTE) - 10);
				Date endDate = dateFormat123.parse(dateFormat123.format(date.getTime()));
				
				Calendar date1 = Calendar.getInstance();
				date1.setTime(endDate);
				date1.set(Calendar.DATE, date.get(Calendar.DATE) + 1);
				beginDate= dateFormat123.parse(dateFormat123.format(date1.getTime()));
				int min=(endDate.getMinutes()/10)*10;
				date_s= dateFormat.format( endDate )+":"+min+":00";
				date_e= dateFormat.format( beginDate )+":"+min+":00";	 
				
						 
				String sql = "select sum(pre_1h) as data,stationid from(SELECT t.station_id AS stationid,pre_1h FROM country_station_data t WHERE t.datetime >= '"+date_s+"' AND t.datetime <= '"+date_e+"' AND (MINUTE (datetime) = 0 or t.datetime= '"+date_e+"') AND t.pre_1h != 999999 UNION SELECT t.station_id AS stationid,pre_1h*-1 FROM country_station_data t WHERE t.datetime = '"+date_s+"' AND t.pre_1h != 999999) b group by stationid";
				List<Map<String, Object>> list = jdbcTemplate.queryForList(sql);
				JSONArray json = new JSONArray();
				for(Map<String,Object> a : list){
					JSONObject jo = new JSONObject();
	                jo.put("pre24h", a.get("data"));
	                jo.put("stationId", a.get("stationid"));
	                json.add(jo);             
				}
				String json1="{\"type\":\"IDW\",\"type1\":\"IDW24\",\"geometry\":"+JSON.toJSONString(json)+"}";
					return json1;
				} catch (DataAccessException e) {
					return JSON.toJSONString(new Object());
				}
			 }
		
		@RequestMapping("getIdw3.action")
		@ResponseBody
		public String getIdwData3() throws ParseException{
			try {
				Date now = new Date();
						 
				SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH");//可以方便地修改日期格式
				SimpleDateFormat dateFormat123 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//可以方便地修改日期格式
				String date1="",date2="",date3="";
				Date beginDate = new Date();
				Calendar date = Calendar.getInstance();
				date.setTime(beginDate);
				
				date.set(Calendar.MINUTE, date.get(Calendar.MINUTE) - 10);
				Date endDate = dateFormat123.parse(dateFormat123.format(date.getTime()));
				int min=(endDate.getMinutes()/10)*10;
				Calendar dt1 = Calendar.getInstance();
				dt1.setTime(endDate);
				dt1.set(Calendar.MINUTE, dt1.get(Calendar.MINUTE) - 10);
				Date endDate1 = dateFormat123.parse(dateFormat123.format(dt1.getTime()));
				int min1=(endDate1.getMinutes()/10)*10;
				
				
				Calendar dt2 = Calendar.getInstance();
				dt2.setTime(endDate1);
				dt2.set(Calendar.MINUTE, dt2.get(Calendar.MINUTE) - 10);
				Date endDate2= dateFormat123.parse(dateFormat123.format(dt2.getTime()));
				int min2=(endDate2.getMinutes()/10)*10;
				
				date1= dateFormat.format( endDate )+":"+ String.format("%02d", min)+":00";
				date2= dateFormat.format( endDate1 )+":"+String.format("%02d", min1)+":00";	
				date3= dateFormat.format( endDate2 )+":"+String.format("%02d", min2)+":00";	
				
						 
				String sql = "SELECT t.station_id AS stationid, SUM(pre_1h) as data FROM country_station_data t WHERE	t.datetime in ( '"+date1+"','"+date2+"','"+date3+"') AND t.pre_1h != 999999 GROUP BY t.station_id";
				List<Map<String, Object>> list = jdbcTemplate.queryForList(sql);
				JSONArray json = new JSONArray();
				for(Map<String,Object> a : list){
					JSONObject jo = new JSONObject();
	                jo.put("pre24h", a.get("data"));
	                jo.put("stationId", a.get("stationid"));
	                json.add(jo);             
				}
				String json1="{\"type\":\"IDW\",\"type1\":\"IDW3\",\"geometry\":"+JSON.toJSONString(json)+"}";
					return json1;
				} catch (DataAccessException e) {
					return JSON.toJSONString(new Object());
				}
			 }
}
