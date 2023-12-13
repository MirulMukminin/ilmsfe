import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelwaterPreviewComponent } from './fuelwater-preview.component';

describe('FuelwaterPreviewComponent', () => {
  let component: FuelwaterPreviewComponent;
  let fixture: ComponentFixture<FuelwaterPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuelwaterPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FuelwaterPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
