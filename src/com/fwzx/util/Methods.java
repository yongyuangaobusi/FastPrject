package com.fwzx.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;

public class Methods {
	
	public String getMethod(String url){
		CloseableHttpClient client = HttpClients.createDefault();

        HttpGet httpGet = new HttpGet(url);
        String string1 = "", str1;;
		try {
			CloseableHttpResponse response = client.execute(httpGet);
			HttpEntity entity1 = response.getEntity();
			InputStream io1 = entity1.getContent();
			InputStreamReader isReader1 = new InputStreamReader(io1, "utf-8");
			BufferedReader bfReader1 = new BufferedReader(isReader1);
			
			while ((str1 = bfReader1.readLine()) != null) {
				string1 += str1;
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		return string1 ;
	}
}
