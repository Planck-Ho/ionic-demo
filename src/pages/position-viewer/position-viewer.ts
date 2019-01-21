import { Config } from './../../app/config';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';

declare const AMap: any;

@IonicPage()
@Component({
  selector: 'page-position-viewer',
  templateUrl: 'position-viewer.html'
})
export class PositionViewerPage {
  @ViewChild(Content)
  content: Content;

  // 默认坐标
  readonly coords = {
    // 纬度
    latitude: 39.916527,
    // 经度
    longitude: 116.397128
  };

  // 纬度
  private latitude: string;

  // 经度
  private longitude: string;

  private map: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    this.navCtrl.swipeBackEnabled = false;

    this.latitude = this.navParams.get('latitude');
    this.longitude = this.navParams.get('longitude');

    this.init();
  }

  ionViewWillUnload() {
    this.map && this.map.destroy();
  }

  private async init() {
    const center = new AMap.LngLat(
      +this.longitude || this.coords.longitude,
      +this.latitude || this.coords.latitude
    );

    // 初始化地图
    this.map = new AMap.Map(this.content.getScrollElement(), {
      zoom: 14,
      center,
      showBuildingBlock: true
    });

    // 添加控件
    this.map.plugin(['AMap.ControlBar'], () => {
      const controlBar = new AMap.ControlBar({
        showZoomBar: true,
        showControlButton: false
      });

      this.map.addControl(controlBar);
    });

    // 添加标注
    const marker = new AMap.Marker({
      map: this.map
    });

    const address = await this.getAddress(center);

    //添加到提示窗
    const info = new AMap.InfoWindow({
      content: `
      <div style="text-align:center;white-space:nowrap;'
      'margin:10px;">${address}</div>
      `,
      position: center
    });

    // 添加标注监听事件
    AMap.event.addListener(marker, 'click', () => {
      info.open(this.map, center);
    });
  }

  private getAddress(center: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const geocoder = new AMap.Geocoder();

      geocoder.getAddress(center, (status, res) => {
        if (status === 'complete' && res.info === 'OK') {
          resolve(res.regeocode.formattedAddress);
        }
      });
    });
  }
}
