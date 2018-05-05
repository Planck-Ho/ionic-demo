import { ToolService } from './../common/tool.service';
import { Injectable } from '@angular/core';
import { IsDebug } from '@ionic-native/is-debug';
import { ActionSheetService } from '../common/action-sheet.service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { normalizeURL } from 'ionic-angular';
import { ImageResizerOptions, ImageResizer } from '@ionic-native/image-resizer';

@Injectable()
export class NativeToolService {

  constructor(
    private _isDebug: IsDebug,
    private toolService: ToolService,
    private actionSheetService: ActionSheetService,
    private camera: Camera,
    private _imageResizer: ImageResizer
  ) { }

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



  // 裁剪图片,返回文件url或者Blob
  async imageResizer(path: string, destinationType: 'URL' | 'Blob' = 'URL'): Promise<any> {


    const uri = normalizeURL(path);

    let img = await this.toolService.readImg(uri);

    let width: number;

    let height: number;


    // 图片比例
    const ratio = img.width / img.height;


    // 横着的图片
    if (ratio > 1) {

      width = img.width > 1280 ? 1280 : img.width;

      // 竖着的图片
    } else if (ratio < 1) {

      width = img.width > 960 ? 960 : img.width;

      // 正方形图片
    } else if (ratio === 1) {

      width = img.width > 1000 ? 1000 : img.width;

    }

    height = + (width / ratio).toFixed(0);





    img = null;


    const fileName = `${this.toolService.generateFileName()}.png`;



    const options: ImageResizerOptions = {
      uri,
      width,
      height,
      quality: 90,
      folderName: 'gourmet_shop',
      fileName //ios需要配置此选项
    };

    const url = await this._imageResizer.resize(options);

    return destinationType === 'URL' ? normalizeURL(url) : this.toolService.imgPathToBlob(url);

  }

}
