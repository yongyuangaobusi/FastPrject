package com.fwzx.base;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@SuppressWarnings("unchecked")
public class SecurityUtils { 

	private static String CURRENT_USER_SESSION = "CurUser";
	private static String CURRENT_DATE = "curDate";
	private static String DAILYDATE_CHECK = "dailyDateCheck";

	public static <T> void onLogin(T user) {
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
		HttpSession session = request.getSession();
		session.setMaxInactiveInterval(60 * 30);
		session.setAttribute(CURRENT_USER_SESSION, user);
		session.setAttribute(CURRENT_DATE, new SimpleDateFormat("yyyy-MM-dd").format(new Date()));
	}

	public static void onLogout() {
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
		request.getSession().invalidate();
	}

	public static <T> T getCurUser() {
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
		return (T) request.getSession().getAttribute(CURRENT_USER_SESSION);
	}

	public static void setDailyDateByCheck(List<String> dailyDates) {
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
		request.getSession().setAttribute(DAILYDATE_CHECK, dailyDates);
	}

	public static <T> T getDailyDateByCheck() {
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
		return (T) request.getSession().getAttribute(DAILYDATE_CHECK);
	}
}
