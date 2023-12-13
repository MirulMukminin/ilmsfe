import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkWithPermitPreviewComponent } from './work-with-permit-preview.component';

describe('WorkWithPermitPreviewComponent', () => {
  let component: WorkWithPermitPreviewComponent;
  let fixture: ComponentFixture<WorkWithPermitPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkWithPermitPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkWithPermitPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
