import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CutsceneIntroComponent } from './cutscene-intro.component';

describe('CutsceneIntroComponent', () => {
  let component: CutsceneIntroComponent;
  let fixture: ComponentFixture<CutsceneIntroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CutsceneIntroComponent]
    });
    fixture = TestBed.createComponent(CutsceneIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
