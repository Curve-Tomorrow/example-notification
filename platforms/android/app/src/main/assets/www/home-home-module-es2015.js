(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["home-home-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/home/home.page.html":
/*!***************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/home/home.page.html ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header [translucent]=\"true\">\r\n  <ion-toolbar>\r\n    <ion-title> Example Notifications </ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content [fullscreen]=\"true\">\r\n  <ion-header collapse=\"condense\">\r\n    <ion-toolbar>\r\n      <ion-title size=\"large\">Example Notifications</ion-title>\r\n    </ion-toolbar>\r\n  </ion-header>\r\n\r\n  <div id=\"container\" class=\"ion-padding\">\r\n    <form #form=\"ngForm\">\r\n      <ion-list>\r\n        <ion-item>\r\n          <ion-label>Number of Notifications</ion-label>\r\n          <ion-input\r\n            name=\"numOfNotifications\"\r\n            type=\"number\"\r\n            step=\"1\"\r\n            min=\"1\"\r\n            max=\"100\"\r\n            required\r\n            [(ngModel)]=\"numOfNotifications\"\r\n          ></ion-input>\r\n        </ion-item>\r\n        <ion-item>\r\n          <ion-label>Interval in minutes</ion-label>\r\n          <ion-input\r\n            name=\"intervalInMinutes\"\r\n            type=\"number\"\r\n            step=\"1\"\r\n            min=\"1\"\r\n            required\r\n            [(ngModel)]=\"intervalInMinutes\"\r\n          ></ion-input>\r\n        </ion-item>\r\n        <ion-item>\r\n          <ion-label>Priority</ion-label>\r\n          <ion-select\r\n            name=\"priority\"\r\n            type=\"number\"\r\n            required\r\n            [(ngModel)]=\"priority\"\r\n          >\r\n            <ion-select-option [value]=\"-2\">Min</ion-select-option>\r\n            <ion-select-option [value]=\"-1\">Low</ion-select-option>\r\n            <ion-select-option [value]=\"0\">Default</ion-select-option>\r\n            <ion-select-option [value]=\"1\">High</ion-select-option>\r\n            <ion-select-option [value]=\"2\">Max</ion-select-option>\r\n          </ion-select>\r\n        </ion-item>\r\n      </ion-list>\r\n    </form>\r\n\r\n    <ion-button\r\n      color=\"primary\"\r\n      expand=\"block\"\r\n      [disabled]=\"form.invalid || $any(form.controls.intervalInMinutes?.value) < 1 || $any(form.controls.numOfNotifications?.value) < 1\"\r\n      (click)=\"schedule()\"\r\n      >Schedule {{numOfNotifications}}</ion-button\r\n    >\r\n    <ion-button color=\"danger\" expand=\"block\" (click)=\"cancelAll()\"\r\n      >Cancel All</ion-button\r\n    >\r\n    <br /><br /><br />\r\n    <ion-button\r\n      color=\"primary\"\r\n      expand=\"block\"\r\n      (click)=\"isIgnoringBatteryOptimizations()\"\r\n      >isIgnoringBatteryOptimizations</ion-button\r\n    >\r\n    <ion-button color=\"primary\" expand=\"block\" (click)=\"requestOptimizations()\"\r\n      >requestOptimizations</ion-button\r\n    >\r\n    <ion-button\r\n      color=\"primary\"\r\n      expand=\"block\"\r\n      (click)=\"requestOptimizationsMenu()\"\r\n      >requestOptimizationsMenu</ion-button\r\n    >\r\n    <!-- <ion-button color=\"primary\" expand=\"block\" (click)=\"isIgnoringDataSaver()\"\r\n      >IsIgnoringDataSaver</ion-button\r\n    > -->\r\n    <ion-button color=\"primary\" expand=\"block\" (click)=\"requestDataSaverMenu()\"\r\n      >requestDataSaverMenu</ion-button\r\n    >\r\n    <ion-button\r\n      color=\"primary\"\r\n      expand=\"block\"\r\n      (click)=\"haveProtectedAppsCheck()\"\r\n      >haveProtectedAppsCheck</ion-button\r\n    >\r\n    <ion-button color=\"primary\" expand=\"block\" (click)=\"protectedAppCheck()\"\r\n      >protectedAppCheck</ion-button\r\n    >\r\n  </div>\r\n</ion-content>\r\n");

/***/ }),

/***/ "./src/app/home/home-routing.module.ts":
/*!*********************************************!*\
  !*** ./src/app/home/home-routing.module.ts ***!
  \*********************************************/
/*! exports provided: HomePageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePageRoutingModule", function() { return HomePageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _home_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./home.page */ "./src/app/home/home.page.ts");




const routes = [
    {
        path: '',
        component: _home_page__WEBPACK_IMPORTED_MODULE_3__["HomePage"],
    }
];
let HomePageRoutingModule = class HomePageRoutingModule {
};
HomePageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], HomePageRoutingModule);



/***/ }),

/***/ "./src/app/home/home.module.ts":
/*!*************************************!*\
  !*** ./src/app/home/home.module.ts ***!
  \*************************************/
/*! exports provided: HomePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePageModule", function() { return HomePageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _home_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./home.page */ "./src/app/home/home.page.ts");
/* harmony import */ var _home_routing_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./home-routing.module */ "./src/app/home/home-routing.module.ts");







let HomePageModule = class HomePageModule {
};
HomePageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonicModule"],
            _home_routing_module__WEBPACK_IMPORTED_MODULE_6__["HomePageRoutingModule"],
        ],
        declarations: [_home_page__WEBPACK_IMPORTED_MODULE_5__["HomePage"]],
    })
], HomePageModule);



/***/ }),

/***/ "./src/app/home/home.page.scss":
/*!*************************************!*\
  !*** ./src/app/home/home.page.scss ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("#container {\n  text-align: center;\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 50%;\n  transform: translateY(-50%);\n}\n\n#container strong {\n  font-size: 20px;\n  line-height: 26px;\n}\n\n#container p {\n  font-size: 16px;\n  line-height: 22px;\n  color: #8c8c8c;\n  margin: 0;\n}\n\n#container a {\n  text-decoration: none;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvaG9tZS9ob21lLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGtCQUFBO0VBRUEsa0JBQUE7RUFDQSxPQUFBO0VBQ0EsUUFBQTtFQUNBLFFBQUE7RUFDQSwyQkFBQTtBQUFGOztBQUdBO0VBQ0UsZUFBQTtFQUNBLGlCQUFBO0FBQUY7O0FBR0E7RUFDRSxlQUFBO0VBQ0EsaUJBQUE7RUFFQSxjQUFBO0VBRUEsU0FBQTtBQUZGOztBQUtBO0VBQ0UscUJBQUE7QUFGRiIsImZpbGUiOiJzcmMvYXBwL2hvbWUvaG9tZS5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIjY29udGFpbmVyIHtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcblxyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICBsZWZ0OiAwO1xyXG4gIHJpZ2h0OiAwO1xyXG4gIHRvcDogNTAlO1xyXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcclxufVxyXG5cclxuI2NvbnRhaW5lciBzdHJvbmcge1xyXG4gIGZvbnQtc2l6ZTogMjBweDtcclxuICBsaW5lLWhlaWdodDogMjZweDtcclxufVxyXG5cclxuI2NvbnRhaW5lciBwIHtcclxuICBmb250LXNpemU6IDE2cHg7XHJcbiAgbGluZS1oZWlnaHQ6IDIycHg7XHJcblxyXG4gIGNvbG9yOiAjOGM4YzhjO1xyXG5cclxuICBtYXJnaW46IDA7XHJcbn1cclxuXHJcbiNjb250YWluZXIgYSB7XHJcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG59Il19 */");

/***/ }),

/***/ "./src/app/home/home.page.ts":
/*!***********************************!*\
  !*** ./src/app/home/home.page.ts ***!
  \***********************************/
/*! exports provided: HomePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePage", function() { return HomePage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _services_alert_alert_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../services/alert/alert.service */ "./src/services/alert/alert.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _ionic_native_local_notifications_ngx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic-native/local-notifications/ngx */ "./node_modules/@ionic-native/local-notifications/__ivy_ngcc__/ngx/index.js");




let HomePage = class HomePage {
    constructor(localNotification, alertSvc) {
        this.localNotification = localNotification;
        this.alertSvc = alertSvc;
        this.numOfNotifications = 20;
        this.intervalInMinutes = 1;
        this.priority = 0;
    }
    schedule() {
        const now = Date.now();
        const notifications = [];
        for (let i = 0; i < this.numOfNotifications; i++) {
            const id = i + 1;
            const time = new Date(now + id * this.intervalInMinutes * 60000);
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
    cancelAll() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            yield this.localNotification.cancelAll();
        });
    }
    isIgnoringBatteryOptimizations() {
        cordova.plugins.PowerOptimization.IsIgnoringBatteryOptimizations().then((result) => {
            console.log('******' + 'isIgnoringBatteryOptimizations');
            console.log(result);
            this.alertSvc.presentAlert('', '', result, '');
        }, (err) => {
            console.error(err);
        });
    }
    requestOptimizationsMenu() {
        cordova.plugins.PowerOptimization.RequestOptimizationsMenu().then((result) => {
            console.log('******' + 'requestOptimizationsMenu');
            console.log(result);
        }, (err) => {
            console.error(err);
        });
    }
    requestOptimizations() {
        cordova.plugins.PowerOptimization.RequestOptimizations().then((result) => {
            console.log('******' + 'requestOptimizations');
            console.log(result);
        }, (err) => {
            console.error(err);
        });
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
        cordova.plugins.PowerOptimization.RequestDataSaverMenu().then((result) => {
            console.log('******' + 'requestDataSaverMenu');
            console.log(result);
        }, (err) => {
            console.error(err);
        });
    }
    haveProtectedAppsCheck() {
        cordova.plugins.PowerOptimization.HaveProtectedAppsCheck().then((result) => {
            console.log('******' + 'haveProtectedAppsCheck');
            console.log(result);
        }, (err) => {
            console.error(err);
        });
    }
    protectedAppCheck() {
        cordova.plugins.PowerOptimization.ProtectedAppCheck().then((result) => {
            console.log('******' + 'protectedAppCheck');
            console.log(result);
        }, (err) => {
            console.error(err);
        });
    }
};
HomePage.ctorParameters = () => [
    { type: _ionic_native_local_notifications_ngx__WEBPACK_IMPORTED_MODULE_3__["LocalNotifications"] },
    { type: _services_alert_alert_service__WEBPACK_IMPORTED_MODULE_1__["AlertService"] }
];
HomePage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
        selector: 'app-home',
        template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./home.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/home/home.page.html")).default,
        styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./home.page.scss */ "./src/app/home/home.page.scss")).default]
    })
], HomePage);



/***/ })

}]);
//# sourceMappingURL=home-home-module-es2015.js.map