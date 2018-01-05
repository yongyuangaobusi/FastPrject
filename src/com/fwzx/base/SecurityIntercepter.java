
package com.fwzx.base;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;


/**
 * 17-09-29
 * @author han
 *
 */
@SuppressWarnings("rawtypes")
public class SecurityIntercepter extends HandlerInterceptorAdapter implements InitializingBean {


	
   

	@CacheEvict(value = "SecurityCache", allEntries = true)
	public void afterPropertiesSet() throws Exception {
	}

	@Override
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {
		String url = request.getServletPath();
		System.out.println("-------------------------------------xx"+url);
		AntPathMatcher matcher = new AntPathMatcher();

		
		if(matcher.match("/static/**", url)){
			return true;
		}
		if (matcher.match("/admin/login", url)) {
			return true;
		} else {
			String user = SecurityUtils.getCurUser();
			if (user == null) {
				response.sendRedirect(request.getContextPath() + "/admin/login");
				return false;
			} else {
				if (matcher.match("/", url)) {
					response.sendRedirect(request.getContextPath() + "/admin/index");
					return false;
				}
				return true;
			}
		}
	}

}
