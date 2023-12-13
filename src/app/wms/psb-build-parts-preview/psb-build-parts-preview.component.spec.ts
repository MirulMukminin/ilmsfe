import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsbBuildPartsPreviewComponent } from './psb-build-parts-preview.component';

describe('PsbBuildPartsPreviewComponent', () => {
  let component: PsbBuildPartsPreviewComponent;
  let fixture: ComponentFixture<PsbBuildPartsPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PsbBuildPartsPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PsbBuildPartsPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
