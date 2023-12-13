import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcwRequestStorageEndorsedViewComponent } from './icw-request-storage-endorsed-view.component';

describe('IcwRequestStorageEndorsedViewComponent', () => {
  let component: IcwRequestStorageEndorsedViewComponent;
  let fixture: ComponentFixture<IcwRequestStorageEndorsedViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IcwRequestStorageEndorsedViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IcwRequestStorageEndorsedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
