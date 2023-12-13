import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MheEndorseRequestDetailsComponent } from './mhe-endorse-request-details.component';

describe('MheEndorseRequestDetailsComponent', () => {
  let component: MheEndorseRequestDetailsComponent;
  let fixture: ComponentFixture<MheEndorseRequestDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MheEndorseRequestDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MheEndorseRequestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
