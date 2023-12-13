import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcwTransferViewComponent } from './icw-transfer-view.component';

describe('IcwTransferViewComponent', () => {
  let component: IcwTransferViewComponent;
  let fixture: ComponentFixture<IcwTransferViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IcwTransferViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IcwTransferViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
