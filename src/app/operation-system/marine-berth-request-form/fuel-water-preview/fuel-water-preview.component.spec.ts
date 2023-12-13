import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelWaterPreviewComponent } from './fuel-water-preview.component';

describe('FuelWaterPreviewComponent', () => {
  let component: FuelWaterPreviewComponent;
  let fixture: ComponentFixture<FuelWaterPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuelWaterPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FuelWaterPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
