import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PasswordService } from 'src/app/services/password.service';
import { MatDialogRef } from '@angular/material/dialog';

export interface DialogData {
  imgUrl: string;
  title: string;
  innerText: string;
  hasInput?: boolean;
  password?: string;
}

@Component({
  selector: 'app-item-modal',
  templateUrl: './item-modal.component.html',
  styleUrls: ['./item-modal.component.css'],
})
export class ItemModalComponent {
  inputText: string = '';
  password: string = '';
  labelInput: string = 'Digite a senha e aperte o botão abaixo';

  enterPassword() {
    this.password = this.inputText.toLowerCase();

    if (this.inputText != '') {
      if (this.password == 'beleza') {
        this.labelInput = 'Porta destrancada! Feche essa janela.';
      } else if (this.password == 'oxum') {
        this.labelInput = 'Porta destrancada! Feche essa janela.';
      } else if (this.password == '1890') {
        this.labelInput = 'Porta destrancada! Feche essa janela.';
      } else if (this.password == 'vitae') {
        this.labelInput =
          'Parabéns! Você desbloqueou a saída. O jogo encerrará agora. Feche essa janela.';
      } else {
        this.labelInput = 'Senha incorreta. Tente novamente.';
      }
    }

    this.passwordService.setPassword(this.password);
  }

  onNoClick(): void {
    this.dialogRef.close(this.password);
  }

  ngOnInit(): void {
    this.passwordService
      .getPasswordObservable()
      .subscribe((password: string) => {
        this.password = password;
      });
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<ItemModalComponent>,
    private passwordService: PasswordService
  ) {}
}
