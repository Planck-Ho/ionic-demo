import { Component, ViewChild } from '@angular/core';
import { Platform, Keyboard, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ToolService } from '../core/common/tool.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { BackService } from '../core/common/back.service';
import { AppMinimize } from '@ionic-native/app-minimize';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: string = 'TabsPage';

  @ViewChild('myContent')
  navCtrl: NavController;

  constructor(
    private platform: Platform,
    private keyboard: Keyboard,
    private backService: BackService,
    private appMinimize: AppMinimize,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    toolService: ToolService,
    screenOrientation: ScreenOrientation
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      if (platform.is('android')) {
        statusBar.backgroundColorByHexString('#000000');
      } else {
        statusBar.styleDefault();
      }

      splashScreen.hide();

      if (toolService.isDevice()) {
        // 锁定字体缩放
        // mobileAccessibility.usePreferredTextZoom(false);

        // 锁定竖屏
        screenOrientation.lock(screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY);
      }

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
