import { Directive, Input, Injector, OnInit } from '@angular/core';
import { Refresher, ViewController, Content } from 'ionic-angular';

// 主动下拉刷新指令
@Directive({
  selector: '[begin-refresh]' // Attribute selector
})
export class BeginRefreshDirective implements OnInit {

  @Input('begin-refresh') private _beginRefresh = false;



  constructor(
    private injector: Injector,
    private viewCtrl: ViewController
  ) {

  }

  ngOnInit() {

    if (!this._beginRefresh) {

      this.beginRefresh();

    } else {

      this.viewCtrl.didEnter.subscribe(() => {

        this.beginRefresh();

      });

    }

  }

  private async beginRefresh() {


    const refresher = this.injector.get(Refresher);

    if (refresher.state === 'inactive') {

      const top = await this.getContentTop();

      refresher._top = `${top}px`;

      refresher.state = 'refreshing';

      refresher._beginRefresh();
    }




  }

  private getContentTop(): Promise<number> {

    const content = this.injector.get(Content);

    return new Promise((resolve, reject) => {

      const timer = setInterval(() => {

        if (content.contentTop) {

          resolve(content.contentTop);

          clearInterval(timer);

        }

      }, 0);

    });

  }
}
