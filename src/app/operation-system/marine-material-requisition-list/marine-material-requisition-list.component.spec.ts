import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarineMaterialRequisitionListComponent } from './marine-material-requisition-list.component';

describe('MarineBerthRequestListComponent', () => {
  let component: MarineMaterialRequisitionListComponent;
  let fixture: ComponentFixture<MarineMaterialRequisitionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarineMaterialRequisitionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarineMaterialRequisitionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
