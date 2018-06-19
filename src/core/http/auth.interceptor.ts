import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/defer';
import 'rxjs/add/operator/concatAll';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private storage: Storage
  ) { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {



    // 添加token
    const authReq = Observable.defer(async () => {

      const token = await this.storage.get('access_token');
      return req.clone({
        setHeaders: { Authorization: 'JWT ' + token }
      });

    });


    return authReq.map(req => next.handle(req)).concatAll();
  }

}
