import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundGameComponent } from './background-game.component';

describe('BackgroundGameComponent', () => {
  let component: BackgroundGameComponent;
  let fixture: ComponentFixture<BackgroundGameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BackgroundGameComponent]
    });
    fixture = TestBed.createComponent(BackgroundGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
