import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarineFuelwaterFormPreviewComponent } from './marine-fuelwater-form-preview.component';

describe('MarineFuelwaterFormPreviewComponent', () => {
  let component: MarineFuelwaterFormPreviewComponent;
  let fixture: ComponentFixture<MarineFuelwaterFormPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarineFuelwaterFormPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarineFuelwaterFormPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
