import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarineBerthOccupancyDocketDetailsComponent } from './marine-berth-occupancy-docket-details.component';

describe('MarineBerthOccupancyDocketDetailsComponent', () => {
  let component: MarineBerthOccupancyDocketDetailsComponent;
  let fixture: ComponentFixture<MarineBerthOccupancyDocketDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarineBerthOccupancyDocketDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarineBerthOccupancyDocketDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
