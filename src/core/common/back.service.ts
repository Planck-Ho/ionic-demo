import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';

@Injectable()
export class BackService {

  private eventName: string[] = [];


  get state(): boolean {
    return !!this.eventName.length;
  }

  constructor(private events: Events) {
  }

  subscribe(calback: Function) {


    const eventName = `_back_${this.eventName.length}`;

    this.eventName.push(eventName);


    this.events.subscribe(eventName, calback);
  }

  unsubscribe() {
    if (this.state) {
      this.events.unsubscribe(this.eventName[this.eventName.length - 1]);
      this.eventName.pop();
    }
  }



  publish() {

    this.events.publish(this.eventName[this.eventName.length - 1]);
  }

  clear() {
    for (const item of this.eventName) {
      this.events.unsubscribe(item);
    }

    this.eventName = [];
  }




}
