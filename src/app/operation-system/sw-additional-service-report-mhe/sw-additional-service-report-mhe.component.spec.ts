import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwAdditionalServiceReportMheComponent } from './sw-additional-service-report-mhe.component';

describe('SwAdditionalServiceReportMheComponent', () => {
  let component: SwAdditionalServiceReportMheComponent;
  let fixture: ComponentFixture<SwAdditionalServiceReportMheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwAdditionalServiceReportMheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwAdditionalServiceReportMheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
