import { Injectable } from '@angular/core';
import { Platform, normalizeURL } from 'ionic-angular';

@Injectable()
export class ToolService {

  constructor(
    private platform: Platform
  ) { }

  // 验证邮箱
  isEmail(email: string): boolean {
    return /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i
      .test(email);
  }

  // 验证url
  isUrl(url: string): boolean {
    return url.startsWith('https://') || url.startsWith('http://');
  }

  // jpeg、png、gif格式的图片的dataURL
  isDataURL(dataURL: string): boolean {
    return /^data:image\/(jpeg|png|gif);base64,/ig.test(dataURL);
  }

  // blob转DataURL
  blobToDataURL(blob: Blob): Promise<string> {

    return new Promise((resolve, reject) => {

      let fileReader = new FileReader();
      fileReader.readAsDataURL(blob);
      fileReader.onload = (e: any) => {
        resolve(e.target.result);
        fileReader = null;
      };

      fileReader.onerror = err => {
        console.error(err);
        reject(`文件加载错误:${err}`);
        fileReader = null;
      };

    });

  }


  // 读取图片路径转换成DataURL
  async imgPathToDataURL(path: string, type: 'image/png' | 'image/jpeg' = 'image/png'): Promise<string> {

    const url = normalizeURL(path);

    let img = await this.readImg(url);

    let canvas = <HTMLCanvasElement>document.createElement('CANVAS');

    canvas.height = img.height;
    canvas.width = img.width;

    const ctx = canvas.getContext('2d');

    ctx.drawImage(img, 0, 0);
    img = null;

    const dataURL = canvas.toDataURL(type);
    canvas = null;


    return dataURL;
  }

  // dataURL转blob
  dataURLtoBlob(dataURL: string): Blob {

    const arr = dataURL.split(',');

    const bstr = atob(arr[1]);

    let n = bstr.length;

    const u8arr = new Uint8Array(n);


    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    };

    const type = arr[0].match(/:(.*?);/)[1];

    return new Blob([u8arr], { type });
  }


  // 读取图片
  readImg(path: string): Promise<HTMLImageElement> {

    return new Promise((resolve, reject) => {

      const url = normalizeURL(path);

      let img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        resolve(img);
        img = null;
      };
      img.onerror = () => {
        reject(`圖片加載失敗：${url}`);
        img = null;
      };
      img.src = url;
    });
  }


  // 生成一個文件名
  generateFileName(blob?: Blob): string {
    const myDate = new Date();

    // 读取blob的文件的类型
    const suffix = blob ? blob.type.split('/')[1] : '';

    const fileName =
      `${myDate.getFullYear()}-${(myDate.getMonth() + 1)}-${myDate.getDate()}_${myDate.getHours()}-${myDate.getMinutes()}-${myDate.getMilliseconds()}-${Math.floor(Math.random() * 100)}`;


    return suffix ? `${fileName}.${suffix}` : fileName;


  }



  // 读取图片路径,转换成blob
  async imgPathToBlob(path: string): Promise<Blob> {

    const url = normalizeURL(path);

    const dataUrl = await this.imgPathToDataURL(url);

    return this.dataURLtoBlob(dataUrl);
  }

  // 判断是不是真机或者模拟器环境
  isDevice(): boolean {
    return this.platform.is('mobile') && !this.platform.is('mobileweb');
  }

  // android设备
  isAndroidDevice(): boolean {
    return this.isDevice() && this.platform.is('android');
  }

  // ios设备
  isIosDevice(): boolean {
    return this.isDevice() && this.platform.is('ios');
  }




}
