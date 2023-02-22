import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveProgramlamaComponent } from './rxjs/reactive-programlama/reactive-programlama.component';

import { HttpClientModule } from '@angular/common/http';
import { RxjsSubjectsComponent } from './rxjs-subjects/rxjs-subjects.component';
// uygulama genelinde http işlemlerin yönetilmesini sağlayan angular library
// httpClient service ile uygulama componentlerine service injection yaparak data hizmetini veriyoruz.
@NgModule({
  declarations: [AppComponent, ReactiveProgramlamaComponent, RxjsSubjectsComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
