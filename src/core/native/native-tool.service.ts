import { ToolService } from './../common/tool.service';
import { Injectable } from '@angular/core';
import { IsDebug } from '@ionic-native/is-debug';
import { ActionSheetService } from '../common/action-sheet.service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { normalizeURL } from 'ionic-angular';

@Injectable()
export class NativeToolService {
  constructor(
    private _isDebug: IsDebug,
    private toolService: ToolService,
    private actionSheetService: ActionSheetService,
    private camera: Camera
  ) {}

  // 是否是debug模式
  async isDebug(): Promise<boolean> {
    if (this.toolService.isDevice()) {
      return this._isDebug.getIsDebug();
    } else {
      return true;
    }
  }

  // 選擇圖片來源
  selectPictureSource(): Promise<number> {
    return new Promise((resolve, reject) => {
      let source: number = -1;

      const actionSheet = this.actionSheetService.create({
        title: '圖片來源',
        buttons: [
          {
            text: '相冊',
            icon: 'ios-images-outline',
            handler: () => {
              source = this.camera.PictureSourceType.PHOTOLIBRARY;
            }
          },
          {
            text: '相機',
            icon: 'ios-camera-outline',
            handler: () => {
              source = this.camera.PictureSourceType.CAMERA;
            }
          },
          {
            text: '取消',
            role: 'cancel'
          }
        ]
      });

      actionSheet.onDidDismiss(() => {
        if (source < 0) {
          reject('取消');
        } else {
          resolve(source);
        }
      });

      actionSheet.present();
    });
  }

  //  获取照片
  async getPicture(cameraOptions: CameraOptions): Promise<string> {
    const options: CameraOptions = {
      quality: 90,
      correctOrientation: true
    };

    Object.assign(options, cameraOptions);

    // 獲取到圖片路徑
    const path: string = await this.camera.getPicture(options);

    return normalizeURL(path);
  }


}
