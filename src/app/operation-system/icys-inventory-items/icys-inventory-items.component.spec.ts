import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcysInventoryItemsComponent } from './icys-inventory-items.component';

describe('IcysInventoryItemsComponent', () => {
  let component: IcysInventoryItemsComponent;
  let fixture: ComponentFixture<IcysInventoryItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IcysInventoryItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IcysInventoryItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
