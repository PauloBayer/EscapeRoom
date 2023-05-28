import { Component } from '@angular/core';

@Component({
  selector: 'app-input-box',
  templateUrl: './input-box.component.html',
  styleUrls: ['./input-box.component.css']
})
export class InputBoxComponent {

  placeholder: string = "Digite aqui o nome de um objeto no cenário para interagir com ele e pressione ENTER...";

}
