import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MheRequestFormComponent } from './mhe-request-form.component';

describe('MheRequestFormComponent', () => {
  let component: MheRequestFormComponent;
  let fixture: ComponentFixture<MheRequestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MheRequestFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MheRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
