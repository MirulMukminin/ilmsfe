import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelWaterComponent } from './fuel-water.component';

describe('FuelWaterComponent', () => {
  let component: FuelWaterComponent;
  let fixture: ComponentFixture<FuelWaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuelWaterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FuelWaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
