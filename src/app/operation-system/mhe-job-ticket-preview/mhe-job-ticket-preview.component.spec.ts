import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MheJobTicketPreviewComponent } from './mhe-job-ticket-preview.component';

describe('MheJobTicketPreviewComponent', () => {
  let component: MheJobTicketPreviewComponent;
  let fixture: ComponentFixture<MheJobTicketPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MheJobTicketPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MheJobTicketPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
