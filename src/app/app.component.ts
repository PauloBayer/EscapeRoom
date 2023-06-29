import { Component, Input, OnInit } from '@angular/core';

import { Jogo } from './interfaces/jogo';
import { JogoService } from './jogo.service';
import { Liga } from './interfaces/liga';
import { LigaService } from './liga.service';
import { Jogador } from './interfaces/jogador';
import { JogadorService } from './jogador.service';

import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'escapeRoom';
  loginUser = '';
  idUser = 0;
  jogos: Jogo[] = [];
  ligas: Liga[] = [];
  jogadores: Jogador[] = [];
  error = '';
  success = '';
  jogo: Jogo = { idJogo: Math.floor(Math.random() * 100000000), idLiga: undefined, idJogador: undefined, pontos: 0 };
  liga: Liga = { idLiga: Math.floor(Math.random() * 100000000), nomeLiga: '' };
  jogador: Jogador = { idJogador: Math.floor(Math.random() * 100000000), login: '', senha: '' };
  hasLoggedIn = false;
  cutsceneOver = false;
  timeLeft = 1802;
  gameIsComplete = false;
  hasLeftHome = false;
  hasEnteredLiga = false;

  constructor(private jogoService: JogoService, 
              private ligaService: LigaService, 
              private jogadorService: JogadorService) { }

  ngOnInit() {
    this.getJogos();
    this.getLigas();
    this.getJogadores();
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

  resetAlerts() {
    this.error = '';
    this.success = '';
  }

  addJogo(f: NgForm) {
    this.resetAlerts();

    this.jogoService.store(this.jogo).subscribe(
      (res: Jogo) => {
        // Update the list of jogos
        this.jogos.push(res);

        // Inform the user
        this.success = 'Created successfully';

        // Reset the form
        f.reset();
      },
        (err) => (this.error = err.message)
    );
  }

  addLiga(f: NgForm) {
    this.resetAlerts();

    this.ligaService.store(this.liga).subscribe(
      (res: Liga) => {
        // Update the list of ligas
        this.ligas.push(res);

        // Inform the user
        this.success = 'Created successfully';

        // Reset the form
        f.reset();
      },
        (err) => (this.error = err.message)
    );
  }

  addJogador(f: NgForm) {
    this.resetAlerts();

    this.jogadorService.store(this.jogador).subscribe(
      (res: Jogador) => {
        // Update the list of jogadores
        this.jogadores.push(res);

        // Inform the user
        this.success = 'Created successfully';

        // Reset the form
        f.reset();
      },
        (err) => (this.error = err.message)
    );
  }

  updateJogador(idJogador: any, login: any, senha: any, idLiga: any) {
    this.resetAlerts();

    this.jogadorService
        .update({ idJogador: +idJogador, login: login.value, senha: senha.value, idLiga: idLiga.value })
        .subscribe(
          (res) => {
            this.success = 'Updated successfully';
          },
          (err) => (this.error = err)
        );
      }

}
