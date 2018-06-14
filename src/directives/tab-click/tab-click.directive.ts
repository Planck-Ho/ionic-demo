import { Directive, Self, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Tab } from 'ionic-angular';


@Directive({
  selector: 'ion-tab[tab-click]'
})
export class TabClickDirective implements AfterViewInit {

  @Output('tab-click') _tabClick = new EventEmitter<MouseEvent>();


  constructor(
    @Self() private tab: Tab
  ) { }


  ngAfterViewInit() {

    this.tab.btn.getElementRef().nativeElement.onclick = event => {

      this._tabClick.emit(event);

    }

  }

}
