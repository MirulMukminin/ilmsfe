import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralWorksPreviewComponent } from './general-works-preview.component';

describe('GeneralWorksPreviewComponent', () => {
  let component: GeneralWorksPreviewComponent;
  let fixture: ComponentFixture<GeneralWorksPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralWorksPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralWorksPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
