import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwAdditionalServiceReportViewComponent } from './sw-additional-service-report-view.component';

describe('SwAdditionalServiceReportViewComponent', () => {
  let component: SwAdditionalServiceReportViewComponent;
  let fixture: ComponentFixture<SwAdditionalServiceReportViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwAdditionalServiceReportViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwAdditionalServiceReportViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
