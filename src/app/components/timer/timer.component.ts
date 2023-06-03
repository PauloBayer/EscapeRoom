import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

timeLeft: number = 1800;
minutesLeft?: any = 30;
secondsLeft?: any = '00';
interval: any;
hasStartedTimer: boolean = false;

@Input() startTime: boolean = false; 

checkTime() {
  this.interval = setInterval(() => {
    if (this.startTime && !this.hasStartedTimer) {
      this.startTimer();
      this.hasStartedTimer = true;
    }
  }, 1000)
}

startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
        this.minutesLeft = Math.floor(this.timeLeft / 60);
        this.secondsLeft = this.timeLeft - this.minutesLeft * 60;

        if (this.minutesLeft < 10) {
          this.minutesLeft = '0' + this.minutesLeft;
        }

        if (this.secondsLeft < 10) {
          this.secondsLeft = '0' + this.secondsLeft;
        }

      } else {
        this.timeLeft = 1800;
      }
    },1000)
  }

  pauseTimer() {
    clearInterval(this.interval);
  }
  
ngOnInit() {
  this.checkTime();
  // this.startTimer();
}

}
