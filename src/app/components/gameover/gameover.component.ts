import { Component } from '@angular/core';

@Component({
  selector: 'app-gameover',
  templateUrl: './gameover.component.html',
  styleUrls: ['./gameover.component.css'],
})
export class GameoverComponent {
  restart() {
    window.location.reload();
  }
}
