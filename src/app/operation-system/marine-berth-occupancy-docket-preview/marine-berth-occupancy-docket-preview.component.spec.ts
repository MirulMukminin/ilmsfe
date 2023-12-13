import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarineBerthOccupancyDocketPreviewComponent } from './marine-berth-occupancy-docket-preview.component';

describe('MarineBerthOccupancyDocketPreviewComponent', () => {
  let component: MarineBerthOccupancyDocketPreviewComponent;
  let fixture: ComponentFixture<MarineBerthOccupancyDocketPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarineBerthOccupancyDocketPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarineBerthOccupancyDocketPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
