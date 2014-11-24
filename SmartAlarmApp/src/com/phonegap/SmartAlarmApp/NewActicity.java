package com.phonegap.SmartAlarmApp;
import android.app.Activity;
import android.os.Bundle;
import android.util.Log;

import org.apache.cordova.*;

public class NewActicity extends DroidGap {
	 @Override
	    public void onCreate(Bundle savedInstanceState)
	    {
	        super.onCreate(savedInstanceState);
	        Log.d("LocalNotification AlarmReceiver",
					"Alarm page");
	        // Set by <content src="index.html" /> in config.xml
	        //super.loadUrl(Config.getStartUrl());
	        super.loadUrl("file:///android_asset/www/Alarm.html");
	    }
	    
}
