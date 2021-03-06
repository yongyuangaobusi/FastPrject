package com.fwzx.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.fwzx.controller.LiveRestTemplate;
import com.fwzx.controller.Yjgenerate;
import com.fwzx.util.TextUtle;

/**
 * 定时任务类
 * @author han
 *
 */
@Component
public class ScheduleWorks {
   
	
	
	
	public static String ReportUrl = "http://127.0.0.1:8080/Automation/WeatherReport/getSimpleReport?fag=0";
	/**
	 * 格点天气要素入库
	 */
	@Scheduled(cron="0 22 17 * * ? ")
	private void annalysisElement(){
		Thread thread = new Thread(new TextUtle());
		thread.start();
	}
	/**
	 * 解析word 上传pdf
	 */
	//@Scheduled(cron="0 0/5 * * * ?")
	private void SimpleReport(){
		StringBuffer info = new StringBuffer();
		try {
				URL url = new URL(ReportUrl);
				URLConnection connection = url.openConnection();
				connection.setReadTimeout(10000);
				InputStream io = connection.getInputStream();
				InputStreamReader iReader = new InputStreamReader(io);
				BufferedReader bReader = new BufferedReader(iReader);
				String line;
				while ((line=bReader.readLine())!=null) {
					info.append(line);
				}
				bReader.close();
				iReader.close();
				io.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
	
	}
	
	@Scheduled(cron="0 10 0-23 * * ? ")
	private void realityElectric(){
		LiveRestTemplate liveRestTemplate = new LiveRestTemplate();
		liveRestTemplate.getobj();
	}
	
	@Scheduled(cron="0 15,25 7,11,17 * * ? ")
	private void reportEletric(){
		Thread thread = new Thread(new ElectricFile());
		thread.start();
	}
	

	@Scheduled(cron="0 0/10 * * * ?")
	private void yujing(){
		Yjgenerate yjgenerate=new Yjgenerate();
		yjgenerate.getyj();
	}

	
}
