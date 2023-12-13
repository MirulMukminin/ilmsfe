import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalPreviewComponent } from './normal-preview.component';

describe('NormalPreviewComponent', () => {
  let component: NormalPreviewComponent;
  let fixture: ComponentFixture<NormalPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NormalPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NormalPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
