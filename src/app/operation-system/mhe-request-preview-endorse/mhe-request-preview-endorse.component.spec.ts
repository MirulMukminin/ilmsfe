import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MheRequestPreviewEndorseComponent } from './mhe-request-preview-endorse.component';

describe('MheRequestPreviewEndorseComponent', () => {
  let component: MheRequestPreviewEndorseComponent;
  let fixture: ComponentFixture<MheRequestPreviewEndorseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MheRequestPreviewEndorseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MheRequestPreviewEndorseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
