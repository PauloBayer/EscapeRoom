import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

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
import { HelpButtonComponent } from './components/help-button/help-button.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ItemModalComponent } from './components/item-modal/item-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { GameoverComponent } from './components/gameover/gameover.component';
import { FormComponent } from './components/form/form.component';
import { CutsceneIntroComponent } from './components/cutscene-intro/cutscene-intro.component';
import { HomeComponent } from './components/home/home.component';
import { LigasComponent } from './components/ligas/ligas.component';
import { CutsceneEndComponent } from './components/cutscene-end/cutscene-end.component';
import { EndSceenComponent } from './components/end-sceen/end-sceen.component';

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
    TimerComponent,
    HelpButtonComponent,
    ItemModalComponent,
    GameoverComponent,
    FormComponent,
    CutsceneIntroComponent,
    HomeComponent,
    LigasComponent,
    CutsceneEndComponent,
    EndSceenComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CountdownModule,
    MatIconModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
