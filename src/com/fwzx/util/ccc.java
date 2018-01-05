/**
 * 
 */package com.fwzx.util;/** * @author  作者 E-mail: * @date 创建时间：2017年11月7日 下午3:51:06 * @version 1.0 * @parameter  * @since  * @return  */

import java.awt.Desktop;
import java.io.File;
import java.io.IOException;

/**
* @author PC
*
*/
public class ccc {

	/**
	 * @param args
	 * @throws IOException 
	 */
	public static void main(String[] args) throws IOException {
		File file = new File("d:\\myjava");
		if(!file.exists()){
		    file.mkdirs();
		}
		// import java.awt.desktop
		if(Desktop.isDesktopSupported()){
		    Desktop desktop = Desktop.getDesktop();
		    desktop.open(file);
		} 
		/** * @author  作者 E-mail: * @date 创建时间：2017年11月7日 下午3:51:06 * @version 1.0 * @parameter  * @since  * @return  */
	}

	/** * @author  作者 E-mail: * @date 创建时间：2017年11月7日 下午3:51:06 * @version 1.0 * @parameter  * @since  * @return  */
}
