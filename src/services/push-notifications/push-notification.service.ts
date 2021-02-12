import { AlertService } from './../alert/alert.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { FCM } from '../../../plugins/cordova-plugin-fcm-with-dependecy-updated/ionic/ngx/FCM';

@Injectable()
export class PushNotificationService {
  token: string;
  uuid: string | null = null;
  devicePlatform: string | null = null;
  version: string | null = null;
  manufacturer: string | null = null;
  model: string | null = null;

  constructor(
    private fcm: FCM,
    private platform: Platform,
    private router: Router,
    private alertSvc: AlertService
  ) {}

  initializePush() {
    if (this.platform.is('cordova')) {
      // this.loadPhoneDetails();
      this.listenerPush();
      this.fcm.getToken().then(async (token: string | null) => {
        if (token !== null && token.length > 0) {
          // await this.storage.set('push_token', token);
          this.token = token;
          // this.postPushDetails();
        }
      });
      this.fcm
        .onTokenRefresh()
        .subscribe(async (tokenRefresh: string | null) => {
          if (tokenRefresh !== null && tokenRefresh.length > 0) {
            // await this.storage.set('push_token', tokenRefresh);
            this.token = tokenRefresh;
            // this.postPushDetails();
          }
        });
    }
  }

  async updateToken() {
    await this.setToken();
    // this.postPushDetails();
  }

  async setToken() {
    // const token = await this.storage.get('push_token');
    // this.token = token;
  }

  // loadPhoneDetails() {
  //   this.uuid = this.device.uuid;
  //   this.devicePlatform = this.device.platform;
  //   this.version = this.device.version;
  //   this.manufacturer = this.device.manufacturer;
  //   this.model = this.device.model;
  // }

  // postPushDetails() {
  //   this.appVersion.getVersionNumber().then((version) => {
  //     this.connectSvc
  //       .create('push_tokens', {
  //         push_token: {
  //           token: this.token,
  //           uuid: this.device.uuid,
  //           version: this.device.version,
  //           manufacturer: this.device.manufacturer,
  //           model: this.device.model,
  //           platform: this.device.platform,
  //           app_version: version,
  //         },
  //       })
  //       .subscribe();
  //   });
  // }

  listenerPush() {
    // if (this.platform.is('ios')) {
    //   this.fcm.requestPushPermissionIOS();
    // }
    this.fcm.onNotification().subscribe((data) => {
      if (this.platform.is('ios')) {
        // IOS data
        //   {
        //     aps: {
        //       alert: { title: 'New article published', body: 'Please click to open the app and read this article' },
        //     },
        //     'gcm.notification.priority': 'high',
        //     'google.c.sender.id': '(999999999)',
        //     'google.c.a.e': '1',
        //     'gcm.message_id': '1587005840718959',
        //   };
        // }
        const alert = data.aps.alert;
        const title =
          alert.message_title /* istanbul ignore next */ || alert.title;
        const body =
          alert.message_body /* istanbul ignore next */ || alert.body;
        if (data.wasTapped) {
          this.notificationWasTapped(data.content_id, title, body);
        } else {
          this.notificationWasNotTapped(data.content_id, title, body);
        }
      } else {
        // Android data
        // {
        //   wasTapped: false,
        //   title: 'New article published',
        //   body: 'Please click to open the app and read this article',
        // };

        const title =
          data.message_title /* istanbul ignore next */ || data.title;
        const body = data.message_body /* istanbul ignore next */ || data.body;
        if (data.wasTapped) {
          this.notificationWasTapped(data.content_id, title, body);
        } else {
          this.notificationWasNotTapped(data.content_id, title, body);
        }
      }
    });
  }

  notificationWasTapped(
    content_id: string | undefined,
    title: string,
    body: string
  ) {
    if (content_id) {
      if (this.router.url === '/tabs/home') {
        this.alertSvc.presentConfirmation(title, '', body).then((option) => {
          if (option.option) {
            this.router.navigateByUrl(`/preview/${content_id}`);
          }
        });
      } else {
        this.router.navigateByUrl('/tabs/home');
      }
    } else {
      this.alertSvc.presentAlert(title, '', body, 'Dismiss');
    }
  }

  notificationWasNotTapped(
    content_id: string | undefined,
    title: string,
    body: string
  ) {
    if (content_id) {
      this.alertSvc.presentConfirmation(title, '', body).then((option) => {
        if (option.option) {
          this.router.navigateByUrl(`/preview/${content_id}`);
        }
      });
    } else {
      this.alertSvc.presentAlert(title, '', body, `Dismiss`);
    }
  }
}
