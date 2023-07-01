import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Jogador } from 'src/app/interfaces/jogador';
import { Jogo } from 'src/app/interfaces/jogo';
import { Liga } from 'src/app/interfaces/liga';
import { JogadorService } from 'src/app/jogador.service';
import { JogoService } from 'src/app/jogo.service';
import { LigaService } from 'src/app/liga.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-end-sceen',
  templateUrl: './end-sceen.component.html',
  styleUrls: ['./end-sceen.component.css']
})
export class EndSceenComponent implements OnInit {

  constructor(
    private jogoService: JogoService,
    private ligaService: LigaService,
    private jogadorService: JogadorService
  ) {}

  @Input() timeLeft!: number;
  @Input() loginUser!: any;
  @Input() hasLoggedIn!: boolean;
  @Output() hasLoggedInChange = new EventEmitter<boolean>();
  @Input() hasLeftHome!: boolean;
  @Output() hasLeftHomeChange = new EventEmitter<boolean>();
  @Input() cutsceneEndIsOver!: boolean;
  @Output() cutsceneEndIsOverChange = new EventEmitter<boolean>();

  jogos: Jogo[] = [];
  ligas: Liga[] = [];
  jogadores: Jogador[] = [];
  error = '';
  success = '';
  jogosGerais: any[] = [];
  jogosLiga: any[] = [];
  @Input() leagueId!: any;
  leagueName: any;

  ngOnInit() {

    console.log(this.leagueId)
    combineLatest([
      this.jogadorService.getAll(),
      this.ligaService.getAll()
    ]).subscribe(([jogadores, ligas]) => {
      this.jogadores = jogadores;
      this.ligas = ligas;
      this.processData();
      this.checkLiga();
      this.success = 'Successful retrieval of the list';
    }, (err) => {
      console.log(err);
      this.error = err;
    });
  
    this.getJogos();
  }

  jogosDaLiga() {
    this.jogosLiga = this.jogosGerais.filter(jogo => jogo.idLiga === this.leagueId);
  }

  getJogos(): void {
    this.jogoService.getAll().subscribe(
      (data: Jogo[]) => {
        this.jogos = data;
        this.processData();
        this.success = 'Successful retrieval of the list';
      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }

  processData(): void {
    if (this.jogos.length > 0 && this.ligas.length > 0 && this.jogadores.length > 0) {
      this.jogos.sort((a: Jogo, b: Jogo) => b.pontos! - a.pontos!);
      this.jogosGerais = this.jogos.map((jogo, index) => {
        const jogador = this.jogadores.find(j => j.idJogador === jogo.idJogador);
        return {
          posicao: index + 1,
          nome: jogador?.login || '',
          pontos: jogo.pontos || 0
        };
      });
      this.checkLiga();
    }
  }

  goHome() {
    this.cutsceneEndIsOver = false;
    this.cutsceneEndIsOverChange.emit(this.cutsceneEndIsOver);
    this.hasLoggedIn = true;
    this.hasLoggedInChange.emit(this.hasLoggedIn);
    this.hasLeftHome = false;
    this.hasLeftHomeChange.emit(this.hasLeftHome);
  }

  checkLiga() {
    if (this.jogadores.length > 0 && this.ligas.length > 0) {
      const jogador = this.jogadores.find(j => j.idJogador === this.loginUser);
      if (jogador) {
        this.leagueId = jogador.idLiga;
        const liga = this.ligas.find(l => l.idLiga === this.leagueId);
        if (liga) {
          this.leagueName = liga.nomeLiga;
        }
      }
    }
  }

  resetAlerts() {
    this.error = '';
    this.success = '';
  }
}
