package com.fwzx.controller;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.fwzx.service.WeatherReportService;

/**
 * 24小时预报 72小时预报 气象报
 * 
 * @author han
 *
 */
@Controller
@RequestMapping(value = "WeatherReport")
public class WeatherReportController {

	@Autowired
	private JdbcTemplate jdbcTemplate2;

	@Autowired
	private WeatherReportService WeatherReportService;

	@RequestMapping(value = "get24Info")
	private void getInfo(HttpServletRequest request, HttpServletResponse response) {
		String sql = "select * from pro_task";
		List<Map<String, Object>> list = jdbcTemplate2.queryForList(sql);
		try {
			response.getWriter().write(list.size());
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 京津冀高速预报
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping(value = "get24WeatherInfo")
	private void getWeatherInfo(HttpServletRequest request, HttpServletResponse response) {
		response.setCharacterEncoding("utf-8");
		String page = request.getParameter("page"), rows = request.getParameter("rows");
		String element = request.getParameter("element"), username = request.getParameter("username");
		String stations = request.getParameter("stations");
		int ros = Integer.parseInt(rows) * 8, pages = (Integer.parseInt(page) - 1) * ros;

		SimpleDateFormat sFormat = new SimpleDateFormat("yyyy-MM-dd");
		String date;
		Calendar calendar = Calendar.getInstance();

		if (calendar.getTime().getHours() >= 17 && calendar.getTime().getMinutes() > 25) {
			date = sFormat.format(calendar.getTime());
		} else {
			calendar.add(Calendar.DATE, -1);
			date = sFormat.format(calendar.getTime());
		}

		JSONObject object;

		if (stations == null) {
			Object[] args = { "京沪高速", "rain", date, pages, ros };
			object = WeatherReportService.get24weatherinfo(args);
		} else {
			Object[] args = { stations, element, date, pages, ros };
			object = WeatherReportService.get24weatherinfo(args);
		}

		try {
			response.getWriter().write(object.toJSONString());
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 京津冀三天预报
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping(value = "get72WeatherInfo")
	private void get72WeatherInfo(HttpServletRequest request, HttpServletResponse response) {
		response.setCharacterEncoding("utf-8");
		String stations = request.getParameter("stations"), time = request.getParameter("time");
		JSONArray weatherInifo = WeatherReportService.get72weatherinfo();
		try {
			response.getWriter().write(weatherInifo.toJSONString());
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 最新简报
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping(value = "getSimpleReport")
	private void getSimpleReport(HttpServletRequest request, HttpServletResponse response) {

		String path = request.getServletContext()
				.getRealPath(File.separator + "static" + File.separator + "pdf" + File.separator),fag=request.getParameter("fag");
		String name = "";
		if (fag.equals("0")) {
			 name = WeatherReportService.getSimpleReport(path,false);
		}else{
			 name = WeatherReportService.getSimpleReport(path,true);
		}
		String reportName = "";
		if (!name.equals("0")) {
			reportName = name;
		}
		try {
			response.getWriter().write(reportName);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	

	

}
