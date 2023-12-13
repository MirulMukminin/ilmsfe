import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderdecksPreviewComponent } from './underdecks-preview.component';

describe('UnderdecksPreviewComponent', () => {
  let component: UnderdecksPreviewComponent;
  let fixture: ComponentFixture<UnderdecksPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnderdecksPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnderdecksPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
