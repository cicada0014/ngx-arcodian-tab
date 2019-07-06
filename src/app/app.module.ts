import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { NgxArcodianTabsModule } from 'ngx-arcodian-tabs/dist'




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxArcodianTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
