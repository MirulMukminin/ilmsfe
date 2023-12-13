import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtSignOnListComponent } from './ct-sign-on-list.component';

describe('CtSignOnListComponent', () => {
  let component: CtSignOnListComponent;
  let fixture: ComponentFixture<CtSignOnListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CtSignOnListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CtSignOnListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
