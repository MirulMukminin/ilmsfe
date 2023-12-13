import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsbBuildPartsFormComponent } from './psb-build-parts-form.component';

describe('PsbBuildPartsFormComponent', () => {
  let component: PsbBuildPartsFormComponent;
  let fixture: ComponentFixture<PsbBuildPartsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PsbBuildPartsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PsbBuildPartsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
