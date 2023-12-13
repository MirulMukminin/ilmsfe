import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsbTransferOwnerSellerFormComponent } from './psb-transfer-owner-seller-form.component';

describe('PsbTransferOwnerSellerFormComponent', () => {
  let component: PsbTransferOwnerSellerFormComponent;
  let fixture: ComponentFixture<PsbTransferOwnerSellerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PsbTransferOwnerSellerFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PsbTransferOwnerSellerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
