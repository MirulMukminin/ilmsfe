import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsbTransferLocationFormComponent } from './psb-transfer-location-form.component';

describe('PsbTransferLocationFormComponent', () => {
  let component: PsbTransferLocationFormComponent;
  let fixture: ComponentFixture<PsbTransferLocationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PsbTransferLocationFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PsbTransferLocationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
