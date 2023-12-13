import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CfsRepairComponent } from './cfs-repair.component';

describe('CfsRepairComponent', () => {
  let component: CfsRepairComponent;
  let fixture: ComponentFixture<CfsRepairComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CfsRepairComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CfsRepairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
