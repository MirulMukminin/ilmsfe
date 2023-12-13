import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MheRequestPreviewComponent } from './mhe-request-preview.component';

describe('MheRequestPreviewComponent', () => {
  let component: MheRequestPreviewComponent;
  let fixture: ComponentFixture<MheRequestPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MheRequestPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MheRequestPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
