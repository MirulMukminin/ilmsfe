import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsbReportComponent } from './psb-report.component';

describe('PsbReportComponent', () => {
  let component: PsbReportComponent;
  let fixture: ComponentFixture<PsbReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PsbReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PsbReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
