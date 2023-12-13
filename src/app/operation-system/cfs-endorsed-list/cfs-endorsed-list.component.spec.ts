import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CfsEndorsedListComponent } from './cfs-endorsed-list.component';

describe('CfsEndorsedListComponent', () => {
  let component: CfsEndorsedListComponent;
  let fixture: ComponentFixture<CfsEndorsedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CfsEndorsedListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CfsEndorsedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
