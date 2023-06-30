import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Jogador } from 'src/app/interfaces/jogador';
import { JogadorService } from 'src/app/jogador.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor(private jogadorService: JogadorService) {};
  
  btnText='Cadastrar';
  aText='Já possui cadastro clique aqui';
  cadastro=true;
  senha = '';
  login = '';
  jogadores: Jogador[] = [];
  error = '';
  success = '';
  jogador: Jogador = { idJogador: Math.floor(Math.random() * 100000000), login: "", senha: "" };
  checkLogin?: boolean = true;
  @Input() loggedIn!: boolean;
  @Output() loggedInChange = new EventEmitter<boolean>();
  @Input() loginUser!: string;
  @Output() loginUserChange = new EventEmitter<string>();
  @Input() idUser!: number;
  @Output() idUserChange = new EventEmitter<number>();
  
  ngOnInit(): void {
    this.getJogadores();
  }

  resetAlerts() {
    this.error = '';
    this.success = '';
  }

  addJogador(f: NgForm) {
    if (this.cadastro) {

      // Cadastro process
      this.jogador.idJogador = Math.floor(Math.random() * 100000000);
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
        
        this.loggedIn = true;
        this.loggedInChange.emit(this.loggedIn);
        this.loginUser = this.jogador.login;
        this.loginUserChange.emit(this.loginUser);
        this.idUser = this.jogador.idJogador;
        this.idUserChange.emit(this.idUser);
    } else {

      // Loggin process
      for (let i = 0; i < this.jogadores.length; i++) {
        if (this.jogadores[i].login == this.jogador.login && this.jogadores[i].senha == this.jogador.senha) {
          this.loggedIn = true;
          this.loggedInChange.emit(this.loggedIn);
          this.loginUser = this.jogador.login;
          this.loginUserChange.emit(this.loginUser);
          this.idUser = this.jogadores[i].idJogador!;
          this.idUserChange.emit(this.idUser);
          this.checkLogin = true;
          break;
        }
        this.checkLogin = false;
      }
    }
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

   //Altera informações do formulario
   changeContent(cadastro:boolean){

    if(cadastro == true){
        this.btnText="Logar";
        this.aText="Não possui cadastro clique aqui"
      }else{
        this.btnText="Cadastrar"
        this.aText='Já possui cadastro clique aqui'
      }
      this.cadastro=!this.cadastro;
    }
}
