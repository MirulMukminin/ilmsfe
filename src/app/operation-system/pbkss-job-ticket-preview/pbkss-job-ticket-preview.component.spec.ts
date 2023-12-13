import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PbkssJobTicketPreviewComponent } from './pbkss-job-ticket-preview.component';

describe('PbkssJobTicketPreviewComponent', () => {
  let component: PbkssJobTicketPreviewComponent;
  let fixture: ComponentFixture<PbkssJobTicketPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PbkssJobTicketPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PbkssJobTicketPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
