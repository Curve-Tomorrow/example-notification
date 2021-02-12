import { fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Device } from '@ionic-native/device/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { of } from 'rxjs';

import { AlertService } from '../alert/alert.service';
import { ConnectService } from '../connect/connect.service';
import { PushNotificationService } from './push-notification.service';

describe('PushNotificationService', () => {
  let FCMSpy: jasmine.SpyObj<FCM>;
  let platformSpy: jasmine.SpyObj<Platform>;
  let alertSvcSpy: jasmine.SpyObj<AlertService>;
  let deviceSpy: jasmine.SpyObj<Device>;
  let appVersionSpy: jasmine.SpyObj<AppVersion>;
  let connectSvcSpy: jasmine.SpyObj<ConnectService>;
  let storageSpy: jasmine.SpyObj<Storage>;
  let routerSpy: jasmine.SpyObj<Router>;

  let service: PushNotificationService;

  beforeEach(() => {
    FCMSpy = jasmine.createSpyObj('FCM', {
      getToken: Promise.resolve('AKsj384mHjs'),
      onTokenRefresh: of('AKsj384mHjs'),
      onNotification: of({
        body: 'This is a message',
      }),
      requestPushPermissionIOS: null,
    });
    routerSpy = jasmine.createSpyObj('router', { navigateByUrl: Promise.resolve() }, { url: null });
    platformSpy = jasmine.createSpyObj(Platform.name, { is: true });
    alertSvcSpy = jasmine.createSpyObj(AlertService.name, {
      presentAlert: Promise.resolve(),
      presentConfirmation: Promise.resolve({ option: true }),
    });
    deviceSpy = jasmine.createSpyObj(AlertService.name, { get: null });
    deviceSpy.uuid = 'ffe604a48c3av4f2';
    deviceSpy.platform = 'Android';
    deviceSpy.version = '9';
    deviceSpy.manufacturer = 'Huawei';
    deviceSpy.model = 'CLT-L29';
    appVersionSpy = jasmine.createSpyObj(AppVersion.name, { getVersionNumber: Promise.resolve('1.0.0') });
    connectSvcSpy = jasmine.createSpyObj(ConnectService.name, { create: of('data') });
    storageSpy = jasmine.createSpyObj(Storage.name, { get: Promise.resolve(), set: Promise.resolve() });

    service = new PushNotificationService(
      FCMSpy,
      appVersionSpy,
      deviceSpy,
      platformSpy,
      alertSvcSpy,
      connectSvcSpy,
      storageSpy,
      routerSpy,
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize push', fakeAsync(() => {
    spyOn(service, 'listenerPush');
    spyOn(service, 'postPushDetails');

    service.initializePush();
    tick();

    expect(service.listenerPush).toHaveBeenCalled();
    expect(service.postPushDetails).toHaveBeenCalled();
    expect(FCMSpy.getToken).toHaveBeenCalled();
    expect(FCMSpy.onTokenRefresh).toHaveBeenCalled();
  }));

  it('should initialize push and return null for getToken and tokenRefresh', fakeAsync(() => {
    spyOn(service, 'listenerPush');
    spyOn(service, 'postPushDetails');

    FCMSpy.getToken.and.returnValue(Promise.resolve(''));
    FCMSpy.onTokenRefresh.and.returnValue(of(''));

    service.initializePush();
    tick();

    expect(service.listenerPush).toHaveBeenCalled();
    expect(service.postPushDetails).not.toHaveBeenCalled();
    expect(FCMSpy.getToken).toHaveBeenCalled();
    expect(FCMSpy.onTokenRefresh).toHaveBeenCalled();
    expect(service.token).toBeUndefined();
  }));

  it('should post the device details and token', fakeAsync(() => {
    service.token = 'AKsj384mHjs';
    service.postPushDetails();
    tick();

    expect(connectSvcSpy.create).toHaveBeenCalledWith('push_tokens', {
      push_token: {
        token: 'AKsj384mHjs',
        uuid: 'ffe604a48c3av4f2',
        platform: 'Android',
        version: '9',
        manufacturer: 'Huawei',
        model: 'CLT-L29',
        app_version: '1.0.0',
      },
    });
  }));

  it('should update token', fakeAsync(() => {
    spyOn(service, 'setToken').and.returnValue(Promise.resolve());
    spyOn(service, 'postPushDetails');
    service.updateToken();
    tick();

    expect(service.postPushDetails).toHaveBeenCalled();
    expect(service.setToken).toHaveBeenCalled();
  }));

  it('should set token', fakeAsync(() => {
    storageSpy.get.and.returnValue(Promise.resolve('123'));
    service.setToken();

    tick();

    expect(service.token).toBe('123');
    expect(storageSpy.get).toHaveBeenCalledWith('push_token');
  }));

  it('should not set push functions if not cordova', fakeAsync(() => {
    spyOn(service, 'listenerPush');
    spyOn(service, 'postPushDetails');

    platformSpy.is.and.returnValue(false);
    service.initializePush();
    tick();

    expect(service.listenerPush).not.toHaveBeenCalled();
    expect(service.postPushDetails).not.toHaveBeenCalled();
    expect(FCMSpy.getToken).not.toHaveBeenCalled();
    expect(FCMSpy.onTokenRefresh).not.toHaveBeenCalled();
    expect(service.token).toBeUndefined();
  }));

  it('should listen to the push and display message for ios', fakeAsync(() => {
    spyOn(service, 'notificationWasNotTapped');
    FCMSpy.onNotification.and.returnValue(
      of({
        aps: {
          alert: {
            title: 'New article published',
            body: 'Please click to open the app and read this article',
            message_title: 'iOS Title',
            message_body: 'iOS body',
          },
        },
        'gcm.notification.priority': 'high',
        'google.c.sender.id': '(999999999)',
        'google.c.a.e': '1',
        'gcm.message_id': '1587005840718959',
        wasTapped: false,
      }),
    );
    service.listenerPush();
    tick();

    expect(FCMSpy.requestPushPermissionIOS).toHaveBeenCalled();
    expect(service.notificationWasNotTapped).toHaveBeenCalledWith(undefined, 'iOS Title', 'iOS body');
  }));

  it('should listen to the push and display message for ios when tapped', fakeAsync(() => {
    spyOn(service, 'notificationWasTapped');
    FCMSpy.onNotification.and.returnValue(
      of({
        aps: {
          alert: {
            title: 'New article published',
            body: 'Please click to open the app and read this article',
            message_title: 'iOS Title',
            message_body: 'iOS body',
          },
        },
        'gcm.notification.priority': 'high',
        'google.c.sender.id': '(999999999)',
        'google.c.a.e': '1',
        'gcm.message_id': '1587005840718959',
        wasTapped: true,
      }),
    );
    service.listenerPush();
    tick();

    expect(service.notificationWasTapped).toHaveBeenCalledWith(undefined, 'iOS Title', 'iOS body');
  }));

  it('should listen to the push and display message for android when tapped', fakeAsync(() => {
    platformSpy.is.and.returnValue(false);
    spyOn(service, 'notificationWasTapped');
    FCMSpy.onNotification.and.returnValue(
      of({
        wasTapped: true,
        title: 'New article published',
        body: 'Please click to open the app and read this article',
        message_title: 'Android Title',
        message_body: 'Android body',
      }),
    );
    service.listenerPush();
    tick();

    expect(service.notificationWasTapped).toHaveBeenCalledWith(undefined, 'Android Title', 'Android body');
  }));

  it('should listen to the push and display message for android', fakeAsync(() => {
    platformSpy.is.and.returnValue(false);
    spyOn(service, 'notificationWasNotTapped');
    FCMSpy.onNotification.and.returnValue(
      of({
        wasTapped: false,
        title: 'New article published',
        body: 'Please click to open the app and read this article',
        message_title: 'Android Title',
        message_body: 'Android body',
      }),
    );
    service.listenerPush();
    tick();

    expect(service.notificationWasNotTapped).toHaveBeenCalledWith(undefined, 'Android Title', 'Android body');
  }));

  it('should present alert if tapped and no content id', fakeAsync(() => {
    service.notificationWasTapped(undefined, 'Title', 'Body');
    tick();

    expect(alertSvcSpy.presentAlert).toHaveBeenCalledWith('Title', '', 'Body', 'Dismiss');
  }));

  it('should present alert if tapped and has content id', fakeAsync(() => {
    service.notificationWasTapped('1', 'Title', 'Body');
    tick();

    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/tabs/home');
  }));

  it('should present alert if tapped and navigate if has content id ,user on home page and user wants to see', fakeAsync(() => {
    routerSpy = jasmine.createSpyObj('router', { navigateByUrl: Promise.resolve() }, { url: '/tabs/home' });
    service = new PushNotificationService(
      FCMSpy,
      appVersionSpy,
      deviceSpy,
      platformSpy,
      alertSvcSpy,
      connectSvcSpy,
      storageSpy,
      routerSpy,
    );
    service.notificationWasTapped('1', 'Title', 'Body');
    tick();

    expect(alertSvcSpy.presentConfirmation).toHaveBeenCalledWith('Title', '', 'Body');
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/preview/1');
  }));

  it('should present alert if tapped and not navigate if has content id ,user on home page and user does not want to see', fakeAsync(() => {
    routerSpy = jasmine.createSpyObj('router', { navigateByUrl: Promise.resolve() }, { url: '/tabs/home' });
    alertSvcSpy = jasmine.createSpyObj(AlertService.name, {
      presentAlert: Promise.resolve(),
      presentConfirmation: Promise.resolve({ option: false }),
    });
    service = new PushNotificationService(
      FCMSpy,
      appVersionSpy,
      deviceSpy,
      platformSpy,
      alertSvcSpy,
      connectSvcSpy,
      storageSpy,
      routerSpy,
    );
    service.notificationWasTapped('1', 'Title', 'Body');
    tick();

    expect(alertSvcSpy.presentConfirmation).toHaveBeenCalledWith('Title', '', 'Body');
    expect(routerSpy.navigateByUrl).not.toHaveBeenCalledWith('/preview/1');
  }));

  it('should present alert if not tapped and not navigate if has content id ,user on home page and user does not want to see', fakeAsync(() => {
    routerSpy = jasmine.createSpyObj('router', { navigateByUrl: Promise.resolve() }, { url: '/tabs/home' });
    alertSvcSpy = jasmine.createSpyObj(AlertService.name, {
      presentAlert: Promise.resolve(),
      presentConfirmation: Promise.resolve({ option: false }),
    });
    service = new PushNotificationService(
      FCMSpy,
      appVersionSpy,
      deviceSpy,
      platformSpy,
      alertSvcSpy,
      connectSvcSpy,
      storageSpy,
      routerSpy,
    );
    service.notificationWasNotTapped('1', 'Title', 'Body');
    tick();

    expect(alertSvcSpy.presentConfirmation).toHaveBeenCalledWith('Title', '', 'Body');
    expect(routerSpy.navigateByUrl).not.toHaveBeenCalledWith('/preview/1');
  }));

  it('should present alert if not tapped and not navigate if has content id ,user on home page and user wants to see', fakeAsync(() => {
    routerSpy = jasmine.createSpyObj('router', { navigateByUrl: Promise.resolve() }, { url: '/tabs/home' });
    service = new PushNotificationService(
      FCMSpy,
      appVersionSpy,
      deviceSpy,
      platformSpy,
      alertSvcSpy,
      connectSvcSpy,
      storageSpy,
      routerSpy,
    );
    service.notificationWasNotTapped('1', 'Title', 'Body');
    tick();

    expect(alertSvcSpy.presentConfirmation).toHaveBeenCalledWith('Title', '', 'Body');
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/preview/1');
  }));

  it('should present alert if not tapped and no content id', fakeAsync(() => {
    service.notificationWasNotTapped(undefined, 'Title', 'Body');
    tick();

    expect(alertSvcSpy.presentAlert).toHaveBeenCalledWith('Title', '', 'Body', 'Dismiss');
  }));
});
