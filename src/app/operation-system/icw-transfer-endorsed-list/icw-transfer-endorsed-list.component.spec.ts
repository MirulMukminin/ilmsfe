import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcwTransferEndorsedListComponent } from './icw-transfer-endorsed-list.component';

describe('IcwTransferEndorsedListComponent', () => {
  let component: IcwTransferEndorsedListComponent;
  let fixture: ComponentFixture<IcwTransferEndorsedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IcwTransferEndorsedListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IcwTransferEndorsedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
