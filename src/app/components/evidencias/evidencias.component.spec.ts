import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvidenciasComponent } from './evidencias.component';

describe('EvidenciasComponent', () => {
  let component: EvidenciasComponent;
  let fixture: ComponentFixture<EvidenciasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EvidenciasComponent]
    });
    fixture = TestBed.createComponent(EvidenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
