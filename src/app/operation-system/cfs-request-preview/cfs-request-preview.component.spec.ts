import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CfsRequestPreviewComponent } from './cfs-request-preview.component';

describe('CfsRequestPreviewComponent', () => {
  let component: CfsRequestPreviewComponent;
  let fixture: ComponentFixture<CfsRequestPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CfsRequestPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CfsRequestPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
