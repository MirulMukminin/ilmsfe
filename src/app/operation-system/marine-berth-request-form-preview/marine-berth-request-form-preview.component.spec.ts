import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarineBerthRequestFormPreviewComponent } from './marine-berth-request-form-preview.component';

describe('MarineBerthRequestFormPreviewComponent', () => {
  let component: MarineBerthRequestFormPreviewComponent;
  let fixture: ComponentFixture<MarineBerthRequestFormPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarineBerthRequestFormPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarineBerthRequestFormPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
