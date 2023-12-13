import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtSignOnViewComponent } from './ct-sign-on-view.component';

describe('CtSignOnViewComponent', () => {
  let component: CtSignOnViewComponent;
  let fixture: ComponentFixture<CtSignOnViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CtSignOnViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CtSignOnViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
