import { Component, ViewChild } from '@angular/core';
import {
  IonicPage,
  NavController,
  Platform,
  Keyboard,
  Tabs,
  MenuController
} from 'ionic-angular';
import { AppMinimize } from '@ionic-native/app-minimize';
import { BackService } from '../../core/common/back.service';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild(Tabs)
  tabs: Tabs;

  tab1Root: string = 'HomePage';
  tab2Root: string = 'CalendarSlidesPage';

  constructor(
    private navCtrl: NavController,
    private platform: Platform,
    private keyboard: Keyboard,
    private appMinimize: AppMinimize,
    private backService: BackService,
    private menuCtrl: MenuController
  ) {}

  ionViewDidLoad() {
    this.registerBack();
  }

  // 注册返回键
  private registerBack(): any {
    this.platform.registerBackButtonAction((): any => {
      if (this.keyboard.isOpen()) {
        return this.keyboard.close();
      }

      console.log(this.backService.state, '=this.backService.state');

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
