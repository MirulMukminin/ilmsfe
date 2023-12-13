import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CwcyCyTransactionsComponent } from './cwcy-cy-transactions.component';

describe('CwcyCyTransactionsComponent', () => {
  let component: CwcyCyTransactionsComponent;
  let fixture: ComponentFixture<CwcyCyTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CwcyCyTransactionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CwcyCyTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
