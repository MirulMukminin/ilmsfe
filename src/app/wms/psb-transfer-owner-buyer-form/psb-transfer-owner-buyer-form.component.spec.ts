import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsbTransferOwnerBuyerFormComponent } from './psb-transfer-owner-buyer-form.component';

describe('PsbTransferOwnerBuyerFormComponent', () => {
  let component: PsbTransferOwnerBuyerFormComponent;
  let fixture: ComponentFixture<PsbTransferOwnerBuyerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PsbTransferOwnerBuyerFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PsbTransferOwnerBuyerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
