import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CfsLoadingCablingComponent } from './cfs-loading-cabling.component';

describe('CfsLoadingCablingComponent', () => {
  let component: CfsLoadingCablingComponent;
  let fixture: ComponentFixture<CfsLoadingCablingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CfsLoadingCablingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CfsLoadingCablingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
