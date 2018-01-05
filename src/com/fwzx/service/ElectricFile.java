package com.fwzx.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;


/**
 * 冀北电科院文件生成
 * @author han
 *
 */
public class ElectricFile implements Runnable {
	
	
    public static void main(String[] args) {
		ElectricFile rFile = new ElectricFile();
		rFile.getBaseInfo();
		System.out.println(rFile.getParams()[2]);
	}
	
	private ApplicationContext aContext = new ClassPathXmlApplicationContext("myselfMain.xml");

	private JdbcTemplate jdbcTemplate = (JdbcTemplate) aContext.getBean("jdbcTemplate2");

	
	private void getBaseInfo(){
		
		String [] paras= getParams();
		Object [] para ={paras[0],paras[1]}; 
		
		String sql = "SELECT b.areaId,a.weather_code,a.tem_max,a.tem_min,a.wind_d_code,a.wind_s_code FROM  tbl_forcast a, north_eletric b WHERE a.station_id=b.stationId AND a.shici<=72 AND a.datetime=? AND a.thour=? ORDER BY a.station_id,a.shici ";
			
		List<String[]> listInfo = jdbcTemplate.query(sql,para,new RowMapper() {

			@Override
			public String[] mapRow(ResultSet arg0, int arg1) throws SQLException {
                 String [] strings = new String[6];
                 strings[0] = arg0.getString(1);
                 strings[1] = arg0.getString(2);
                 strings[2] = Double.toString(arg0.getDouble(3));
                 strings[3] = Double.toString(arg0.getDouble(4));
                 strings[4] = Integer.toString(arg0.getInt(5));
                 strings[5] = Integer.toString(arg0.getInt(6));
				return strings;
			}
		});
		int number = listInfo.size();
		for(int i=0;i<number;i+=6){
			JSONObject object = new JSONObject();
			JSONArray array = new JSONArray();
			
			if (paras[1].equals("20")) {
				for(int j=0;j<3;j++){
					
					int length = i+j*2;
					JSONObject object2 = new JSONObject();
					
					if (j==0) {
						String [] str1 = listInfo.get(length);
						object2.put("001", "--");// 白天天气现象
						object2.put("002", getWeatherCode(str1[1]));//晚上
						object2.put("003", "--");//最高 
						object2.put("004", listInfo.get(length+1)[3]);//最低
						object2.put("005", "--");//白风力
						object2.put("006", str1[1]);//晚风里
						object2.put("007", "--");//白风向
						object2.put("008", str1[4]);
						array.add(object2);	
					}else{
						String [] str1 = listInfo.get(length); // 2 4
						String [] str2 = listInfo.get(length-1);
						object2.put("001", getWeatherCode(str2[1]));// 白天天气现象
						object2.put("002", getWeatherCode(str1[1]));//晚上
						object2.put("003", str2[2]);//最高 
						object2.put("004", listInfo.get(length+1)[3]);//最低
						object2.put("005", str2[5]);//白风力
						object2.put("006", str1[5]);//晚风里
						object2.put("007", str2[4]);//白风向
						object2.put("008", str1[4]);
						array.add(object2);
					}
				}
				
			} else {
				for(int j=0;j<3;j++){
					int length = i+j*2;
					JSONObject object2 = new JSONObject();
					String [] str1 = listInfo.get(length);
					String [] str2 = listInfo.get(length+1);
					object2.put("001", getWeatherCode(str1[1]));// 白天天气现象
					object2.put("002", getWeatherCode(str2[1]));//晚上
					object2.put("003", str2[2]);//最高 
					object2.put("004", str2[3]);//最低
					object2.put("005", str1[5]);//白风力
					object2.put("006", str2[5]);//晚风里
					object2.put("007", str1[4]);//白风向
					object2.put("008", str2[4]);
					array.add(object2);
				}
			}
			object.put("000",paras[2]);
			object.put("1001001",array);
			File file = new File("D:/冀北电科院/预报");
			if (!file.exists()) {
				file.mkdirs();
			}
			byte[] infos = object.toJSONString().getBytes(); 
			File file2 = new File("D:/冀北电科院/预报/"+listInfo.get(i)[0]+".html");
			OutputStream oStream = null;
			try {
				oStream = new FileOutputStream(file2);
				oStream.write(infos);
				oStream.close();
			} catch ( IOException e) {
				e.printStackTrace();
			}finally{
				if (oStream!=null) {
					try {
						oStream.close();
					} catch (IOException e) {
						e.printStackTrace();
					}
				}
			}

		}
	}
	
	private String [] getParams(){
		String [] paras= new String[3];
		SimpleDateFormat sFormat = new SimpleDateFormat("yyyy-MM-dd 00:00:00");
	    String date = new SimpleDateFormat("yyyyMMdd").format(new Date());

		paras[0]=sFormat.format(new Date());
		int hour = new Date().getHours();
		if (hour>=17) {
			paras[1]="20";
			paras[2]=date+"2000";
		}else if (hour>=11) {
			paras[1]="11";
			paras[2]=date+"1100";
		}else{
			paras[1]="08";
			paras[2]=date+"0800";
		}
		return paras;
	}
	
	
	private String getWeatherCode(String code){
		if (Integer.valueOf(code)<=9) {
			return "0"+code;
		}else{
			return code;
		}
	}

	@Override
	public void run() {
		getBaseInfo();
	}
}
