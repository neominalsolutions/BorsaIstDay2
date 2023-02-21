import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveProgramlamaComponent } from './rxjs/reactive-programlama/reactive-programlama.component';

@NgModule({
  declarations: [
    AppComponent,
    ReactiveProgramlamaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
