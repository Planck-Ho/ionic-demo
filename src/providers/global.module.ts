import { NgModule, SkipSelf, Optional } from "@angular/core";

// 声明全局的服務的供应商
@NgModule({
  providers: [

  ]
})
export class GlobalModule {
  constructor(@Optional() @SkipSelf() module: GlobalModule) {
    if (module) {
      throw new Error(`GlobalModule 已经在 AppModule 导入`);
    }
  }
}
