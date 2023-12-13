import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VesselPlanScheduleComponent } from './vessel-plan-schedule.component';

describe('VesselPlanScheduleComponent', () => {
  let component: VesselPlanScheduleComponent;
  let fixture: ComponentFixture<VesselPlanScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VesselPlanScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VesselPlanScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
