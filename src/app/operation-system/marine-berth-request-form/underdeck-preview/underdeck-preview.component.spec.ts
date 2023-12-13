import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderdeckPreviewComponent } from './underdeck-preview.component';

describe('UnderdeckPreviewComponent', () => {
  let component: UnderdeckPreviewComponent;
  let fixture: ComponentFixture<UnderdeckPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnderdeckPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnderdeckPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
