import { Injectable } from '@angular/core';
import { Platform, normalizeURL } from 'ionic-angular';

@Injectable()
export class ToolService {
  constructor(private platform: Platform) {}

  // 验证邮箱
  isEmail(email: string): boolean {
    return /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i.test(
      email
    );
  }

  // 验证url
  isUrl(url: string): boolean {
    return url.startsWith('https://') || url.startsWith('http://');
  }

  // jpeg、png、gif格式的图片的dataURL
  isDataURL(dataURL: string): boolean {
    return /^data:image\/(jpeg|png|gif);base64,/gi.test(dataURL);
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
  async imgPathToDataURL(
    path: string,
    type: 'image/png' | 'image/jpeg' = 'image/png'
  ): Promise<string> {
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
    }

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

    const fileName = `${myDate.getFullYear()}-${myDate.getMonth() +
      1}-${myDate.getDate()}_${myDate.getHours()}-${myDate.getMinutes()}-${myDate.getMilliseconds()}-${Math.floor(
      Math.random() * 100
    )}`;

    return suffix ? `${fileName}.${suffix}` : fileName;
  }

  // 路径转换
  toFileUri(path: string): string {
    return path.startsWith('file://') ? path : `file://${path}`;
  }

  getFileName(path: string, haveSuffix: boolean = true): string {
    const p = path.split(/\//);
    const fileName = p[p.length - 1];
    const name = fileName.split('.')[0];
    return haveSuffix ? fileName : name;
  }

  // 获取文件后缀
  getFileSuffix(path: string): string {
    const index1 = path.lastIndexOf('.');
    const index2 = path.length;
    return path.substring(index1 + 1, index2);
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

  async imageResizer(
    source: any,
    parame?: {
      quality?: number;
      resultType?: 'blob' | 'dataURL';
      maxSize: number;
    }
  ): Promise<any> {
    let path: string;

    const options = {
      quality: 0.9,
      resultType: 'blob',
      maxSize: 480
    };

    Object.assign(options, parame);

    if (source instanceof Blob) {
      path = await this.blobToDataURL(source);
    } else {
      path = source;
    }

    let img = await this.readImg(path);

    let targetWidth: number;

    let targetHeight: number;

    // 图片比例
    const ratio = img.width / img.height;

    targetWidth = img.width > options.maxSize ? options.maxSize : img.width;

    targetHeight = +(targetWidth / ratio).toFixed(0);

    let canvas = <HTMLCanvasElement>document.createElement('CANVAS'),
      ctx = canvas.getContext('2d');

    canvas.width = targetWidth;
    canvas.height = targetHeight;

    ctx.clearRect(0, 0, targetWidth, targetHeight);
    // 图片压缩
    ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

    // 检测有没有透明数据
    const imageData = ctx.getImageData(0, 0, targetWidth, targetHeight).data;
    let isAlphaBackground = false;
    let length = imageData.length;
    for (let index = 3; index < length; index += 4) {
      if (imageData[index] !== 255) {
        isAlphaBackground = true;
        break;
      }
    }

    // 透明為png、不透明轉換成jng
    const type = isAlphaBackground ? 'image/png' : 'image/jpeg';

    const dataURL = canvas.toDataURL(type, options.quality);
    canvas = img = ctx = null;

    if (options.resultType === 'blob') {
      return this.dataURLtoBlob(dataURL);
    } else {
      return dataURL;
    }
  }
}
