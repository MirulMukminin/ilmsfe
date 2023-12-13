import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtSignOffListComponent } from './ct-sign-off-list.component';

describe('CtSignOffListComponent', () => {
  let component: CtSignOffListComponent;
  let fixture: ComponentFixture<CtSignOffListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CtSignOffListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CtSignOffListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
