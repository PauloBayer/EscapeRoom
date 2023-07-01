import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Jogador } from 'src/app/interfaces/jogador';
import { Jogo } from 'src/app/interfaces/jogo';
import { Liga } from 'src/app/interfaces/liga';
import { JogadorService } from 'src/app/jogador.service';
import { JogoService } from 'src/app/jogo.service';
import { LigaService } from 'src/app/liga.service';

@Component({
  selector: 'app-ligas',
  templateUrl: './ligas.component.html',
  styleUrls: ['./ligas.component.css']
})
export class LigasComponent {

  constructor(
    private jogoService: JogoService,
    private ligaService: LigaService,
    private jogadorService: JogadorService
  ) {}

  @ViewChild('clickableBtn', { static: false }) clickableBtn!: any;
  @ViewChild('notClickableBtn', { static: false }) notClickableBtn!: any;

  @Input() loginUser!: string;
  @Output() loginUserChange = new EventEmitter<string>();
  @Input() hasLeftHome!: boolean;
  @Output() hasLeftHomeChange = new EventEmitter<boolean>();
  @Input() hasEnteredLiga!: boolean;
  @Output() hasEnteredLigaChange = new EventEmitter<boolean>();
  @Input() idUser!: number;
  @Input() idLiga!: number;
  error = '';
  success = '';
  jogos!: Jogo[];
  ligas!: Liga[];
  jogadores!: Jogador[];
  jogosDeJogador: any[] = [];
  jogosDeLiga: any[] = [];
  leagueId!: number;
  @Output() leagueIdChange = new EventEmitter<number>();
  selectedIdLeague: number = this.leagueId;;
  leagueName!: any;
  liga: Liga = { idLiga: Math.floor(Math.random() * 100000000), nomeLiga: '' };
  jogador: Jogador = { idJogador: Math.floor(Math.random() * 100000000), login: '', senha: '' , idLiga: undefined};
  senhaUser: string = '';

  clickableBtnClick() {
    this.notClickableBtn.nativeElement.click();
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.jogadores = [];
    this.jogos = [];
    // this.ligas = [];

    this.getJogos();
    this.getJogadores();
  }
  
  getJogos(): void {
    if (this.jogos == undefined || this.jogos.length == 0) {
      this.jogoService.getAll().subscribe(
        (data: Jogo[]) => {
          this.jogos = data;
          this.processData();
          this.success = 'successful retrieval of the list';
          if (this.ligas == undefined) {
            this.getLigas(); // Call getLigas() after getting jogos
          }
        },
        (err) => {
          console.log(err);
          this.error = err;
        }
        );
      }  
  }
  
  getLigas(): void {
    this.ligaService.getAll().subscribe(
      (data: Liga[]) => {
        this.ligas = data;
        this.processData();
        this.success = 'successful retrieval of the list';
      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }

  getJogadores(): void {
    this.jogadorService.getAll().subscribe(
      (data: Jogador[]) => {
        this.jogadores = data;
        this.processData();
        this.success = 'successful retrieval of the list';
      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }

  processData(): void {
    if (this.jogos && this.jogadores) {
      this.jogos.sort((a: any, b: any) => {
        return b.pontos - a.pontos;
      });

    for (let i = 0; i < this.jogos.length; i++) {

        let jogoUnico = {
          posicao: 0,
          nome: '',
          pontos: 0
        };

        // Iterate over the jogos array and only gets the games from the idUser
        if (this.jogos[i].idJogador == this.idUser) {

          let idJogador = this.idUser;
          let nomeJogador = '';

          for (let j = 0; j < this.jogadores.length; j++) {
            if (this.jogadores[j].idJogador == idJogador) {
              nomeJogador = this.jogadores[j].login;
              break;
            }
          }
          
          jogoUnico.posicao = i + 1;
          jogoUnico.nome = nomeJogador;
          jogoUnico.pontos = this.jogos[i].pontos!;
          this.jogosDeJogador.push(jogoUnico);

          // Delete the repeated jogosDeJogador
          for (let k = 0; k < this.jogosDeJogador.length; k++) {
            for (let l = k + 1; l < this.jogosDeJogador.length; l++) {
              if (this.jogosDeJogador[k].nome == this.jogosDeJogador[l].nome && 
                this.jogosDeJogador[k].posicao == this.jogosDeJogador[l].posicao && 
                this.jogosDeJogador[k].pontos == this.jogosDeJogador[l].pontos) {
                this.jogosDeJogador.splice(l, 1);
                l--;
              } else if (this.jogosDeJogador[l].nome == '') {
                this.jogosDeJogador.splice(l, 1);
                k--;
              } else if (this.jogosDeJogador[k].nome == '') {
                this.jogosDeJogador.splice(k, 1);
                l--;
              }
            }
          }
          console.log(this.jogosDeJogador);
        }
      }
    }

    // Selecting the league of the user and filling the leagueId variable
    if (this.jogadores && this.ligas) {
      for (let i = 0; i < this.jogadores.length; i++) {
        if (this.jogadores[i].idJogador == this.idUser) {
          this.leagueId = this.jogadores[i].idLiga!;
          break;
        }
      }
      console.log("league Id:")
      console.log(this.leagueId);
      this.leagueIdChange.emit(this.leagueId);

      // Selecting the name of the league of the user and filling the leagueName variable
      for (let i = 0; i < this.ligas.length; i++) {
        if (this.ligas[i].idLiga == this.leagueId) {
          this.leagueName = this.ligas[i].nomeLiga;
          this.leagueIdChange.emit(this.leagueId);
        }
      }
    }

    // Selecting all the games in one league (this.leagueId) and filling the jogosDeLiga variable
    if (this.jogos && this.leagueId) {
      for (let i = 0; i < this.jogos.length; i++) {
        if (this.jogos[i].idLiga == this.leagueId) {
          this.jogosDeLiga.push(this.jogos[i]);
        }
        //Sorting games by points
        this.jogosDeLiga.sort((a: any, b: any) => {
          return b.pontos - a.pontos;
        });
      }
      console.log("jogos de liga:")
      console.log(this.jogosDeLiga);
    }

  }

  fillingLeagueGames(): void {

    this.jogosDeLiga = [];

    for (let i = 0; i < this.jogos.length; i++) {
      if (this.jogos[i].idLiga == this.selectedIdLeague) {

        let jogoUnicoLiga = {
          posicao: 0,
          nome: '',
          pontos: 0,
          idLiga: 0,
          nomeLiga: ''
        };

        let idJogador = this.jogos[i].idJogador;
        let nomeJogador = '';

        for (let j = 0; j < this.jogadores.length; j++) {
          if (this.jogadores[j].idJogador == idJogador) {
            nomeJogador = this.jogadores[j].login;
            break;
          }
        }

        jogoUnicoLiga.posicao = i + 1;
        jogoUnicoLiga.nome = nomeJogador;
        jogoUnicoLiga.pontos = this.jogos[i].pontos!;
        jogoUnicoLiga.idLiga = this.jogos[i].idLiga!;
        this.jogosDeLiga.push(jogoUnicoLiga);
      }
    }
  }

  resetAlerts() {
    this.error = '';
    this.success = '';
  }

  mark(id: number) {
    this.selectedIdLeague = id;
    this.fillingLeagueGames();
  }

  updateJogador(idJogador: any, login: any, senha: any, idLiga: any) {
    this.resetAlerts();

    this.jogadorService
      .update({ idJogador: idJogador, login: login, senha: this.senhaUser, idLiga: this.selectedIdLeague })
      .subscribe(
        (res) => {
          this.success = 'Updated successfully';
        },
        (err) => (this.error = err)
      );

      let leagueName = '';
      for (let i = 0; i < this.ligas.length; i++) {
        if (this.ligas[i].idLiga == this.selectedIdLeague) {
          leagueName = this.ligas[i].nomeLiga;
          break;
        }
      }

      this.leagueName = leagueName;
  }

  updatePlayerLeague() {
    
    // Get the user password in the jogadores array
    for (let i = 0; i < this.jogadores.length; i++) {
      if (this.jogadores[i].idJogador == this.idUser) {
        this.senhaUser = this.jogadores[i].senha;
        break;
      }
    }

    this.updateJogador(this.idUser, this.loginUser, this.senhaUser, this.selectedIdLeague);
  }

  addLiga(f : NgForm) {
    this.resetAlerts();
    this.liga.idLiga = Math.floor(Math.random() * 100000000);
    this.liga.nomeLiga = f.value.nomeLiga;
    console.log("this league name:", this.leagueName);

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

  goBack(): void {
    this.hasEnteredLiga = false;
    this.hasEnteredLigaChange.emit(this.hasEnteredLiga);
  }

}
