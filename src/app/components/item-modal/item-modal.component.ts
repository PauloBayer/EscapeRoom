import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  imgUrl?: string,
  title: string,
  innerText: string;
};

@Component({
  selector: 'app-item-modal',
  templateUrl: './item-modal.component.html',
  styleUrls: ['./item-modal.component.css']
})

export class ItemModalComponent {

  img = this.data.imgUrl;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

}
