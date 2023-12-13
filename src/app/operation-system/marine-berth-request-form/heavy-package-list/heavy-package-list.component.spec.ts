import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeavyPackageListComponent } from './heavy-package-list.component';

describe('HeavyPackageListComponent', () => {
  let component: HeavyPackageListComponent;
  let fixture: ComponentFixture<HeavyPackageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeavyPackageListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeavyPackageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
