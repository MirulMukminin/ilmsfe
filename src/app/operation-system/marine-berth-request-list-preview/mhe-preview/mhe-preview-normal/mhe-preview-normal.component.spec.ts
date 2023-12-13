import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MhePreviewNormalComponent } from './mhe-preview-normal.component';

describe('MhePreviewNormalComponent', () => {
  let component: MhePreviewNormalComponent;
  let fixture: ComponentFixture<MhePreviewNormalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MhePreviewNormalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MhePreviewNormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
