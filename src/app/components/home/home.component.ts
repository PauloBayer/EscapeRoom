import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  @Input() loginUser!: string;
  users = [1,2,3];
  //Cria o elemento das pontuações
  /*const rank = <HTMLDivElement>document.getElementById("rankGeral");
  let div = document.createElement("div");
  let p = document.createElement("p");
  p.textContent = "funciona";

  rank.appendChild(p);
*/
}
