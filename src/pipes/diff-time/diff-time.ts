import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'diffTime',
})
export class DiffTimePipe implements PipeTransform {

  // 计算时间差
  transform(value: string): string {

    if (!value) return;

    const language = localStorage.getItem('language');

    const start: number = new Date(value).getTime();

    const end: number = new Date().getTime();


    const minutes: number = Math.ceil((end - start) / 60000);

    if (minutes === 0) {

      return language == 'zh-hk' ? `1分鐘前` : `1 minute ago`;

    } else if (minutes < 60 && minutes > 0) {

      return language == 'zh-hk' ? `${minutes}分鐘前` : `${minutes} minutes ago`;

    } else if (minutes >= 60 && minutes < 1440) {

      const h: number = Math.ceil(minutes / 60);
      return language == 'zh-hk' ? `${h}小時前` : `${h} hours ago`;

    } else {

      const d: number = Math.ceil(minutes / 1440);
      return language == 'zh-hk' ? `${d}天前` : `${d} days ago`;

    }

  }
}
