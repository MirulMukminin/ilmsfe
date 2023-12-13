import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcwTransferEndorsedViewComponent } from './icw-transfer-endorsed-view.component';

describe('IcwTransferEndorsedViewComponent', () => {
  let component: IcwTransferEndorsedViewComponent;
  let fixture: ComponentFixture<IcwTransferEndorsedViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IcwTransferEndorsedViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IcwTransferEndorsedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
