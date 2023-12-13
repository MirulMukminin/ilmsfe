import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CfsHousekeepingComponent } from './cfs-housekeeping.component';

describe('CfsHousekeepingComponent', () => {
  let component: CfsHousekeepingComponent;
  let fixture: ComponentFixture<CfsHousekeepingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CfsHousekeepingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CfsHousekeepingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
