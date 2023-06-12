import { Component, HostListener, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CountdownEvent } from 'ngx-countdown';
import { ItemModalComponent } from '../item-modal/item-modal.component';
import { PasswordService } from 'src/app/services/password.service';

interface modalText {
  dialogTitle: string;
  dialogInnerText: string;
  imgUrl?: string;
  hasInput?: boolean;
  password?: string;
}

@Component({
  selector: 'app-background-game',
  templateUrl: './background-game.component.html',
  styleUrls: ['./background-game.component.css'],
})
export class BackgroundGameComponent implements OnInit {
  // Construtor
  constructor(
    public dialog: MatDialog,
    private passwordService: PasswordService
  ) {
    this.passwordService
      .getPasswordObservable()
      .subscribe((password: string) => {
        this.password = password;
      });
  }

  // Declarando todas as variáveis que iremos usar
  modalText?: modalText;
  atelieActive = false;
  exposicaoActive = true;
  lavagemActive = false;
  vipActive = false;
  evidenciasActive = false;
  atelieLocked = true;
  lavagemLocked = true;
  vipLocked = true;
  password = '';
  startTime = false;
  gameOver = false;
  exitLocked = true;
  evidence1 = false;
  evidence2 = false;
  evidence3 = false;
  evidence4 = false;
  evidence5 = false;
  evidence6 = false;
  allEvidences = false;
  timeLeft: number = 1802;
  runTime: any;

  // Variável de lista de objetos
  itens: string[] = [
    'sair',
    'porta',
    'jornal',
    'jornais',
    'livro',
    'livros',
    'tapete',
    'armário',
    'armários',
    'estante',
    'estantes',
    'pincel',
    'pincéis',
    'pinceis',
    'palheta',
    'cavalete',
    'tela',
    'telas',
    'quadro',
    'quadros',
    'tanque',
    'toalha',
    'toalhas',
    'faca',
    'facas',
    'balcão',
    'balcões',
    'roupa',
    'roupas',
    'lixo',
    'lixeira',
    'torneira',
    'torneiras',
    'papel',
    'papeis',
    'caderno',
    'cadernos',
    'baú',
    'baús',
    'bau',
    'baus',
    'prateleira',
    'prateleiras',
    'frasco',
    'frascos',
    'varal',
    'cesta',
    'caixa',
    'caixas',
    'cestas',
    'janela',
    'janelas',
    'câmera',
    'camera',
    'cameras',
    'câmeras',
    'cadeira',
    'cadeiras',
    'corda',
    'cordas',
    'estátua',
    'estátuas',
    'estatua',
    'estatuas',
    'estatueta',
    'estatuetas',
    'vaso',
    'plantas',
    'planta',
  ];

  @Input() handleEvent($event: CountdownEvent): void {
    this.timeLeft = $event.left;
  }

  // Interagindo através do teclado
  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    // Abre inventário ou anda pelas salas
    if (event.keyCode == KEY_CODE.DOWN_ARROW) {
      console.log(event);
      if (this.lavagemActive) {
        this.atelieActive = true;
        this.lavagemActive = false;
      } else {
        if (!this.evidenciasActive) {
          this.evidenciasActive = true;
        } else if (this.evidenciasActive) {
          this.evidenciasActive = false;
        }
      }

      // Navega pelas salas ou interage com o modal de senhas
    } else if (event.keyCode == KEY_CODE.UP_ARROW) {
      console.log(event);
      if (this.atelieActive && !this.vipLocked) {
        this.atelieActive = false;
        this.lavagemActive = true;
      } else if (this.exposicaoActive) {
        let modalText: modalText = {
          dialogTitle: 'Banheiro',
          dialogInnerText: `
            Você abre a porta e entra no banheiro.
            <br>Não há nada de interessante aqui.
            `,
        };
        this.openDialog(modalText);
      } else if (this.atelieActive && this.vipLocked) {
        let modalText: modalText = {
          imgUrl: '../assets/itens/senha_atelie.png',
          dialogTitle: 'Porta da sala VIP trancada',
          dialogInnerText: `
            Esta porta está bloqueada com uma senha numérica de <strong>quatro</strong> digítos.
            <br>Ao lado do painel de senha, está uma anotação:
            <br><strong>"O ano de nascimento de minha obra favorita, ainda na revista"</strong>
            `,
          hasInput: true,
        };
        this.openDialog(modalText);
      }

      // Navega pelas salas
    } else if (event.keyCode == KEY_CODE.RIGHT_ARROW) {
      console.log(event);
      if (this.atelieActive) {
        this.atelieActive = false;
        this.exposicaoActive = true;
      } else if (this.vipActive) {
        this.vipActive = false;
        this.atelieActive = true;
      }

      // Navega pelas salas e interage com o modal de senha
    } else if (event.keyCode == KEY_CODE.LEFT_ARROW) {
      console.log(event);
      if (this.atelieActive && !this.lavagemLocked) {
        this.atelieActive = false;
        this.vipActive = true;
      } else if (this.exposicaoActive && !this.atelieLocked) {
        this.exposicaoActive = false;
        this.atelieActive = true;
      } else if (this.exposicaoActive && this.atelieLocked) {
        let modalText: modalText = {
          imgUrl: '../assets/itens/senha_atelie.png',
          dialogTitle: 'Porta do ateliê trancada',
          dialogInnerText: `
            Essa porta possui um dispositivo digital para ser aberto.
            Você deve descobrir a senha e digitá-la abaixo da imagem.
            <br>Ao lado do painel de senha, está uma anotação:
            <br><strong>"Atributo que eu mais admiro em uma <s>pes</s> obra"</strong>
            `,
          hasInput: true,
        };
        this.openDialog(modalText);
      } else if (this.atelieActive && this.lavagemLocked) {
        console.log(this.atelieActive, this.lavagemLocked);
        let modalText: modalText = {
          imgUrl: '../assets/itens/senha_atelie.png',
          dialogTitle: 'Porta da lavagem trancada',
          dialogInnerText: `
            A sala está bloqueada com uma senha. Acima do dispositivo eletrônico, está uma anotação:
            <br><strong>"Minha deusa da beleza favorita. A mais bela de todas."</strong>
            `,
          hasInput: true,
        };
        this.openDialog(modalText);
      }

      // Dá o input de interação do objeto
    } else if (event.keyCode == KEY_CODE.ENTER) {
      if (
        (<HTMLInputElement>document.getElementById('inputBox')).value !== ''
      ) {
        console.log(event);
        this.activateItem(
          (<HTMLInputElement>(
            document.getElementById('inputBox')
          )).value.toLowerCase()
        );
        (<HTMLInputElement>document.getElementById('inputBox')).value = '';
      }
    }
  }

  // Função que checa o que foi digitado no input, para abrir um modal de interação
  activateItem(item: string) {
    let encontrouItem = this.itens.includes(item);

    if (encontrouItem) {
      console.log('Item encontrado: ' + item);

      // Se for uma evidência ou o jogador quiser sair, faz essa checagem
      if (item == 'sair') {
        console.log('Você quer sair');
      }

      if (item == 'tapete') {
        this.evidence1 = true;
      }

      if (item == 'pincel' || item == 'pinceis' || item == 'pincéis') {
        this.evidence2 = true;
      }

      if (item == 'roupa' || item == 'roupas') {
        this.evidence3 = true;
      }

      if (item == 'lixo' || item == 'lixeira') {
        this.evidence4 = true;
      }

      if (item == 'frasco' || item == 'frascos') {
        this.evidence5 = true;
      }

      if (item == 'varal') {
        this.evidence6 = true;
      }

      if (
        this.evidence1 &&
        this.evidence2 &&
        this.evidence3 &&
        this.evidence4 &&
        this.evidence5 &&
        this.evidence6
      ) {
        this.allEvidences = true;
      }

      if (this.allEvidences) {
        var modalText: modalText = {
          dialogTitle: 'Todas as evidências foram encontradas',
          dialogInnerText: `Parabéns! Você acredita que encontrou evidências suficientes para ir embora.
          <br>Agora, resta apenas a senha para sair pela porta da frente.
          <br>Digite <strong>sair</strong> na caixa de ação para tentar sair.
          <br>Você imagina que a senha está relacionada ao sangue extraído das vítimas do assassino.
          <br>O sangue que é usado para pintar essas telas macabras.
          `,
        };

        this.openDialog(modalText);
      }

      if (item == 'porta' || item == 'sair') {
        let modalText: modalText = {
          imgUrl: '../assets/itens/senha_atelie.png',
          dialogTitle: 'A porta de saída',
          dialogInnerText: `
            <em><strong>Pensamento:</strong> Posso tentar sair a qualquer instante, mas qual teria sido o objetivo de ter entrado?
            <br>Antes de sair, devo encontrar todas as pistas.</em>
            <br>Além disso, há uma senha para ser digitada em um dispositivo eletrônico.
            <br>A senha aparenta ser uma palavra de cinco letras. Uma anotação colada na parede diz:
            <br><strong>"A essência da beleza, responsável pela perfeição que corre nos corpos de indivíduos dignos de serem resgatados do tempo."</strong>
            `,
          hasInput: true,
        };
        this.openDialog(modalText);
      }

      // Se não encontrou o item digitado, abre um modal de erro
    } else {
      console.log('Item não encontrado: ' + item);
      var modalText: modalText = {
        dialogTitle: 'Item não encontrado',
        dialogInnerText: `O item que você procura não está disponível.
        <br>Verifique se você escreveu corretamente e tente novamente.
        <br>Ou, talvez, o nome para interagir com esse item seja diferente do que você está tentando.
        `,
      };

      this.openDialog(modalText);
    }
  }

  // Funções que são iniciadas quando o jogo começa
  ngOnInit(): void {
    // Abre o tutorial
    var modalText: modalText = {
      dialogTitle: 'Tutorial',
      dialogInnerText: `
        Olá, seja bem-vindo ao nosso jogo de Escape Room!
        <br>Você está trancado no ateliê de um serial killer e precisa encontrar provas para incriminá-lo, saindo do lugar antes que o tempo acabe.
        <br>Para interagir com um objeto no cenário, escreva o nome desse objeto na caixa de ação e dê ENTER.
        <br>Se o objeto existir, você irá interagir com ele.
        <br>Lembre-se:
        <ul>
        <li>Há apenas uma palavra por objeto no jogo. Ou seja, haverá apenas um “armário” no jogo;</li>
        <li>Não se esqueça da acentuação de algumas palavras;</li>
        <li>A tecla ESC encerra a interação com o objeto;</li>
        <li>Você pode usar a internet do seu computador para descobrir pistas de senhas;</li>
        <li>Para movimentar-se entre as salas, pressione as setas do teclado;</li>
        <li>Pressione a seta para baixo para abrir seu inventário de evidências;</li>
        <li>Para tentar sair a qualquer instante, digite <strong>sair</strong> na caixa de ação!</li>
        </ul>
        `,
    };

    // Segundo tutorial
    this.openDialog(modalText)
      .afterClosed()
      .subscribe((result) => {
        var modalText: modalText = {
          dialogTitle: 'Tutorial',
          dialogInnerText: `
          Seu celular está tocando!
          <br>Digite “<strong>celular</strong>” na caixa de ação para interagir com ele.
          <br>Para encerrar a interação, pressione <em>ESC</em>.
          <br>Boa sorte!
          `,
        };

        // Inicia o timer
        this.openDialog(modalText)
          .afterClosed()
          .subscribe((result) => {
            this.startTime = true;
          });
      });

    // Contagem paralela do timer, para verificar se o jogo deve acabar
    setInterval(() => {
      if (this.startTime) {
        this.timeLeft -= 1;

        if (this.timeLeft == 0) {
          this.gameOver = true;
        }

        if (this.gameOver) {
          this.atelieActive = false;
          this.exposicaoActive = false;
          this.vipActive = false;
          this.lavagemActive = false;
        }
      }
    }, 1000);
  }

  // Função que abre o modal de interação
  openDialog(modalText: modalText) {
    const dialogRef = this.dialog.open(ItemModalComponent, {
      data: {
        title: modalText.dialogTitle,
        innerText: modalText.dialogInnerText,
        imgUrl: modalText.imgUrl,
        hasInput: modalText.hasInput,
        password: modalText.password,
        maxWidth: '75vw',
      },
    });

    // Checa se a senha digitada está correta
    dialogRef.afterClosed().subscribe((result) => {
      console.log(this.password);
      if (this.password == 'beleza') {
        this.atelieLocked = false;
      }

      if (this.password == 'oxum') {
        this.lavagemLocked = false;
      }

      if (this.password == '1890') {
        this.vipLocked = false;
      }

      if (this.password == 'vitae') {
        this.exitLocked = false;
      }
    });
    return dialogRef;
  }

  // Fim do componente
}

// Enum para facilitar a leitura do teclado
export enum KEY_CODE {
  UP_ARROW = 38,
  DOWN_ARROW = 40,
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,
  ENTER = 13,
}
