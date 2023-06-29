import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Input() loginUser!: string;
  @Input() idUser!: number;
  @Input() jogos!: any[];
  @Input() ligas!: any[];
  @Input() jogadores!: any[];
  totalJogos: number = 0;
  jogosRanking: any[] = [];
  @Input() hasLeftHome = false;
  @Output() hasLeftHomeChange = new EventEmitter<boolean>();
  @Input() hasEnteredLiga = false;
  @Output() hasEnteredLigaChange = new EventEmitter<boolean>();

  ngOnInit() {
    this.jogos.sort((a: any, b: any) => {
      return b.pontos - a.pontos;
    });

    for (let i = 0; i < this.jogos.length; i++) {
      // Aumentar variável totalJogos de acordo com id do jogador
      if (this.jogos[i].idJogador == this.idUser) {
        this.totalJogos++;
      }

      let jogoUnico = {
        posicao: 0,
        nome: "",
        pontos: 0
      };

      let idJogador = this.jogos[i].idJogador;
      let nomeJogador = this.jogadores.find((jogador: any) => jogador.idJogador == idJogador).login;

      jogoUnico.posicao = i + 1;
      jogoUnico.nome = nomeJogador;
      jogoUnico.pontos = this.jogos[i].pontos;
      this.jogosRanking.push(jogoUnico);
    }

    console.log(this.jogosRanking);
  }

  letsStart() {
    this.hasLeftHome = true;
    this.hasLeftHomeChange.emit(this.hasLeftHome);
  }

  enterLiga() {
    this.hasEnteredLiga = true;
    this.hasEnteredLigaChange.emit(this.hasEnteredLiga);
  }
}