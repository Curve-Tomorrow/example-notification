import { AlertService } from './../services/alert/alert.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { PushNotificationService } from '../services/push-notifications/push-notification.service';
import { FCM } from '../../plugins/cordova-plugin-fcm-with-dependecy-updated/ionic/ngx/FCM';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    LocalNotifications,
    PushNotificationService,
    AlertService,
    FCM
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
