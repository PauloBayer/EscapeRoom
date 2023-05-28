import { Component, HostListener, Input } from '@angular/core';
import { CountdownEvent } from 'ngx-countdown';

@Component({
  selector: 'app-background-game',
  templateUrl: './background-game.component.html',
  styleUrls: ['./background-game.component.css']
})
export class BackgroundGameComponent {

  atelieActive = true;
  exposicaoActive = false;
  lavagemActive = false;
  vipActive = false;
  evidenciasActive = false;

@Input() handleEvent($event: CountdownEvent): void {
    var timeLeft = $event.left;
}

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode == KEY_CODE.DOWN_ARROW){
      
      console.log(event);
      if (this.lavagemActive) {
        this.atelieActive = true;
        this.lavagemActive = false;
      } else {

        if (!this.evidenciasActive) {
          this.evidenciasActive = true;
        } else if (this.evidenciasActive) {
          this.evidenciasActive = false;
        }

      }

    } else if (event.keyCode == KEY_CODE.UP_ARROW){
      
      console.log(event);
      if (this.atelieActive) {
        this.atelieActive = false;
        this.lavagemActive = true;
      }

    } else if (event.keyCode == KEY_CODE.RIGHT_ARROW){
      
      console.log(event);
      if (this.atelieActive) {
        this.atelieActive = false;
        this.exposicaoActive = true;
      } else if (this.vipActive) {
        this.vipActive = false;
        this.atelieActive = true;
      }

    } else if (event.keyCode == KEY_CODE.LEFT_ARROW){

      console.log(event);
      if (this.atelieActive) {
        this.atelieActive = false;
        this.vipActive = true;
      } else if (this.exposicaoActive) {
        this.exposicaoActive = false;
        this.atelieActive = true;
      }

    }
  }

}

export enum KEY_CODE {
  UP_ARROW = 38,
  DOWN_ARROW = 40,
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,
  ENTER = 13
}
