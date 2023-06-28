import { Component, Input } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import { ItemModalComponent } from '../item-modal/item-modal.component';

interface modalText {
  dialogTitle: string,
  dialogInnerText: string,
  imgUrl?: string,
  hasInput?: boolean,
}

@Component({
  selector: 'app-help-button',
  templateUrl: './help-button.component.html',
  styleUrls: ['./help-button.component.css']
})
export class HelpButtonComponent {

  tutorial = {

    dialogTitle: "Tutorial",
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
    `
  };
  @Input() loginUser!: string;

  constructor(public dialog: MatDialog) { }

  openDialog(modalText: modalText) {
    const dialogRef = this.dialog.open(ItemModalComponent, {
      data: {
        title: modalText.dialogTitle,
        innerText: modalText.dialogInnerText
      },
    });

    return dialogRef;
  }
}
