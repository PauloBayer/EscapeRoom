import { Component } from '@angular/core';
import { CountdownComponent, CountdownGlobalConfig, CountdownStatus } from 'ngx-countdown';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent {

  handleEvent($event: any): void {
    var timeLeft = $event.left;
}

}
