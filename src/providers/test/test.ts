import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class TestProvider {

  constructor(public http: HttpClient) {
    console.log('Hello TestProvider Provider');
  }

}
