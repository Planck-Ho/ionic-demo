import {
  Component,
  ViewChild,
  forwardRef,
  Output,
  EventEmitter,
  OnInit,
  Input
} from '@angular/core';
import moment, { Moment } from 'moment';
import { Slides, DateTime } from 'ionic-angular';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CalendarController, Schedule } from './calendar-controller';

@Component({
  selector: 'calendar',
  templateUrl: 'calendar.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CalendarComponent),
      multi: true
    }
  ]
})
export class CalendarComponent implements OnInit, ControlValueAccessor {
  @ViewChild(Slides)
  private slides: Slides;

  @ViewChild(DateTime)
  private dateTime: DateTime;

  @Output()
  onChange = new EventEmitter<string>();

  @Output()
  onTap = new EventEmitter<string>();

  @Input()
  schedules: Schedule[] = [];

  maxDate: string = moment()
    .add(10, 'y')
    .format('YYYY');

  get activeIndex(): number {
    return this.slides ? this.slides.getActiveIndex() : 1;
  }

  private _startWeekDay: 'Sunday' | 'Monday' = 'Sunday';

  // 一周的开始时间、星期天或星期一
  @Input()
  set startWeekDay(val) {
    if (val && this.startWeekDay !== val) {
      this._startWeekDay = val;
      this.initDate(moment(this.currentDate));
    }
  }

  get startWeekDay() {
    return this._startWeekDay;
  }

  // 是否已经初始化
  private isInit = true;
  // 是否已经初始化
  private haveInit = false;

  // 是否选择
  private isSelect = false;

  private selectDay: number = 1;

  // 当前时间
  private _currentDate: string;

  set currentDate(val: string) {
    if (val !== this._currentDate) {
      this._onChanged(val);
      this.onChange.emit(val);
    } else {
      this.onTap.emit(val);
    }

    this._currentDate = val;
  }

  get currentDate(): string {
    return this._currentDate;
  }

  dates: Moment[] = [];

  private _onChanged: Function = () => {};

  constructor(private calendarCtrl: CalendarController) {}

  ngOnInit() {
    this.initDate(moment());
    this.calendarCtrl.setCalendar(this);
  }

  private initDate(date: Moment) {
    const m = moment(date);

    // 当前月份index (0~11)
    const month = m.month();

    const lastMonth = moment().set({
      year: m.year(),
      month: month - 1,
      date: 1
    });
    const nextMonth = moment().set({
      year: m.year(),
      month: month + 1,
      date: 1
    });

    const dates = [
      // 上一月
      lastMonth,
      // 当前月
      m,
      // 下一月
      nextMonth
    ];

    this.dates = dates;

    // 获取当前日期
    const currentDate = m.format('YYYY-MM-DD');
    this.currentDate = currentDate;

    // 判断是否初始化
    if (!this.haveInit) {
      this.haveInit = true;
      setTimeout(() => {
        this._onChanged(this.currentDate);
      }, 0);
    }
  }

  openDateTime() {
    this.dateTime.open();
  }

  selectDate(dateTime: DateTime) {
    const { year, month, day } = dateTime.getValue();

    const date = moment({ year, month: month - 1, day }).format('YYYY-MM-DD');

    if (date !== this.currentDate) {
      this.update(date);
    }
  }

  willChange() {
    // 防止初始化时候发起事件
    if (!this.isInit) {
      // 先锁住手势滑动slide
      this.slides.onlyExternal = true;
      this.slides.shortSwipes = false;
    }
  }

  trackByFn(index: number, date: Moment) {
    return date.format('YYYY-MM-DD');
  }

  // page ： -1 或者 1 后退、前进
  changePage(page: number) {
    // 防止初始化时候发起事件
    if (this.isInit) {
      this.isInit = false;
      return;
    }

    // 锁住手势滑动slide
    this.slides.onlyExternal = true;
    this.slides.shortSwipes = false;

    // 复制当前日历数据
    const dates = [];
    for (const m of this.dates) {
      dates.push(moment(m));
    }

    this.dates = [];

    this.slides.update();

    for (let i = 0; i < dates.length; i++) {
      const month = dates[i].month() + page;
      const day = this.isSelect && i === 1 ? this.selectDay : 1;

      dates[i].set({ month, date: day });
    }

    this.dates = dates;

    this.slides.update(200);

    this.currentDate = this.dates[1].format('YYYY-MM-DD');

    this.isSelect = false;

    this.slides.slideTo(1, 0, false);

    // 不能小于1970-01-01
    if (moment('1970-01-01').isAfter(this.currentDate)) {
      this.initDate(moment('1970-01-01'));
    }
  }

  select(date: string) {
    const currentDate = moment(this.currentDate);
    // 不是当前月
    if (!currentDate.isSame(date, 'month')) {
      const day = moment(date).date();
      this.isSelect = true;
      this.selectDay = day;

      // 选择上个月或下一月
      if (currentDate.isAfter(date)) {
        this.dates[0].set({ date: this.selectDay });
        this.slides.slidePrev(300);
      } else {
        this.dates[2].set({ date: this.selectDay });
        this.slides.slideNext(300);
      }
    } else {
      this.currentDate = date;
    }
  }

  private update(val: string) {
    const valid = moment(val).format('YYYY-MM-DD') !== 'Invalid date';
    const same = moment(val).format('YYYY-MM-DD') === this.currentDate;

    // 不能小于1970-01-01
    const min = moment(val).isBefore('1970-01-01');

    if (valid && !same && !min) {
      this.slides.lockSwipes(true);

      // 判断月份是否一致
      const sameMonth = moment(val).isSame(this.currentDate, 'month');

      if (sameMonth) {
        this.dates[1].set('date', moment(val).date());
        this.currentDate = this.dates[1].format('YYYY-MM-DD');
      } else {
        this.initDate(moment(val));
      }

      this.slides.lockSwipes(false);
    }
  }

  writeValue(val: string) {
    if (val) {
      this.update(val);
    }
  }

  registerOnChange(fn: () => {}) {
    this._onChanged = fn;
  }

  registerOnTouched(fn: any) {}
}
