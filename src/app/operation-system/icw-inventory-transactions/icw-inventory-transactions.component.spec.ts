import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcwInventoryTransactionsComponent } from './icw-inventory-transactions.component';

describe('IcwInventoryTransactionsComponent', () => {
  let component: IcwInventoryTransactionsComponent;
  let fixture: ComponentFixture<IcwInventoryTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IcwInventoryTransactionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IcwInventoryTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
