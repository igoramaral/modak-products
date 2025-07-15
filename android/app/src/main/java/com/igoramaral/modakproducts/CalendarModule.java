package com.igoramaral.modakproducts;

import android.provider.CalendarContract;
import android.content.ContentValues;
import android.content.ContentResolver;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReactContext;

import java.util.TimeZone;
import android.util.Log;

public class CalendarModule extends ReactContextBaseJavaModule {

    private final ReactContext reactContext;

    public CalendarModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "CalendarModule";
    }

    @ReactMethod
    public void addEvent(String title, double startTimestamp, double endTimestamp) {
        ContentResolver cr = reactContext.getContentResolver();

        ContentValues event = new ContentValues();
        event.put(CalendarContract.Events.CALENDAR_ID, 1);
        event.put(CalendarContract.Events.TITLE, title);
        event.put(CalendarContract.Events.DTSTART, (long)startTimestamp);
        event.put(CalendarContract.Events.DTEND, (long)endTimestamp);
        event.put(CalendarContract.Events.EVENT_TIMEZONE, TimeZone.getDefault().getID());

        try {
            cr.insert(CalendarContract.Events.CONTENT_URI, event);
            Log.i("CalendarModule", "Event added");
        } catch (Exception e) {
            Log.e("CalendarModule", "Failed to add event: " + e.getMessage());
        }
    }
}
