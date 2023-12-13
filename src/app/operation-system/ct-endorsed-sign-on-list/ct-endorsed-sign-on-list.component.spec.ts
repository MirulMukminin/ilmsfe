import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtEndorsedSignOnListComponent } from './ct-endorsed-sign-on-list.component';

describe('CtEndorsedSignOnListComponent', () => {
  let component: CtEndorsedSignOnListComponent;
  let fixture: ComponentFixture<CtEndorsedSignOnListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CtEndorsedSignOnListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CtEndorsedSignOnListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
