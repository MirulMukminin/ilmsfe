import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeavyPackageListPreviewComponent } from './heavy-package-list-preview.component';

describe('HeavyPackageListPreviewComponent', () => {
  let component: HeavyPackageListPreviewComponent;
  let fixture: ComponentFixture<HeavyPackageListPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeavyPackageListPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeavyPackageListPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
