import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HousekeepingCleaningStuffingComponent } from './housekeeping-cleaning-stuffing.component';

describe('HousekeepingCleaningStuffingComponent', () => {
  let component: HousekeepingCleaningStuffingComponent;
  let fixture: ComponentFixture<HousekeepingCleaningStuffingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HousekeepingCleaningStuffingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HousekeepingCleaningStuffingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
