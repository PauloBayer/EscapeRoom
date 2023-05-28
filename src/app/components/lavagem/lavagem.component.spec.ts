import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LavagemComponent } from './lavagem.component';

describe('LavagemComponent', () => {
  let component: LavagemComponent;
  let fixture: ComponentFixture<LavagemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LavagemComponent]
    });
    fixture = TestBed.createComponent(LavagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
