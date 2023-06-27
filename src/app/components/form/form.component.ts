import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent{
  btnText='Cadastrar';
  aText='Já possui cadastro clique aqui';
  estado=false;
   //Altera informações do formulario
   changeContent(estado:boolean){
    if(estado == true){
        this.btnText="Logar";
        this.aText="Não possui cadastro clique aqui"
      }else{
        this.btnText="Cadastrar"
        this.aText='Já possui cadastro clique aqui'
      }
      this.estado=!this.estado;


    }
}
