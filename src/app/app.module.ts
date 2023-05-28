import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExposicaoComponent } from './components/exposicao/exposicao.component';
import { AtelieComponent } from './components/atelie/atelie.component';
import { VipComponent } from './components/vip/vip.component';
import { LavagemComponent } from './components/lavagem/lavagem.component';
import { BackgroundGameComponent } from './components/background-game/background-game.component';
import { EvidenciasComponent } from './components/evidencias/evidencias.component';
import { InputBoxComponent } from './components/input-box/input-box.component';
import { TimerComponent } from './components/timer/timer.component';
import { CountdownModule } from 'ngx-countdown';

@NgModule({
  declarations: [
    AppComponent,
    ExposicaoComponent,
    AtelieComponent,
    VipComponent,
    LavagemComponent,
    BackgroundGameComponent,
    EvidenciasComponent,
    InputBoxComponent,
    TimerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CountdownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
