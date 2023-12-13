import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkPermitPreviewComponent } from './work-permit-preview.component';

describe('WorkPermitPreviewComponent', () => {
  let component: WorkPermitPreviewComponent;
  let fixture: ComponentFixture<WorkPermitPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkPermitPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkPermitPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
