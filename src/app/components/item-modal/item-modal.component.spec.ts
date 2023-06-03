import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemModalComponent } from './item-modal.component';

describe('ItemModalComponent', () => {
  let component: ItemModalComponent;
  let fixture: ComponentFixture<ItemModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemModalComponent]
    });
    fixture = TestBed.createComponent(ItemModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
