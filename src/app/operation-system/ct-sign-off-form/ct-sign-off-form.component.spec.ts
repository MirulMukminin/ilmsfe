import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtSignOffFormComponent } from './ct-sign-off-form.component';

describe('CtSignOffFormComponent', () => {
  let component: CtSignOffFormComponent;
  let fixture: ComponentFixture<CtSignOffFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CtSignOffFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CtSignOffFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
