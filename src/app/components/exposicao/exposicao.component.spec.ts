import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExposicaoComponent } from './exposicao.component';

describe('ExposicaoComponent', () => {
  let component: ExposicaoComponent;
  let fixture: ComponentFixture<ExposicaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExposicaoComponent]
    });
    fixture = TestBed.createComponent(ExposicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
