import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CfsRequestListComponent } from './cfs-request-list.component';

describe('CfsRequestListComponent', () => {
  let component: CfsRequestListComponent;
  let fixture: ComponentFixture<CfsRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CfsRequestListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CfsRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
