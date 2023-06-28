import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cutscene-intro',
  templateUrl: './cutscene-intro.component.html',
  styleUrls: ['./cutscene-intro.component.css']
})
export class CutsceneIntroComponent {

  blackCutscene = false;
  cutscene: number = 1;
  @Input() cutsceneOver = false;
  @Output() cutsceneOverChange = new EventEmitter<boolean>();

  text1 = `A polícia continua sua investigação a respeito da onda de desaparecimentos que assola a cidade. Cada vez
  mais homens e mulheres saem de casa e nunca mais retornam para suas famílias, deixando um rastro de
  preocupação e angústia. A taxa de desaparecidos subiu alarmantemente, registrando um aumento de cerca de
  400% em comparação com o último ano.<br><br>
  A cidade que antes era conhecida por sua tranquilidade e segurança agora se encontra imersa em um clima de
  incerteza. As famílias estão abaladas, vivendo em constante apreensão e desespero. Cada novo desaparecimento
  gera um sentimento de impotência e medo, enquanto a polícia trabalha incansavelmente para desvendar os
  mistérios por trás dessas ocorrências perturbadoras.<br><br>
  Apesar da complexidade e da falta de pistas concretas, a polícia mantém a esperança de resolver esse enigma
  e trazer respostas às famílias aflitas. Várias hipóteses estão sendo consideradas, desde sequestros até a
  possibilidade de um assassino em série estar atuando na região. No entanto, até o momento, nenhuma linha de
  investigação se mostrou definitiva.<br><br>
  Enquanto a busca prossegue, a comunidade clama por respostas e por uma solução para esse problema que tem
  abalado a todos. A cidade está em constante alerta, com a esperança de que cada novo dia traga notícias
  positivas e que os desaparecidos sejam encontrados sãos e salvos.<br><br>
  Nesse clima de tensão, as autoridades reforçam a importância de tomar precauções básicas de segurança, como
  evitar locais desconhecidos ou mal iluminados, compartilhar itinerários com familiares e amigos, e relatar
  qualquer informação suspeita às autoridades competentes. A colaboração da população é fundamental para
  auxiliar nas investigações e na busca pelos desaparecidos.`
  title1 = `PESSOAS DESAPARECIDAS`
  date1 = `York, MA - Thursday August 30, 2008 - Seven Pages`

  text2 = `Novos restos de cadáveres foram encontrados de forma macabra em uma sarjeta aberta no subúrbio da cidade, 
  acrescentando um novo capítulo sombrio à série de desaparecimentos que tem assolado a região nos últimos meses.
  Os resultados dos testes de DNA confirmaram que as vítimas são quatro indivíduos que estavam registrados como desaparecidos. 
  Um padrão perturbador começa a surgir: todas as vítimas eram jovens.<br><br>
  A descoberta dos corpos, tão brutalmente descartados em uma sarjeta, lançou a investigação policial em uma nova fase intensa. 
  Os detetives estão examinando cada detalhe, em busca de pistas que possam levar à identificação do responsável por esses assassinatos terríveis.<br><br> 
  A polícia reconhece que, até o momento, trabalha apenas com suposições, mas os elementos em comum entre as vítimas 
  jovens levantam questionamentos preocupantes sobre a possível existência de um assassino em série.
  A polícia está analisando minuciosamente os registros dos desaparecidos, examinando suas atividades recentes, 
  círculo social e quaisquer outros elementos que possam lançar luz sobre os eventos que levaram às suas mortes trágicas.<br><br>
  A comunidade, mergulhada na incerteza e no luto, espera desesperadamente que a polícia desvende o mistério por trás
   desses crimes hediondos e coloque um fim ao pesadelo que assola a cidade. Enquanto isso, a cidade permanece em alerta, 
   com cada pessoa mantendo um olhar atento sobre seus entes queridos, na esperança de que nenhum outro jovem se torne 
   vítima desse assassino cruel e impiedoso.`
  title2 = `RESTOS ENCONTRADOS`
  date2 = `York, MA - Monday November 10, 2008 - Seven Pages`

  text3 = `A cidade está em estado de alerta diante da trágica confirmação de que um serial killer está à solta. 
  A onda de desaparecimentos que assombra a região nos últimos tempos trouxe consigo um sentimento de medo e insegurança. 
  A população está angustiada com a ideia de que um assassino impiedoso está à solta, escolhendo suas vítimas e deixando 
  um rastro de sofrimento e incerteza.<br><br>
  Embora a existência do serial killer seja praticamente dada como certa, a polícia enfrenta enormes dificuldades na busca 
  por pistas e na identificação do culpado. O número impressionante de crimes torna a investigação complexa, exigindo um 
  trabalho minucioso para conectar os pontos e traçar um perfil do assassino em série. A falta de padrões claros nos 
  desaparecimentos e nas vítimas aumenta ainda mais a complexidade da investigação, dificultando a definição de um modus 
  operandi específico.<br><br>
  A polícia está sob pressão constante para resolver esse caso, pois a comunidade clama por justiça e segurança. 
  Esforços massivos estão sendo empregados para coletar evidências, analisar dados, entrevistar testemunhas e correlacionar 
  informações. Detetives experientes, especialistas forenses e psicólogos criminais estão unindo forças para desvendar os 
  segredos que envolvem o assassino.<br><br>
  A esperança é que, em breve, a investigação dê resultados concretos, trazendo um alívio tão necessário para aqueles que perderam entes 
  queridos e para toda a cidade que está mergulhada no temor do próximo ataque do serial killer. A polícia, ciente da urgência 
  da situação, intensificará seus esforços, utilizando todos os recursos disponíveis para capturar o assassino e trazer um fim a 
  essa terrível saga de desaparecimentos e mortes.`
  title3 = `SERIAL KILLER À SOLTA`
  date3 = `York, MA - Sunday December 29, 2008 - Seven Pages`
  
  text4 = `No dia de hoje, o porta-voz oficial da polícia surpreendeu a imprensa ao anunciar o encerramento das investigações 
  dos desaparecimentos frequentes que assolaram a cidade ao longo do último ano. De acordo com a declaração, a falta de provas 
  concretas levou a polícia a classificar a investigação como "inconclusiva". A notícia gerou revolta entre os parentes das 
  vítimas, que esperavam respostas e justiça. Em meio ao alvoroço das redes sociais, a chefe de polícia concedeu uma entrevista 
  exclusiva para esclarecer a situação. A matéria completa pode ser conferida na página 3.<br><br>
  O anúncio do encerramento das investigações por falta de provas deixou a comunidade chocada e frustrada. Durante meses, a 
  cidade viveu um clima de medo e apreensão devido aos numerosos desaparecimentos, e agora os parentes das vítimas se veem 
  sem respostas ou um senso de justiça. A notícia se espalhou rapidamente pelas redes sociais, gerando um alvoroço e uma onda 
  de indignação.<br><br>
  Em meio à controvérsia, a chefe de polícia decidiu enfrentar as críticas e concedeu uma entrevista exclusiva para abordar 
  as preocupações da população. Na entrevista, ela expressou sua compreensão pelo sentimento de revolta das famílias e assegurou 
  que todas as medidas possíveis foram tomadas durante as investigações. Ela explicou que, apesar de todos os esforços empregados, 
  as evidências e pistas disponíveis não foram suficientes para estabelecer uma conclusão sólida e identificar os responsáveis 
  pelos desaparecimentos.<br><br>
  A chefe de polícia enfatizou que a decisão de encerrar as investigações foi tomada com base na análise meticulosa dos dados 
  coletados, dos depoimentos e das evidências forenses. Ela ressaltou que, embora as investigações tenham sido encerradas, a 
  polícia permanecerá vigilante e pronta para reabri-las caso novas informações relevantes surjam no futuro.
  Enquanto a polícia lida com as repercussões dessa notícia impactante, a cidade se depara com uma sensação de desamparo e 
  insegurança. A esperança de que a verdade seja revelada e que os responsáveis pelos desaparecimentos sejam levados à justiça 
  fica abalada.`
  title4 = `FIM DAS INVESTIGAÇÕES`
  date4 = `York, MA - Wednesday March 09, 2009 - Seven Pages`

  pensamento1 = `<h6><em>“Você não acreditou quando ouviu…”</em></h6><br><br>
  <h5><em>“As investigações foram encerradas.”</em></h5><br><br>
  <h4><em>“O maldito sairia impune.”</em></h4><br><br>
  <h3><em>“Livre”</em></h3><br><br>
  `
  pensamento2 = `<h5><em>“O Assassino de Modelos. O Carniceiro da Beleza. O Estripador Elegante. Ele foi chamado de muitos apelidos.”</em></h5><br><br>
  <h5><em>“E você tinha a sua suspeita. Sabia quem poderia ser. Porém, o maior suspeito se livrou quando sua casa foi revistada e nada foi encontrado.”</em></h5><br><br>
  <h5><em>“Mas algo dentro de você sabia. Um instinto perigoso de ser seguido. Imoral, mas audacioso. Você o encontrou e o seguiu até seu ateliê de artista.”</em></h5><br><br>
  `
  pensamento3 = `<h5><em>“Você aproveitou um momento de distração. O artista da cidade era sua maior suspeita. Seu ateliê, o único aposentado imaculado, não revistado pela polícia. As provas só poderiam estar ali.”</em></h5><br>
  <h5><em>“Tendo a vantagem de uma porta destrancada, você entrou no ateliê e se escondeu. Aguardou ansiosamente por longos minutos, tentando controlar a respiração e com medo de que seus batimentos cardíacos fossem audíveis o suficiente para revelar sua posição.”</em></h5><br>
  <h5><em>“Finalmente, o pintor bufou insatisfeito, entrou em alguma espécie de insatisfação catártica, provavelmente culpando-se por ter esquecido de fazer algo, e saiu às pressas do ateliê.”</em></h5><br>
  `
  pensamento4 = `<h5><em>“Seu maior suspeito foi embora. Entretanto, você tem certeza de que não possui muito tempo. Logo, ele voltará.”</em></h5><br>
  <h5><em>“Mesmo assim, você está diante da maior oportunidade que já teve. Antes que ele volte, você precisa encontrar provas suficientes de seus crimes. Você precisa saber que seu instinto estava certo. Você precisa incriminá-lo.”</em></h5><br>
  <h4><em>“E, claro, depois disso, precisa conseguir sair pela porta da frente”.</em></h4><br>
  `

  textOnDisplay: string = this.text1;
  titleOnDisplay: string = this.title1;
  dateOnDisplay: string = this.date1;
  pensamento: string = this.pensamento1;

  nextCutscene() {
    this.cutscene++;
    console.log(this.cutscene);

    if (this.cutscene === 2) {
      this.textOnDisplay = this.text2;
      this.titleOnDisplay = this.title2;
      this.dateOnDisplay = this.date2;
    }

    if (this.cutscene === 3) {
      this.textOnDisplay = this.text3;
      this.titleOnDisplay = this.title3;
      this.dateOnDisplay = this.date3;
    }

    if (this.cutscene === 4) {
      this.textOnDisplay = this.text4;
      this.titleOnDisplay = this.title4;
      this.dateOnDisplay = this.date4;
    }

    if (this.cutscene === 5) {
      this.blackCutscene = true;
    }

    if (this.cutscene === 6) {
      this.pensamento = this.pensamento2;
    }

    if (this.cutscene === 7) {
      this.pensamento = this.pensamento3;
    }

    if (this.cutscene === 8) {
      this.pensamento = this.pensamento4;
    }

    if (this.cutscene === 9) {
      this.cutsceneOver = true;
      this.cutsceneOverChange.emit(this.cutsceneOver);
    }
  }
}
