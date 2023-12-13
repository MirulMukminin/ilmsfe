import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CfsOtherRequestPreviewComponent } from './cfs-other-request-preview.component';

describe('CfsOtherRequestPreviewComponent', () => {
  let component: CfsOtherRequestPreviewComponent;
  let fixture: ComponentFixture<CfsOtherRequestPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CfsOtherRequestPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CfsOtherRequestPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
