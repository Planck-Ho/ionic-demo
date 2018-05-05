import { Injectable, EventEmitter } from '@angular/core';
import { Keyboard as _Keyboard } from 'ionic-angular';
import { ToolService } from '../common/tool.service';


/*
  详细信息：https://github.com/ionic-team/cordova-plugin-ionic-keyboard
  安装：ionic cordova plugin add cordova-plugin-ionic-keyboard --save
  config.json配置： <preference name="KeyboardDisplayRequiresUserAction" value="false"/>
                   <preference name="KeyboardResize" value="true" />
                   <preference name="KeyboardResizeMode" value="ionic" />
 */

declare var Keyboard;

@Injectable()
export class KeyboardService {

  didShow = new EventEmitter<number>();

  willShow = new EventEmitter<number>();

  didHide = new EventEmitter<void>();

  willHide = new EventEmitter<void>();





  constructor(
    private keyboard: _Keyboard,
    private toolService: ToolService
  ) {

    if (this.toolService.isDevice()) {
      this.init();
    }
  }


  // 检测键盘是否弹出
  isOpen(): boolean {


    if (this.toolService.isDevice()) {
      return Keyboard.isVisible;

    } else {
      return this.keyboard.isOpen();
    }



  }

  // 隐藏键盘
  hide() {
    if (this.toolService.isDevice()) {
      Keyboard.hide();
    }
  }

  // 显示键盘
  show() {

    if (this.toolService.isDevice()) {
      Keyboard.show();
    }
  }

  private init() {


    window.addEventListener('keyboardDidHide', () => {
      this.didHide.emit();
    });

    window.addEventListener('keyboardDidShow', (ev: any) => {
      this.didShow.emit(ev.keyboardHeight);
    });

    window.addEventListener('keyboardWillShow', (ev: any) => {

      this.willShow.emit(ev.keyboardHeight);

    });
    window.addEventListener('keyboardWillHide', () => {

      this.willHide.emit();

    });

  }







}
