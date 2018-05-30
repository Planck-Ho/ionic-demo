import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavParams, Content, NavController, Platform, ViewController } from 'ionic-angular';
import { Config } from '../../app/config';
import { ToolService } from '../../core/common/tool.service';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Geolocation } from '@ionic-native/geolocation';
import { AlertService } from '../../core/common/alert.service';
import { ToastService } from '../../core/common/toast.service';

declare var qq;

export interface IPosition {
  name: string;
  address: string;
  // name/address
  info: string;
}

@IonicPage()
@Component({
  selector: 'page-location-picker',
  templateUrl: 'location-picker.html',
})
export class LocationPickerPage {

  doing = false;

  keyword: string;


  @ViewChild(Content) content: Content;


  // 當前选择地址的坐标字符串
  activeInfo: string;


  // 列表中第一個位置
  headPosition: IPosition;


  address: IPosition[] = [];



  private filter = {
    pageCapacity: 10,
    pageIndex: 0,
    totalNum: 0,
    // 搜索城市
    location: null
  };

  get isEnd(): boolean {

    return this.filter.totalNum === this.address.length - 1;
  }


  constructor(
    private navParams: NavParams,
    private config: Config,
    private toolService: ToolService,
    private diagnostic: Diagnostic,
    private geolocation: Geolocation,
    private alertCtrl: AlertService,
    private navCtrl: NavController,
    private toastService: ToastService,
    private platform: Platform,
    private viewCtrl: ViewController
  ) {
  }

  ionViewDidLoad() {

    this.platform.resume.subscribe(() => {
      this.init();
    });

    // 初始化，获取附近位置信息
    this.init();


  }


  save() {
    console.log(this.activeInfo,'=====activeInfo');

    // this.viewCtrl.dismiss(this);
  }


  private async init() {

    try {

      this.doing = true;

      const coords = await this.getPosition();


      // 标准坐标转腾讯地图坐标
      const center = new qq.maps.LatLng(coords.latitude, coords.longitude);

      const latLng = await this.convertor(center);


      const { detail } = await this.latLng(latLng);


      this.filter.location = detail.addressComponents.city;

      this.headPosition = {
        name: '我的位置',
        address: detail.address,
        info: `我的位置/${detail.address}`
      };



      this.activeInfo = this.headPosition.info;


      this.filter.pageIndex = 0;
      await this.getData();

    } catch (err) {
      console.error(err);

    } finally {
      this.doing = false;
    }



  }

  private convertor(latLng: any): Promise<any> {

    return new Promise((resolve, reject) => {
      qq.maps.convertor.translate(latLng, 1, (res: any[]) => {
        resolve(res[0]);
      });
    });
  }


  private async getData() {
    try {

      const { detail } = await this.searchService(this.headPosition.address);

      if (this.filter.pageIndex === 0) {

        this.address = [];
        this.address.push(this.headPosition);

      }

      this.filter.pageIndex = detail.pageIndex + 1;

      this.filter.totalNum = detail.totalNum;

      const positions = detail.pois.map(item => {
        return {
          name: item.name,
          address: item.address,
          info: `${item.name}/${item.address}`
        };
      });


      this.address.push(...positions);



    } catch (err) {
      console.error(err);

    }

  }








  doInfinite() {
    return this.getData();
  }


  // 搜索位置
  async searchKeyword() {

    if (!this.keyword || !this.keyword.trim().length) return;

    this.doing = true;

    try {

      const { detail } = await this.getLocation(this.keyword.trim());

      this.headPosition = {
        name: detail.addressComponents.street,
        address: detail.address,
        info: `${detail.addressComponents.street}/${detail.address}`
      };

      this.filter.pageIndex = 0;

      await this.getData();
    } catch (err) {
      console.error(err);
    } finally {

      this.doing = false;

    }



  }

  private searchService(address: string): Promise<any> {
    return new Promise((resolve, reject) => {

      const searchService = new qq.maps.SearchService({
        complete(results) {
          resolve(results);
        },
        error(err) {
          console.error(err, '获取失败');
          reject(err);
        }
      });

      searchService.setLocation(this.filter.location);

      searchService.setPageIndex(this.filter.pageIndex);
      searchService.setPageCapacity(this.filter.pageCapacity);

      searchService.search(address);

    });
  }



  private latLng(coords: any): Promise<any> {

    return new Promise(((resolve, reject) => {


      const geocoder = new qq.maps.Geocoder();

      geocoder.getAddress(coords);


      geocoder.setComplete(res => {
        resolve(res);
      });

      geocoder.setError(err => {
        console.error(err, '获取地址失败');
        reject(err);
      });


    }));
  }

  private getLocation(location: string): Promise<any> {
    return new Promise((resolve, reject) => {


      const geocoder = new qq.maps.Geocoder({
        complete(res) {
          resolve(res);
        },
        error(err) {
          console.error(err);
          reject(err);
        }
      });

      geocoder.getLocation(location);


    });
  }

  // 获取地理位置
  async getPosition(): Promise<any> {

    let coords;


    try {



      if (this.toolService.isDevice()) {

        const isLocationEnabled = await this.diagnostic.isLocationEnabled();

        if (isLocationEnabled) {


          const geoposition = await this.geolocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 30000
          });

          coords = {
            latitude: geoposition.coords.latitude,
            longitude: geoposition.coords.longitude
          }

        } else {
          const alert = this.alertCtrl.create({
            title: '請設置定位信息',
            buttons: [
              {
                text: '前往',
                handler: () => {
                  this.diagnostic.switchToLocationSettings();
                }
              }
            ]
          });
          alert.present();
        }

      } else {
        coords = this.config.coords;
      }


      return coords;


    } catch (err) {
      console.error(err);
      this.toastService.presentToast('獲取位置信息失敗');
      this.navCtrl.pop();
    }

  }







}
