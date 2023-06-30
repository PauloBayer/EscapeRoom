import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Jogador } from 'src/app/interfaces/jogador';
import { Jogo } from 'src/app/interfaces/jogo';
import { Liga } from 'src/app/interfaces/liga';
import { JogadorService } from 'src/app/jogador.service';
import { JogoService } from 'src/app/jogo.service';
import { LigaService } from 'src/app/liga.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Input() loginUser!: string;
  @Input() idUser!: number;
  jogos!: any[];
  ligas!: any[];
  jogadores!: any[];
  totalJogos: number = 0;
  jogosRanking: any[] = [];
  error = '';
  success = '';
  @Input() hasLeftHome = false;
  @Output() hasLeftHomeChange = new EventEmitter<boolean>();
  @Input() hasEnteredLiga = false;
  @Output() hasEnteredLigaChange = new EventEmitter<boolean>();

    constructor(private jogoService: JogoService, 
              private ligaService: LigaService, 
              private jogadorService: JogadorService) { }

  ngOnInit() {
    this.getJogos();
    this.getLigas();
    this.getJogadores();

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

  getJogos(): void {
    this.jogoService.getAll().subscribe(
      (data: Jogo[]) => {
        this.jogos = data;
        this.success = 'succesful retrieval of the list';
      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    )
  }

  getJogadores(): void {
    this.jogadorService.getAll().subscribe(
      (data: Jogador[]) => {
        this.jogadores = data;
        this.success = 'succesful retrieval of the list';
      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    )
  }

  getLigas(): void {
    this.ligaService.getAll().subscribe(
      (data: Liga[]) => {
        this.ligas = data;
        this.success = 'succesful retrieval of the list';
      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    )
  }
}