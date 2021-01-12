import { Component } from '@angular/core';
import {
  ILocalNotification,
  LocalNotifications,
} from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  numOfNotifications = 20;
  intervalInMinutes = 1;
  priority = 0;

  constructor(private localNotification: LocalNotifications) {}

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
}
