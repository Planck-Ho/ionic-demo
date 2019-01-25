import { Injectable } from '@angular/core';
import {
  PickerController,
  AlertButton,
  PickerColumn,
  PickerOptions,
  PickerColumnOption,
  PickerColumnCmp,
  PickerCmp
} from 'ionic-angular';
import { Subscriber } from 'rxjs/Subscriber';

export interface IPickerOptions {
  text: string;
  value: string;
  children?: IPickerOptions[];
}

@Injectable()
export class PickerService {
  // 列对象
  private pickerColumnCmps: PickerColumnCmp[];
  private pickerCmp: PickerCmp;

  constructor(private pickerCtrl: PickerController) {
    this.data = this.data.map(item => {
      const children = item.children.map(chil => {
        return {
          text: chil.name,
          value: chil.id
        };
      });

      return {
        text: item.name,
        value: item.id,
        children
      };
    });

    console.log(this.data, '===dat=====a==');
  }

  data: any[] = [
    {
      id: 1,
      parentId: null,
      depth: 1,
      name: '九龍',
      order: 30,
      children: [
        { id: 7, parentId: 1, depth: 2, name: '馬頭圍', order: 35 },
        { id: 13, parentId: 1, depth: 2, name: '牛頭角', order: 39 },
        { id: 19, parentId: 1, depth: 2, name: '深水埗', order: 45 },
        { id: 25, parentId: 1, depth: 2, name: '油麻地', order: 54 },
        { id: 30, parentId: 1, depth: 2, name: '太子', order: 57 },
        { id: 5, parentId: 1, depth: 2, name: '九龍城', order: 31 },
        { id: 6, parentId: 1, depth: 2, name: '九龍塘', order: 32 },
        { id: 8, parentId: 1, depth: 2, name: '何文田', order: 33 },
        { id: 9, parentId: 1, depth: 2, name: '土瓜灣', order: 34 },
        { id: 10, parentId: 1, depth: 2, name: '紅磡', order: 36 },
        { id: 11, parentId: 1, depth: 2, name: '啟德', order: 37 },
        { id: 12, parentId: 1, depth: 2, name: '觀塘', order: 38 },
        { id: 14, parentId: 1, depth: 2, name: '九龍灣', order: 40 },
        { id: 15, parentId: 1, depth: 2, name: '秀茂坪', order: 41 },
        { id: 16, parentId: 1, depth: 2, name: '藍田', order: 42 },
        { id: 17, parentId: 1, depth: 2, name: '荔枝角', order: 47 },
        { id: 18, parentId: 1, depth: 2, name: '茶果嶺', order: 43 },
        { id: 20, parentId: 1, depth: 2, name: '油塘', order: 44 },
        { id: 21, parentId: 1, depth: 2, name: '長沙灣', order: 46 },
        { id: 22, parentId: 1, depth: 2, name: '石硤尾', order: 48 },
        { id: 23, parentId: 1, depth: 2, name: '黃大仙', order: 49 },
        { id: 24, parentId: 1, depth: 2, name: '新蒲崗', order: 53 },
        { id: 26, parentId: 1, depth: 2, name: '鑽石山', order: 50 },
        { id: 27, parentId: 1, depth: 2, name: '慈雲山', order: 51 },
        { id: 28, parentId: 1, depth: 2, name: '樂富', order: 52 },
        { id: 29, parentId: 1, depth: 2, name: '旺角', order: 56 },
        { id: 31, parentId: 1, depth: 2, name: '佐敦', order: 58 },
        { id: 32, parentId: 1, depth: 2, name: '尖沙咀', order: 55 },
        { id: 33, parentId: 1, depth: 2, name: '大角咀', order: 59 }
      ]
    },
    {
      id: 3,
      parentId: null,
      depth: 1,
      name: '新界',
      order: 60,
      children: [
        { id: 63, parentId: 3, depth: 2, name: '上水', order: 61 },
        { id: 69, parentId: 3, depth: 2, name: '西貢', order: 67 },
        { id: 76, parentId: 3, depth: 2, name: '石門', order: 71 },
        { id: 81, parentId: 3, depth: 2, name: '屯門', order: 80 },
        { id: 86, parentId: 3, depth: 2, name: '葵涌', order: 81 },
        { id: 62, parentId: 3, depth: 2, name: '粉嶺', order: 62 },
        { id: 64, parentId: 3, depth: 2, name: '打鼓嶺', order: 65 },
        { id: 65, parentId: 3, depth: 2, name: '沙頭角', order: 64 },
        { id: 66, parentId: 3, depth: 2, name: '聯和墟', order: 63 },
        { id: 67, parentId: 3, depth: 2, name: '塔門', order: 68 },
        { id: 68, parentId: 3, depth: 2, name: '大埔墟', order: 66 },
        { id: 70, parentId: 3, depth: 2, name: '馬鞍山', order: 72 },
        { id: 71, parentId: 3, depth: 2, name: '大圍', order: 69 },
        { id: 72, parentId: 3, depth: 2, name: '火炭', order: 70 },
        { id: 73, parentId: 3, depth: 2, name: '坑口', order: 74 },
        { id: 74, parentId: 3, depth: 2, name: '清水灣', order: 76 },
        { id: 75, parentId: 3, depth: 2, name: '將軍澳', order: 73 },
        { id: 77, parentId: 3, depth: 2, name: '調景嶺', order: 75 },
        { id: 78, parentId: 3, depth: 2, name: '元朗', order: 77 },
        { id: 79, parentId: 3, depth: 2, name: '天水圍', order: 78 },
        { id: 80, parentId: 3, depth: 2, name: '落馬洲', order: 79 },
        { id: 82, parentId: 3, depth: 2, name: '青衣', order: 82 },
        { id: 83, parentId: 3, depth: 2, name: '荃灣', order: 83 },
        { id: 84, parentId: 3, depth: 2, name: '深井', order: 84 },
        { id: 85, parentId: 3, depth: 2, name: '沙田', order: 85 },
        { id: 88, parentId: 3, depth: 2, name: '太和', order: 86 }
      ]
    },
    {
      id: 2,
      parentId: null,
      depth: 1,
      name: '香港',
      order: 1,
      children: [
        { id: 35, parentId: 2, depth: 2, name: '上環', order: 4 },
        { id: 40, parentId: 2, depth: 2, name: '跑馬地', order: 10 },
        { id: 46, parentId: 2, depth: 2, name: '炮台山', order: 13 },
        { id: 51, parentId: 2, depth: 2, name: '杏花村', order: 20 },
        { id: 57, parentId: 2, depth: 2, name: '黃竹坑', order: 24 },
        { id: 34, parentId: 2, depth: 2, name: '金鐘', order: 2 },
        { id: 36, parentId: 2, depth: 2, name: '西環', order: 5 },
        { id: 37, parentId: 2, depth: 2, name: '中環', order: 3 },
        { id: 38, parentId: 2, depth: 2, name: '薄扶林', order: 7 },
        { id: 39, parentId: 2, depth: 2, name: '灣仔', order: 8 },
        { id: 41, parentId: 2, depth: 2, name: '銅鑼灣', order: 9 },
        { id: 42, parentId: 2, depth: 2, name: '太平山', order: 6 },
        { id: 43, parentId: 2, depth: 2, name: '大坑', order: 11 },
        { id: 44, parentId: 2, depth: 2, name: '天后', order: 12 },
        { id: 45, parentId: 2, depth: 2, name: '鰂魚涌', order: 15 },
        { id: 47, parentId: 2, depth: 2, name: '北角', order: 14 },
        { id: 48, parentId: 2, depth: 2, name: '太古', order: 16 },
        { id: 49, parentId: 2, depth: 2, name: '筲箕灣', order: 17 },
        { id: 50, parentId: 2, depth: 2, name: '柴灣', order: 19 },
        { id: 52, parentId: 2, depth: 2, name: '西灣河', order: 18 },
        { id: 53, parentId: 2, depth: 2, name: '小西灣', order: 21 },
        { id: 54, parentId: 2, depth: 2, name: '香港仔', order: 22 },
        { id: 55, parentId: 2, depth: 2, name: '鴨脷洲', order: 23 },
        { id: 56, parentId: 2, depth: 2, name: '深水灣', order: 25 },
        { id: 58, parentId: 2, depth: 2, name: '淺水灣', order: 26 },
        { id: 59, parentId: 2, depth: 2, name: '赤柱', order: 27 },
        { id: 60, parentId: 2, depth: 2, name: '大潭', order: 28 },
        { id: 61, parentId: 2, depth: 2, name: '石澳', order: 29 }
      ]
    },
    {
      id: 4,
      parentId: null,
      depth: 1,
      name: '離島',
      order: 87,
      children: [
        { id: 90, parentId: 4, depth: 2, name: '長洲', order: 89 },
        { id: 95, parentId: 4, depth: 2, name: '梅窩', order: 93 },
        { id: 87, parentId: 4, depth: 2, name: '大嶼山', order: 88 },
        { id: 89, parentId: 4, depth: 2, name: '喜靈洲', order: 90 },
        { id: 91, parentId: 4, depth: 2, name: '南丫島', order: 91 },
        { id: 92, parentId: 4, depth: 2, name: '東涌', order: 94 },
        { id: 93, parentId: 4, depth: 2, name: '坪洲', order: 92 },
        { id: 94, parentId: 4, depth: 2, name: '赤鱲角', order: 95 },
        { id: 96, parentId: 4, depth: 2, name: '大澳', order: 96 }
      ]
    }
  ];

  async create() {
    const buttons: AlertButton[] = [
      {
        text: '取消',
        role: 'cancel'
      },
      {
        text: '確定',
        handler: data => {
          console.log(data);
        }
      }
    ];

    console.log(this.data);

    // 第一列
    const options1: PickerColumnOption[] = this.data.map(val => {
      return {
        text: val.name,
        value: val.id
      };
    });
    const column1: PickerColumn = {
      name: 'column1',
      options: options1
    };

    // 第二列
    const options2: PickerColumnOption[] = this.data[0].children.map(val => {
      return {
        text: val.name,
        value: val.id
      };
    });

    const column2: PickerColumn = {
      name: 'column2',
      options: options2
    };

    const columns: PickerColumn[] = [column1, column2];

    const pickerOptions: PickerOptions = {
      buttons,
      columns
    };

    const picker = this.pickerCtrl.create(pickerOptions);

    // const sub: Subscriber<any> = picker.ionChange.subscribe(data => {

    //   const findIndex = this.data.findIndex(val => data.op1.text === val.name);

    //   const options = this.data[findIndex].children.map(val => {
    //     return {
    //       text: val.name,
    //       value: val.id
    //     };
    //   });

    //   // 改变第二行
    //   Object.assign(column2, {
    //     options
    //   });

    //   setTimeout(() => this.pickerColumnCmps[1].setSelected(0, 100), 0);

    // });

    // picker.onWillDismiss(() => {

    //   sub.unsubscribe();
    // });

    await picker.present();

    this.pickerCmp = picker.instance;
    this.pickerColumnCmps = this.pickerCmp._cols.toArray();
    this.pickerColumnCmps.forEach(col => (col.lastIndex = -1));

    this.column1(column2);
  }

  // 第一列，第二列为参数
  private column1(column2: PickerColumn) {
    this.pickerColumnCmps[0].ionChange.subscribe(data => {
      console.log(data);

      const findIndex = this.data.findIndex(val => data.text === val.name);

      // 第二列数据
      const options = this.data[findIndex].children.map(val => {
        return {
          text: val.name,
          value: val.id
        };
      });

      // 改变第二行
      Object.assign(column2, {
        options
      });

      setTimeout(() => this.pickerColumnCmps[1].setSelected(0, 100), 0);
    });
  }
}
