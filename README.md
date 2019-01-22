# 一个ionic3 基础框架

<p align="center">
   <img width="400" src="https://github.com/hwenlong/ionic-demo/blob/master/src/assets/demo/home.png">
   <img width="400" src="https://github.com/hwenlong/ionic-demo/blob/master/src/assets/demo/calendar.png">
</p>

# 包含模块

- 图片预览
- 二维码扫描
- 地理位置展示
- 日程表

## 图片预览

### 概述

全屏显示图片，滑动切换、对图片放大、平移。

### 依赖

在index.html引入Swiper

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.2.2/js/swiper.min.js"></script>
```

### 用法

```typescript

import { NavController } from 'ionic-angular';

constructor(private navCtrl: NavController) {}

goPhotoViewer() {
  this.navCtrl.push('PhotoViewerPage', {
    picturePaths: [
      'assets/imgs/1.jpg',
      'assets/imgs/2.jpg',
      'assets/imgs/3.jpg',
      'assets/imgs/4.jpg'
    ],
    initialSlide: 0
  });
}

```
### 参数说明
| Name         | Type     | Default   | Description  |
| -----        | -----    | --------- | -----------  |
| picturePaths | string[] | []        | 图片的地址     |
| initialSlide | number   | 0         | 初始化显示图片的下标|

### 效果预览

<p align="center">
   <img width="400" src="https://github.com/hwenlong/ionic-demo/blob/master/src/assets/demo/photo-viewer1.png">
   <img width="400" src="https://github.com/hwenlong/ionic-demo/blob/master/src/assets/demo/photo-viewer2.png">
</p>

## 二维码扫描

### 概述

通过摄像头扫描二维码，可以使用闪光灯

### 依赖

安装QR Scanner插件，详细[文档](https://ionicframework.com/docs/native/qr-scanner/)

```bash

ionic cordova plugin add cordova-plugin-qrscanner

npm install --save @ionic-native/qr-scanner

```

在app.scss添加

```scss
.scanner {
  background: none transparent !important;

  [app-viewport],
  [overlay-portal],
  [nav-viewport],
  [tab-portal],
  .nav-decor {
    display: none !important;
    background: none transparent !important;
  }

  ion-app.ios {
    background: none transparent !important;
  }
}
```



### 用法

```typescript

import { NavController, Events } from 'ionic-angular';

constructor(private navCtrl: NavController, private events: Events) {}

scanner() {
  this.navCtrl.push('ScannerPage');
  this.events.subscribe('scan-completed', code => {
    if (code) console.log(code);
  });
}

```
