// rxJS操作符
import './rxjs/rxjs-operators';

import { NgModule, SkipSelf, Optional } from '@angular/core';
import { ActionSheetService } from './common/action-sheet.service';
import { AlertService } from './common/alert.service';
import { BackService } from './common/back.service';
import { LoadingService } from './common/loading.service';
import { ModalService } from './common/modal.service';
import { PopoverService } from './common/popover.service';
import { ToastService } from './common/toast.service';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ToolService } from './common/tool.service';
import { IsDebug } from '@ionic-native/is-debug';
import { Camera } from '@ionic-native/camera';
import { ImageResizer } from '@ionic-native/image-resizer';
import { QRScanner } from '@ionic-native/qr-scanner';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { MobileAccessibility } from '@ionic-native/mobile-accessibility';


//native插件
const NATIVE = [
  StatusBar,
  SplashScreen,
  IsDebug,
  Camera,
  ImageResizer,
  QRScanner,
  ScreenOrientation,
  MobileAccessibility
];


// 常用的
const COMMON = [
  ActionSheetService,
  AlertService,
  BackService,
  LoadingService,
  ModalService,
  PopoverService,
  ToastService,
  ToolService
];


// 核心的服務
@NgModule({
  providers: [
    ...NATIVE,
    ...COMMON
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() module: CoreModule) {
    if (module) {
      throw new Error(`CoreModule 已经在 AppModule 导入`);
    }
  }
}
