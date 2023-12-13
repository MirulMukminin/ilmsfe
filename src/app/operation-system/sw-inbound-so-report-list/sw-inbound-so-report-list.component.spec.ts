import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwInboundSoReportListComponent } from './sw-inbound-so-report-list.component';

describe('SwInboundSoReportListComponent', () => {
  let component: SwInboundSoReportListComponent;
  let fixture: ComponentFixture<SwInboundSoReportListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwInboundSoReportListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwInboundSoReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
