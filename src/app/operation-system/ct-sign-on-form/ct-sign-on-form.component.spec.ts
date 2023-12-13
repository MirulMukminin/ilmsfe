import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtSignOnFormComponent } from './ct-sign-on-form.component';

describe('CtSignOnFormComponent', () => {
  let component: CtSignOnFormComponent;
  let fixture: ComponentFixture<CtSignOnFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CtSignOnFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CtSignOnFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
