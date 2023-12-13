import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwOutboundSoReportViewComponent } from './sw-outbound-so-report-view.component';

describe('SwOutboundSoReportViewComponent', () => {
  let component: SwOutboundSoReportViewComponent;
  let fixture: ComponentFixture<SwOutboundSoReportViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwOutboundSoReportViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwOutboundSoReportViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
