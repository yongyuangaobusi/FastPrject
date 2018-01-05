package com.fwzx.util;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

/**
 * spring bean 工具类
 * 
 * @author 韩合军
 * file：SpringBeanTool.java
 * TODO
 *
 */
public class SpringBeanTool implements ApplicationContextAware {
    
	private static ApplicationContext context = null;
	private static SpringBeanTool beanTool = null;
	
	@Override
	public void setApplicationContext(ApplicationContext con)
			throws BeansException {
            context = con;
	}
	
	public synchronized  static SpringBeanTool initSpringTool(){
		if (beanTool==null) {
			beanTool = new SpringBeanTool();
		}
		return beanTool;
	}
	
   
	public synchronized static Object getBeans(String beanName){
		return context.getBean(beanName);
	}
}
