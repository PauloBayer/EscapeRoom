import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CutsceneEndComponent } from './cutscene-end.component';

describe('CutsceneEndComponent', () => {
  let component: CutsceneEndComponent;
  let fixture: ComponentFixture<CutsceneEndComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CutsceneEndComponent]
    });
    fixture = TestBed.createComponent(CutsceneEndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
