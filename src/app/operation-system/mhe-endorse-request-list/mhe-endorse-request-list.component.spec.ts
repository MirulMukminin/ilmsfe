import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MheEndorseRequestListComponent } from './mhe-endorse-request-list.component';

describe('MheEndorseRequestListComponent', () => {
  let component: MheEndorseRequestListComponent;
  let fixture: ComponentFixture<MheEndorseRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MheEndorseRequestListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MheEndorseRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
