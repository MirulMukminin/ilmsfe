import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsbTransferLocationPreviewComponent } from './psb-transfer-location-preview.component';

describe('PsbTransferLocationPreviewComponent', () => {
  let component: PsbTransferLocationPreviewComponent;
  let fixture: ComponentFixture<PsbTransferLocationPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PsbTransferLocationPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PsbTransferLocationPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
