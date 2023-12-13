import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsbTransferOwnerSellerPreviewComponent } from './psb-transfer-owner-seller-preview.component';

describe('PsbTransferOwnerSellerPreviewComponent', () => {
  let component: PsbTransferOwnerSellerPreviewComponent;
  let fixture: ComponentFixture<PsbTransferOwnerSellerPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PsbTransferOwnerSellerPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PsbTransferOwnerSellerPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
