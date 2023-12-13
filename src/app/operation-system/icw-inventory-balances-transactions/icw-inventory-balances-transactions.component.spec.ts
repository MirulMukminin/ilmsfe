import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcwInventoryBalancesTransactionsComponent } from './icw-inventory-balances-transactions.component';

describe('IcwInventoryBalancesTransactionsComponent', () => {
  let component: IcwInventoryBalancesTransactionsComponent;
  let fixture: ComponentFixture<IcwInventoryBalancesTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IcwInventoryBalancesTransactionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IcwInventoryBalancesTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
