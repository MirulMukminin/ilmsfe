import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarineServiceRequestFormPreviewComponent } from './marine-service-request-form-preview.component';

describe('MarineServiceRequestFormPreviewComponent', () => {
  let component: MarineServiceRequestFormPreviewComponent;
  let fixture: ComponentFixture<MarineServiceRequestFormPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarineServiceRequestFormPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarineServiceRequestFormPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
