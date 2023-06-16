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
    'armario',
    'armarios',
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
    'papéis',
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

      // Se for uma evidência ou o jogador quiser sair, faz essa checagem

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

      if (item == 'jornal' || item == 'jornais') {
        let modalText: modalText = {
          imgUrl: '../assets/itens/jornal.png',
          dialogTitle: 'MANCHETE: Modelo desaparece',
          dialogInnerText: `
            <em><strong>Pensamento:</strong>Pessoas bonitas... sempre foi o padrão.</em>
            `,
          hasInput: false,
        };
        this.openDialog(modalText);
      }

      if (item == 'tapete') {
        let modalText: modalText = {
          imgUrl: '../assets/itens/tapete.png',
          dialogTitle: 'Tapete',
          dialogInnerText: `
            Uma mancha de sangue se encontra no canto do tapete.
            <br>Será que pertence a alguma vítima ou o pintor se acidentou?
            <br><em><strong>Pensamento:</strong>Foto tirada. Evidência adicionada.</em>
            `,
          hasInput: false,
        };
        this.openDialog(modalText);
      }

      if (item == 'armário' || item == 'armario' || item == 'armários' || item == 'armarios' || item == 'livro' || item == 'livros') {
        let modalText: modalText = {
          dialogTitle: 'Armário de livros',
          dialogInnerText: `
            Existem diversos livros de mitologias diferentes.
            <br><ul>
            <li>Deuses da mitologia grega</li>
            <li>Deuses da cultura eslava</li>
            <li>Dentre outros</li>
            <br>Porém, <strong>acima de todos</strong>, está um livro em detaque: "Deuses da beleza de matrizes africanas".
            <br><em><strong>Pensamento:</strong>Isso pode ser importante, mas vou perder muito tempo se tiver que ler esses livros.
            <br>Uma busca na internet deve tornar tudo muito mais rápido.</em>
            `,
          hasInput: false,
        };
        this.openDialog(modalText);
      }

      if (item == 'estante' || item == 'estantes') {
        let modalText: modalText = {
          dialogTitle: 'Estante',
          dialogInnerText: `
            Uma estante repleta de livros.
            <br>Estranhamente, todos pertencem ao Oscar Wilde.
            <br>É como se o suspeito tivesse lido algo dele e se inspirado de tal forma que acabou adquirindo a obra completa.
            <br><em><strong>Pensamento:</strong>Isso pode ser importante, mas vou perder muito tempo se tiver que ler esses livros.
            <br>Conhecer isso sobre o assassino pode me ajudar em algo.</em>
            `,
          hasInput: false,
        };
        this.openDialog(modalText);
      }

      if (item == 'palheta') {
        let modalText: modalText = {
          dialogTitle: 'Palheta',
          dialogInnerText: `
          Uma palheta de madeira, já sem tinta.
          <br>Ela apresenta algumas lascas e rachaduras em alguns pontos.
          <br>Quase como se tivesse sido usada como arma de contusão em alguém.
            `,
          hasInput: false,
        };
        this.openDialog(modalText);
      }

      if (item == 'pincel' || item == 'pincéis' || item == 'pinceis') {
        let modalText: modalText = {
          dialogTitle: 'Pincel',
          dialogInnerText: `
            Um pincel usado com tinta vermelha, estranhamente pegajosa e seca.
            <br><em><strong>Pensamento:</strong>Isso é tinta... certo? Evidência coletada.</em>
            `,
          hasInput: false,
        };
        this.openDialog(modalText);
      }

      if (item == 'cavalete') {
        let modalText: modalText = {
          dialogTitle: 'cavalete',
          dialogInnerText: `
          Um cavalete comum. Firme. Robusto. Nada além disso.
            `,
          hasInput: false,
        };
        this.openDialog(modalText);
      }

      if (item == 'tela' || item == 'telas') {
        let modalText: modalText = {
          dialogTitle: 'Tela',
          dialogInnerText: `
          O esboço do retrato de um homem, sendo preparado para pintura.
          <br>Estranhamente, é muito similar à última vítima que desapareceu, um YouTuber de moda.
            `,
          hasInput: false,
        };
        this.openDialog(modalText);
      }

      if (item == 'quadro' || item == 'quadros') {
        let modalText: modalText = {
          dialogTitle: 'Quadro',
          imgUrl: '../assets/itens/quadro.png',
          dialogInnerText: `
          Pendurado na parede, está o quadro <em>"Metamorfose de Narciso"</em>.
          <br>Provavelmente uma réplica de Salvador Dalí.
          <br>É o único quadro pendurado nessa sala, no ateliê de um pintor.
          <br>Abaixo, está uma anotação colada à parede:
          <br><strong><em>"Não podendo admirar e transmitir a imensidão de minha própria beleza, sou condenado a procurar por resquícios dela em outros."</em></strong>
          `,
          hasInput: false,
        };
        this.openDialog(modalText);
      }

      if (item == 'tanque') {
        let modalText: modalText = {
          dialogTitle: 'Tanque',
          dialogInnerText: `
          Um tanque de lavagem de telas.
          <br>Está completamente avermelhado próximo ao ralo.  
          `,
          hasInput: false,
        };
        this.openDialog(modalText);
      }

      if (item == 'toalha' || item == 'toalhas') {
        let modalText: modalText = {
          dialogTitle: 'Toalhas',
          dialogInnerText: `
          Apesar de haver toalhas penduradas para secagem, outras estão enroladas como se fossem... mordaças.
          <br>Você não sabe se está projetando sua vontade de incriminar o suspeito ou se é apenas uma extrema coincidência.
          `,
          hasInput: false,
        };
        this.openDialog(modalText);
      }

      if (item == 'faca' || item == 'facas') {
        let modalText: modalText = {
          dialogTitle: 'Faca',
          dialogInnerText: `
          Uma faca de cozinha sobre o balcão.
          <br>Seu fio está extremamente afiado.
          `,
          hasInput: false,
        };
        this.openDialog(modalText);
      }

      if (item == 'roupa' || item == 'roupas') {
        let modalText: modalText = {
          dialogTitle: 'Roupas',
          dialogInnerText: `
          Há uma série de roupas jogadas por todos os lados.
          <br>Uma análise mais minuciosa revela que elas são dos mais variados tamanhos, incluindo roupas femininas e masculinas.
          <br>Todas estão lavadas e secas.
          <br><em><strong>Pensamento:</strong>Aposto que devem pertencer à vítimas.
          <br>Não tenho como levar todas, então é melhor fotografar.
          <br>Foto tirada. Evidência coletada.</em>
          `,
          hasInput: false,
        };
        this.openDialog(modalText);
      }

      if (item == 'lixo' || item == 'lixeira') {
        let modalText: modalText = {
          dialogTitle: 'Lixeira',
          dialogInnerText: `
          Dentro da lixeira há um amontoado enorme de papel-filme jogado fora.
          <br>Você vascula nele e descobre que está embebedado em sangue seco.
          <br>Se sua hipótese estiver correta, é o material usado pelo assassino para impedir sujeira excessiva de sangue nos móveis e no aposento.
          <br><em><strong>Pensamento:</strong>Foto tirada. Evidência coletada.</em>
          `,
          hasInput: false,
        };
        this.openDialog(modalText);
      }

      if (item == 'torneira' || item == 'torneiras') {
        let modalText: modalText = {
          dialogTitle: 'Torneira',
          dialogInnerText: `
          Uma torneira de água comum. Abaixo, há alguns copos.
          <br>Será que é o único jeito de se conseguir beber água nesse lugar?
          `,
          hasInput: false,
        };
        this.openDialog(modalText);
      }

      if (item == 'papel' || item == 'papeis' || item == 'papéis') {
        let modalText: modalText = {
          dialogTitle: 'Papéis',
          dialogInnerText: `
          Uma série de papéis e rascunhos de frases, jogadas no chão.
          <br>Você consegue ler alguns:
          <br><br><h3><em>"Deve haver algum jeito... Eu preciso descobrir"</em></h3>
          <br><h2><em>"Eu preciso, eu PRECISO preservar a beleza"</em></h2>
          <br><h1><em>"Eu ODEIO que eles envelhecem, murcham e morrem"</em></h1>
          `,
          hasInput: false,
        };
        this.openDialog(modalText);
      }

      if (item == 'caderno' || item == 'cadernos') {
        let modalText: modalText = {
          dialogTitle: 'Caderno',
          dialogInnerText: `
          Um caderno de anotações do pintor.
          <br>Você folheia as páginas, mas apenas algumas estão escritas:
          <br><br>
          <h3><em>"Eu quis preservar a beleza deles. Quis salvá-los do envelhecimento."</em></h3>
          <br><h2><em>"Para isso, preciso preservá-los no tempo. Guardar sua iamgem. Salvar sua beleza."</em></h2>
          <br><h1><em>"Essa é a intenção das minhas obras. Os meus retratos são meu manifesto contra o tempo."</em></h1>
          `,
          hasInput: false,
        };
        this.openDialog(modalText);
      }

      if (item == 'preteleira' || item == 'preteleiras') {
        let modalText: modalText = {
          dialogTitle: 'Prateleira',
          dialogInnerText: `
          Uma prateleira repleta de <strong>frascos</strong> de tintas.
          <br>Todas estão nomeadas de acordo com a cor e o material com a qual foi feita.
          <br>Será que esse pintor faz suas próprias tintas?
          `,
          hasInput: false,
        };
        this.openDialog(modalText);
      }

      if (item == 'frasco' || item == 'frascos') {
        let modalText: modalText = {
          dialogTitle: 'Frasco',
          dialogInnerText: `
          Você pega um frasco em específico.
          <br>Alguns possuem etiquetas como "Violeta. Feito com pétalas de Jasmine".
          <br>Entretanto, seus olhos saltam quando você pega da prateleira um frasco rubro, nomeado apenas com uma única palavra:
          <br><h1>Vitae</h1>
          <br><em><strong>Pensamento:</strong> Eu preciso desse frasco. ELe pode ser minha saída desse lugar.
          <br>Evidência coletada.</em>
          `,
          hasInput: false,
        };
        this.openDialog(modalText);
      }

      if (item == 'varal') {
        let modalText: modalText = {
          dialogTitle: 'Varal',
          dialogInnerText: `
          Um varal de secagem de pinturas.
          <br>Há quadros aqui que parecem terem sido pintadas há muito tempo, e alguns mais recentes.
          <br>Todos eles possuem uma coisa em comum: são retratos dos desaparecidos.
          <br>Seu coração sobe à boca, há poucas coisas mais suspeitas que isso.
          <br><em><strong>Pensamento:</strong> Vou tirar fotos de cada um desses retratos. Evidência coletada.</em>
          `,
          hasInput: false,
        };
        this.openDialog(modalText);
      }

      if (item == 'cesta' || item == 'caixa' || item == 'caixas') {
        let modalText: modalText = {
          dialogTitle: 'Cesta',
          dialogInnerText: `
          Jogados juntos, há 8 celulares amontoados, todos deslizados - talvez, sem bateria.
          <br>Um número estranho para uma única pessoa possuir.
          <br>Tudo indica que podem ser das vítimas.
          `,
          hasInput: false,
        };
        this.openDialog(modalText);
      }

      if (item == 'janela' || item == 'janelas') {
        let modalText: modalText = {
          dialogTitle: 'Frasco',
          dialogInnerText: `
          Uma janela para ventilação comum.
          <br>Porém, essa foi fechada definitivamente.
          <br>O batente está fechado de tal forma que não é mais possível abri-lo sem quebrá-lo.
          <br>Será que o pintor não gostaria que pessoas de fora pudessem ver seu trabalho?
          `,
          hasInput: false,
        };
        this.openDialog(modalText);
      }

      if (item == 'câmera' || item == 'camera' || item == 'cameras' || item == 'câmeras') {
        let modalText: modalText = {
          dialogTitle: 'Câmera',
          dialogInnerText: `
          Uma câmera fotográfica quebrada, jogada em um canto.
          <br>Parece que o artista tentou experimentar com fotografia antes das pinturas, mas não ficou satisfeito com o resultado.
          `,
          hasInput: false,
        };
        this.openDialog(modalText);
      }

      if (item == 'cadeira' || item == 'cadeiras') {
        let modalText: modalText = {
          dialogTitle: 'Cadeira',
          dialogInnerText: `
          Uma cadeira virada dentro da sala. Parece robusta, muito difícil de ser quebrada.
          `,
          hasInput: false,
        };
        this.openDialog(modalText);
      }

      if (item == 'corda' || item == 'cordas') {
        let modalText: modalText = {
          dialogTitle: 'Cordas',
          dialogInnerText: `
          Uma série de cordas firmes, entrelaçadas em diversos nós.
          <br>Teriam sido usadas para imobilizar as vítimas?
          `,
          hasInput: false,
        };
        this.openDialog(modalText);
      }

      if (item == 'estátua' || item == 'estátuas' || item == 'estatua' || item == 'estatuas') {
        let modalText: modalText = {
          dialogTitle: 'Estátua',
          dialogInnerText: `
          Uma bela escultura de duas pessoas se abraçando. Abaixo, está escrito:
          <br><em>"Uma ode à beleza"</em>
          `,
          hasInput: false,
        };
        this.openDialog(modalText);
      }

      if (item == 'vaso' || item == 'planta' || item == 'plantas') {
        let modalText: modalText = {
          dialogTitle: 'Planta',
          dialogInnerText: `
          No grande vaso, está uma Calla Lily, também conhecida como Copo-de-Leite.
          <br>É uma flor conhecida por sua grandiosidade e beleza.
          `,
          hasInput: false,
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
        <br>Ou, talvez, a palavra para interagir com esse item seja diferente do que você está tentando.
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
