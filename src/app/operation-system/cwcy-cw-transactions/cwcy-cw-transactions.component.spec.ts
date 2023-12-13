import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CwcyCwTransactionsComponent } from './cwcy-cw-transactions.component';

describe('CwcyCwTransactionsComponent', () => {
  let component: CwcyCwTransactionsComponent;
  let fixture: ComponentFixture<CwcyCwTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CwcyCwTransactionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CwcyCwTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
