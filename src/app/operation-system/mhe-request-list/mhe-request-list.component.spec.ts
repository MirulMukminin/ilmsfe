import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MheRequestListComponent } from './mhe-request-list.component';

describe('MheRequestListComponent', () => {
  let component: MheRequestListComponent;
  let fixture: ComponentFixture<MheRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MheRequestListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MheRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
