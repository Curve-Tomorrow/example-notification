import { Component } from '@angular/core';
import {
  ILocalNotification,
  LocalNotifications,
} from '@ionic-native/local-notifications/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  numOfNotifications = 20;
  intervalInMinutes = 1;
  priority = 0;
  batteryOptimisation = 'unknown';

  constructor(
    private localNotification: LocalNotifications,
    private platform: Platform
  ) {}

  ngOnInit() {
    this.checkAndSetBatteryOptimisationStatus();
  }

  schedule() {
    const now = Date.now();
    let notifications: ILocalNotification[] = [];

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

  async requestIgnoreBatteryOptimisation() {
    await this.platform.ready();
    if (!this.platform.is('android')) return;
    const granted = await requestIgnoringBatteryOptimization();
    this.setBatteryOptimisationStatus(granted);
  }

  private async checkAndSetBatteryOptimisationStatus() {
    await this.platform.ready();
    if (!this.platform.is('android')) return;
    const granted = await isIgnoringBatteryOptimizations();
    this.setBatteryOptimisationStatus(granted);
  }

  private setBatteryOptimisationStatus(granted: boolean) {
    this.batteryOptimisation = granted ? 'Ignored' : 'optimised';
  }
}

function isIgnoringBatteryOptimizations() {
  return new Promise<boolean>((resolve) => {
    (window as any).cordova.plugins.notification.local.isIgnoringBatteryOptimizations(
      (granted: boolean) => resolve(granted)
    );
  });
}

function requestIgnoringBatteryOptimization() {
  return new Promise<boolean>((resolve) => {
    (window as any).cordova.plugins.notification.local.requestIgnoreBatteryOptimizations(
      (granted: boolean) => resolve(granted)
    );
  });
}
