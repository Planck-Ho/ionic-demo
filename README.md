# ionic2/3 demo

> 这个 demo 包含一些常用的模块：图片预览、二维码扫描、地理位置展示、日程表，还有实战中会用到的指令、管道、工具函数。

<!-- - 包含模块：图片预览、二维码扫描、地理位置展示、日程表。 -->
<!-- - 实战经验：  [处理安卓返回键](https://juejin.im/post/5c4963af6fb9a049b5072b1b)、实现页面主动下拉刷新、压缩图片/视频文件等 -->

## 效果预览

 <p align="center">
   <img width="400" src="https://github.com/hamal-ho/ionic-demo/blob/master/src/assets/demo/home.png">
   <img width="400" src="https://github.com/hamal-ho/ionic-demo/blob/master/src/assets/demo/calendar.png">
 </p>

## 扫一扫下载 App

 <img width="200" src="https://github.com/hamal-ho/ionic-demo/blob/master/src/assets/demo/1548386580.png">

## 经验分享

- [安卓返回键的处理](https://juejin.im/post/5c4963af6fb9a049b5072b1b)
- [自动下拉刷新](https://juejin.im/post/5c4ac97ef265da61171d117e)
- 压缩图片
- 压缩视频文件

# 模块

- [日程表](#calendar)
- [图片预览](#photoViewer)
- [二维码扫描](#scanner)
- [地理位置展示](#positionViewer)

# <span id="calendar">日程表</span>

## 概述

一个日历组件，滑动切换、日期跳转、显示日程安排

### 页面预览

<p align="center">
   <img width="400" src="https://github.com/hamal-ho/ionic-demo/blob/master/src/assets/demo/calendar.png">
   <img width="400" src="https://github.com/hamal-ho/ionic-demo/blob/master/src/assets/demo/calendar-gf.gif">
</p>

### 安装

1. 把 <font color="green">demo/src/calendar</font> 模块拷贝到你的 <font color="green">project/src</font> 目录下

2. 安装 momentjs

```bash
npm install moment --save
```

### 用法

在页面模块中引入 CalendarModule 到模块

```typescript
import { NgModule } from '@angular/core';
import { CalendarModule } from '../../calendar/calendar.module';

@NgModule({
  declarations: [
    ...
  ],
  imports: [
    CalendarModule
  ]
})
export class MyPageModule {}
```

#### 基本

```html
<calendar [(ngModel)]="date" (onChange)="changeDate($event)"></calendar>
```

```typescript
export class MyPage {
  date: string;

  constructor() {}

  changeDate(date: string) {
    console.log(date, '当前日期');
  }
}
```

#### 显示日程

```html
<calendar
  [(ngModel)]="date"
  (onChange)="changeDate($event)"
  [schedules]="mockSchedules"
></calendar>

<h5 *ngIf="hasSchedule">{{date}}有日程</h5>
```

```typescript
import * as moment from 'moment';

export class MyPage {
  date: string;

  mockSchedules: Schedule[] = [];

  get hasSchedule(): boolean {
    return this.mockSchedules.some(item => item.date === this.date);
  }

  constructor() {}

  ngOnInit() {
    const date = moment().subtract('d', 1);
    const colors = ['#488aff', '#32db64', '#f53d3d', '#222'];
    for (let i = 0; i < 10; i++) {
      const index = Math.floor(Math.random() * 4);
      this.mockSchedules.push({
        date: date.add('d', 1).format('YYYY-MM-DD'),
        color: colors[index]
      });
    }
  }

  changeDate(date: string) {
    console.log(date, '当前日期');
  }
}
```

#### 日期跳转

```html
<calendar [(ngModel)]="date" (onChange)="changeDate($event)"></calendar>

<button ion-button (click)="today()">今天</button>

<button ion-button (click)="selectDate()">日期跳转</button>
```

```typescript
import { CalendarController } from '../../calendar/calendar-controller';

export class MyPage {
  date: string;

  constructor(private calendarCtrl: CalendarController) {}

  today() {
    this.date = moment().format('YYYY-MM-DD');
  }

  selectDate() {
    this.calendarCtrl.selectDate();
  }

  changeDate(date: string) {
    console.log(date, '当前日期');
  }
}
```

#### 输入属性

| Name         | Type       | Default | Description  |
| ------------ | ---------- | ------- | ------------ |
| schedules    | Schedule[] | null    | 日程安排数据 |
| startWeekDay | StartDate  | Sunday  | 一周的开始日 |

#### 输出事件

| Name     | Description              |
| -------- | ------------------------ |
| onChange | 日期改变的时候触发的事件 |
| onTap    | 点击当前日期触发的事件   |

#### Schedule

| Name  | Type   | Default | Description              |
| ----- | ------ | ------- | ------------------------ |
| date  | string | 无      | 日程时间 YYYY-MM-DD 格式 |
| color | string | 无      | 日程标记颜色 如：#488aff |

#### StartDate

一周的开始日，取值 Sunday 或者 Monday

# <span id="photoViewer">图片预览</span>

### 概述

全屏显示图片，滑动切换、对图片放大、平移。

### 页面预览

<p align="center">
   <img width="400" src="https://github.com/hamal-ho/ionic-demo/blob/master/src/assets/demo/photo-viewer1.png">
   <img width="400" src="https://github.com/hamal-ho/ionic-demo/blob/master/src/assets/demo/photo-viewer2.png">
</p>

### 安装

1. 把 <font color="green">demo/src/pages/photo-viewer</font> 模块拷贝到你的 <font color="green">project/src/pages</font> 目录下

2. 在 index.html 引入 Swiper

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

### 参数说明

| Name         | Type     | Default | Description          |
| ------------ | -------- | ------- | -------------------- |
| picturePaths | string[] | []      | 图片的地址           |
| initialSlide | number   | 0       | 初始化显示图片的下标 |

## <span id="scanner">二维码扫描</span>

### 概述

使用摄像头扫描二维码，可以使用闪光灯。

### 页面预览

<p align="center">
   <img width="400" src="https://github.com/hamal-ho/ionic-demo/blob/master/src/assets/demo/scanner.png">
</p>

### 安装

1. 把 <font color="green">demo/src/pages/scanner</font> 模块拷贝到你的 <font color="green">project/src/pages</font> 目录下。

2. 安装 QR Scanner 插件，详细[文档](https://ionicframework.com/docs/native/qr-scanner/)

```bash

ionic cordova plugin add cordova-plugin-qrscanner

npm install --save @ionic-native/qr-scanner

```

3. 在 app.scss 添加

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
4. 添加扫描成功声音文件，把 <font color="green">demo/assets/audio/scanner.mp3</font> 文件拷贝到你的 <font color="green">project/assets/audio</font> 目录下。（audio目录可能需要自己创建）

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

# <span id="positionViewer">地理位置展示</span>

### 概述

通过经纬度，标记地点在地图上的位置

### 页面预览

<p align="center">
   <img width="400" src="https://github.com/hamal-ho/ionic-demo/blob/master/src/assets/demo/gaode.png">
</p>

### 安装

1. 把 <font color="green">demo/src/pages/position-viewer</font> 模块拷贝到你的 <font color="green">project/src/pages</font> 目录下

2. 在 index.html 引入高德地图 api

```html
<script
  charset="utf-8"
  src="http://webapi.amap.com/maps?v=1.4.12&key=您申请的key值&plugin=AMap.Geocoder"
></script>
```

### 用法

```typescript

import { NavController } from 'ionic-angular';

goGaoDeMap() {
  this.navCtrl.push('PositionViewerPage', {
    // 纬度
    latitude: 39.916527,
    // 经度
    longitude: 116.397128
  });
}

```

### 参数说明

| Name      | Type   | Default | Description |
| --------- | ------ | ------- | ----------- |
| latitude  | number | null    | 纬度        |
| longitude | number | null    | 经度        |
