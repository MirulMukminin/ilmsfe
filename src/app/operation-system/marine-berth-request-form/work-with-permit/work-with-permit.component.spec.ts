import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkWithPermitComponent } from './work-with-permit.component';

describe('WorkWithPermitComponent', () => {
  let component: WorkWithPermitComponent;
  let fixture: ComponentFixture<WorkWithPermitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkWithPermitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkWithPermitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
