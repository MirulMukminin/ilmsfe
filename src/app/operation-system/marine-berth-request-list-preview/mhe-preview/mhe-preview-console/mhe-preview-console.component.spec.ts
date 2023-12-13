import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MhePreviewConsoleComponent } from './mhe-preview-console.component';

describe('MhePreviewConsoleComponent', () => {
  let component: MhePreviewConsoleComponent;
  let fixture: ComponentFixture<MhePreviewConsoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MhePreviewConsoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MhePreviewConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
