import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcwRequestStorageViewComponent } from './icw-request-storage-view.component';

describe('IcwRequestStorageViewComponent', () => {
  let component: IcwRequestStorageViewComponent;
  let fixture: ComponentFixture<IcwRequestStorageViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IcwRequestStorageViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IcwRequestStorageViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
