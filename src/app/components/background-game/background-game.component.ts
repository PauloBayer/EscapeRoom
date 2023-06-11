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
  constructor(
    public dialog: MatDialog,
    private passwordService: PasswordService
  ) {
    this.password = this.passwordService.getPassword();
  }

  modalText?: modalText;
  atelieActive = false;
  exposicaoActive = true;
  lavagemActive = false;
  vipActive = false;
  evidenciasActive = false;
  atelieLocked = true;
  lavagemLocked = true;
  vipLocked = true;
  password = 'teste';

  printPass() {
    console.log(this.password);
  }

  startTime = false;

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
  ];

  @Input() handleEvent($event: CountdownEvent): void {
    var timeLeft = $event.left;
  }

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
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
    } else if (event.keyCode == KEY_CODE.UP_ARROW) {
      console.log(event);
      if (this.atelieActive) {
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
      }
    } else if (event.keyCode == KEY_CODE.RIGHT_ARROW) {
      console.log(event);
      if (this.atelieActive) {
        this.atelieActive = false;
        this.exposicaoActive = true;
      } else if (this.vipActive) {
        this.vipActive = false;
        this.atelieActive = true;
      }
    } else if (event.keyCode == KEY_CODE.LEFT_ARROW) {
      if (this.atelieActive) {
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
        this.openDialog(modalText)
          .afterClosed()
          .subscribe((result) => {});
      }
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

  activateItem(item: string) {
    let encontrouItem = this.itens.includes(item);

    if (encontrouItem) {
      console.log('Item encontrado: ' + item);
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

  ngOnInit(): void {
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
        this.openDialog(modalText)
          .afterClosed()
          .subscribe((result) => {
            this.startTime = true;
          });
      });
  }

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

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
    return dialogRef;
  }

  // Fim do componente
}

export enum KEY_CODE {
  UP_ARROW = 38,
  DOWN_ARROW = 40,
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,
  ENTER = 13,
}
