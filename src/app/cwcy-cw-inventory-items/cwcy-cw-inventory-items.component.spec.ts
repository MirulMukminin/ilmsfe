import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CwcyCwInventoryItemsComponent } from './cwcy-cw-inventory-items.component';

describe('CwcyCwInventoryItemsComponent', () => {
  let component: CwcyCwInventoryItemsComponent;
  let fixture: ComponentFixture<CwcyCwInventoryItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CwcyCwInventoryItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CwcyCwInventoryItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
