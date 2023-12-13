import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarineBerthOccupancyDocketListComponent } from './marine-berth-occupancy-docket-list.component';

describe('MarineBerthOccupancyDocketListComponent', () => {
  let component: MarineBerthOccupancyDocketListComponent;
  let fixture: ComponentFixture<MarineBerthOccupancyDocketListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarineBerthOccupancyDocketListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarineBerthOccupancyDocketListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
