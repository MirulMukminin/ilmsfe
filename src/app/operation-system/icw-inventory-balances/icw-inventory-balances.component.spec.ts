import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcwInventoryBalancesComponent } from './icw-inventory-balances.component';

describe('IcwInventoryBalancesComponent', () => {
  let component: IcwInventoryBalancesComponent;
  let fixture: ComponentFixture<IcwInventoryBalancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IcwInventoryBalancesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IcwInventoryBalancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
