import { Injectable } from '@angular/core';
import {
  HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse,
  HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators';
import { mergeMap } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Config } from '../../app/config';


class Pagination {
  count: number;
  currentPage: number;
  nextPage: number;
  prevPage: number;
  totalCount: number;
}

export class Meta {
  pagination = new Pagination();
}


export interface IResponse {
  status: boolean;
  result: any;
  meta?: Meta
}


/**
 * 默认HTTP拦截器，其注册细节见 `app.module.ts`
 */
@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
  constructor(
    private config: Config
  ) { }


  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {

    // 统一加上服务端前缀
    let url = req.url;
    if (!url.startsWith('https://') && !url.startsWith('http://')) {
      url = this.config.apiEndPoint;
    }


    const cloneObj = {
      url
    };

    // 添加token
    // if (this.auth.isAuthenticated()) {
    //   Object.assign(update, {
    //     setHeaders: { Authorization: this.auth.authorization }
    //   });
    // } else {
    //   return;
    // }

    const newReq = req.clone(cloneObj);


    return next.handle(newReq).pipe(
      mergeMap((event: any) => {
        // 若一切都正常，则后续操作
        return of(event);
      }),
      catchError((res: HttpErrorResponse) => {
        console.error(res);

        // 返回错误
        return ErrorObservable.create(res);
      })
    );
  }
}
