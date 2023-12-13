import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerConfirmationComponent } from './buyer-confirmation.component';

describe('BuyerConfirmationComponent', () => {
  let component: BuyerConfirmationComponent;
  let fixture: ComponentFixture<BuyerConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyerConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
