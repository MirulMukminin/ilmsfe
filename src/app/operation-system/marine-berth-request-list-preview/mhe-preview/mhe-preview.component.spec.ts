import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MhePreviewComponent } from './mhe-preview.component';

describe('MhePreviewComponent', () => {
  let component: MhePreviewComponent;
  let fixture: ComponentFixture<MhePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MhePreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MhePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
