import { AlertService } from './../../services/alert/alert.service';
import { Component } from '@angular/core';
import {
  ILocalNotification,
  LocalNotifications,
} from '@ionic-native/local-notifications/ngx';

declare var cordova;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  numOfNotifications = 20;
  intervalInMinutes = 1;
  priority = 0;

  constructor(
    private localNotification: LocalNotifications,
    private alertSvc: AlertService
  ) {}

  schedule() {
    const now = Date.now();
    const notifications: ILocalNotification[] = [];

    for (let i = 0; i < this.numOfNotifications; i++) {
      const id = i + 1;
      const time = new Date(now + id * this.intervalInMinutes * 60_000);
      notifications.push({
        id,
        title: `Test ${id}`,
        text: `Expected at ${time.toLocaleString()}`,
        foreground: true,
        trigger: { at: time },
        priority: this.priority,
      });
    }
    this.localNotification.schedule(notifications);
  }

  async cancelAll() {
    await this.localNotification.cancelAll();
  }

  isIgnoringBatteryOptimizations() {
    (cordova as any).plugins.PowerOptimization.IsIgnoringBatteryOptimizations().then(
      (result: any) => {
        console.log('******' + 'isIgnoringBatteryOptimizations');
        console.log(result);
        this.alertSvc.presentAlert('', '', result, '');
      },
      (err: any) => {
        console.error(err);
      }
    );
  }

  requestOptimizationsMenu() {
    (cordova as any).plugins.PowerOptimization.RequestOptimizationsMenu().then(
      (result: any) => {
        console.log('******' + 'requestOptimizationsMenu');
        console.log(result);
      },
      (err: any) => {
        console.error(err);
      }
    );
  }

  requestOptimizations() {
    (cordova as any).plugins.PowerOptimization.RequestOptimizations().then(
      (result: any) => {
        console.log('******' + 'requestOptimizations');
        console.log(result);
      },
      (err: any) => {
        console.error(err);
      }
    );
  }

  // isIgnoringDataSaver() {
  //   (cordova as any).plugins.PowerOptimization.IsIgnoringDataSaver().then(
  //     (result: any) => {
  //       console.log('******' + 'isIgnoringDataSaver');
  //       console.log(result);
  //     },
  //     (err: any) => {
  //       console.error(err);
  //     }
  //   );
  // }

  requestDataSaverMenu() {
    (cordova as any).plugins.PowerOptimization.RequestDataSaverMenu().then(
      (result: any) => {
        console.log('******' + 'requestDataSaverMenu');
        console.log(result);
      },
      (err: any) => {
        console.error(err);
      }
    );
  }

  haveProtectedAppsCheck() {
    (cordova as any).plugins.PowerOptimization.HaveProtectedAppsCheck().then(
      (result: any) => {
        console.log('******' + 'haveProtectedAppsCheck');
        console.log(result);
      },
      (err: any) => {
        console.error(err);
      }
    );
  }

  protectedAppCheck() {
    (cordova as any).plugins.PowerOptimization.ProtectedAppCheck().then(
      (result: any) => {
        console.log('******' + 'protectedAppCheck');
        console.log(result);
      },
      (err: any) => {
        console.error(err);
      }
    );
  }
}
