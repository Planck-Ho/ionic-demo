# ionic2/3 完美处理安卓返回键

## 概述

预处理点击返回键关闭键盘、返回上一页、最小化 app，然后进一步处理 ActionSheet、Alert、Menu 、Select 等打开的时候的问题

## 安装

1. 把 <font color="green">demo/src/core/common/back.service.ts</font> 文件拷贝到到你的项目中 [demo 地址](https://github.com/hamal-ho/ionic-demo)

2. 安装 [App Minimize](https://ionicframework.com/docs/native/app-minimize/) 插件

```bash
ionic cordova plugin add cordova-plugin-appminimize

npm install --save @ionic-native/app-minimize
```

3. 在你的项目 <font color="green">app.module.ts</font> 添加 <font color="green">BackService</font> 和 <font color="green">AppMinimize</font> 供应商

```typescript

import { AppMinimize } from '@ionic-native/app-minimize';

import { BackService } from ...;

@NgModule({
  declarations: [
    ...
  ],
  imports: [
    ...
  ],
  providers: [
    AppMinimize,
    BackService
  ]
})
export class AppModule { }
```

## 使用

有些项目的第一页不是 Tabs，而是需要登录后，才跳转到 Tabs，所有我们需要在两个地方写预处理，首先给 <font color="green">MyApp</font> 添加预处理方法，然后给 <font color="green">Tabs</font> 添加预处理

### 预处理

#### 给 MyApp 添加预处理方法

在 <font color="green">app.html</font> 添加模板变量 <font color="green">#myContent</font>

```html
<ion-nav [root]="rootPage" #myContent></ion-nav>
```

在 <font color="green">app.component.ts</font> 添加以下代码

```typescript
import { Platform, Keyboard, NavController } from 'ionic-angular';
import { AppMinimize } from '@ionic-native/app-minimize';
import { BackService } from ...;

export class MyApp {
  @ViewChild('myContent')
  navCtrl: NavController;

  constructor(
    private platform: Platform,
    private keyboard: Keyboard,
    private appMinimize: AppMinimize,
    private backService: BackService
  ) {
    platform.ready().then(() => {
      ...
      this.registerBack();
    });
  }

  // 注册返回键
  private registerBack() {
    this.platform.registerBackButtonAction(() => {
      if (this.keyboard.isOpen()) {
        // 关闭键盘
        this.keyboard.close();
      } else if (this.backService.state) {
        // 触发自定义返回事件
        this.backService.publish();
      } else if (this.navCtrl.canGoBack()) {
        // 返回上一页
        this.navCtrl.pop();
      } else {
        // 最小化app
        this.appMinimize.minimize();
      }
    }, 101);
  }
}
```

#### 给 Tabs 添加预处理方法

在 <font color="green">tabs.ts</font> 添加以下代码

```typescript
import { Component, ViewChild } from '@angular/core';
import {
  IonicPage,
  NavController,
  Platform,
  Keyboard,
  Tabs
} from 'ionic-angular';
import { AppMinimize } from '@ionic-native/app-minimize';
import { BackService } from ...;

...

export class TabsPage {

  ...

  @ViewChild(Tabs)
  tabs: Tabs;

  constructor(
    private navCtrl: NavController,
    private platform: Platform,
    private keyboard: Keyboard,
    private appMinimize: AppMinimize,
    private backService: BackService
  ) {}

  ionViewDidLoad() {
    this.registerBack();
  }

  // 注册返回键
  private registerBack() {
    this.platform.registerBackButtonAction(() => {
      // 关闭键盘
      if (this.keyboard.isOpen()) {
        return this.keyboard.close();
      }

      // 触发自定义返回事件
      if (this.backService.state) {
        return this.backService.publish();
      }

      const activeVC = this.navCtrl.getActive();
      const page = activeVC.instance;

      if (!(page instanceof TabsPage)) {
        if (!this.navCtrl.canGoBack()) {
          // 最小化app
          return this.appMinimize.minimize();
        }

        return this.navCtrl.pop();
      }

      const tabs = page.tabs;
      const activeNav = tabs.getSelected();

      if (!activeNav.canGoBack()) {
        // 关闭Menu
        if (this.menuCtrl.isOpen()) {
          return this.menuCtrl.close();
        }

        // 最小化app
        return this.appMinimize.minimize();
      }

      return activeNav.pop();
    }, 102);
  }
}
```

### 进一步处理

通过重载 ActionSheet、Alert、Loading、Modal、Popover 等的 create 方法来监听返回键。

#### ActionSheet

1. 创建一个 <font color="green">action-sheet.service.ts</font>，然后添加一下代码

```typescript
import { Injectable } from '@angular/core';
import {
  ActionSheetController,
  ActionSheet,
  ActionSheetOptions
} from 'ionic-angular';
import { BackService } from './back.service';

@Injectable()
export class ActionSheetService {
  constructor(
    private actionSheetCtrl: ActionSheetController,
    private backService: BackService
  ) {}

  create(options?: ActionSheetOptions): ActionSheet {
    const actionSheet = this.actionSheetCtrl.create(options);

    // onWillDismiss的时候，取消订阅返回键
    actionSheet.onWillDismiss(() => {
      this.backService.unsubscribe();
    });

    this.backService.subscribe(() => {
      // 点击返回键，关闭
      actionSheet.dismiss();
    });

    return actionSheet;
  }
}
```

2. 在你的项目 <font color="green">app.module.ts</font> 添加 <font color="green">ActionSheetService</font> 供应商

```typescript

import { ActionSheetService } from ...;

@NgModule({
  declarations: [
    ...
  ],
  imports: [
    ...
  ],
  providers: [
    ActionSheetService
  ]
})
export class AppModule { }
```

3. 调用 ActionSheet 的地方，把 <font color="green">AlertController</font> 改成 <font color="green">ActionSheetService</font> 即可

```typescript
import { ActionSheetService } from ...;

export class MyPage {
  constructor(
    private alertCtrl:ActionSheetService
  ) {}


  presentActionSheet() {
    const actionSheet = this.alertCtrl.create({
      title: 'ActionSheet',
      buttons: [
        ...
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            ...
          }
        }
      ]
    });

     actionSheet.onDidDismiss(() => {
      ...
    });

    actionSheet.present();
  }
```

<font color="green">Alert、Loading、Modal、Popover</font>的实现方法跟 ActionSheet 一样

### 特殊处理

使用<font color="green">ion-select</font>和<font color="green">ion-datetime</font>需要做特殊处理。

#### ion-select

