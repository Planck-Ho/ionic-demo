import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import moment, { Moment } from 'moment';
import { CalendarController } from '../calendar-controller';

@Component({
  selector: 'calendar-month',
  templateUrl: 'calendar-month.html'
})
export class CalendarMonthComponent implements OnInit {
  @Output()
  onSelect = new EventEmitter<string>();

  // 日期
  @Input()
  dateMonth: Moment;

  // 一周的开始时间、星期天或星期一
  @Input()
  startWeekDay: string;

  dates: string[] = [];

  constructor(private calendarCtrl: CalendarController) {}

  ngOnInit() {
    this.initViews(this.dateMonth);
  }

  trackByFn(index: number, date: string) {
    return date;
  }

  changeDate(date: string) {
    this.onSelect.emit(date);
  }

  private initViews(date: Moment) {
    // 当前月
    const currentDate = moment(date);
    // 月份下标（第几个月）
    const month = currentDate.month();
    // 上一个月
    const lastDate = moment(date).set({ month: month - 1 });
    // 下个月
    const nextDate = moment(date).set({ month: month + 1 });
    // 获取1号的星期下标
    const startWeek =
      this.startWeekDay === 'Monday'
        ? currentDate.set({ date: 1 }).isoWeekday() - 1
        : currentDate.set({ date: 1 }).day();

    // 上个月的剩余天数
    for (let i = 0; i < startWeek; i++) {
      // 上一个月
      const date = lastDate
        .set({ date: lastDate.daysInMonth() - i })
        .format('YYYY-MM-DD');
      this.dates.unshift(date);
    }
    // 这个月的天数
    const days = currentDate.daysInMonth();

    for (let i = 0; i < days; i++) {
      const date = currentDate.set({ date: i + 1 }).format('YYYY-MM-DD');
      this.dates.push(date);
    }

    // 获取最后一天星期下标
    const endWeek =
      this.startWeekDay === 'Monday'
        ? currentDate.set({ date: days }).isoWeekday() - 1
        : currentDate.set({ date: days }).day();

    // 下个月的天数
    for (let i = 0; i < 6 - endWeek; i++) {
      const date = nextDate.set({ date: i + 1 }).format('YYYY-MM-DD');
      this.dates.push(date);
    }

    // 没有够，6行7列
    if (this.dates.length < 42) {
      // 需要添加的天数
      const emptyDay = 42 - this.dates.length;
      // 当前最后一天日期字符串
      const end = this.dates[this.dates.length - 1];
      // 当前最后一天日期
      const endDate = moment(end);
      // 当前月份的最后一天
      currentDate.set({ date: days });

      // 第35格是当前月的最后一天
      if (endDate.format('YYYY-MM-DD') === currentDate.format('YYYY-MM-DD')) {
        for (let i = 0; i < emptyDay; i++) {
          const date = nextDate.set({ date: i + 1 }).format('YYYY-MM-DD');
          this.dates.push(date);
        }
      } else {
        // 取出最后一天的日期，累加
        const endDay = endDate.date();
        for (let i = 0; i < emptyDay; i++) {
          const date = endDate
            .set({ date: endDay + i + 1 })
            .format('YYYY-MM-DD');
          this.dates.push(date);
        }
      }
    }
  }
}
