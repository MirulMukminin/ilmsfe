import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtEndorsedSignOffListComponent } from './ct-endorsed-sign-off-list.component';

describe('CtEndorsedSignOffListComponent', () => {
  let component: CtEndorsedSignOffListComponent;
  let fixture: ComponentFixture<CtEndorsedSignOffListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CtEndorsedSignOffListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CtEndorsedSignOffListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
