import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GameUtilsService } from './utils/game-utils.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    GameUtilsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
