import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CfsOtherActivityFormComponent } from './cfs-other-activity-form.component';

describe('CfsOtherActivityFormComponent', () => {
  let component: CfsOtherActivityFormComponent;
  let fixture: ComponentFixture<CfsOtherActivityFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CfsOtherActivityFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CfsOtherActivityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
