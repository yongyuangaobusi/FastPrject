package com.fwzx.test;

import static org.junit.Assert.fail;

import java.awt.Desktop;
import java.io.File;
import java.io.IOException;
import java.sql.SQLException;

import javax.sql.DataSource;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.fwzx.entity.CRM_User;

public class TestSSH {

	@Test
	public void test() throws IOException {
		File file = new File("d:\\myjava");
		if(!file.exists()){
		    file.mkdirs();
		}
		// import java.awt.desktop
		if(Desktop.isDesktopSupported()){
		    Desktop desktop = Desktop.getDesktop();
		    desktop.open(file);
		} 
	}

	private ApplicationContext ctx = null;
	
	

	@Test
	public void testDataSource() throws SQLException {
		ctx = new ClassPathXmlApplicationContext("applicationContext.xml");
		// System.out.println(ctx);
		DataSource dataSource = ctx.getBean(DataSource.class);

		// System.out.println(dataSource.getConnection().toString());

		SessionFactory sessionFactory = ctx.getBean(SessionFactory.class);
		System.out.println(sessionFactory);

		Session session = sessionFactory.openSession();
		Transaction tx = session.beginTransaction();
		// 数据库的操作
		CRM_User crm_user = new CRM_User("Auger2", "123456", "周哥2",
				"12312312@qq.com", "18575590214", 234234234);
		session.save(crm_user);
		tx.commit();
		session.close();

	}
}
