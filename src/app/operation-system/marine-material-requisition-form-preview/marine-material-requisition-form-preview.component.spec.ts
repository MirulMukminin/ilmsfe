import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarineMaterialRequisitionFormPreviewComponent } from './marine-material-requisition-form-preview.component';

describe('MarineMaterialRequisitionFormPreviewComponent', () => {
  let component: MarineMaterialRequisitionFormPreviewComponent;
  let fixture: ComponentFixture<MarineMaterialRequisitionFormPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarineMaterialRequisitionFormPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarineMaterialRequisitionFormPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
