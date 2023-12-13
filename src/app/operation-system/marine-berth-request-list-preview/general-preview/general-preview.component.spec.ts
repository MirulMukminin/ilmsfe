import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralPreviewComponent } from './general-preview.component';

describe('GeneralPreviewComponent', () => {
  let component: GeneralPreviewComponent;
  let fixture: ComponentFixture<GeneralPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
