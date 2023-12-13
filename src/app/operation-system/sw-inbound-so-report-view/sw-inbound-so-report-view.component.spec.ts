import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwInboundSoReportViewComponent } from './sw-inbound-so-report-view.component';

describe('SwInboundSoReportViewComponent', () => {
  let component: SwInboundSoReportViewComponent;
  let fixture: ComponentFixture<SwInboundSoReportViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwInboundSoReportViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwInboundSoReportViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
