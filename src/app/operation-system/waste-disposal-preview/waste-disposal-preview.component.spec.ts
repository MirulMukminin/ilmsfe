import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WasteDisposalPreviewComponent } from './waste-disposal-preview.component';

describe('WasteDisposalPreviewComponent', () => {
  let component: WasteDisposalPreviewComponent;
  let fixture: ComponentFixture<WasteDisposalPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WasteDisposalPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WasteDisposalPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
