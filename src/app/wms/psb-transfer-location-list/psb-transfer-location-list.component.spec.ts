import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsbTransferLocationListComponent } from './psb-transfer-location-list.component';

describe('PsbTransferLocationListComponent', () => {
  let component: PsbTransferLocationListComponent;
  let fixture: ComponentFixture<PsbTransferLocationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PsbTransferLocationListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PsbTransferLocationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
