import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsbBuildPartsListComponent } from './psb-build-parts-list.component';

describe('PsbBuildPartsListComponent', () => {
  let component: PsbBuildPartsListComponent;
  let fixture: ComponentFixture<PsbBuildPartsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PsbBuildPartsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PsbBuildPartsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
