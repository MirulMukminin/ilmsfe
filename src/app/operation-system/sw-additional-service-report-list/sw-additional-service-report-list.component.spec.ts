import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwAdditionalServiceReportListComponent } from './sw-additional-service-report-list.component';

describe('SwAdditionalServiceReportListComponent', () => {
  let component: SwAdditionalServiceReportListComponent;
  let fixture: ComponentFixture<SwAdditionalServiceReportListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwAdditionalServiceReportListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwAdditionalServiceReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
