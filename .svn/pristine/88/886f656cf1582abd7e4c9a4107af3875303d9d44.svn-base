package com.fwzx.controller;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintStream;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

import com.alibaba.fastjson.JSON;




public class Yjgenerate {


	
	
	public  List<Map<String, String>> getAreaUIdStation() {
		ApplicationContext aContext = new ClassPathXmlApplicationContext("myselfMain.xml");

		JdbcTemplate jdbcTemplate = (JdbcTemplate) aContext.getBean("jdbcTemplate2");

		String sql = "SELECT type , op FROM yjdy";
		List<Map<String, String>>  list = jdbcTemplate.query(sql, new RowMapper() {
			@Override
			public Map<String, String> mapRow(ResultSet arg0, int arg1) throws SQLException {
				Map<String, String> map = new HashMap<>();
				map.put(arg0.getString(2), arg0.getString(1));
				return map;
			}
		});
		return list;
	}
	
	public  List<Map<String, String>> two() {
		ApplicationContext aContext = new ClassPathXmlApplicationContext("myselfMain.xml");

		JdbcTemplate jdbcTemplate = (JdbcTemplate) aContext.getBean("jdbcTemplate2");

		String sql = "SELECT  op,bianhao FROM yjdy";
		List<Map<String, String>>  list = jdbcTemplate.query(sql, new RowMapper() {
			@Override
			public Map<String, String> mapRow(ResultSet arg0, int arg1) throws SQLException {
				Map<String, String> map = new HashMap<>();
				map.put(arg0.getString(2), arg0.getString(1));
				return map;
			}
		});
		return list;
	}
	
	
	
	
	
	public void getyj() {
		
		try {
			
		
		
		 String str="";
		 File f = new File("X:");
		 File files[] = f.listFiles();
		 SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		 
		    Date temp= new Date();
			Calendar date = Calendar.getInstance();
			date.setTime(temp);
			date.add(Calendar.HOUR, -12 );
			Date op=date.getTime();
	        Map<String, String> map = new HashMap<>();
	        Map<String, Object> jieguo = new HashMap<>();
            ArrayList<Object> list1=new ArrayList<>();
		 for(int i=0;i<files.length;i++){ 
			 if (new Date(files[i].lastModified()).before(temp)&&new Date(files[i].lastModified()).after(op)) {
				 str=files[i].getName();
				 
				 StringBuilder result = new StringBuilder();
			        try{
			        	 String encoding="UTF-8";
			            InputStreamReader read = new InputStreamReader(new FileInputStream("x:\\"+str),"gbk");       
			            BufferedReader reader=new BufferedReader(read);  
			            String s = null;
			            while((s = reader.readLine())!=null){//使用readLine方法，一次读一行
			                result.append(System.lineSeparator()+s);
			            }
			            reader.close();    
			        }catch(Exception e){
			            e.printStackTrace();
			        } 
			        String [] arr = str.split("_");
			        List<Map<String, String>> li = getAreaUIdStation();
			        
			        Map<String, String> tempmap = new HashMap<>();

					for (int i1 = 0; i1 < li.size(); i1++) {
						map = li.get(i1);
						Iterator iter = map.keySet().iterator();
						while (iter.hasNext()) {
							String key = (String) iter.next();
							String val = map.get(key);
							tempmap.put(val, key);
						}
					}
			//dier
			 List<Map<String, String>> list = two();
			 Map<String, String> tup = new HashMap<>();

					for (int i11 = 0; i11 < li.size(); i11++) {
						map = list.get(i11);
						Iterator iter1 = map.keySet().iterator();
						while (iter1.hasNext()) {
							String key = (String) iter1.next();
							String val = map.get(key);
							tup.put(val, key);
						}
						
						
					}
						
						
						
					String 	une = tempmap.get(arr[1]);
					String  yj=tup.get(une);
					String ng="";
					String color="";
					if (arr[2].equals("B")) {
						ng="蓝色";
						color="01";
					}else if (arr[2].equals("R")) {
						ng="红色";
						color="04";

					}else if (arr[2].equals("Y")) {
						ng="黄色";
						color="02";
					}else {
						ng="橙色";
						color="03";
					}
						
					
					Map<String, String> ok = new HashMap<>();
				

					
						
					
				String kk=	StringUtils.substringBeforeLast(StringUtils.substringAfter(result.toString(), "#1")	,"</天气预警::冀北>");
				for (int j = 2; j < 11; j++) {
					if(kk.indexOf("#"+i)!=-1){
						   kk.replace("#"+i, ",");
						  }
				}
				
					ok.put("w1", "河北省专业气象台");
					ok.put("w2", "");
					ok.put("w3","");
					ok.put("w4", yj);
					ok.put("w5",une );
					ok.put("w6", color);
					ok.put("w7", ng);
					ok.put("w8", df.format(files[i].lastModified()));
                    ok.put("w9",kk);
					ok.put("w10","");
					ok.put("w11","");
					list1.add(ok);
		 }
			 jieguo.put("w", list1);
			 html(JSON.toJSONString(jieguo));

	}
		} catch (Exception e) {
			// TODO: handle exception
		}
	
	}
	
	
	
	
	
	public  void html(String op) throws IOException {
		File file1 = new File("D:/冀北电科院/预警/");
		file1.mkdirs();

		File f_html = new File("D:/冀北电科院/预警/jibei.html");
		f_html.createNewFile();

		StringBuilder stringHtml = new StringBuilder();

		// 输入HTML文件内容
		stringHtml.append(op);

		try {

			// 打开文件
			PrintStream printStream = new PrintStream(new FileOutputStream("D:/冀北电科院/预警/jibei.html"),false, "utf-8");
			// 将HTML文件内容写入文件中
			printStream.println(stringHtml.toString());
			
			printStream.close();
		} catch (Exception e) {

			e.printStackTrace();
		}

	}
	
	
	
	
}
