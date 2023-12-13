import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtSignOffViewComponent } from './ct-sign-off-view.component';

describe('CtSignOffViewComponent', () => {
  let component: CtSignOffViewComponent;
  let fixture: ComponentFixture<CtSignOffViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CtSignOffViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CtSignOffViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
