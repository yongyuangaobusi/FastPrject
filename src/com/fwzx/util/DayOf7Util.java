package com.fwzx.util;

public class DayOf7Util {
	private static String WEATHER = "转";
	private static String TEMPARATURE = "-";
	private static String WINDY = "/";
	private static String WEATHERGIF = ",";
	private static String ERROR01 = "999.9";
	private static String ERROR02 = "缺报";
	private static String ERROR03 = "--";

	public static String getWeather(String type1,String type2){
	  if (type1.equals(ERROR01)) {
		return ERROR03;
	  }else if (type1.equals(type2)) {
		 return type1;
       } else{
         return type1+WEATHER+type2;
	  }
   }
	
   public static String getWranLevel(int state1,int state2,String tem1,String tem2){
	   
	   double tem = Double.parseDouble(tem2);
	   boolean bo1 = state2>=11||state2<=12,bo2 =  state1>=11||state1<=12;
	   if (state1==8||state1==9||state2==8||state2==9) {
		return "1";
	   }
	   if (state1==10||state2==10||tem>35) {
		return "2";
	   }
	   if (bo1||bo2) {
		return "3";
	   }
	    
	   return "";
   }	
	
   public static String getTemparature(String ty1,String ty2){
	   
		if (ty1.equals(ERROR01)) {
           return ERROR03;
		} else {
		   String TemRand = ty1.split("[.]")[0]+TEMPARATURE+ty2.split("[.]")[0]; 	
		   return 	TemRand;
		}
		
   }	
   
   public static String getWindy(String ty01,String ty02){
	   if (ty01.equals(ERROR02)) {
        return ERROR03;
	   } else {
	    return ty01+WINDY+ty02;
	   }
   }
   
   public static String getImge(String ty1,String ty2){
	   if (ty1.equals(ty2)) {
		 return ty1;
	   } else{
	     return ty1+WEATHERGIF+ty2;
       }
   }
   
}
