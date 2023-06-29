import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndSceenComponent } from './end-sceen.component';

describe('EndSceenComponent', () => {
  let component: EndSceenComponent;
  let fixture: ComponentFixture<EndSceenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EndSceenComponent]
    });
    fixture = TestBed.createComponent(EndSceenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
