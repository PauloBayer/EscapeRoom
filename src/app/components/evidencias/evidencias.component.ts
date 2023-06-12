import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-evidencias',
  templateUrl: './evidencias.component.html',
  styleUrls: ['./evidencias.component.css'],
})
export class EvidenciasComponent {
  @Input() evidence1?: boolean;
  @Input() evidence2?: boolean;
  @Input() evidence3?: boolean;
  @Input() evidence4?: boolean;
  @Input() evidence5?: boolean;
  @Input() evidence6?: boolean;
}
