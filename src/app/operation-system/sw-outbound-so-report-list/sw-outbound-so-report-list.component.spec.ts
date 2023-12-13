import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwOutboundSoReportListComponent } from './sw-outbound-so-report-list.component';

describe('SwOutboundSoReportListComponent', () => {
  let component: SwOutboundSoReportListComponent;
  let fixture: ComponentFixture<SwOutboundSoReportListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwOutboundSoReportListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwOutboundSoReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
