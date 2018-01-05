package com.fwzx.service.impl;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.artofsolving.jodconverter.DocumentConverter;
import com.artofsolving.jodconverter.openoffice.connection.OpenOfficeConnection;
import com.artofsolving.jodconverter.openoffice.connection.SocketOpenOfficeConnection;
import com.artofsolving.jodconverter.openoffice.converter.OpenOfficeDocumentConverter;
import com.fwzx.service.WeatherReportService;
import com.fwzx.util.DayOf7Util;
import com.fwzx.util.myFileFilter;

@Service
public class WeatherReportServiceImpl implements WeatherReportService {

	public static String Reportname = "gsqxjb_risk_zyt_road";

	@Autowired
	private JdbcTemplate jdbcTemplate2;

	@Override
	public JSONObject get24weatherinfo(Object[] args) {
		JSONObject object = new JSONObject();
		JSONArray stations = new JSONArray();
		String sql = "SELECT a.data,a.sc,b.stationName,a.datatime,a.config FROM grib_reportdata a, stationinfo b WHERE b.highwayName=? AND b.num=a.station AND a.type=? AND a.datatime=? ORDER BY a.station ,sc limit ?,? ";
		String sql2 = "SELECT a.data FROM grib_reportdata a, stationinfo b WHERE b.highwayName=? AND b.num=a.station AND a.type=? AND a.datatime=? ";
		List<Map<String, Object>> list = jdbcTemplate2.queryForList(sql, args);
		List<Map<String, Object>> sizeList = jdbcTemplate2.queryForList(sql2, args[0], args[1], args[2]);

		int size = list.size(), allsize = sizeList.size();
		for (int i = 0; i < size; i += 8) {
			JSONObject station2 = new JSONObject();
			station2.put("name", list.get(i).get("stationName"));
			for (int j = 0; j < 8; j++) {
				int num = i + j;
				station2.put("info" + j, (double) list.get(num).get("data"));
			}
			stations.add(station2);
		}
		object.put("rows", stations);
		object.put("total", allsize / 8);
		return object;
	}

	@Override // 是否存在坏数据问题
	public JSONArray get72weatherinfo() {

		String[] dateAndHour = getTimeStr();
		String sql = "SELECT a.weather,a.tem_max,a.tem_min,a.wind_d,a.wind_s,b.city_name,c.WEATHER_NAME,c.imgid  FROM tbl_forcast a,tbl_station b,tbl_weather_img c WHERE a.station_id=b.station_id AND b.city_name=b.station_name AND c.NAME=a.weather AND b.province_name in('河北','北京','天津') AND a.datetime=? AND a.thour=? ORDER BY a.station_id, a.shici ASC ";
		List<Map<String, Object>> list = jdbcTemplate2.queryForList(sql, dateAndHour);
		String sqlCount = "SELECT COUNT(a.shici) number,city_name  FROM tbl_forcast a,tbl_station b,tbl_weather_img c WHERE a.station_id=b.station_id AND b.city_name=b.station_name AND c.NAME=a.weather AND b.province_name in('河北','北京','天津') AND a.datetime=? AND a.thour=? GROUP BY b.city_name ";
		List<Map<String, Object>> listCount = jdbcTemplate2.queryForList(sqlCount, dateAndHour);
		JSONArray jArray = new JSONArray();
		int sizw = list.size();

		for (int n = 0; n < listCount.size(); n++) {
			JSONObject jsObject = new JSONObject();
			String nameCount = (String) listCount.get(n).get("city_name");
			jsObject.put("station", nameCount);

			for (int i = 0; i < sizw; i++) {
				if (list.get(i).get("city_name").equals(nameCount)) {
					JSONArray jsArray = new JSONArray();
					long number = (long) listCount.get(n).get("number");
					for (int j = 0; j < number / 2; j++) {
						JSONObject object = new JSONObject();
						int in = i + j * 2 + 1;
						String state0 = (String) list.get(in - 1).get("weather_name"),
								state00 = (String) list.get(in).get("weather_name");
						String state01 = (String) list.get(in - 1).get("weather"),
								state02 = (String) list.get(in).get("weather");
						String tem_min = list.get(in).get("tem_min").toString(),
								tem_max = list.get(in).get("tem_max").toString();
						String windy = (String) list.get(in).get("wind_d"), winds = (String) list.get(in).get("wind_s");
						int stateCode01 = (int) list.get(in - 1).get("imgid"),
								stateCode02 = (int) list.get(in).get("imgid");

						object.put("state", DayOf7Util.getWeather(state01, state02));
						object.put("temparature", DayOf7Util.getTemparature(tem_min, tem_max));
						object.put("windy", DayOf7Util.getWindy(windy, winds));
						object.put("imge", DayOf7Util.getImge(state0, state00));
						object.put("level", stateCode01 + "," + stateCode02);
						jsArray.add(object);
					}
					jsObject.put("date", jsArray);
					jArray.add(jsObject);
					break;
				}
			}
		}
		return jArray;
	}

	private String getDateStr() {
		SimpleDateFormat sFormat = new SimpleDateFormat("yyyy-MM-dd");
		String date = sFormat.format(new Date());
		return date;
	}

	private String[] getTimeStr() {
		SimpleDateFormat sFormat = new SimpleDateFormat("yyyy-MM-dd");
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(new Date());
		String date = "", thour = "";
		if (calendar.getTime().getHours() >= 17) {
			date = sFormat.format(calendar.getTime()) + " 00:00:00";
			thour = "20";
		} else if (calendar.getTime().getHours() >= 5) {
			date = sFormat.format(calendar.getTime()) + " 00:00:00";
			thour = "08";
		} else {
			calendar.add(Calendar.DATE, -1);
			date = sFormat.format(calendar.getTime()) + " 00:00:00";
			thour = "20";
		}
		String[] strings = { date, thour };
		return strings;
	}

	@Override
	public String getSimpleReport(String path,boolean fag ) {
		SimpleDateFormat sFormat = new SimpleDateFormat("yyyyMMdd");
		String dir = sFormat.format(new Date());
		String LastTime = ""; // 最新文件名字
		File files = new File(path);
		if (files.isDirectory()) {
			File[] dFiles = files.listFiles(new myFileFilter(Reportname, ".pdf"));
			if (dFiles.length >= 1) {
				dFiles = sortFiles(dFiles); // 排序找出最新
				LastTime = dFiles[0].getName();
				if (fag) {
					return LastTime;
				}
			}
			
			if (LastTime.contains(dir)&&LastTime.contains(Reportname)) {
				return LastTime; // 返回最新简报
			} else {
				File file = new File(
						"D:" + File.separator + "jt_products" + File.separator + "RiskYB" + File.separator + dir);
				if (file.isDirectory()) {
					File[] filedoc = file.listFiles(new myFileFilter(Reportname, ".doc"));
					if (filedoc.length >= 1) {
						for (int i = 0; i < filedoc.length; i++) {
							String outName = filedoc[i].getName();
							File outputFile = new File(file.getPath() + File.separator
									+ outName.substring(0, outName.length() - 4) + ".pdf");
							WordToPdf(filedoc[i], outputFile);
						}
					}
					File[] filepdf = file.listFiles(new myFileFilter(Reportname, ".pdf"));
					if (filepdf.length >= 1) {
						filepdf = sortFiles(filepdf);
						InputStream inputStream;
						OutputStream outputStream;
						byte cache[] = new byte[1024];
						try {
							inputStream = new FileInputStream(filepdf[0]);
							outputStream = new FileOutputStream(new File(path+File.separator+filepdf[0].getName()));
							int length = 0;
							while ((length = inputStream.read(cache)) != -1) {
								outputStream.write(cache, 0, length);
							}
							inputStream.close();
							outputStream.close();
						} catch (IOException e) {
							e.printStackTrace();
						} finally {

						}
						return filepdf[0].getName();
					}
				}
				return "0";  // 简报未更新
			}
		}
		return "0"; // 工作文件夹删除 
	}

	// 按最近修改时间排序
	public File[] sortFiles(File[] dFiles) {
		File lastDefin = null;
		if (dFiles != null) {
			if (dFiles.length == 1) {
				return dFiles;
			} else if (dFiles.length > 1) {
				for (int i = 0; i < dFiles.length - 1; i++) {
					for (int j = 0; j < dFiles.length - i - 1; j++) { // 对当前无序区间dFiles[0......length-i-1]进行排序(j的范围很关键，这个范围是在逐步缩小的)
						if (dFiles[j].lastModified() < dFiles[j + 1].lastModified()) { // 把小的值交换到后面
							lastDefin = dFiles[j];
							dFiles[j] = dFiles[j + 1];
							dFiles[j + 1] = lastDefin;
						}
					}
				}
				return dFiles;
			}
		}
		return dFiles;
	}

	private void WordToPdf(File inputFile, File outputFile) {
		// 启动服务 执行完关闭
		String OpenOffice_HOME = "D:/OpenOffice 4";// 这里是OpenOffice的安装目录 /Program Files (x86)
		if (OpenOffice_HOME.charAt(OpenOffice_HOME.length() - 1) != '/') {
			OpenOffice_HOME += "/";
		}
		Process pro = null;
		OpenOfficeConnection connection = null;
		// 启动OpenOffice的服务
		String command = OpenOffice_HOME
				+ "program/soffice.exe -headless -accept=\"socket,host=127.0.0.1,port=8100;urp;\"";
		// connect to an OpenOffice.org instance running on port 8100

		try {
			pro = Runtime.getRuntime().exec(command);
			connection = new SocketOpenOfficeConnection(8100);
			connection.connect();
			DocumentConverter converter = new OpenOfficeDocumentConverter(connection);
			converter.convert(inputFile, outputFile);
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			// close the connection
			if (connection != null) {
				connection.disconnect();
				connection = null;
			}
			pro.destroy();
		}
	}
}
