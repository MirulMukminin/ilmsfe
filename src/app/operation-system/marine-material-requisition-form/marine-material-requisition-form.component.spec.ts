import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarineMaterialRequisitionFormComponent } from './marine-material-requisition-form.component';

describe('MarineMaterialRequisitionFormComponent', () => {
  let component: MarineMaterialRequisitionFormComponent;
  let fixture: ComponentFixture<MarineMaterialRequisitionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarineMaterialRequisitionFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarineMaterialRequisitionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
