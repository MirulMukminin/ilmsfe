import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsbTransferOwnerListComponent } from './psb-transfer-owner-list.component';

describe('PsbTransferOwnerListComponent', () => {
  let component: PsbTransferOwnerListComponent;
  let fixture: ComponentFixture<PsbTransferOwnerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PsbTransferOwnerListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PsbTransferOwnerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
