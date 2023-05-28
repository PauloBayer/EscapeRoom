import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtelieComponent } from './atelie.component';

describe('AtelieComponent', () => {
  let component: AtelieComponent;
  let fixture: ComponentFixture<AtelieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AtelieComponent]
    });
    fixture = TestBed.createComponent(AtelieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
