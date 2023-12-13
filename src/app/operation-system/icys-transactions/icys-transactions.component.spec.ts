import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcysTransactionsComponent } from './icys-transactions.component';

describe('IcysTransactionsComponent', () => {
  let component: IcysTransactionsComponent;
  let fixture: ComponentFixture<IcysTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IcysTransactionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IcysTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
