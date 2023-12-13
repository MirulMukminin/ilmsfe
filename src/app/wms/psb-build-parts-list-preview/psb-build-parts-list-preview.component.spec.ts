import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsbBuildPartsListPreviewComponent } from './psb-build-parts-list-preview.component';

describe('PsbBuildPartsListPreviewComponent', () => {
  let component: PsbBuildPartsListPreviewComponent;
  let fixture: ComponentFixture<PsbBuildPartsListPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PsbBuildPartsListPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PsbBuildPartsListPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
