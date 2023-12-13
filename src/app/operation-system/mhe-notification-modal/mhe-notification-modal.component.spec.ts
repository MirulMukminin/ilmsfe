import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MheNotificationModalComponent } from './mhe-notification-modal.component';

describe('MheNotificationModalComponent', () => {
  let component: MheNotificationModalComponent;
  let fixture: ComponentFixture<MheNotificationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MheNotificationModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MheNotificationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
