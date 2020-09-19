package com.free.ebook.store;

import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen;
import android.os.Bundle;

public class MainActivity extends ReactActivity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
      SplashScreen.show(this);  // here 
      super.onCreate(savedInstanceState);
  }

  @Override
  protected String getMainComponentName() {
    return "ServiceProvider";
  }
}
