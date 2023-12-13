import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarineFuelWaterRequestListComponent } from './marine-fuel-water-request-list.component';

describe('MarineFuelWaterRequestListComponent', () => {
  let component: MarineFuelWaterRequestListComponent;
  let fixture: ComponentFixture<MarineFuelWaterRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarineFuelWaterRequestListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarineFuelWaterRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
