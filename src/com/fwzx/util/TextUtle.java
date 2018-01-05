package com.fwzx.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

/**
 * 预报文件解析入库
 * 
 * @author han
 *
 */
public class TextUtle implements Runnable {

	private ApplicationContext aContext = new ClassPathXmlApplicationContext("myselfMain.xml");

	private JdbcTemplate jdbcTemplate = (JdbcTemplate) aContext.getBean("jdbcTemplate2");

	private String date = new SimpleDateFormat("yyyy-MM-dd").format(new Date());

	private static String Tempatature = "temparature";

	private static String Cloud = "cloud";

	private static String Rain = "rain";

	private static String Relative_humidity = "humidity";

	private static String Windy = "windy";

	private static String Visibility = "visibility";

	// 解析解除文本
	private static JSONArray analyTxt(File file) {
		InputStream inputStream = null;
		long lengh = file.length();
		int len = new Long(lengh).intValue();
		byte cache[] = new byte[len];
		StringBuilder strBuffer = new StringBuilder();
		try {
			inputStream = new FileInputStream(file);
			len = inputStream.read(cache);
			strBuffer.append(new String(cache));
		} catch (IOException e) {
			e.printStackTrace();
		}
		String string = strBuffer.toString();
		if (string.charAt(len - 3) == ',') {
			String string2 = string.substring(0, string.length() - 3);
			JSONObject jsObject = (JSONObject) JSONObject.parse(string2 + "]}");
			JSONArray jaArray = jsObject.getJSONArray("list");
			return jaArray;
		}
		return null;
	}

	/**
	 * 云量数据
	 * 
	 * @param jaArray2
	 */
	private void analyCloud(final JSONArray jaArray2) {
		String sql = "insert into grib_reportdata (id,type,sc,data,datatime,station) values(?,?,?,?,?,?)";
		jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {

			@Override
			public void setValues(PreparedStatement arg0, int arg1) throws SQLException {
				JSONObject object = (JSONObject) jaArray2.get(arg1);
				arg0.setString(1, UUID.randomUUID().toString());
				arg0.setString(2, Cloud);
				arg0.setInt(3, Integer.parseInt(object.getString("sc")));
				arg0.setDouble(4, Double.valueOf(object.getString("data")));
				arg0.setString(5, date);
				arg0.setString(6, (String) object.get("id"));
			}

			@Override
			public int getBatchSize() {
				// TODO Auto-generated method stub
				return jaArray2.size();
			}
		});
	}

	/**
	 * 降水总量
	 * 
	 * @param jaArray2
	 */
	private void anlyRain(final JSONArray jaArray2) {
		String sql = "insert into grib_reportdata (id,type,sc,data,datatime,station) values(?,?,?,?,?,?)";
		jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {

			@Override
			public void setValues(PreparedStatement arg0, int arg1) throws SQLException {
				JSONObject object = (JSONObject) jaArray2.get(arg1);
				arg0.setString(1, UUID.randomUUID().toString());
				arg0.setString(2, Rain);
				arg0.setInt(3, Integer.parseInt(object.getString("sc")));
				arg0.setDouble(4, Double.valueOf(object.getString("data")));
				arg0.setString(5, date);
				arg0.setString(6, (String) object.get("id"));
			}

			@Override
			public int getBatchSize() {
				// TODO Auto-generated method stub
				return jaArray2.size();
			}
		});
	}

	/**
	 * 相对湿度
	 * 
	 * @param jaArray2
	 */
	private void analyHumidity(final JSONArray jaArray2) {
		String sql = "insert into grib_reportdata (id,type,sc,data,datatime,station) values(?,?,?,?,?,?)";
		jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {

			@Override
			public void setValues(PreparedStatement arg0, int arg1) throws SQLException {
				JSONObject object = (JSONObject) jaArray2.get(arg1);
				arg0.setString(1, UUID.randomUUID().toString());
				arg0.setString(2, Relative_humidity);
				arg0.setInt(3, Integer.parseInt(object.getString("sc")));
				arg0.setDouble(4, Double.valueOf(object.getString("data")));
				arg0.setString(5, date);
				arg0.setString(6, (String) object.get("id"));
			}

			@Override
			public int getBatchSize() {
				// TODO Auto-generated method stub
				return jaArray2.size();
			}
		});

	}

	/**
	 * 温度数据
	 * 
	 * @param jaArray2
	 */
	private void analyTempara(final JSONArray jaArray2) {
		String sql = "insert into grib_reportdata (id,type,sc,data,datatime,station) values(?,?,?,?,?,?)";
		jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {

			@Override
			public void setValues(PreparedStatement arg0, int arg1) throws SQLException {
				JSONObject object = (JSONObject) jaArray2.get(arg1);
				arg0.setString(1, UUID.randomUUID().toString());
				arg0.setString(2, Tempatature);
				arg0.setInt(3, Integer.parseInt(object.getString("sc")));
				arg0.setDouble(4, Double.valueOf(object.getString("data")) - 273.15);
				arg0.setString(5, date);
				arg0.setString(6, (String) object.get("id"));
			}

			@Override
			public int getBatchSize() {
				// TODO Auto-generated method stub
				return jaArray2.size();
			}
		});

	}

	/**
	 * 风向风速
	 * 
	 * @param jArray
	 *            v 文件
	 * @param jArray2
	 *            u 文件
	 */
	private void analyWindy(final JSONArray vFile, final JSONArray uFile) {
		String sql = "insert into grib_reportdata (id,type,sc,data,config,datatime,station) values(?,?,?,?,?,?,?)";

		jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {

			@Override
			public void setValues(PreparedStatement arg0, int arg1) throws SQLException {
				JSONObject objectv = (JSONObject) vFile.get(arg1);
				JSONObject objectu = (JSONObject) uFile.get(arg1);
				arg0.setString(1, UUID.randomUUID().toString());
				arg0.setString(2, Windy);
				arg0.setInt(3, Integer.parseInt(objectu.getString("sc")));
				double u = Double.parseDouble(objectu.getString("data")),
						v = Double.parseDouble(objectv.getString("data"));
				double spd = Math.sqrt((u * u + v * v));
				double tmp = 270.0 - Math.atan2(v, u) * 180.0 / Math.PI;
				double dir = tmp % 360.0;
				arg0.setDouble(4, spd);
				arg0.setDouble(5, dir);
				arg0.setString(6, date);
				arg0.setString(7, (String) objectu.get("id"));
			}

			@Override
			public int getBatchSize() {
				// TODO Auto-generated method stub
				return vFile.size();
			}
		});
	}

	
	
	public static void main(String[] args) {
		long begin = System.currentTimeMillis();
		// JSONArray u = analyTxt(new
		// File("D:/201709200800_u-component_of_wind.txt"));
		// JSONArray v = analyTxt(new
		// File("D:/201709200800_v-component_of_wind.txt"));
		// JSONArray rain = analyTxt(new
		// File("D:/result/201709242000_Total_precipitation.txt"));
		// JSONArray cloud = analyTxt(new
		// File("D:/result/201709242000_Total_cloud_cover.txt"));
		// JSONArray tepa = analyTxt(new
		// File("D:/result/201709242000_Temperature.txt"));
		//JSONArray huhuh = analyTxt(new File("D:/result/201709242000_Relative_humidity.txt"));
	    TextUtle tUtle = new TextUtle();
		// tUtle.analyCloud(cloud);
		// tUtle.analyHumidity(huhuh);
		// tUtle.analyTempara(tepa);
		// tUtle.analyWindy(v, u);
		// tUtle.anlyRain(rain);
	    tUtle.anlySisTem();
	}

	private void anlySisTem() {
		SimpleDateFormat sDateFormat = new SimpleDateFormat("yyyyMMdd");
	    String dataName = "";
		
	    if (true) {
			dataName=sDateFormat.format(new Date())+"2000";
		} else {
            dataName=sDateFormat.format(new Date())+"0800";
		}
		
	    File Rh =  new File("D:"+File.separator+"py"+File.separator+"1012"+File.separator+"result"+File.separator+dataName+"_Relative_humidity.txt");
	    File Tem = new File("D:"+File.separator+"py"+File.separator+"1012"+File.separator+"result"+File.separator+dataName+"_Temperature.txt");
	    File Cloud = new File("D:"+File.separator+"py"+File.separator+"1012"+File.separator+"result"+File.separator+dataName+"_Total_cloud_cover.txt");
	    File PreCi = new File("D:"+File.separator+"py"+File.separator+"1012"+File.separator+"result"+File.separator+dataName+"_Total_precipitation.txt");
	    File UWind = new File("D:"+File.separator+"py"+File.separator+"1012"+File.separator+"result"+File.separator+dataName+"_u-component_of_wind.txt");
	    File VWind = new File("D:"+File.separator+"py"+File.separator+"1012"+File.separator+"result"+File.separator+dataName+"_v-component_of_wind.txt");
	    if (Rh.exists()) {
			JSONArray rhDate = analyTxt(Rh);
			analyHumidity(rhDate);
		}
	    if (Tem.exists()) {
			JSONArray temDate = analyTxt(Tem);
			analyTempara(temDate);
		}
	    if (Cloud.exists()) {
			JSONArray cloudDate = analyTxt(Cloud);
			analyCloud(cloudDate);
		}
	    if (PreCi.exists()) {
			JSONArray preCiDate = analyTxt(PreCi);
			anlyRain(preCiDate);
		}
	    if (UWind.exists()&&VWind.exists()) {
			JSONArray uWindDate = analyTxt(UWind),vWindDate=analyTxt(VWind);
            analyWindy(vWindDate, uWindDate);
	    }
	   
	}

	@Override
	public void run() {
        anlySisTem();
	}

}
