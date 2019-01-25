import {IonicStorageModule} from '@ionic/storage';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { CoreModule } from '../core/core.module';
import { Config } from './config';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DefaultInterceptor } from '../core/http/default.interceptor';
import { GlobalModule } from '../providers/global.module';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      mode: 'ios',
      backButtonText: '',
      tabsHideOnSubPages: true
    }),
    IonicStorageModule.forRoot(),
    CoreModule,
    GlobalModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    Config,
    { provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true },
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
