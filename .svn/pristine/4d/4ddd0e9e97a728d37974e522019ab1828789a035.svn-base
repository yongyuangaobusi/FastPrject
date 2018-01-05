package com.fwzx.util;

import java.io.File;
import java.io.FileFilter;

/**
 * 文件过滤 筛选简报
 * @author han
 *
 */
public	class myFileFilter implements FileFilter{
	private String name;
	
	public myFileFilter(String name) {
		super();
		this.name = name;
	}
	@Override
	public boolean accept(File arg0) {
		CharSequence s = name.subSequence(0, name.length());
		return arg0.getName().contains(s);
	}	
}