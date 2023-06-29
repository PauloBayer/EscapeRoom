import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Jogo } from 'src/app/interfaces/jogo';
import { JogoService } from 'src/app/jogo.service';

@Component({
  selector: 'app-cutscene-end',
  templateUrl: './cutscene-end.component.html',
  styleUrls: ['./cutscene-end.component.css']
})
export class CutsceneEndComponent implements OnInit {
  
  constructor(private jogoService: JogoService) { }
  
  @Input() jogadores?: any;
  @Input() jogos?: any;
  @Input() ligas?: any;
  @Input() timeLeft?: any;
  @Input() idJogador?: any;
  
  idLiga?: any;
  cutscene = 1;
  cutsceneEnded = false;
  jogo: Jogo = { idJogo: Math.floor(Math.random() * 100000000), idLiga: undefined, idJogador: undefined, pontos: 0 };
  success = '';
  error = '';
  
  ngOnInit(): void {

    for (let i = 0; i < this.jogadores.length; i++) {
      if (this.jogadores[i] == this.idJogador) {
        this.idLiga = this.jogadores[i].idLiga;
        break;
      }
    }

    this.jogo.idJogador = this.idJogador;
    this.jogo.idLiga = this.idLiga;
    this.jogo.pontos = this.timeLeft;
    this.addJogo();
  }

  addJogo() {
    this.jogoService.store(this.jogo).subscribe(
      (res: Jogo) => {
        // Update the list of jogos
        this.jogos.push(res);

        // Inform the user
        this.success = 'Created successfully';
      },
        (err) => (this.error = err.message)
    );
  }

  nextCutscene() {
    this.cutscene++;

    if (this.cutscene == 2) {
      this.innerText = this.text2;
    }

    if (this.cutscene == 3) {
      this.innerText = this.text3;
    }

    if (this.cutscene == 4) {
      this.cutsceneEnded = true;
    }
  }
  
  text1 = `“Tendo coletado um número suficiente de evidências, você 
  se retira do ateliê antes que seu suspeito retorne. Em uma euforia 
  e sem perder tempo, você leva tudo para a delegacia e convence a 
  todos a realizar uma operação de busca e apreensão.”`
  
  text2 = `“Não muito depois, suas suspeitas se confirmam. A polícia 
  encontra ainda mais provas e, finalmente, o maníaco é preso.`

  text3 = `“Seus feitos saem em todas as notícias. Porém, você sabe quais serão as próximas consequências. Sabe que o que fez é errado. Diversos policiais, no decorrer da história, já fizeram a mesma coisa e confirmaram que seus suspeitos eram, na verdade, inocentes. Portanto, seu ato é imoral. Ilegal.”
  <br>“Você perde sua profissão, não mais tem o direito de exercer o ofício policial.”
  <br>“Ao menos, a pessoa certa está presa.”
  <br><h2>“Ou será que não?”</h2>    
  `
  innerText = this.text1;
  
}
