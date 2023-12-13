import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsbTransferOwnerBuyerPreviewComponent } from './psb-transfer-owner-buyer-preview.component';

describe('PsbTransferOwnerBuyerPreviewComponent', () => {
  let component: PsbTransferOwnerBuyerPreviewComponent;
  let fixture: ComponentFixture<PsbTransferOwnerBuyerPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PsbTransferOwnerBuyerPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PsbTransferOwnerBuyerPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
